const http = require('http');
const { uiServer } = require('./index');

const server = http.createServer();

const data = {};

uiServer(server, {
  storage: {
    setProperty: (key, val) => { data[key] = val },
    getProperty: (key) => data[key],
  },
});

server.listen(9999);

