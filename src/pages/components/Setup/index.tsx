import React, { useEffect, useState } from 'react';
import { Button, Checkbox, message, Tooltip } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';
import { History } from '../History';
import { SwitchHttpsCapture } from '../SwitchHttpsCapture';
import { switchProxy } from '../../fetch';
import { nohostProxyUrlReg } from '../../utils';

import './index.css';

interface Props {
  onReset: () => void;
  proxyUrl: string;
  onSetProxyUrl: (url: string) => void;
  enabled: boolean;
}

enum ProxyType {
  Nohost = 'nohost',
  Whistle = 'whistle',
  Init = '',
};

export const Setup: React.FC<Props> = (props) => {
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [isUsedProxy, setIsUsedProxy] = useState(true);
  const [proxyType, setProxyType] = useState<ProxyType>(ProxyType.Init);

  const onUseProxy = (e: CheckboxChangeEvent) => {
    const val = e.target.checked;
    switchProxy(val).then((success) => {
      if (success) {
        if (val) {
          (window as any).enableProxy?.();
        } else {
          (window as any).disableProxy?.();
        }
        setIsUsedProxy(val);
        message.success('切换代理成功');
        return;
      }
      message.info('切换代理失败');
    });
  };

  const onUse = (url) => {
    props.onSetProxyUrl(url);
    setIsUsedProxy(true);
    setShowHistoryModal(false);
  };

  const onOpenUrl = () => {
    if (proxyType === ProxyType.Whistle) {
      const url = props.proxyUrl.replace('proxy://', '');
      window.open(`http://${url}`);
    } else {
      const url = props.proxyUrl.match(nohostProxyUrlReg)?.[1];
      window.open(url);
    }
  };

  useEffect(() => {
    // proxyUrl变更的时候，默认是开启
    setIsUsedProxy(true);
    const isNohostProxyType = nohostProxyUrlReg.test(props.proxyUrl);
    setProxyType(isNohostProxyType ? ProxyType.Nohost : ProxyType.Whistle);
  }, [props.proxyUrl]);

  useEffect(() => {
    setIsUsedProxy(props.enabled);
  }, [props.enabled]);

  return (
    <div className="setup-container">
      <div>
        <div className="cur-proxy-url">
          <Tooltip title="点击开启或者关闭代理">
            <Checkbox className="switch-proxy" checked={isUsedProxy} onChange={onUseProxy} />
          </Tooltip>
          <span className="cur-proxy-url-desc">当前代理: {props.proxyUrl}</span>
        </div>
        <div className="switch-https-capture-container">
          <SwitchHttpsCapture />
        </div>
        <div className="cur-proxy-operation">
          {
            proxyType !== ProxyType.Init &&
              <Button onClick={onOpenUrl} type="link">{proxyType === ProxyType.Nohost ? '选择环境' : '打开whistle'}</Button>
          }
          <Button onClick={() => setShowHistoryModal(true)} type="link">历史记录</Button>
          <Button onClick={() => props.onReset()} type="link">重新设置</Button>
        </div>
      </div>
      <History
        visible={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        onUse={onUse}
      />
    </div>
  );
};
