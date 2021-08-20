
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
    this.storage.set(key, data);
  }

  get(key) {
    this.storage.get(key);
  }
}

exports.Storage = Storage;

exports.STORAGE_KEY = 'whistleProxyKey';
