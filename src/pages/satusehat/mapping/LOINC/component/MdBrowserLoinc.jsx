import { CheckOutlined } from '@ant-design/icons';
import { Button, Col, Input, Modal, Row, Select, Space, Table, Tooltip } from 'antd'
import React, { useContext, useState } from 'react'
import { MapLoincContext } from '../context/MapLoincContext';

const { Option } = Select;

const MdBrowserLoinc = () => {
    const {
        setdetailLoinc,
        mdBrowserLc, setmdBrowserLc,
        setmdDtLoinc,
        lookupBrowserLoinc,
    } = useContext(MapLoincContext);

    const [ktg, setktg] = useState(null);
    const [listLoinc, setlistLoinc] = useState([]);
    const [tempList, settempList] = useState([]);
    const [spLookupLoinc, setspLookupLoinc] = useState(false);

    const optKtg = [
        {
            code: "Bank darah",
            display: "Bank darah"
        },
        {
            code: "Hematologi",
            display: "Hematologi"
        },
        {
            code: "Imunoserologi",
            display: "Imunoserologi"
        },
        {
            code: "Kimia klinik",
            display: "Kimia klinik"
        },
        {
            code: "Mikrobiologi",
            display: "Mikrobiologi"
        },
        {
            code: "Molekuler",
            display: "Molekuler"
        },
        {
            code: "Patologi",
            display: "Patologi"
        },
        {
            code: "Sitologi",
            display: "Sitologi"
        },
        {
            code: "Semua",
            display: "Semua"
        },
    ];

    const colLoinc = [
        {
            title: "Code",
            dataIndex: "Code",
            key: "Code",
            width: 70,
        },
        {
            title: "Kategori",
            dataIndex: "Kategori_Kelompok_Pemeriksaan",
            key: "Kategori_Kelompok_Pemeriksaan",
            // width: 150,
        },
        {
            title: "Nama Pemeriksaan",
            dataIndex: "Nama_Pemeriksaan",
            key: "Nama_Pemeriksaan",
        },
        {
            title: "Permintaan Hasil",
            dataIndex: "Permintaan_Hasil",
            key: "Permintaan_Hasil",
        },
        {
            title: "Spesimen",
            dataIndex: "Spesimen",
            key: "Spesimen",
        },
        {
            title: "Display",
            dataIndex: "Display",
            key: "Display",
        },
        {
            title: "Aksi",
            dataIndex: "aksi",
            key: "aksi",
            align: "center",
            width: 70,
            render: (text, record, index) => (
                <div>
                    <Button
                        type="primary"
                        onClick={() => {
                            setmdDtLoinc(true);
                            setdetailLoinc(record);
                        }}
                        // disabled={!sstoken || record.StsKirim === 'true'}
                        icon={<CheckOutlined />}
                        size="small"
                        style={{ backgroundColor: "#73d13d", borderColor: "#73d13d" }}
                    />
                </div>
            ),
        },
    ];

    const lookupLoinc = async (sKtg) => {
        setspLookupLoinc(true);
        try {
            let result = await lookupBrowserLoinc(sKtg);
            console.log("lookupLoinc : ", result);
            setlistLoinc(result.result);
            settempList(result.result);
        } catch (error) {
            setlistLoinc([]);
            settempList([]);
            Modal.error({
                title: "ERROR!",
                content: `ERROR! GET data! -> ${error}`,
            });
        } finally {
            setspLookupLoinc(false);
        }
    };

    const onSearch = (sSearch) => {
        if (!sSearch) {
            settempList(listLoinc);
            return;
        }
        const filtered = listLoinc.filter(item =>
            item.Nama_Pemeriksaan &&
            item.Nama_Pemeriksaan.toLowerCase().includes(sSearch.toLowerCase())
        );
        settempList(filtered);
    };

    return (
        <div>
            <Modal
                visible={mdBrowserLc}
                onCancel={() => setmdBrowserLc(false)}
                title="LOINC BROWSER"
                width="90%"
                footer={null}
                closable={false}
                // style={{ top: 50 }}
                centered
                zIndex={10}
            >
                <Row style={{ marginBottom: "5px" }}>
                    <Col span={2}>
                        <span>Kategori :</span>
                    </Col>
                    <Col span={9}>
                        <Select
                            // mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Pilih Kategori"
                            onChange={(e) => {
                                setktg(e);
                                lookupLoinc(e);
                            }}
                        >
                            {optKtg.map((opt, index) => (
                                <Option key={index} value={opt.code}>{opt.display}</Option>
                            ))}
                        </Select>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "5px" }}>
                    <Col span={2}>
                        <span>Cari :</span>
                    </Col>
                    <Col span={9}>
                        <Input
                            // value={sSearch}
                            placeholder="Masukkan Nama Pencarian"
                            onChange={(e) => onSearch(e.target.value)}
                            disabled={!ktg}
                        />
                        {/* <Space.Compact style={{ width: '100%' }}>
                            <Button
                                type="primary"
                            // onClick={() => klikCari(sSearch)}
                            >
                                Cari
                            </Button>
                        </Space.Compact> */}
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <Table
                            bordered
                            loading={spLookupLoinc}
                            columns={colLoinc}
                            dataSource={tempList}
                        // size="small"
                        />
                    </Col>
                </Row>
            </Modal>
        </div>
    )
}

export default MdBrowserLoinc