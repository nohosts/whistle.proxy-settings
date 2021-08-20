const http = require('http');
const { uiServer } = require('./index');

const server = http.createServer();

const data = {};

uiServer(server, {
  storage: {
    set: (key, val) => { data[key] = val },
    get: (key) => data[key],
  },
});

server.listen(9999);

