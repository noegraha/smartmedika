/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Modal, Row, Space, Table, Tooltip, Typography } from 'antd';
import React, { useContext, useEffect } from 'react';
import HdContext from '../../HdContext';
import dayjs from 'dayjs';
import { SatuSehatModulContext } from '../../../../satusehat/componentsatusehatmodul/context/SatuSehatModulContext';
import { CheckCircleTwoTone, InfoCircleOutlined } from '@ant-design/icons';

const { PasiensContext } = HdContext;
const { Title } = Typography;

const DashboardSatSetHD = () => {
    const props = useContext(PasiensContext);
    const {
        getDetailEnv,
        getResourceById
    } = useContext(SatuSehatModulContext);

    useEffect(() => {
        getListSatuSehat();
        getDetailEnv(sessionStorage.getItem("environment"));
    }, [props.tglList]);

    const columns = [
        {
            title: "Registrasi Id",
            dataIndex: "registrasiId",
            key: "registrasiId",
            align: "center",
            width: 150,
        },
        {
            title: <div style={{ textAlign: 'center' }}>Nama Pasien</div>,
            dataIndex: "namaPasien",
            key: "namaPasien",
        },
        {
            title: <div style={{ textAlign: 'center' }}>No. RM</div>,
            dataIndex: "pasienId",
            key: "pasienId",
            align: "center",
            width: 100,
        },
        {
            title: <div style={{ textAlign: 'center' }}>Asal Ruang</div>,
            dataIndex: "namaBagian",
            key: "namaBagian",
        },
        {
            title: <div>
                <Space>
                    Rsc.
                    <Tooltip title="Jumlah Resource yang terkirim">
                        <InfoCircleOutlined />
                    </Tooltip>
                </Space>
            </div>,
            dataIndex: "resourceGroupCount",
            key: "resourceGroupCount",
            align: "center",
            width: 75,
        },
        {
            title: <div>
                <Space>
                    Enc.
                    <Tooltip title="Status Encounter = 3 maka Centang, belum centang dibawah 3">
                        <InfoCircleOutlined />
                    </Tooltip>
                </Space>
            </div>,
            dataIndex: "jmlEnc",
            key: "jmlEnc",
            align: "center",
            width: 50,
            render: (jmlEnc) => (
                jmlEnc === 3 ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : jmlEnc
            ),
        },
        {
            title: <div>
                <Space>
                    Aksi
                    <Tooltip title="Klik Cek Encouter secara manual untuk mengetahui info Status Encounter.">
                        <InfoCircleOutlined />
                    </Tooltip>
                </Space>
            </div>,
            dataIndex: "resourceID",
            key: "resourceID",
            align: "center",
            width: 150,
            render: (resourceID) => (
                resourceID ? (
                    <Button
                        type='primary'
                        size='small'
                        onClick={() => klikCekEnc(resourceID)}
                        style={{ width: 100 }}
                    >
                        Cek Encounter
                    </Button>
                ) : null
            ),
        },
    ];

    const klikCekEnc = async (resourceID) => {
        props.setspDashSSHD(true);
        try {
            const result = await getResourceById(resourceID, "Encounter");
            console.log("klikCekEnc : ", result);

            const updatedList = props.listTbDashSSHD.map((record) => {
                if (record.resourceID === resourceID) {
                    return {
                        ...record,
                        jmlEnc: result.statusHistory.length,
                    };
                }
                return record;
            });

            props.setlistTbDashSSHD(updatedList);
        } catch (error) {
            props.setspDashSSHD(false);
            Modal.error({
                title: "ERROR!",
                content: `ERROR! GET data! -> ${error}`,
            })
        } finally {
            props.setspDashSSHD(false);
        }
    };

    const getListSatuSehat = async () => {
        try {
            let env = sessionStorage.getItem("environment");
            let tgl = dayjs(props.tglList).format("YYYY-MM-DD");
            let data = await props.getListSatSatHD(tgl, "91A7", props.ruangId, env);

            console.log('getListSatuSehat : ', data);

            props.setlistTbDashSSHD(data);
        } catch (error) {
            Modal.error({
                title: "Error",
                content: "Gagal mengambil data!",
            });
        }
    };

    return (
        <div>
            <Title level={5}>Tabel Monitoring SatuSehat HD</Title>

            <Row>
                <Col span={24}>
                    <Table
                        bordered
                        loading={props.spDashSSHD}
                        columns={columns}
                        dataSource={props.listTbDashSSHD}
                        pagination={false}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default DashboardSatSetHD