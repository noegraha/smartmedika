import { Button, Col, Empty, Input, Modal, Row, Space, Switch, Table, Tag, Tooltip, Typography } from 'antd';
import React, { useContext, useState } from 'react';
import { PasienContext } from '../../../../rawatjalan/context/PasienContext';
import { UndoOutlined } from '@ant-design/icons';
import { PasienRIContext } from '../../../../rawatinap/context/PasienRIContext';
import { BankDarahContext } from '../../context/BankDarahContext';

const { Search } = Input;
const { Text } = Typography;

const TabelPasienOrderDarah = () => {
    const {
        setLebar,
    } = useContext(PasienContext);

    const {
        pasienRI,
        // spin
        loadPasien,
    } = useContext(PasienRIContext)

    const {
        ruangId,
        listPasien,
        settabOrder,
        spTbPasien,
        // func
        getPasien,
        getDetailPasien,
    } = useContext(BankDarahContext)

    const [lebarnama, setLebarNama] = useState("120px");
    const [mdketwarna, setmdketwarna] = useState(false);

    const columns = [
        {
            title: "No",
            width: "30px",
            render: (text, record, index) => (
                <Text style={{ fontSize: 12 }}>{index + 1}</Text>
            ),
        },
        {
            title: "Registrasi",
            width: "80px",
            dataIndex: "registrasiId",
            sorter: (a, b) => a.registrasiId.localeCompare(b.registrasiId),
            // render(text, record) {
            //     return {
            //         props: {
            //             style: {
            //                 background:
            //                     record.statusKonsul === true
            //                         ? record.statusJawab === false
            //                             ? "lime"
            //                             : "yellow"
            //                         : "",
            //                 cursor: "default",
            //             },
            //         },
            //         children:
            //             record.statusKonsul === true ? (
            //                 record.statusJawab === false ? (
            //                     <Tooltip title="Konsultasi Belum Dijawab">{text}</Tooltip>
            //                 ) : (
            //                     <Tooltip title="Konsultasi Sudah Dijawab">{text}</Tooltip>
            //                 )
            //             ) : (
            //                 <Tooltip>{text}</Tooltip>
            //             ),
            //     };
            // },
        },
        {
            title: "Nama",
            width: lebarnama,
            dataIndex: "namaPasien",
            sorter: (a, b) => a.namaPasien.localeCompare(b.namaPasien),
            render(text, record) {
                return {
                    props: {
                        style: {
                            cursor: "default",
                        },
                    },
                    children: (
                        <Text strong style={{ fontSize: 12, color: "black" }}>
                            {text}
                        </Text>
                    ),
                };
            },
        },
        {
            title: "DPJP",
            width: "250px",
            dataIndex: "namaDPJP",
            sorter: (a, b) => a.namaDPJP.localeCompare(b.namaDPJP),
            render(text, record) {
                return {
                    props: {
                        style: {
                            cursor: "default",
                        },
                    },
                    children: <Text style={{ fontSize: 12 }}>{text}</Text>,
                };
            },
        },
        {
            title: "No Pasien",
            width: "80px",
            dataIndex: "pasienId",
            render(text, record) {
                return {
                    props: {
                        style: {
                            cursor: "default",
                        },
                    },
                    children: <Text style={{ fontSize: 12 }}>{text}</Text>,
                };
            },
        },
        {
            title: "Penjamin",
            width: "200px",
            dataIndex: "namaPembayaran",
            sorter: (a, b) => a.namaPembayaran.localeCompare(b.namaPembayaran),
            render(text, record) {
                return {
                    props: {
                        style: {
                            cursor: "default",
                        },
                    },
                    children: <Text style={{ fontSize: 12 }}>{text}</Text>,
                };
            },
        },
    ];

    const onLebar = (e) => {
        e === true ? setLebar(450) : setLebar(250);
        e === true ? setLebarNama("180px") : setLebarNama("120px");
    };

    const klikRefresh = (e) => {
        getPasien(e)
    }

    const klikKetWarna = () => {
        setmdketwarna(true)
    }

    return (
        <div>
            <Search
                type="number"
                // value={sSearch}
                placeholder="Cari No Registrasi"
                // onChange={(e) => setsSearch(e.target.value)}
                // onSearch={() => onSearch()}
                disabled
                style={{ marginBottom: "3px" }}
            />

            <Table
                onRow={(record) => {
                    return {
                        onClick: () => {
                            console.log('data : ', record);
                            // setnoReg(record.NOREG);
                            getDetailPasien(record.registrasiId);
                            settabOrder('1');
                        },
                    };
                }}
                // rowClassName={(record, index) =>
                //     record.IDLAPORAN === null && record.IMPLEMENTASI === 0 ? "-" :
                //         record.IDLAPORAN !== null && record.IMPLEMENTASI === 0 ? "id_not_null" :
                //             "imp_not_null"
                // }
                style={{ maxHeight: 570 }}
                columns={columns}
                dataSource={listPasien}
                loading={spTbPasien}
                size="small"
                scroll={{ x: 300, y: "59vh" }}
                pagination={false}
                locale={{
                    emptyText: (
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            description={"Silahkan Pilih Ruangan Terlebih Dahulu"}
                        />
                    ),
                }}
                footer={() => (
                    <div>
                        <Space style={{ marginBottom: '5px' }}>
                            Atur Lebar :
                            <Switch
                                onChange={onLebar}
                                checkedChildren="Max"
                                unCheckedChildren="Min"
                            />
                            <Button
                                size="small"
                                type="primary"
                                disabled={!ruangId}
                                onClick={() => klikRefresh(ruangId)}
                                style={{ backgroundColor: "forestgreen", borderColor: "green" }}
                            >
                                <UndoOutlined />
                                Refresh Pasien
                            </Button>
                        </Space>
                        <br />
                        {/* <span>
                            <Button
                                size="small"
                                // onClick={() => klikKetWarna()}
                                style={{ width: '100%', backgroundColor: '#f759ab' }}
                            >
                                <b>KETERANGAN WARNA</b>
                            </Button>
                        </span> */}
                    </div>
                )}
            />

            <Modal
                title={<u>Keterangan Warna pada List Pasien Kemoterapi :</u>}
                open={mdketwarna}
                onCancel={() => setmdketwarna(false)}
                footer={null}
                width={790}
            >
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4} style={{ backgroundColor: "#ffffff", border: "1px solid #595959" }}>
                    </Col>
                    <Col span={20}>
                        <span style={{ marginLeft: '5px' }}>
                            <b>: Belum Entry </b>
                        </span>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4} style={{ backgroundColor: "#ffec3d", border: "1px solid #595959" }}>
                    </Col>
                    <Col span={20}>
                        <span style={{ marginLeft: '5px' }}>
                            <b>: Implementasi masih kosong</b>
                        </span>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4} style={{ backgroundColor: "#73d13d", border: "1px solid #595959" }}>
                    </Col>
                    <Col span={20}>
                        <span style={{ marginLeft: '5px' }}>
                            <b>: Entry Selesai</b>
                        </span>
                    </Col>
                </Row>
            </Modal>
        </div>
    )
}

export default TabelPasienOrderDarah