/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Modal, Row, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { SatuSehatModulContext } from '../context/SatuSehatModulContext';

const FrmObsTDDiastolik = () => {
    const {
        identitasPx,
        setsts08,
        spCvg,
        getRiwRscId,
        colTbResource,
    } = useContext(SatuSehatModulContext);

    const [listTable, setlistTable] = useState([]);

    useEffect(() => {
        klikRefresh('16');
        console.log('useEffect FrmObsTDDiastolik');
    }, []);

    const klikRefresh = async (codeGrup) => {
        try {
            let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
            console.log('klikRefresh : ', data);

            setlistTable(data);
            if (data && data.length > 0) {
                setsts08(true);
            };
        } catch (error) {
            Modal.error({
                title: "Error",
                content: "Gagal mengambil data!",
            });
        }
    };

    return (
        <div>
            <Row style={{ marginBottom: '5px', marginTop: '5px' }}>
                <Col span={12}>
                    <p>TD Diastolik SatuSehat</p>
                </Col>
                <Col span={12}>
                    <Button
                        onClick={() => {
                            klikRefresh('16');
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

export default FrmObsTDDiastolik