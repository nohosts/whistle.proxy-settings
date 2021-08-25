const { Storage } = require('./lib/utils');

module.exports = (options) => {
  new Storage(options.storage);
};
