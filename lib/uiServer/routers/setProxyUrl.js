const { Storage, STORAGE_KEY } = require('../../utils');

module.exports = async (ctx) => {
  const { proxyUrl } = ctx.request.body;
  if (!proxyUrl) {
    ctx.body = {
      retcode: 100400,
      msg: '参数错误',
    };
    return;
  }
  const storage = Storage.getInstance();
  storage.set(STORAGE_KEY, proxyUrl);
  ctx.body = {
    retcode: 0,
  };
};
