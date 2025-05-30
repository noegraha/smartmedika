/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Modal, Row, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { SatuSehatModulContext } from '../context/SatuSehatModulContext';

const FrmServiceReq = () => {
    const {
        ihsRS,
        ihsPasien,
        identitasPx,
        riwPenyakit, setriwPenyakit,
        paramEncounter,
        listRiwayatDx,
        setmdLookupSnomed,
        setflagMdSnomed,
        spCvg,
        getRiwRscId,
        getOrderPenunjang,
        postResource,
        colTbResource,
    } = useContext(SatuSehatModulContext);

    const [listTable, setlistTable] = useState([]);

    useEffect(() => {
        klikRefresh('66');
        console.log('useEffect FrmServiceReq');
    }, []);

    const klikRefresh = async (codeGrup) => {
        try {
            let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
            console.log('klikRefresh : ', data);

            setlistTable(data);

            let data1 = await getOrderPenunjang(identitasPx.RegistrasiId);
            console.log('klikRefresh1 : ', data1);
        } catch (error) {
            Modal.error({
                title: "Error",
                content: "Gagal mengambil data!",
            });
        }
    };

    return (
        <div>
            <Row style={{ marginBottom: '5px' }}>
                <Col span={12}>
                </Col>
                <Col span={12}>
                    <Button
                        onClick={() => {
                            klikRefresh('66');
                            // getMedicationBundle(identitasPx.RegistrasiId);
                        }}
                        style={{ float: 'right' }}
                    >
                        Refresh
                    </Button>
                </Col>
            </Row>

            <Row>
                <Table
                    bordered
                    loading={spCvg}
                    columns={colTbResource}
                    dataSource={listTable}
                    pagination={false}
                    size='small'
                />
            </Row>
        </div>
    )
}

export default FrmServiceReq