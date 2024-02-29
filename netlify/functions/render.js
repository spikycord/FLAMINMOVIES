// netlify/functions/render.js
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../src/App';


// eslint-disable-next-line no-undef
exports.handler = async function(event, context) {
    const html = ReactDOMServer.renderToString(<App />);
    return {
        statusCode: 200,
        body: `<!DOCTYPE html><html><head><title>My App</title></head><body><div id="root">${html}</div></body></html>`,
        headers: { 'Content-Type': 'text/html' },
    };
};