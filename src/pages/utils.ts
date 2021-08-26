export const HISTORY_KEY = 'proxyHistory';

export interface HistoryData {
  value: string;
  id: number;
};

export const historyStorage = {
  set: (data: HistoryData[]) => {
    try {
      const val = JSON.stringify(data);
      localStorage.setItem(HISTORY_KEY, val);
    } catch (error) {
      console.log('设置缓存失败', error);
    }
  },
  get: () : HistoryData[] => {
    const val = localStorage.getItem(HISTORY_KEY);
    let data: HistoryData[] = [];
    try {
      data = JSON.parse(val) || [];
    } catch (error) {
      console.log('读取缓存失败', error);
    }
    return data;
  },
  add: (data: HistoryData) => {
    try {
      const historyData = historyStorage.get();
      historyData.unshift(data);
      historyStorage.set(historyData);
      return historyData;
    } catch (error) {
      console.log('设置缓存失败', error);
    }
  },
  del: (id: number) => {
    const historyData = historyStorage.get();
    const index = historyData.findIndex((item) => item.id === id);
    if (index !== -1) {
      historyData.splice(index, 1);
      historyStorage.set(historyData);
    }
    return historyData;
  }
};

export const nohostProxyUrlReg = /^(http(s?):\/\/(?=.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)?((\/\w+)+)?)([?|&][\W\w]+)?$/;
export const whistleProxyUrlReg = /^((proxy:\/\/)(?=.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+|(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+)(:\d+)?((\/\w+)+)?([?|&][\W\w]+)?$/;
