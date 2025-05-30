import { Button, Card, Space } from 'antd'
import React from 'react'
import { SaveOutlined, PrinterOutlined } from "@ant-design/icons";

const TombolFungsi = () => {
    return (
        <div>
            <Card
                bodyStyle={{ padding: '5px' }}>
                <Space
                    style={{ float: 'right' }}>
                    <Button
                        type='primary'
                        // onClick={() => klikSimpan()}
                        icon={<SaveOutlined />}
                        // disabled={noReg.length === 0 ? true : false}
                        style={{ width: '150px' }}>
                        Simpan
                    </Button>
                    <Button
                        type='primary'
                        // onClick={() => klikSimpan()}
                        icon={<PrinterOutlined />}
                        // disabled={noReg.length === 0 ? true : false}
                        style={{ width: '150px' }}>
                        Cetak Hasil PA
                    </Button>
                </Space>
            </Card>
        </div>
    )
}

export default TombolFungsi