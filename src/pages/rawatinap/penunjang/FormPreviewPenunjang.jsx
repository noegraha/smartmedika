import React from 'react'
import { Tabs } from 'antd';
import Formhasilradiologi from './FormHasilRadiologi';
import Formhasillabklinik from './FormHasilLabKlinik';

const { TabPane } = Tabs;
const FormPreviewPenunjang = () => {
    const callback = (key) => {
        // console.log(key);
    }
    return (
        <div>
            <Tabs type='card' defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Laborat Klinik" key="1">
                    <Formhasillabklinik />
                </TabPane>
                <TabPane tab="Hasil Radiologi" key="2">
                    <Formhasilradiologi />
                </TabPane>
            </Tabs>
            {/* <Collapse>
                        <Panel header="Laborat Klinik" key="1">
                            <Formhasillabklinik/>
                        </Panel>
                        <Panel header="Hasil Radiologi" key="2">
                            <Formhasilradiologi/>
                        </Panel>
                    </Collapse> */}

        </div>
    )
}

export default FormPreviewPenunjang;
