const { Storage, isNohostProxy, isWhistleProxy } = require('../../utils');
const { STORAGE_KEY, SWITCH_PROXY, SWITCH_CAPTURE_HTTPS, ENABLED_PROXY } = require('../../const');
const axios = require('axios');

module.exports = async (ctx) => {
  const storage = Storage.getInstance();
  const proxyEnabled = +storage.get(SWITCH_PROXY) === ENABLED_PROXY;
  if (!proxyEnabled) {
    ctx.body = '';
    return;
  }
  const proxyUrl = storage.get(STORAGE_KEY);
  const captureHttps = +storage.get(SWITCH_CAPTURE_HTTPS) === ENABLED_PROXY;
  let rules = captureHttps ? '* enable://capture \n' : '';
  if (isWhistleProxy(proxyUrl)) {
    rules += /^proxy:\/\//.test(proxyUrl) ? proxyUrl : `proxy://${proxyUrl}`;
  } else if (isNohostProxy(proxyUrl)) {
    const res = await axios.get(`${proxyUrl}/whistle.nohost/cgi-bin/plugin-rules`);
    rules += res.data;
  }
  ctx.body = rules;
};
