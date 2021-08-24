const getRules = require('./routers/rules');
const getProxyUrl = require('./routers/getProxyUrl');
const setProxyUrl = require('./routers/setProxyUrl');
const installCert = require('./routers/installCert');
const switchProxy = require('./routers/switchProxy');

module.exports = (router) => {
  router.get('/cgi-bin/rules', getRules);
  router.get('/cgi-bin/getProxyUrl', getProxyUrl);
  router.post('/cgi-bin/setProxyUrl', setProxyUrl);
  router.get('/cgi-bin/installCert', installCert);
  router.post('/cgi-bin/switchProxy', switchProxy);
};
