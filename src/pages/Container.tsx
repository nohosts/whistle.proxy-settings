import React, { useEffect, useState } from 'react';
import { Init } from './components/Init';
import { Setting } from './components/Setting';
import { Setup } from './components/Setup';
import { getProxyUrl } from './fetch';

import './index.css';
import 'antd/dist/antd.css';

export enum Status {
  Init = 'init',
  Setting = 'setting',
  Setup = 'setup',
}

export const Container: React.FC = () => {
  const [status, setStatus] = useState<Status>(Status.Init);
  const [proxyUrl, setProxyUrl] = useState('');

  const setProxy = (url) => {
    setProxyUrl(url);
    setStatus(Status.Setup);
  }

  useEffect(() => {
    // TODO 从接口拉取缓存的设置情况
    getProxyUrl().then((proxyUrl) => {
      if (proxyUrl) {
        setProxy(proxyUrl);
      }
    });
  }, []);

  if (status === Status.Setting) {
    return (
      <Setting setProxy={setProxy} />
    );
  } else if (status === Status.Setup) {
    return (
      <Setup onReset={() => setStatus(Status.Setting)} proxyUrl={proxyUrl} />
    );
  }

  return (
    <Init onClick={() => setStatus(Status.Setting)} />
  )
};
