import ReactDOMServer from 'react-dom/server';
import App from '../../src/App.jsx';

// eslint-disable-next-line no-undef
export const handler = async (event, context) => {
    const html = ReactDOMServer.renderToString(<App />);
    return {
        statusCode: 200,
        body: `<!DOCTYPE html><html><head><title>YassFlix - Watch Movies & TV Shows Online</title></head><body><div id="root">${html}</div></body></html>`,
        headers: { 'Content-Type': 'text/html' },
    };
}