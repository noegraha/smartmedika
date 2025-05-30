import React from 'react'
import { Result, Button, Tabs } from 'antd';
import FormLaporInsiden from './FormLaporInsiden';
import FormListInsidenPasien from './FormListInsidenPasien';
import CetTrheeel from './cek';

const { TabPane } = Tabs;

const DashBoardRuang = () => {
    return (
        <div>
            <Tabs type="card">
                <TabPane tab="Tab 1" key="1">
                    <Result
                        status="403"
                        title="404"
                        subTitle="Sabar, masih dalam proses."
                        extra={<Button type="primary">Back Home</Button>}
                    />
                </TabPane>
                <TabPane tab="Insiden Pasien" key="3">
                    <FormListInsidenPasien />
                </TabPane>
                <TabPane tab="Input Insiden" key="2">
                    <FormLaporInsiden />
                </TabPane>
                <TabPane tab="coba" key="4">
                    <CetTrheeel />
                </TabPane>
            </Tabs>
        </div>
    )
}
export default DashBoardRuang
