import React, { useState } from 'react';
import { Input, Button, List, message } from 'antd';
import { historyStorage } from '../../utils';
import { History } from '../History';
import { setProxyUrl as setProxyUrlCgi, installCert } from '../../fetch';

import './index.css';

const TipData = [
  {
    title: '1. 直接代理到 Nohost',
    desc: '填上 Nohost 所在地址，如：http://nohostAddress:nohostPort',
  },
  {
    title: '2. 直接代理到 Whistle',
    desc: '填上 Whistle 所在地址，如：proxy://whistleAddress:whistlePort 或者 whistleAddress:whistlePort',
  },
  {
    title: '3. 通过二级代理访问 Whistle 或者 Nohost',
    desc: (
      <>
        <p>二级代理到 Nohost：http://nohostAddress:nohostPort?proxy=proxyHost:proxyPort</p>
        <p>二级代理到 Whistle：proxy://whistleAddress:whistlePort?proxy=proxyHost:proxyPort</p>
      </>
    ),
  },
  {
    title: '4. 通过 Nginx 反向代理到 Nohost 或 Whistle',
    desc: (
      <>
        <p>代理到 Nohost： http://nohostAddress:nohostPort?nginx=nginxHost:nginxPort</p>
        <p>代理到 Whistle: proxy://whistleAddress:whistlePort?nginx=nginxHost:nginxPort</p>
      </>
    ),
  },
];

export const Tip: React.FC = () => (
  <List
    header="代理地址支持以下几种设置方式:"
    itemLayout="horizontal"
    dataSource={TipData}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          title={item.title}
          description={item.desc}
        />
      </List.Item>
    )}
  />
);

interface Props {
  setProxy: (url: string) => void;
}

export const Setting: React.FC<Props> = (props) => {
  const [proxyUrl, setProxyUrl] = useState('');
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const onClick = () => {
    setProxyUrlCgi(proxyUrl).then((res) => {
      const { retcode } = res.data;
      if (retcode !== 0) {
        message.error('设置代理地址失败');
        return;
      }
      message.success('设置代理成功');
      historyStorage.add({
        value: proxyUrl,
        id: Date.now(),
      });
      props.setProxy(proxyUrl)
      setProxyUrl('');
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
  }

  const onHistoryModalEdit = (url: string) => {
    setShowHistoryModal(false);
    setProxyUrl(url);
  }

  return (
    <div className="setting-container">
      <div className="proxy-url-container">
        <span className="proxy-url-label">代理地址：</span>
        <Input
          value={proxyUrl}
          onChange={(e) => setProxyUrl(e.target.value)}
          placeholder="请输入代理地址"
          size="large"
          className="proxy-url-input"
        />
        <Button
          size="large"
          type="primary"
          className="submit-btn"
          onClick={onClick}
          disabled={!proxyUrl}
        >
          确定
        </Button>
        <Button type="link" size="large" onClick={() => setShowHistoryModal(true)}>历史记录</Button>
      </div>
      <div className="https-tip">如果需要解析https，请<Button onClick={onInstallCert} type="link">点击安装证书</Button></div>
      <Tip />
      <History
        visible={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        onEdit={onHistoryModalEdit}
        showEditBtn
      />
    </div>
  );
};
