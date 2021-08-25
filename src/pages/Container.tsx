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
  const [enabled, setEnabled] = useState(true);

  const setProxy = (url) => {
    setProxyUrl(url);
    setStatus(Status.Setup);
  }

  useEffect(() => {
    getProxyUrl().then((result) => {
      const { proxyUrl, proxyEnabled: enabledResult } = result;
      if (proxyUrl) {
        setProxy(proxyUrl);
        setEnabled(enabledResult);
        if (enabledResult) {
          (window as any).enableProxy?.();
        } else {
          (window as any).disableProxy?.();
        }
      }
    });
  }, []);

  if (status === Status.Setting) {
    return (
      <Setting setProxy={setProxy} />
    );
  } else if (status === Status.Setup) {
    return (
      <Setup
        onSetProxyUrl={setProxy}
        onReset={() => setStatus(Status.Setting)}
        proxyUrl={proxyUrl}
        enabled={enabled}
      />
    );
  }

  return (
    <Init onClick={() => setStatus(Status.Setting)} />
  )
};
