import React from 'react';
import { Button, Icon, Tooltip } from 'antd';

import './index.css';

interface Props {
  onClick: () => void;
}

export const Init: React.FC<Props> = (props) => (
  <div className="init-container">
    <Tooltip placement="top" title="请先设置代理">
      <Button type="primary" size="large" onClick={props.onClick}>
        点击设置代理
        <Icon type="question-circle" />
      </Button>
    </Tooltip>
  </div>
);
