import React from 'react';
import { Upload, message } from 'antd';
import { FileExcelOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import type { FileData } from '../types';

interface FileUploaderProps {
  onFileLoad: (data: FileData[][]) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileLoad }) => {
  const props: UploadProps = {
    accept: '.csv',
    showUploadList: false,
    beforeUpload: (file) => {
      const isCsv = file.type === 'text/csv';
      if (!isCsv) {
        message.error('Please upload a CSV file only!');
        return Upload.LIST_IGNORE;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const rows = text.split('\n').map(row => row.split(','));
        onFileLoad(rows);
        message.success('File loaded successfully!');
      };
      reader.readAsText(file);
      return false;
    },
  };

  return (
    <Upload.Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <FileExcelOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
      </p>
      <p className="ant-upload-text">Click or drag CSV file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for single CSV file upload. The file will be converted to Excel format.
      </p>
    </Upload.Dragger>
  );
}