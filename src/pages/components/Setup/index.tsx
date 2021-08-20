import React, { useState } from 'react';
import { Button } from 'antd';
import { History } from '../History';

import './index.css';

interface Props {
  onReset: () => void;
  proxyUrl: string;
}

export const Setup: React.FC<Props> = (props) => {
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  return (
    <div className="setup-container">
      <div className="cur-proxy-url">当前代理: {props.proxyUrl}</div>
      <div>
        <Button type="link">XXXX</Button>
        <Button onClick={() => setShowHistoryModal(true)} type="link">历史记录</Button>
        <Button onClick={() => props.onReset()} type="link">重新设置</Button>
      </div>
      <History
        visible={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
      />
    </div>
  );
};
