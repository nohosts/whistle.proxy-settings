const getProxyUrl = require('./routers/getProxyUrl');
const setProxyUrl = require('./routers/setProxyUrl');
const installCert = require('./routers/installCert');

module.exports = (router) => {
  router.get('/cgi-bin/getProxyUrl', getProxyUrl);
  router.post('/cgi-bin/setProxyUrl', setProxyUrl);
  router.get('/cgi-bin/installCert', installCert);
};
