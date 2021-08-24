const { Storage } = require('../../utils');
const { STORAGE_KEY, SWITCH_PROXY, ENABLED_PROXY, DISABLED_PROXY } = require('../../const');

module.exports = async (ctx) => {
  const storage = Storage.getInstance();
  const proxyUrl = storage.get(STORAGE_KEY);
  const enabled = +storage.get(SWITCH_PROXY) === ENABLED_PROXY ? ENABLED_PROXY : DISABLED_PROXY;
  ctx.body = {
    retcode: 0,
    result: {
      proxyUrl,
      enabled,
    },
  };
};
