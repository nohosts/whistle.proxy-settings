import React, { useEffect, useState } from 'react';
import { Button, Checkbox, message } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';
import { History } from '../History';
import { switchProxy } from '../../fetch';

import './index.css';

interface Props {
  onReset: () => void;
  proxyUrl: string;
  onSetProxyUrl: (url: string) => void;
  enabled: boolean;
}

export const Setup: React.FC<Props> = (props) => {
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [isUsedProxy, setIsUsedProxy] = useState(true);

  const onUseProxy = (e: CheckboxChangeEvent) => {
    const val = e.target.checked;
    switchProxy(val).then((success) => {
      if (success) {
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
  }, [props.proxyUrl]);

  useEffect(() => {
    setIsUsedProxy(props.enabled);
  }, [props.enabled]);

  return (
    <div className="setup-container">
      <div className="cur-proxy-url">
        <Checkbox className="switch-proxy" checked={isUsedProxy} onChange={onUseProxy} />
        当前代理: {props.proxyUrl}
      </div>
      <div>
        <Button type="link">XXXX</Button>
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
