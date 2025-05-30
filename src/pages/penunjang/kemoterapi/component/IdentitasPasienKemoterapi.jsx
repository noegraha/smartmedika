import { Button, Col, Input, Modal, Row, Space, Table } from 'antd'
import React, { useContext } from 'react'
import { KemoterapiContext } from '../context/KemoterapiContext'
import { SearchOutlined, EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const IdentitasPasienKemoterapi = () => {
    const {
        unitId,
        jnsRawat,
        noReg, setnoReg,
        pasienId,
        umur,
        jenisKelamin,
        penjamin,
        nama,
        tglLahir,
        tglMasuk,
        alamat,
        pjpasien,
        listTrxPmr,
        // func
        getListTrxpmr,
        getDataTidakOrder,
        rstIdentPasien,
        // md
        mdListTrxPmr, setmdListTrxPmr,
        // spin
        spTrxPmr, setspTrxPmr,
    } = useContext(KemoterapiContext)

    const columns = [
        {
            title: 'No.Registrasi',
            dataIndex: 'NOREG',
            key: 'NOREG',
            align: "center",
        },
        {
            title: 'Tgl.Pemeriksaan',
            dataIndex: 'TGLPMR',
            key: 'TGLPMR',
            align: "center",
            render: (record) => <div>{dayjs(record).format("DD-MM-YYYY")}</div>,
        },
        {
            title: 'Unit Pelayanan',
            dataIndex: 'NamaRuang',
            key: 'NamaRuang',
            align: "center",
        },
        {
            title: 'Pemeriksaan',
            dataIndex: 'Pemeriksaan',
            key: 'Pemeriksaan',
        },
        {
            title: "Aksi",
            key: "operation",
            fixed: "right",
            align: "center",
            width: 50,
            render: (text, record, index) => (
                <Space size="small">
                    <Button
                        onClick={() => klikEdit(index)}
                        type="primary"
                        icon={<EditOutlined />}
                        // disabled={record.StsDatang}
                        size="small"
                    />
                </Space>
            ),
        },
    ];

    const klikEdit = (index) => {
        // console.log('klikEdit : ', index);
        // setspTrxPmr(true)
        // getDataTidakOrder(listTrxPmr[index].NOREG, dayjs(listTrxPmr[index].TGLPMR).format('YYYY-MM-DD'), unitId)

        Modal.warn({
            title: "Peringatan!",
            content: "Fitur mencari transaksi TANPA ORDER sudah diNONAKTIFKAN, Laporan bisa diinputkan berdasarkan ORDER KEMOTERAPI.",
            onOk: () => {
                rstIdentPasien();
                setnoReg('');
            }
        });
    }

    const klikSearch = () => {
        if (noReg.length !== 10) {
            Modal.warning({
                title: "Peringatan!",
                content: "No Registrasi belum sesuai!",
            });
        }
        else if (!unitId || unitId.length === 0) {
            Modal.warning({
                title: "Peringatan!",
                content: "Ruang Id belum sesuai!",
            });
        }
        else {
            console.log('klikSearch : ', noReg);
            getListTrxpmr(noReg, unitId)
        }
    }

    return (
        <div>
            <Row>
                <Col span={4}>
                    <span>
                        No. Registrasi :
                    </span>
                    <Input.Group compact>
                        <Input
                            value={noReg}
                            // onChange={(e) => setnoReg(e.target.value)}
                            placeholder="No Registrasi"
                            size='small'
                            maxLength={10}
                            style={{ width: '75%' }} />
                        <Button
                            onClick={() => klikSearch()}
                            type="primary"
                            size="small"
                            // disabled={jnsRawat === '91' ? false : true}
                            style={{ width: '20%' }}>
                            <SearchOutlined />
                        </Button>
                    </Input.Group>
                </Col>
                <Col span={4}>
                    <span>
                        No. Pasien :
                    </span>
                    <Input
                        value={pasienId}
                        placeholder="No Pasien"
                        size='small'
                        style={{ width: '95%' }} />
                </Col>
                <Col span={4}>
                    <span>
                        Umur :
                    </span>
                    <Input
                        value={umur}
                        placeholder="Umur"
                        addonAfter='Tahun'
                        size='small'
                        style={{ width: '95%' }} />
                </Col>
                <Col span={6}>
                    <span>
                        Jenis Kelamin :
                    </span>
                    <Input
                        value={jenisKelamin}
                        placeholder="Jenis Kelamin"
                        size='small'
                        style={{ width: '95%' }} />
                </Col>
                <Col span={6}>
                    <span>
                        Penjamin :
                    </span>
                    <Input
                        value={penjamin}
                        placeholder="Penjamin"
                        size='small' />
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <span>
                        Nama :
                    </span>
                    <Input
                        value={nama}
                        placeholder="Nama Pasien"
                        size='small'
                        style={{ width: '99%' }} />
                </Col>
                <Col span={6}>
                    <span>
                        Tanggal Lahir :
                    </span>
                    <Input
                        value={tglLahir}
                        placeholder="Tanggal Lahir"
                        size='small'
                        style={{ width: '95%' }} />
                </Col>
                <Col span={6}>
                    <span>
                        Tanggal Masuk :
                    </span>
                    <Input
                        value={tglMasuk}
                        placeholder="Tanggal Masuk"
                        size='small'

                    />
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <span>
                        Alamat :
                    </span>
                    <Input
                        value={alamat}
                        placeholder="Alamat"
                        size='small'
                        style={{ width: '99%' }} />
                </Col>
                <Col span={12}>
                    <span>
                        Penanggung Jawab :
                    </span>
                    <Input
                        value={pjpasien}
                        placeholder="Nama Penanggung Jawab Pasien"
                        size='small'
                        style={{ width: '100%' }} />
                </Col>
            </Row>

            <Modal title="Daftar Transaksi Kemoterapi"
                open={mdListTrxPmr}
                // onOk={handleOk}
                // onCancel={() => setmdListTrxPmr(false)}
                closable={false}
                footer={null}
                width={800}
            >
                <Table
                    columns={columns}
                    dataSource={listTrxPmr}
                    loading={spTrxPmr}
                    bordered
                    pagination={false}
                    size='small'
                />
                <Row>
                    <Col span={24}>
                        <span><i>*&#41; Isikan Laporan Kemoterapi di-<b><u>SETIAP</u></b> transaksi Kemoterapi</i></span>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Button
                            onClick={() => setmdListTrxPmr(false)}
                            type='default'
                            // size='small'
                            style={{ float: 'right', width: '100px' }}>
                            Batal
                        </Button>
                    </Col>
                </Row>
            </Modal>
        </div>
    )
}

export default IdentitasPasienKemoterapi