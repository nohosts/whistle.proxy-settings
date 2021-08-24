const { Storage } = require('../../utils');
const { SWITCH_PROXY, ENABLED_PROXY, DISABLED_PROXY } = require('../../const');

module.exports = async (ctx) => {
  const { enabled } = ctx.request.body;
  const storage = Storage.getInstance();
  storage.set(SWITCH_PROXY, enabled ? ENABLED_PROXY : DISABLED_PROXY);
  ctx.body = {
    retcode: 0,
  };
};
