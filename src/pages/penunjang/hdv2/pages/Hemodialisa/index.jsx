/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, } from 'react';
import HdContext from '../../HdContext';
import "./style.css";
import {
    Row,
    Col,
    Tabs,
    Spin,
    Progress,
    message
} from 'antd';
import PendHd from '../../component/Hemodialisa/PendHd';
import IdentPasien from '../../component/Hemodialisa/IdentPasien';
import DaftarPasien from '../../component/Hemodialisa/DaftarPasien';
import Keluhan from '../../component/Hemodialisa/AssesmentHd/Keluhan';
import InstruksiMedik from '../../component/Hemodialisa/IntMedik/InstruksiMedik';
import MonitoringDialisis from '../../component/Hemodialisa/MonDialisis/MonitoringDialisis';
import Report from '../../component/Hemodialisa/ReportHd/Report';
import InformConcent from '../../component/Hemodialisa/ReportHd/InformConcent';
import Signature from '../../component/Hemodialisa/SignatureHD/Signature';

const { TabPane } = Tabs;
const {
    PasiensContext,
} = HdContext;

function Dashboard() {
    const props = useContext(PasiensContext)

    return (
        <div>
            <Row>
                <Col span={12}>
                    <DaftarPasien />
                </Col>
                <Col span={12}>
                    <Spin
                        tip={"Mohon Tunggu"}
                        spinning={props.loadingContent}
                    >
                        <IdentPasien />
                        <PendHd />
                    </Spin>
                </Col>
            </Row>

            <Spin
                tip={"Mohon Tunggu"}
                spinning={props.loadingContent}
            >
                <Tabs
                    activeKey={props.tabAktif}
                    type="card"
                    size="small"
                    onChange={(e) => {
                        props.setTabAktif(e)
                        if (e === "3") {
                            !props.tekananDarahSistolika && !props.durasi ? message.warning("Durasi HD masih kosong") :
                                !props.tekananDarahSistolika && props.durasi ? props.waktuTTVPostHd() :
                                    console.log("ok!")
                        }
                    }}
                    style={{ marginTop: "5px" }}>
                    <TabPane
                        tab="Asuhan Keperawatan Hemodialisis"
                        key="1">
                        <Keluhan />
                    </TabPane>
                    <TabPane
                        tab="Preskripsi Hemodialisis"
                        key="2">
                        <InstruksiMedik />
                    </TabPane>
                    <TabPane
                        tab="Monitoring Hemodialisis"
                        key="3">
                        <MonitoringDialisis />
                    </TabPane>
                </Tabs>
            </Spin>
        </div>
    )
}

export default Dashboard
