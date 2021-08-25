const { Storage } = require('../../utils');
const { SWITCH_CAPTURE_HTTPS, ENABLED_PROXY, DISABLED_PROXY } = require('../../const');

module.exports = async (ctx) => {
  const { enabled } = ctx.request.body;
  const storage = Storage.getInstance();
  storage.set(SWITCH_CAPTURE_HTTPS, enabled ? ENABLED_PROXY : DISABLED_PROXY);
  ctx.body = {
    retcode: 0,
  };
};
