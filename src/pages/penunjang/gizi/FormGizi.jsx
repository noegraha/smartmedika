import React from 'react'
import { Tabs } from 'antd'
import PageheadRI from '../../rawatinap/PageheadRI';
import FormScreeningGizi from './FormScreeningGizi';
import FormAsuhanGizi from './FormAsuhanGizi';
import FormEvaluasiGizi from './FormEvaluasiGizi';
const { TabPane } = Tabs;
const GiziApp = () => {
    const callback = (key) => {
        // console.log(key);
    }
    return (
        <div>
            <PageheadRI />
            <Tabs type='card' defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Screening" key="1">
                    <FormScreeningGizi />
                </TabPane>
                <TabPane tab="Asuhan" key="2">
                    <FormAsuhanGizi />
                </TabPane>
                <TabPane tab="Evaluasi" key="3">
                    <FormEvaluasiGizi />
                </TabPane>
            </Tabs>
            {/* <Content style={{ padding: '10px 10px' }}>
                    <div className="site-layout-content">

                    </div>
                    <div className="site-layout-content">
                        <Collapse>
                            <Panel header="Screening Gizi" key="1">

                            </Panel>
                            <Panel header="Asuhan Gizi" key="2">

                            </Panel>
                            <Panel header="Evaluasi Gizi" key="3">

                            </Panel>
                        </Collapse>
                    </div>
                </Content> */}
        </div>
    );
}

export default GiziApp;

