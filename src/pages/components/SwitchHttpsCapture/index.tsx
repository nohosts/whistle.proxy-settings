import React, { useEffect, useState } from 'react';
import { Checkbox, Tooltip, message, Button } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { switchCaptureHttps, installCert, getProxyUrl } from '../../fetch';

export const SwitchHttpsCapture: React.FC = () => {
  const [captureHttps, setCaptureHttps] = useState(false);

  const onSwitchCaptureHttps = (e: CheckboxChangeEvent) => {
    const val = e.target.checked;
    switchCaptureHttps(val).then((result) => {
      if (result) {
        setCaptureHttps(val);
        message.success(`${val ? '开启' : '关闭'}切换https抓包成功`);
      } else {
        message.error(`${val ? '开启' : '关闭'}切换https抓包失败`);
      }
    });
  };

  const onInstallCert = () => {
    installCert().then((result) => {
      let msg = '安装证书成功';
      let type = 'success';
      if (!result) {
        msg = '安装证书失败请重新安装';
        type = 'error'
      }
      message[type](msg);
    });
  };

  useEffect(() => {
    getProxyUrl().then((result) => {
      const { captureHttpsEnabled } = result;
      setCaptureHttps(captureHttpsEnabled);
    });
  }, []);

  return (
    <span>
      <Tooltip title="点击开启或关闭https抓包">
        <Checkbox checked={captureHttps} onChange={onSwitchCaptureHttps} />
      </Tooltip>
      如果需要解析 HTTPS，请<Button onClick={onInstallCert} type="link">点击安装证书</Button>
    </span>
  );
};
