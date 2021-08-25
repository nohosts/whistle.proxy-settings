const http = require('http');
const fs = require('fs');
const { uiServer } = require('./index');
const init = require('./initial');

const server = http.createServer();

const data = {};
const options = {
  storage: {
    setProperty: (key, val) => {
      data[key] = val;
      fs.writeFileSync('./data', JSON.stringify(data));
    },
    getProperty: (key) => {
      try {
        const str = fs.readFileSync('./data');
        const val = JSON.parse(str);
        return val[key];
      } catch (error) {
        return data[key];
      }
    },
  },
};

uiServer(server, options);

init(options);

server.listen(9999);

