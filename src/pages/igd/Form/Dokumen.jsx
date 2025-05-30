import { Card, ConfigProvider, Form, Input } from "antd";
import React from "react";

const Dokumen = () => {
  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Card: { fontWeightStrong: "bolder", headerBg: "beige" },
            Form: { itemMarginBottom: 0 },
          },
        }}
      >
        <Card
          title="Dokumen"
          size="small"
          style={{
            borderWidth: "2px",
            borderColor: "darkgray",
            borderRadius: "4px",
          }}
        >
          <Form>
            <Form.Item label="Pasien">
              <Input />
            </Form.Item>
          </Form>
        </Card>
      </ConfigProvider>
    </div>
  );
};

export default Dokumen;
