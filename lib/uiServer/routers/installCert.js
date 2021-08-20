const { certInstaller } = require('cert-helper');
const path = require('path');
const os = require('os');

const install = (path) => new Promise((resolve) => {
  certInstaller(path, (err) => {
    resolve(err);
  });  
});

module.exports = async (ctx) => {
  const err = await install(path.join(os.homedir(), '.WhistleAppData/.whistle/certs/root.crt'));
  ctx.body = {
    retcode: err ? 100501 : 0,
    msg: err,
  };
};
