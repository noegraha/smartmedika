import { CloudDownloadOutlined, DeleteOutlined, EditOutlined, ExclamationCircleFilled, PlusOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Card, Col, Input, Modal, Row, Select, Space, Table } from 'antd';
import React, { useContext, useState } from 'react';
import { ProtokolKemoContext } from '../context/ProtokolKemoContext';
import FormCreateProtokol from './FormCreateProtokol';
import ReactHtmlParser from 'react-html-parser';
import '../style/style.css';

const { confirm } = Modal;
const { Option } = Select;

const DaftarProtokolKemo = () => {
    const {
        listMaster,
        listDokter,
        rstMdCreate,
        tempFormat, settempFormat,
        templistMaster, settemplistMaster,
        setidPrtkl,
        setValue,
        setcodeDokterId,
        setnamaProtokol,
        setprosedur,
        ipKomp,
        hostKomp,
        getListMasterProtokol,
        getListByDr,
        getListDokter,
        deleteProtokol,
        mdCreateProtokol, setmdCreateProtokol,
        spListMaster,
    } = useContext(ProtokolKemoContext);

    const [idDokter, setidDokter] = useState();
    const [tempRtf, settempRtf] = useState(0);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'Id',
            key: 'Id',
            align: 'center',
            width: 50,
        },
        {
            title: <div style={{ textAlign: 'center' }}>NAMA PROTOKOL</div>,
            dataIndex: 'NamaProtokol',
            key: 'NamaProtokol',
            width: 200,
            // align: 'center',
        },
        {
            title: <div style={{ textAlign: 'center' }}>NAMA DOKTER</div>,
            dataIndex: 'NamaDokter',
            key: 'NamaDokter',
            width: 200,
            // align: 'center',
        },
        {
            title: <div style={{ textAlign: 'center' }}>OBAT</div>,
            dataIndex: 'Obat',
            key: 'Obat',
            render: (text) => <div>{ReactHtmlParser(text)}</div>,
            width: 300,
            // align: 'center',
        },
        {
            title: <div style={{ textAlign: 'center' }}>PROSEDUR PELAKSANAAN</div>,
            dataIndex: 'ProsedurPelaksanaan',
            key: 'ProsedurPelaksanaan',
            render: (text) => <div>{ReactHtmlParser(text)}</div>,
            // align: 'center',
        },
        {
            title: "AKSI",
            key: "operation",
            // fixed: "right",
            align: "center",
            width: 90,
            render: (text, record, index) => (
                <Space size="small">
                    <Button
                        onClick={() => klikEdit(record)}
                        type="primary"
                        icon={<EditOutlined />}
                        size="small"
                        style={{ width: '30px' }}
                    />
                    <Button
                        type="primary"
                        danger
                        onClick={() => klikDelete(record)}
                        icon={<DeleteOutlined />}
                        size="small"
                        style={{ width: '30px' }}
                    />
                </Space>
            ),
        },
    ];

    const dataTemp = [];
    for (let i = 0; i < 50; i++) {
        dataTemp.push({
            Id: i + 1,
            NamaProtokol: `Protokol ${i + 1}`,
            NamaDokter: `Dokter ${i + 1}`,
        });
    };

    const klikEdit = (data) => {
        if (tempRtf === 0) {
            setmdCreateProtokol(true);
            Modal.info({
                title: "Info",
                content: "Klik OK untuk mengatur RTF Format.",
                onOk: () => {
                    settempRtf(1);
                    setmdCreateProtokol(false);
                },
            });
        }
        else {
            setmdCreateProtokol(true);
            setidPrtkl(data.Id);
            setcodeDokterId(data.DokterId.trim());
            setnamaProtokol(data.NamaProtokol);
            setValue(data.Obat);
            setprosedur(data.ProsedurPelaksanaan);
        }
    };

    const klikDelete = (data) => {
        confirm({
            title: 'Yakin akan Hapus Protokol Kemoterapi?',
            icon: <ExclamationCircleFilled />,
            content: `Nama Protokol : ${data.NamaProtokol}`,
            okText: 'Hapus',
            okType: 'danger',
            cancelText: 'Batal',
            onOk() {
                let kirim = {}
                kirim.id = data.Id;
                kirim.clientHost = ipKomp;
                kirim.clientIP = hostKomp;

                deleteProtokol(kirim);
            },
        });
    };

    const searchbyNama = (sSearch) => {
        const filteredData = listMaster.filter((item) => item.NamaProtokol.toLowerCase().includes(sSearch));
        settemplistMaster(filteredData);
        // console.log(filteredData);
        // Output: [{ id: 2, name: "Jane", age: 30 }]
    };

    return (
        <div>
            <Card bodyStyle={{ padding: '10px' }}>
                <Row style={{ marginBottom: '5px' }}>
                    <Col span={2}>
                        <span>Pilih Dokter :</span>
                    </Col>
                    <Col span={10}>
                        <Space.Compact
                            style={{
                                width: '100%',
                            }}
                        >
                            <Select
                                style={{ width: "90%" }}
                                placeholder="..."
                                value={idDokter}
                                onChange={(e) => setidDokter(e)}
                                // size='small'
                                onSelect={(e) => {
                                    getListByDr(e)
                                }}
                                showSearch={true}
                                filterOption={(input, option) =>
                                    option.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {listDokter.map((opt, index) => (
                                    <Option key={index} value={opt.dokterId}>
                                        {opt.namaDokter}
                                    </Option>
                                ))}
                            </Select>
                            <Button
                                type="primary"
                                onClick={() => getListDokter()}
                                // disabled={!drProt}
                                style={{ width: "10%" }}
                                icon={<CloudDownloadOutlined />}
                            />
                        </Space.Compact>
                    </Col>

                    <Col span={12}>
                        <Space.Compact
                            style={{
                                width: '100%',
                            }}
                        >
                            <Input
                                onChange={(e) => searchbyNama(e.target.value)}
                                placeholder="Search by Nama Protokol..."
                                style={{ marginLeft: '10px', marginRight: '10px' }}
                                disabled={listMaster.length === 0 ? true : false}
                            />
                            <Button
                                type='primary'
                                disabled={!idDokter}
                                icon={<PlusOutlined />}
                                onClick={() => {
                                    if (tempRtf === 0) {
                                        setmdCreateProtokol(true);
                                        Modal.info({
                                            title: "Info",
                                            content: "Klik OK untuk mengatur RTF Format.",
                                            onOk: () => {
                                                settempRtf(1);
                                                setmdCreateProtokol(false);
                                            },
                                        });
                                    }
                                    else {
                                        rstMdCreate();
                                        setcodeDokterId(idDokter);
                                        setmdCreateProtokol(true);
                                    }
                                }}
                            // style={{ width: '150px', float: 'right' }}
                            >
                                Tambah Master
                            </Button>

                        </Space.Compact>
                    </Col>
                </Row>

                <Table
                    className="custom-table"
                    columns={columns}
                    dataSource={templistMaster}
                    loading={spListMaster}
                    // size='small'
                    // scroll={{
                    //     y: 310,
                    // }}
                    bordered
                // pagination={false}
                // style={{ marginTop: '2px' }}
                />
            </Card>

            <Modal
                // title="Modal 1000px width"
                centered
                open={mdCreateProtokol}
                onOk={() => setmdCreateProtokol(false)}
                // onCancel={() => setmdCreateProtokol(false)}
                width={1000}
                closable={false}
                footer={null}
            >
                <FormCreateProtokol />
            </Modal>
        </div>
    )
}

export default DaftarProtokolKemo