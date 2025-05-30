import { Card, Divider, Tabs } from 'antd'
import React from 'react'
import FormFrozen from './FormFrozen';
import FormIhc from './FormIhc';
import FormJaringan from './FormJaringan';
import FormSitologi from './FormSitologi';

const { TabPane } = Tabs;

const MenuTabBarLabPa = () => {
    return (
        <div>
            <Card
                bodyStyle={{ padding: '5px' }}>
                <Divider
                    orientation="left"
                    plain
                    style={{ backgroundColor: '#bae0ff', margin: '0px' }}>
                    Input Hasil Pemeriksaan PA
                </Divider>

                < hr />

                <Tabs
                    defaultActiveKey="1"
                    size='small'
                    type='card'>
                    <TabPane tab="FROZEN" key="1">
                        <FormFrozen />
                    </TabPane>
                    <TabPane tab="IHC" key="2">
                        <FormIhc />
                    </TabPane>
                    <TabPane tab="JARINGAN" key="3">
                        <FormJaringan />
                    </TabPane>
                    <TabPane tab="SITOLOGI" key="4">
                        <FormSitologi />
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    )
}

export default MenuTabBarLabPa