const { Storage, STORAGE_KEY } = require('../../utils');

module.exports = async (ctx) => {
  const storage = Storage.getInstance();
  const proxyUrl = storage.get(STORAGE_KEY);
  ctx.body = {
    retcode: 0,
    result: {
      proxyUrl,
    },
  };
};
