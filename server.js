import express from 'express';
import { createServer as createViteServer } from 'vite';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pkg from 'react-router-dom';

const { StaticRouter } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' },
  });
  app.use(vite.middlewares);

  app.use('*', async (req, res) => {
    const url = req.originalUrl;

    let template, App;
    try {
      template = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8');
      App = (await vite.ssrLoadModule('/src/App.jsx')).default;
    } catch (e) {
      vite.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).end(e.message);
      return;
    }

    const router = createElement(StaticRouter, { location: url }, createElement(App));
    const appHtml = renderToString(router);
    const html = template.replace(`<!--app-html-->`, appHtml);

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  });

  const port = 3000;
  
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  return { app, vite };
}

createServer().catch((e) => console.error(e));


