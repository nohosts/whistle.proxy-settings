
let _storageInstance;
class Storage {
  constructor(storage) {
    if (_storageInstance) {
      return _storageInstance;
    }
    this.storage = storage;
    return _storageInstance = this;
  }

  static getInstance(arg) {
    return _storageInstance ? _storageInstance : _storageInstance = new Storage(arg); 
  }

  set(key, data) {
    this.storage.setProperty(key, data);
  }

  get(key) {
    return this.storage.getProperty(key);
  }
}

exports.Storage = Storage;


const nohostProxyUrlReg = /^http(s?):\/\/(?=.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)$/;
const whistleProxyUrlReg = /^((proxy:\/\/)(?=.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+|(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+)(:\d+)$/;

exports.isNohostProxy = (url) => nohostProxyUrlReg.test(url);
exports.isWhistleProxy = (url) => whistleProxyUrlReg.test(url);