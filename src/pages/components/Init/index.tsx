import React from 'react';
import { Button } from 'antd';

import './index.css';

interface Props {
  onClick: () => void;
}

export const Init: React.FC<Props> = (props) => (
  <div className="init-container">
    <Button type="primary" size="large" onClick={props.onClick}>
      点击设置代理
    </Button>
  </div>
);
