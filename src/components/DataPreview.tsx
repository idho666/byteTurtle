import React from 'react';
import { Table } from 'antd';
import type { FileData } from '../types';

interface DataPreviewProps {
  data: FileData[][];
}

export const DataPreview: React.FC<DataPreviewProps> = ({ data }) => {
  if (!data.length) return null;

  const headers = data[0];
  const dataSource = data.slice(1).map((row, index) => ({
    key: index,
    ...row.reduce((acc, cell, i) => ({
      ...acc,
      [headers[i]]: cell,
    }), {}),
  }));

  const columns = headers.map(header => ({
    title: header,
    dataIndex: header,
    key: header,
  }));

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      scroll={{ x: true, y: 400 }}
      pagination={{ pageSize: 10 }}
    />
  );
}