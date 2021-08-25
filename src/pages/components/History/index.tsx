import React, { useEffect, useState } from 'react';
import { Modal, Table, Button, message } from 'antd';
import { HistoryData, historyStorage } from '../../utils';
import { setProxyUrl } from '../../fetch';

interface Props {
  visible: boolean;
  onUse?: (proxyUrl: string) => void;
  onEdit?: (proxUrl: string) => void;
  onClose: () => void;
  showEditBtn?: boolean
}

export const History: React.FC<Props> = (props) => {
  const [data, setData] = useState<HistoryData[]>([]);
  const dataSource = data.map((item) => ({
    proxyUrl: item.value,
    id: item.id,
  }));

  const onDelete = (id: number) => {
    const historyData = historyStorage.del(id);
    setData([...historyData]);
  };

  const onUse = (url: string) => {
    setProxyUrl(url).then((res) => {
      const { retcode } = res.data;
      if (retcode !== 0) {
        message.error('设置代理地址失败');
        return;
      }
      message.success('设置代理成功');
      const historyData = historyStorage.add({
        value: url,
        id: Date.now(),
      });
      setData([...historyData]);
      props?.onUse?.(url);
    });
  }

  const columns = [
    {
      title: '代理地址',
      dataIndex: 'proxyUrl',
      key: 'proxyUrl',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (item, row) => {
        return (
          <>
            <Button onClick={() => onUse(row.proxyUrl)} type="link">使用</Button>
            {props.showEditBtn && <Button onClick={() => props.onEdit(row.proxyUrl)} type="link">编辑</Button>}
            <Button onClick={() => onDelete(row.id)} type="link">删除</Button>
          </>
        );
      }
    },
  ];

  useEffect(() => {
    if (props.visible) {
      setData(historyStorage.get());
    }
  }, [props.visible])
  return (
    <Modal
      visible={props.visible}
      footer={null}
      title="历史记录"
      onCancel={props.onClose}
    >
      <Table rowKey={(row) => `${row.id}`} pagination={false} dataSource={dataSource} columns={columns} />
    </Modal>
  );
}
