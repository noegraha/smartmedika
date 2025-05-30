import { UndoOutlined } from '@ant-design/icons';
import { Button, Col, Empty, Input, Modal, Row, Space, Switch, Table, Tag, Tooltip, Typography } from 'antd';
import React, { useContext, useState } from 'react';
import { PasienContext } from '../../../../rawatjalan/context/PasienContext';
import { BankDarahContext } from '../../context/BankDarahContext';
import dayjs from 'dayjs';

const { Search } = Input;
const { Text } = Typography;

const TabelPasienPelayananBD = () => {
    const {
        setLebar,
    } = useContext(PasienContext);

    const {
        ruangIdValid,
        tglOrder,
        listOrder,
        daftarPasien, setdaftarPasien,
        setdrOrder,
        ktgOrder,
        // func
        getListOrderbyDate,
        getDetailPasienPelayanan,
        getDetailOrder,
        // sp
        spListOrder,
    } = useContext(BankDarahContext)

    const [lebarnama, setLebarNama] = useState("120px");
    const [mdketwarna, setmdketwarna] = useState(false);
    const [sSearch, setsSearch] = useState();

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
            dataIndex: "RegistrasiId",
            sorter: (a, b) => a.registrasiId.localeCompare(b.registrasiId),
            render: (text, record) => {
                // Mengecek apakah ada 'JenisDarah' yang bernilai 'TC' dalam 'DetailOrderDarah'
                const hasTC = record.DetailOrderDarah.some(detail => detail.JenisDarah === 'TC');

                // Menggunakan map untuk mengambil JenisDarah, kemudian join untuk menggabungkan menjadi string
                const jenisDarahString = record.DetailOrderDarah.map(item => item.JenisDarah).join(", ");

                const backgroundColor = hasTC ? '#ffd54f' : null;

                return {
                    props: {
                        style: {
                            backgroundColor: hasTC ? "#ffd54f" : "inherit", // Warna kuning jika 'TC', jika tidak maka warna default
                            cursor: "default",
                        },
                    },
                    children: (
                        <Tooltip
                            title={jenisDarahString}
                            color={backgroundColor}
                            key={backgroundColor}>
                            <Text style={{ fontSize: 12 }}>
                                {text}
                            </Text>
                        </Tooltip>
                    ),
                };
            },
        },
        {
            title: "Nama",
            width: lebarnama,
            dataIndex: "Nama",
            sorter: (a, b) => a.Nama.localeCompare(b.Nama),
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
            title: "Nama Ruang",
            width: lebarnama,
            dataIndex: "NamaRuang",
            sorter: (a, b) => a.NamaRuang.localeCompare(b.NamaRuang),
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
            title: "Nama Dokter",
            width: "250px",
            dataIndex: "NamaDokter",
            sorter: (a, b) => a.NamaDokter.localeCompare(b.NamaDokter),
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
            dataIndex: "PasienId",
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

    const klikRefresh = (ruang, tgl, ktg) => {
        getListOrderbyDate(ruang, tgl, ktg)
    }

    // Filter data berdasarkan nama
    // const filteredData = listOrder.filter((item) =>
    //     item.Nama.toLowerCase().includes(sSearch.toLowerCase())
    // );

    return (
        <div>
            <Search
                value={sSearch}
                placeholder="Cari Nama Pasien"
                disabled={listOrder.length !== 0 ? false : true}
                onChange={(e) => {
                    let temp = listOrder.filter((item) =>
                        item.Nama.toLowerCase().includes(e.target.value.toLowerCase())
                    );

                    setdaftarPasien(temp);
                }}
                // onSearch={() => onSearch()}
                style={{ marginBottom: "3px" }}
            />

            <Table
                onRow={(record) => {
                    return {
                        onClick: () => {
                            setdrOrder(record.NamaDokter);
                            getDetailPasienPelayanan(record.RegistrasiId);
                            getDetailOrder(record.NoOrder)
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
                dataSource={daftarPasien}
                loading={spListOrder}
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
                                disabled={ruangIdValid && tglOrder ? false : true}
                                onClick={() => klikRefresh(ruangIdValid, dayjs(tglOrder).format('YYYY-MM-DD'), ktgOrder)}
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
                                disabled
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

export default TabelPasienPelayananBD