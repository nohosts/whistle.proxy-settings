import axios from 'axios';

axios.interceptors.request.use((config) => {
  const configClone = { ...config };
  if (process.env.NODE_ENV === 'production') {
    configClone.url = `/plugin.proxy-settings${configClone.url}`;
  }
  return configClone;
}, )

export const setProxyUrl = (proxyUrl) => {
  return axios.post('/cgi-bin/setProxyUrl', { proxyUrl });
};

export const getProxyUrl = async () => {
  const res = await axios.get('/cgi-bin/getProxyUrl');
  const { result = {} } = res.data;
  return result;
};

export const installCert = async () => {
  const res = await axios.get('/cgi-bin/installCert');
  const { retcode } = res.data;
  return retcode === 0;
};

export const switchProxy = async (enabled: boolean) => {
  const res = await axios.post('/cgi-bin/switchProxy', { enabled });
  const { retcode } = res.data;
  return retcode === 0;
};

export const switchCaptureHttps = async (enabled: boolean) => {
  const res = await axios.post('/cgi-bin/switchCaptureHttps', { enabled });
  const { retcode } = res.data;
  return retcode === 0;
};
