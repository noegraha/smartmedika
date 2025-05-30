/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Modal, Row, Select, Space, Spin, Table, Tooltip, Typography } from 'antd';
import { MapLoincContext } from '../context/MapLoincContext';
import { EditOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Title } = Typography;

const MappingPmr = () => {
    const {
        setpemeriksaan,
        setdetailLoinc,
        mdBrowserLc, setmdBrowserLc,
        setmdDtLoinc,
        setflagDtLoinc,
        getRuang,
        getPemeriksaan,
        getDetailLoinc,
    } = useContext(MapLoincContext);

    const [ruangId, setruangId] = useState(null);
    const [optRuang, setoptRuang] = useState([]);
    const [listPmr, setlistPmr] = useState([]);
    const [count, setcount] = useState(0);
    const [spMapping, setspMapping] = useState(false);

    useEffect(() => {
        getListRuang();
    }, []);

    useEffect(() => {
        getListPmr(ruangId);
    }, [mdBrowserLc])


    const colTbResource = [
        {
            title: 'No',
            dataIndex: 'index',
            key: 'index',
            align: 'center',
            ellipsis: true,
            width: 50,
            render: (text, record, index) => index + 1,
        },
        {
            title: 'KODE PMR',
            dataIndex: 'KodePmr',
            align: 'center',
            key: 'KodePmr',
            width: 150,
        },
        {
            title: <div style={{ textAlign: 'center' }}>DESKRIPSI</div>,
            dataIndex: 'NamaPmr',
            key: 'NamaPmr',
        },
        {
            title: 'KODE LOINC',
            dataIndex: 'LoincCode',
            key: 'LoincCode',
            align: 'center',
            width: 150,
            render: (text) =>
                text ? (
                    <Space>
                        <span>
                            {text}
                        </span>
                        <Tooltip title="Klik disini untuk melihat Detail Loinc">
                            <InfoCircleOutlined
                                onClick={() => {
                                    getDtLoinc(text);
                                }} />
                        </Tooltip>
                    </Space>
                ) : null,
        },
        {
            title: 'AKSI',
            dataIndex: 'aksi',
            key: 'aksi',
            align: 'center',
            width: 70,
            render: (text, record, index) =>
                <div>
                    <Button
                        type='primary'
                        onClick={() => {
                            setmdBrowserLc(true);
                            setpemeriksaan(record);
                        }}
                        icon={<EditOutlined />}
                        size='small'
                        style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}
                    />
                </div>
        },
    ];

    const getListRuang = async () => {
        setspMapping(true);
        try {
            if (typeof getRuang !== 'function') {
                throw new Error('getRuang is not a function or not defined');
            }
            let result = await getRuang();
            console.log("test : ", result);
            setoptRuang(result);
        } catch (error) {
            Modal.error({
                title: "ERROR!",
                content: `ERROR! GET data! -> ${error}`,
            });
        } finally {
            setspMapping(false);
        }
    };

    const getListPmr = async (ruang) => {
        setspMapping(true);
        try {
            let result = await getPemeriksaan(ruang);
            // console.log("getListPmr : ", result);
            setlistPmr(result.result.data);
            setcount(result.result.count);
        } catch (error) {
            Modal.error({
                title: "ERROR!",
                content: `ERROR! GET data! -> ${error}`,
            });
        } finally {
            setspMapping(false);
        }
    };

    const getDtLoinc = async (sCode) => {
        setspMapping(true);
        try {
            let result = await getDetailLoinc(sCode);
            // console.log("getListPmr : ", result);
            setdetailLoinc(result.result);
        } catch (error) {
            Modal.error({
                title: "ERROR!",
                content: `ERROR! GET data! -> ${error}`,
            });
        } finally {
            setspMapping(false);
            setmdDtLoinc(true);
            setflagDtLoinc(true);
        }
    }

    return (
        <div>
            <Card
                title="Mapping Pemeriksaan"
            // style={{ width: 300 }}
            >
                <Spin spinning={spMapping} tip="Loading... 😁">
                    <Row style={{ marginBottom: 5 }}>
                        <Col span={2}>
                            <span>Pilih Ruang :</span>
                        </Col>
                        <Col span={10}>
                            <Select
                                // mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="..."
                                onChange={(value) => {
                                    getListPmr(value);
                                    setruangId(value);
                                }}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                showSearch
                            >
                                {optRuang.map((opt, index) => (
                                    <Option key={index} value={opt.ruangId}>{opt.deskripsi}</Option>
                                ))}
                            </Select>
                        </Col>
                        <Col span={12}>
                            <Title level={5} style={{ float: 'right' }}>Belum Mapping : {count} dari {listPmr.length}</Title>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Table
                                bordered
                                // loading={spCvg}
                                columns={colTbResource}
                                dataSource={listPmr}
                            // pagination={false}
                            // size='small'
                            />
                        </Col>
                    </Row>
                </Spin>
            </Card>
        </div>
    )
}

export default MappingPmr