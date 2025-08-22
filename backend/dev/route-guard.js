// backend/dev/route-guard.js (ESM)
import express from 'express';

const METHODS = ['use', 'get', 'post', 'put', 'delete', 'patch', 'options', 'all'];

const isMiddleware = (x) => typeof x === 'function' || Array.isArray(x);

function wrap(obj, label) {
  for (const m of METHODS) {
    const orig = obj[m].bind(obj);
    obj[m] = function (path, ...rest) {
      // Allow things like app.get('env') — not a route (no handlers passed)
      if (label === 'app' && m === 'get' && rest.length === 0) {
        return orig(path, ...rest);
      }

      // Only validate when this looks like a real route (has a handler)
      if (typeof path === 'string' && rest.length > 0 && isMiddleware(rest[0])) {
        if (/^https?:\/\//i.test(path)) {
          console.error(`❌ BAD ROUTE (${label}.${m}) used a FULL URL: ${path}`);
          console.error(new Error('Registered here').stack);
          process.exit(1);
        }
        // Express 5 wants proper paths; do not enforce '*' here — just warn about missing '/'
        if (!path.startsWith('/') && path !== '/*' && path !== '/(.*)') {
          console.error(`❌ BAD ROUTE (${label}.${m}) path must start with "/": "${path}"`);
          console.error(new Error('Registered here').stack);
          process.exit(1);
        }
      }
      return orig(path, ...rest);
    };
  }
}

// Patch app factory
const origExpress = express;
function patchedExpress(...args) {
  const app = origExpress(...args);
  wrap(app, 'app');
  return app;
}

// Patch Router factory
const origRouter = express.Router;
patchedExpress.Router = (...args) => {
  const r = origRouter(...args);
  wrap(r, 'router');
  return r;
};

// Re-export everything
Object.assign(patchedExpress, express);
export default patchedExpress;
export * from 'express';
