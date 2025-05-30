import { Col, Divider, Row, Spin, Tabs } from 'antd'
import React, { useContext, useState } from 'react'
import { SatuSehatEncounterContext } from '../../../../context/SatuSehatEncounterContext';
import Prosedure from './Laboratorium/Prosedure';
import ServiceReq from './Laboratorium/ServiceReq';
import Specimen from './Laboratorium/Specimen';
import Observation from './Laboratorium/Observation';
import DiagReport from './Laboratorium/DiagReport';

const PmrLaborat = () => {
    const {
        ihsPasien,
        identitasPx,
        paramEncounter,
        setmsRscdetail,
        waktuPelayanan,
        postResource,
        getResourceById,
        getRiwRscId,
        spCvg,
    } = useContext(SatuSehatEncounterContext);

    const [tabLaborat, settabLaborat] = useState('2');

    const itemPenunjang = [
        // {
        //     label: 'Prosedur',
        //     key: '1',
        //     children: <Prosedure />,
        // },
        {
            label: 'Service Request',
            key: '2',
            children: <ServiceReq />,
        },
        // {
        //     label: 'Specimen',
        //     key: '3',
        //     children: <Specimen />,
        // },
        {
            label: 'Observation',
            key: '4',
            children: <Observation />,
        },
        {
            label: 'Diagnostic Report',
            key: '5',
            children: <DiagReport />,
        },
    ];

    const onChange = (key) => {
        settabLaborat(key);
    };

    return (
        <div>
            <Row>
                <Col span={24}>
                    <Divider
                        variant="dotted"
                        orientation="left"
                        style={{
                            borderColor: '#7cb305',
                        }}
                    >
                        Pemeriksaan Penunjang Laboratorium
                    </Divider>
                </Col>
            </Row>

            <Tabs
                onChange={onChange}
                type="card"
                items={itemPenunjang}
                activeKey={tabLaborat}
            />
        </div>
    )
}

export default PmrLaborat