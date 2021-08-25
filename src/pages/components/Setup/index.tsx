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

const ProxyTypeTextMap = {
  [ProxyType.Nohost]: 'nohost',
  [ProxyType.Whistle]: 'whistle',
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
  }

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
      <div className="cur-proxy-url">
        <Tooltip title="点击开启或者关闭代理">
          <Checkbox className="switch-proxy" checked={isUsedProxy} onChange={onUseProxy} />
        </Tooltip>
        当前代理: {props.proxyUrl}
      </div>
      <div>
        <SwitchHttpsCapture />
      </div>
      <div>
        {
          proxyType !== ProxyType.Init &&
            <Button type="link">打开{ProxyTypeTextMap[proxyType]}</Button>
        }
        <Button onClick={() => setShowHistoryModal(true)} type="link">历史记录</Button>
        <Button onClick={() => props.onReset()} type="link">重新设置</Button>
      </div>
      <History
        visible={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        onUse={onUse}
      />
    </div>
  );
};
