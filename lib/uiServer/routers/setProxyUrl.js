const { Storage } = require('../../utils');
const { STORAGE_KEY, SWITCH_PROXY, ENABLED_PROXY } = require('../../const');

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
  storage.set(SWITCH_PROXY, ENABLED_PROXY);
  ctx.body = {
    retcode: 0,
  };
};
