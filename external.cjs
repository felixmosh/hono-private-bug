const { Hono } = require('hono');
const api = new Hono();

api.get('/api', (c) => c.json({ message: 'OK' }));


module.exports = { api };
