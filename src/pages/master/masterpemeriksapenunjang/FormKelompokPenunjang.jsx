import React, { useState, useContext } from 'react'
import { Card, Tag, Space, Table, Button, Modal, Input, Tooltip } from 'antd'
import { RetweetOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { MasterKelompokPenunjangContext } from '../context/MasterKelompokPenunjangContext'
import '../masterpemeriksapenunjang/style/style.css'

const { confirm } = Modal;

const FormKelompokPenunjang = () => {
    const {
        // state
        deskKelompok, setdeskKelompok,
        kelPenunjang,
        kelPenunjangId, setkelPenunjangId,
        // loading
        spinTbKelPenunjang,
        // modal
        mdTambahKelompok, setmdTambahKelompok,
        mdUbahKelompok, setmdUbahKelompok,
        // func
        getKelompokPenunjang,
        insertKelompok,
        updateKelompok,
        HapusKelompok,
    } = useContext(MasterKelompokPenunjangContext)



    const columns = [
        {
            title: 'Kelompok Id',
            dataIndex: 'kelompokId',
            key: 'kelompokId',
            align: 'center',
            width: 100,
            sorter: (a, b) => a.kelompokId.localeCompare(b.kelompokId),
        },
        {
            title: 'Deskripsi Kelompok',
            dataIndex: 'deskripsi',
            key: 'deskripsi',
            align: 'center',
            sorter: (a, b) => a.deskripsi.localeCompare(b.deskripsi),
            render: text => <div style={{ textAlign: 'left' }}>{text}</div>,
        },
    ];

    const data = [];
    for (let i = 0; i < 5; i++) {
        data.push({
            kelompokId: 'PNJ001',
            deskripsi: `PENUNJANG ${i + 1}`,
        });
    }

    const klikRefresh = () => {
        getKelompokPenunjang()
    }

    const klikTambah = () => {
        setdeskKelompok('')
        setmdTambahKelompok(true)
    }

    const klikUpdate = () => {
        if (!kelPenunjangId) {
            Modal.warning({
                title: 'Peringatan',
                content: 'Kelompok belum dipilih!',
            });
        }
        else {
            setmdUbahKelompok(true)
        }
    }

    const klikSimpan = () => {
        let data = {}
        data.KelompokId = null;
        data.Deskripsi = deskKelompok;
        insertKelompok(data);
        // console.log(data);
    }

    const klikBatal = () => {
        setmdTambahKelompok(false)
    }

    const klikUbah = () => {
        let data = {}
        data.KelompokId = kelPenunjangId;
        data.Deskripsi = deskKelompok;
        updateKelompok(data)
    }

    const klikHapus = () => {
        kelPenunjangId ?
            confirm({
                title: 'Konfirmasi',
                icon: <CloseCircleOutlined />,
                content: `Apakah data dengan Kelompok Id : ${kelPenunjangId} akan dihapus?`,
                okText: 'Hapus',
                cancelText: 'Batal',
                onOk() {
                    HapusKelompok(kelPenunjangId);
                },
            }) :
            Modal.warning({
                title: 'Peringatan!',
                content: 'Pilih Kelompok terlebih dahulu!',
            });
    }

    return (
        <div>
            <Card title='Kelompok Penunjang'
                extra={
                    <Tooltip title="Refresh">
                        <Button
                            type='text'
                            onClick={() => klikRefresh()}
                            size='small'
                            style={{ backgroundColor: '#389e0d', color: 'white' }}>
                            <RetweetOutlined />
                        </Button>
                    </Tooltip>
                }
                style={{ marginBottom: '5px', width: '99%' }}>
                <Table
                    onRow={(record) => {
                        return {
                            onClick: () => {
                                if (kelPenunjangId) {
                                    setkelPenunjangId('')
                                    setdeskKelompok('')
                                }
                                else {
                                    setkelPenunjangId(record.kelompokId)
                                    setdeskKelompok(record.deskripsi)
                                }
                            }
                        };
                    }}
                    rowClassName={(record) => (
                        record.kelompokId === kelPenunjangId ? "greena" : "non-green"
                    )}
                    columns={columns}
                    dataSource={kelPenunjang}
                    loading={spinTbKelPenunjang}
                    className='RCM_two_level_table1'
                    size='small'
                    bordered
                    pagination={false}
                    scroll={{ x: 100, y: 300 }} />
                <Space style={{ marginTop: '5px' }}>
                    <Button
                        type="primary"
                        onClick={() => klikTambah()}
                        size='small'
                        style={{ width: '70px' }}>
                        Tambah
                    </Button>
                    <Button
                        onClick={() => klikUpdate()}
                        type='text'
                        size='small'
                        style={{ width: '70px', backgroundColor: '#95de64', color: 'white' }}>
                        Ubah
                    </Button>
                    <Button
                        onClick={() => klikHapus()}
                        type="primary"
                        danger
                        size='small'
                        style={{ width: '70px' }}>
                        Hapus
                    </Button>
                </Space>
            </Card>

            <Modal
                title="Tambah Kelompok Penunjang"
                visible={mdTambahKelompok}
                onCancel={() => setmdUbahKelompok(false)}
                closable={false}
                footer={null}
                width={500}
                style={{ top: '100px' }}>
                <div>
                    <span><b>Nama Kelompok Penunjang :</b></span>
                    <br />
                    <Input
                        value={deskKelompok}
                        onChange={(e) => setdeskKelompok(e.target.value)}
                        // disabled={disNoTransaksi}
                        size='small'
                        style={{ width: '100%' }} />
                    <Space style={{ marginTop: '15px' }}>
                        <Button
                            type="primary"
                            onClick={() => klikSimpan()}
                            size='small'
                            style={{ width: '70px' }}>
                            Simpan
                        </Button>
                        <Button
                            type="primary"
                            onClick={() => klikBatal()}
                            size='small'
                            style={{ width: '70px' }}>
                            Batal
                        </Button>
                    </Space>
                </div>
            </Modal>

            <Modal
                title="Ubah Kelompok Penunjang"
                visible={mdUbahKelompok}
                // onCancel={() => }
                closable={false}
                footer={null}
                width={500}
                style={{ top: '100px' }}>
                <div>
                    <span><b>Kelompok Id :</b></span>
                    <br />
                    <Input
                        value={kelPenunjangId}
                        // onChange={(e) => setdeskKelompok(e.target.value)}
                        disabled
                        size='small'
                        style={{ width: '100%' }} />
                    <span><b>Nama Kelompok Penunjang :</b></span>
                    <br />
                    <Input
                        value={deskKelompok}
                        onChange={(e) => setdeskKelompok(e.target.value)}
                        // disabled={disNoTransaksi}
                        size='small'
                        style={{ width: '100%' }} />
                    <Space style={{ marginTop: '15px' }}>
                        <Button
                            type="primary"
                            onClick={() => klikUbah()}
                            size='small'
                            style={{ width: '70px' }}>
                            Ubah
                        </Button>
                        <Button
                            type="primary"
                            onClick={() => setmdUbahKelompok(false)}
                            size='small'
                            style={{ width: '70px' }}>
                            Batal
                        </Button>
                    </Space>
                </div>
            </Modal>
        </div>
    )
}

export default FormKelompokPenunjang
