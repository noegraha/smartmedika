import { Button, Card, Col, DatePicker, Row, Select, Table } from 'antd'
import React, { useState } from 'react'
import { useContext } from 'react';
import { BankDarahContext } from '../context/BankDarahContext';
import dayjs from 'dayjs';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';

const { Option } = Select;

const DetailStok = () => {
    const {
        listNamaBrg,
        kdBarang, setkdBarang,
        namaBarang, setnamaBarang,
        qtyTotal, setqtyTotal,
        // func
        getListNamaBarang,
    } = useContext(BankDarahContext)

    const [selisih, setselisih] = useState(0)

    const columns = [
        {
            title: 'Gol.Darah',
            dataIndex: 'goldar',
            key: 'goldar',
            align: 'center',
            // width: 75,
        },
        {
            title: 'Jml.Qty',
            dataIndex: 'qty',
            key: 'qty',
            align: 'center',
            // width: 75,
        },
        {
            title: 'Tgl.Update',
            dataIndex: 'tglupdate',
            key: 'tglupdate',
            align: 'center',
            render: (text, record) => {
                // Menggunakan dayjs untuk mengubah format tanggal
                const formattedDate = dayjs(text).format('DD MMMM YYYY');
                return formattedDate;
            },
        },
        {
            title: 'Perbarui',
            dataIndex: 'StsKirim',
            key: 'StsKirim',
            align: 'center',
            width: 100,
            render: (text, record, index) =>
                <div>
                    <Button
                        type='primary'
                        // onClick={() => klikKirim(record.RegistrasiId, record.PasienId)}
                        // disabled={!sstoken || record.StsKirim === 'true'}
                        icon={<EditOutlined />}
                        size='small'
                        style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}
                    />
                </div>
        },
    ];

    const tempdata = [
        {
            goldar: 'A',
            qty: '100',
            tglupdate: dayjs(),
        },
        {
            goldar: 'AB',
            qty: '100',
            tglupdate: dayjs(),
        },
        {
            goldar: 'B',
            qty: '100',
            tglupdate: dayjs(),
        },
        {
            goldar: 'O',
            qty: '100',
            tglupdate: dayjs(),
        },
    ];

    const listUnit = [
        {
            unitId: '9407',
            desk: 'BANK DARAH - RSMS'
        },
        {
            unitId: '9457',
            desk: 'BANK DARAH - ABIYASA'
        }
    ]

    const changeUnit = (unitId) => {
        getListNamaBarang(unitId)
    }

    const changeBarang = (kdBrg) => {
        let temp = listNamaBrg
        let brg = temp.find((item) => item.KODEBARANG === kdBrg);

        setqtyTotal(brg.QTYUNIT)
    }

    return (
        <Card title='Input Detail Stok Bank Darah'>
            <Row style={{ marginBottom: '3px' }}>
                <Col span={2}>
                    Unit :
                </Col>
                <Col span={10}>
                    <Select
                        style={{ width: '80%' }}
                        placeholder="..."
                        // value={perawat}
                        onChange={(e) => changeUnit(e)}
                        size='small'
                        showSearch={true}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {listUnit.map((opt, index) => (
                            <Option key={index} value={opt.unitId}>{opt.desk}</Option>
                        ))}
                    </Select>
                </Col>
                {/* <Col span={2}>
                    Periode Bulan :
                </Col>
                <Col span={10}>
                    <DatePicker
                        // value={blnPeriode}
                        // onChange={(e) => setblnPeriode(dayjs(e))}
                        format="MM-YYYY"
                        allowClear={false}
                        picker="month"
                        size='small'
                        style={{ width: '50%' }} />
                </Col> */}
            </Row>
            <Row style={{ marginBottom: '3px' }}>
                <Col span={2}>
                    Nama Barang :
                </Col>
                <Col span={10}>
                    <Select
                        style={{ width: '80%' }}
                        placeholder="..."
                        value={kdBarang}
                        onChange={(e) => changeBarang(e)}
                        size='small'
                        showSearch={true}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {listNamaBrg.map((opt, index) => (
                            <Option key={index} value={opt.KODEBARANG}>{opt.NAMABARANG + " - " + opt.QTYUNIT}</Option>
                        ))}
                    </Select>
                </Col>
            </Row>
            <Row style={{ marginBottom: '5px' }}>
                <Col span={5}>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                    >
                        Tambah Golongan Darah
                    </Button>
                </Col>
                <Col span={6}>
                    <Title level={4} style={{ marginBottom: '-5px' }}>- Total Stok : {qtyTotal}</Title>
                </Col>
                <Col span={6}>
                    <Title level={4} style={{ marginBottom: '-5px' }}>- Selisih : ---</Title>
                </Col>
            </Row>

            <Table
                bordered
                // loading={spTbPasien}
                columns={columns}
                dataSource={tempdata}
                size='small'
                pagination={false}
            />
        </Card>
    )
}

export default DetailStok