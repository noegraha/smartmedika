import React, { useContext } from 'react';
import {
    Card,
    Form,
    Input,
    Select,
    Row,
    Col,
    InputNumber,
    Button,
    Tabs, Collapse
} from 'antd';
import HdContext from '../../../HdContext';
import AssesmentAskepHD from './AssesmentAskepHD';
import FormListDiagnosaAskep from '../AskepHd/FormListDiagnosaAskep';
import FormImplementasiAskep from '../AskepHd/FormImplementasiAskep';
import FormEvaluasiAskep from '../AskepHd/FormEvaluasiAskep';
import FormPengkajianAskep from '../AskepHd/FormPengkajianAskep';
import { AskepContext } from '../../../../../rawatinap/context/AskepContext';
import Signature from '../SignatureHD/Signature';
import { TTVRIContext } from '../../../../../rawatinap/context/TandaVitalAskepRIContext';
import { EwsRIContext } from '../../../../../rawatinap/context/EwsContext';
import { AssesmentRIContext } from '../../../../../rawatinap/context/AssesmentRIContext';

const {
    PasiensContext,
} = HdContext;

const { Option } = Select;
const { TabPane } = Tabs;
const { Panel } = Collapse;

function Keluhan() {
    const props = useContext(PasiensContext)
    const { getListAskepById,
        getHistoryKesimpulan,
        getCatatanPasien,
        getGravikTTV,
        cekAssementTombol,
        setListImplementasiByIdDiagnosa,
        setHistoryKesimpulanByIdBydx, kosongkanformaskep,
        spinGetAskep
    } = useContext(AskepContext);
    const { getTTVAllBynoreg } = useContext(TTVRIContext)
    const {
        getGrafikEWS,
        getEwsAll
    } = useContext(EwsRIContext)
    const { spingetTTVAssByRuang } = useContext(AssesmentRIContext)

    return (
        <div>
            <Card loading={spingetTTVAssByRuang}>
                <Tabs
                    activeKey={props.tabAktifa}
                    onChange={(key) => {
                        props.setTabAktifa(key)
                        if (key === '1') {
                            console.log('1');
                        } else {
                            getListAskepById(props.pasien.result.registrasiId)
                            getCatatanPasien(props.pasien.result.registrasiId)
                            cekAssementTombol(props.pasien.result.registrasiId, 3)
                            getGravikTTV(props.pasien.result.registrasiId)
                            getTTVAllBynoreg(props.pasien.result.registrasiId)
                            getGrafikEWS(props.pasien.result.registrasiId)
                            getEwsAll(props.pasien.result.registrasiId)
                            setListImplementasiByIdDiagnosa([])
                            setHistoryKesimpulanByIdBydx([])
                            kosongkanformaskep()
                        }
                    }}>
                    <TabPane tab="Assesment Awal" key="1">
                        <AssesmentAskepHD />
                    </TabPane>
                    <TabPane tab="Asuhan Keperawatan" key="2" >
                        <Row>
                            <Col span={24}>
                                <Card loading={spinGetAskep}>
                                    <FormListDiagnosaAskep />
                                    <Collapse defaultActiveKey={['1', '2', '3']} style={{ padding: '1px ,1px' }} >
                                        <Panel header="Pengkajian Dan Intervensi" key="1" >
                                            <FormPengkajianAskep />
                                        </Panel>
                                        <Panel header="Implementasi" key="2">
                                            <FormImplementasiAskep />
                                        </Panel>
                                        <Panel header="Evaluasi" key="3">
                                            <FormEvaluasiAskep />
                                        </Panel>
                                    </Collapse>
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    )
}

export default Keluhan
