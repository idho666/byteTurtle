import React, { useState } from 'react';
import { Layout, Typography, Button, Space, Card } from 'antd';
import { FileExcelOutlined, DownloadOutlined } from '@ant-design/icons';
import { FileUploader } from './components/FileUploader';
import { DataPreview } from './components/DataPreview';
import { downloadExcel } from './utils/excelUtils';
import type { FileData } from './types';

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const [csvData, setCsvData] = useState<FileData[][]>([]);

  const handleDownload = () => {
    if (csvData.length === 0) {
      return;
    }
    downloadExcel(csvData);
  };

  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center">
        <FileExcelOutlined className="text-white text-2xl mr-2" />
        <Title level={4} className="text-white m-0">
          CSV to Excel Converter
        </Title>
      </Header>
      <Content className="p-8">
        <Space direction="vertical" size="large" className="w-full">
          <Card>
            <FileUploader onFileLoad={setCsvData} />
          </Card>

          {csvData.length > 0 && (
            <>
              <Card
                title="Data Preview"
                extra={
                  <Button
                    type="primary"
                    icon={<DownloadOutlined />}
                    onClick={handleDownload}
                  >
                    Download Excel
                  </Button>
                }
              >
                <DataPreview data={csvData} />
              </Card>
            </>
          )}
        </Space>
      </Content>
    </Layout>
  );
}

export default App;