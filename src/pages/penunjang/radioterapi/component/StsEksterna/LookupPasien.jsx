import { EnterOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Card, Col, Input, Modal, Row, Select, Space, Table } from 'antd'
import React, { useContext, useState } from 'react'
import { RadioterapiContext } from '../../context/RadioterapiContext';
import dayjs from 'dayjs';
import { PasienContext } from '../../../../rawatjalan/context/PasienContext';

const { Option } = Select;

const LookupPasien = () => {
    const {
        detailPasien,
    } = useContext(PasienContext)

    const {
        listLookupPasien,
        listDiagnosa,
        tempLookupPasien, settempLookupPasien,
        setnoReg,
        getLookupPasien,
        getDataPasiendanStatusRd,
        mdLookupPasien, setmdLookupPasien,
        spLookupPasien,
    } = useContext(RadioterapiContext)

    const [sLookupNoreg, setsLookupNoreg] = useState(dayjs().format('YYMMDD'))
    const [sSrcNama, setsSrcNama] = useState('')

    const colTbLookupPasien = [
        {
            title: 'No Registrasi',
            dataIndex: 'RegistrasiId',
            key: 'RegistrasiId',
            align: 'center',
            width: '90px',
        },
        {
            title: 'No Pasien',
            dataIndex: 'PasienId',
            key: 'PasienId',
            align: 'center',
            width: '90px',
        },
        {
            title: 'Nama Pasien',
            dataIndex: 'NamaPasien',
            key: 'NamaPasien',
            // align: 'center',
            // width: '40px',
        },
        {
            title: 'Ruang',
            dataIndex: 'RuangDeskripsi',
            key: 'RuangDeskripsi',
        },
        {
            title: 'Alamat',
            dataIndex: 'Alamat',
            key: 'Alamat',
        },
        {
            title: "Aksi",
            key: "operation",
            fixed: "right",
            align: "center",
            width: 50,
            render: (text, record, index) => (
                <Button
                    onClick={() => klikPasien(record.RegistrasiId, record.PasienId)}
                    type="primary"
                    icon={<EnterOutlined />}
                    size="small"
                />
            ),
        },
    ]

    const klikSearch = (sSearch) => {
        if (sSearch.length < 6) {
            Modal.warning({ title: 'Peringatan!', content: 'No.Registrasi yang dicari minimal 6 karakter!' })
        }
        else {
            getLookupPasien(sSearch)
            setmdLookupPasien(true)
            setsSrcNama('')
        }
    }

    const onChangeSrcNama = (data) => {
        setsSrcNama(data)
        const keyword = data.toLowerCase();
        const filtered = listLookupPasien.filter(item =>
            item.NamaPasien.toLowerCase().includes(keyword)
        );
        settempLookupPasien(filtered);
    }

    const klikPasien = (noreg, pasienId) => {
        setmdLookupPasien(false)
        setnoReg(noreg)
        getDataPasiendanStatusRd(noreg)
        sessionStorage.setItem("norm", pasienId);
        detailPasien(noreg)
    }

    return (
        <div>
            <Card
                title='Cari Pasien'
                bodyStyle={{ padding: '10px' }}
                headStyle={{ backgroundColor: '#FEC7B4' }}
                size='small'
            >
                <Row>
                    <Col span={2}>
                        No.Registrasi :
                    </Col>
                    <Col span={4}>
                        <Input.Group compact>
                            <Input
                                value={sLookupNoreg}
                                onChange={(e) => setsLookupNoreg(e.target.value)}
                                placeholder="..."
                                style={{ width: '75%' }}
                                maxLength={10}
                            />
                            <Button
                                onClick={() => klikSearch(sLookupNoreg)}
                                type="primary"
                                style={{ width: '25%' }}
                                disabled={sLookupNoreg.length < 6 ? true : false}
                            >
                                <SearchOutlined />
                            </Button>
                        </Input.Group>
                    </Col>
                    {/* <Col span={1}>
                    </Col>
                    <Col style={{ marginRight: '10px' }}>
                        Unit :
                    </Col>
                    <Col span={5}>
                        <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                        // value={aaAssNyeria}
                        >
                            <Option value='9404'>9404 - RADIOTERAPHI RSMS</Option>
                        </Select>
                    </Col> */}
                </Row>
                <Row>
                    <Col span={2}>
                    </Col>
                    <Col>
                        <span
                            style={{
                                fontSize: '10px',
                                fontStyle: 'italic',
                                // fontWeight: 'bold'
                            }}
                        >
                            *) Digit angka 1-2 menunjukkan Tahun, digit angka 3-4 menunjukkan Bulan, digit angka 5-6 menunjukkan Tanggal
                        </span>
                    </Col>
                </Row>
            </Card>

            {/* Modal Lookup Pasien */}
            <Modal
                open={mdLookupPasien}
                // onOk={() => onOkModal()}
                onCancel={() => setmdLookupPasien(false)}
                width={1000}
                closeIcon={false}
                footer={null}
                centered
            // style={{
            //     top: 135
            // }}
            >
                <Card
                    title="Lookup Daftar Pasien"
                    size='small'
                    headStyle={{ backgroundColor: '#FC819E' }}>
                    <Row style={{ marginBottom: '5px' }}>
                        <Col>
                            <Space>
                                <span> Cari Nama Pasien :</span>
                                <Input
                                    value={sSrcNama}
                                    onChange={(e) => onChangeSrcNama(e.target.value)}
                                />
                            </Space>
                        </Col>
                    </Row>
                    <Table
                        columns={colTbLookupPasien}
                        dataSource={tempLookupPasien}
                        loading={spLookupPasien}
                        size='small'
                        scroll={{
                            x: 1000,
                            // y: 300,
                        }}
                        bordered
                    // pagination={false}
                    // style={{ marginTop: '5px' }} 
                    />
                </Card>
            </Modal>
        </div>
    )
}

export default LookupPasien