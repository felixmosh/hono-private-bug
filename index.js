import { Hono } from 'hono';
import { showRoutes } from 'hono/dev';
import { serve } from '@hono/node-server';
import { api } from './external.cjs';
const run = async () => {
  const app = new Hono();

  const innerApp = new Hono();

  innerApp.route('/', api);

  innerApp.onError((err, c) => {
    return c.json({ error: err.message });
  });

  app.route('/ui', innerApp);

  showRoutes(app);

  serve({ fetch: app.fetch, port: 3000 }, ({ address, port }) => {
    /* eslint-disable no-console */
    console.log(`Running on ${address}:${port}...`);
    /* eslint-enable */
  });
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
