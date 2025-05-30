import { Button, Card, Col, DatePicker, Divider, Input, InputNumber, message, Modal, Popconfirm, Row, Select, Space, Spin, Table, Tooltip } from 'antd'
import React, { useState } from 'react'
import { useContext } from 'react';
import { RadioterapiContext } from '../context/RadioterapiContext';
import dayjs from "dayjs";
import { CloudDownloadOutlined, PlusOutlined, CheckOutlined, EditOutlined, DeleteOutlined, FileSearchOutlined } from "@ant-design/icons";
import DetailRiwayatStsEksterna from './StsEksterna/DetailRiwayatStsEksterna';

const { TextArea } = Input;
const { Option } = Select;


const FormPenyinaran = () => {
    const {
        // ident
        noReg,
        pasienId,
        userEntry,
        ipUser,
        hostUser,
        // -----
        tglOrder,
        nama,
        pynMingguKe, setpynMingguKe,
        pynTglPyn, setpynTglPyn,
        pynWktRad, setpynWktRad,
        pynDosis, setpynDosis,
        pynLapangan, setpynLapangan,
        pynJmlLap, setpynJmlLap,
        pynDosisTtl, setpynDosisTtl,
        pynDokter, setpynDokter,
        pynDrTrx,
        pynPetugas, setpynPetugas,
        pynListPenyinaran,
        pynIdListPenyinaran, setpynIdListPenyinaran,
        stsEksPilih, setstsEksPilih,
        // list
        listDokter,
        listRd,
        listRiwayat,
        // spin
        spDataPasien,
        spGetDokter,
        spGetRadiografer,
        spPynSimpan, setspPynSimpan,
        spRiwayatRd,
        // md
        mdTambahData, setmdTambahData,
        mdListStsEksterna, setmdListStsEksterna,
        // func 
        getLoadRadiografer,
        getLoadDokter,
        getRiwayatRd,
        simpanPenyinaran,
        ReportStsEksterna,
    } = useContext(RadioterapiContext);

    const [mdDtStsEksterna, setmdDtStsEksterna] = useState(false);

    var days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

    const columnsa = [
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
            width: '50px',
        },
        {
            title: 'Hari',
            dataIndex: 'Hari',
            key: 'Hari',
            align: 'center',
            width: '50px',
        },
        {
            title: 'Tanggal',
            dataIndex: 'Tanggal',
            key: 'Tanggal',
            align: 'center',
            width: '50px',
            render: (record) => <div>{dayjs(record).format("DD/MM/YYYY")}</div>,
            ellipsis: true,
        },
        {
            title: 'Penyinaran ke-',
            dataIndex: 'IdMinggu',
            key: 'IdMinggu',
            align: 'center',
            width: '35px',
        },
        {
            title: 'Waktu',
            dataIndex: 'Waktu',
            key: 'Waktu',
            align: 'center',
            width: '40px',
        },
        {
            title: 'Dosis',
            dataIndex: 'Dosis',
            key: 'Dosis',
            align: 'center',
            width: '40px',
        },
        {
            title: 'Dosis Total',
            dataIndex: 'DosisTotal',
            key: 'DosisTotal',
            align: 'center',
            width: '40px',
        },
        {
            title: 'Dokter',
            dataIndex: 'NamaDokter',
            key: 'NamaDokter',
            align: 'center',
            width: '90px',
            ellipsis: true,
        },
        {
            title: 'Petugas',
            dataIndex: 'NamaPetugas',
            key: 'NamaPetugas',
            align: 'center',
            width: '90px',
            ellipsis: true,
        },
        {
            title: 'Lapangan',
            dataIndex: 'Lapangan',
            key: 'Lapangan',
            align: 'center',
            width: '50px',
        },
        {
            title: 'Jml Lapangan',
            dataIndex: 'JmlLapangan',
            key: 'JmlLapangan',
            align: 'center',
            width: '50px',
        },
        {
            title: 'Desk Lapangan',
            dataIndex: 'DeskripsiLapangan',
            key: 'DeskripsiLapangan',
            align: 'center',
            width: '90px',
            ellipsis: true,
        },
        {
            title: 'No Urut',
            dataIndex: 'NoUrut',
            key: 'NoUrut',
            align: 'center',
            width: '30px',
        },
        {
            title: 'Status Eksterna',
            dataIndex: 'NoStsEksterna',
            key: 'NoStsEksterna',
            align: 'center',
            width: '70px',
        },
        {
            title: 'User',
            dataIndex: 'UserEntry',
            key: 'UserEntry',
            align: 'center',
            width: '90px',
            ellipsis: true,
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
                        // disabled
                        size="small"
                    />
                </Space>
            ),
        },
    ];

    const colRiwStsEksterna = [
        {
            title: 'No Registrasi',
            dataIndex: 'NOREG',
            key: 'NOREG',
            align: 'center',
            width: '90px',
        },
        {
            title: 'Tgl Masuk RS',
            dataIndex: 'TANGGALMASUK',
            key: 'TANGGALMASUK',
            align: 'center',
            width: '90px',
        },
        {
            title: 'Data Klinis',
            dataIndex: 'DATA_KLINIS',
            key: 'DATA_KLINIS',
            align: 'center',
            width: '200px',
            render: text => <div style={{ textAlign: 'left' }}>{text}</div>,
        },
        // {
        //     title: 'Radiografer',
        //     dataIndex: 'RADIOGRAFER',
        //     key: 'RADIOGRAFER',
        //     align: 'center',
        //     width: '150px',
        // },
        {
            title: 'Penyinaran',
            dataIndex: 'PENYINARAN',
            key: 'PENYINARAN',
            align: 'center',
            width: '150px',
        },
        {
            title: 'Dokter',
            dataIndex: 'NAMADOKTER',
            key: 'NAMADOKTER',
            align: 'center',
            width: '150px',
        },
        {
            title: 'Catatan',
            dataIndex: 'CATATAN',
            key: 'CATATAN',
            align: 'center',
            width: '200px',
            render: text => <div style={{ textAlign: 'left' }}>{text}</div>,
        },
        {
            title: "Aksi",
            key: "operation",
            fixed: "right",
            align: "center",
            width: 100,
            render: (text, record, index) => (
                <Button
                    onClick={() => {
                        setmdListStsEksterna(false);
                        setstsEksPilih(record.NOREG);
                    }}
                    type="primary"
                    size="small"
                    style={{ width: '75px' }}
                >Pilih</Button>
            ),
        },
    ];

    const rstMdPenyinaran = () => {
        setpynIdListPenyinaran('');
        setpynMingguKe('');
        setpynTglPyn(dayjs());
        setpynWktRad('');
        setpynDosis('');
        setpynLapangan('');
        setpynJmlLap('');
        setpynDosisTtl('');
        setpynDokter(pynDrTrx);
        setpynPetugas('');
        setstsEksPilih(null);
    }

    const klikLoadRd = () => {
        getLoadRadiografer("7", "9404");
    }

    const klikLoadDokter = () => {
        getLoadDokter("1, 2", "9404");
    }

    const klikTambah = () => {
        if (nama.length === 0) {
            Modal.warning({ title: 'Peringatan!', content: 'Pasien belum dipilih!' })
        }
        else if (pynListPenyinaran.length === 0) {
            rstMdPenyinaran()
            setmdTambahData(true)
        }
        else {
            setpynIdListPenyinaran('');
            setpynMingguKe(pynListPenyinaran[0].IdMinggu);
            setpynTglPyn(dayjs(pynListPenyinaran[0].Tanggal));
            setpynWktRad('');
            setpynDosis('');
            setpynLapangan('');
            setpynJmlLap(pynListPenyinaran[0].JmlLapangan);
            setpynDosisTtl(pynListPenyinaran[0].DosisTotal);
            setpynDokter(pynListPenyinaran[0].DokterId);
            setpynPetugas(pynListPenyinaran[0].PetugasId);
            setstsEksPilih(null);
            setmdTambahData(true);
        }
    }

    const klikEdit = (index) => {
        setmdTambahData(true);
        let temp = pynListPenyinaran[index];

        console.log('klikEdit : ', temp);

        setpynIdListPenyinaran(temp.Id);
        setpynMingguKe(temp.IdMinggu);
        setpynTglPyn(temp.Tanggal);
        setpynWktRad(temp.Waktu);
        setpynDosis(temp.Dosis);
        setpynLapangan(temp.DeskripsiLapangan);
        setpynJmlLap(temp.JmlLapangan);
        setpynDosisTtl(temp.DosisTotal);
        setpynDokter(temp.DokterId);
        setpynPetugas(temp.PetugasId);
        setstsEksPilih(temp.NoStsEksterna);
    };

    // simpan Laporan Penyinaran
    const klikSimpan = () => {
        if (!noReg) {
            Modal.warning({ title: 'Peringatan!', content: 'Pasien belum dipilih!' })
        }
        else if (dayjs(pynTglPyn).format('DD-MM-YYYY') !== dayjs(tglOrder).format('DD-MM-YYYY')) {
            console.log('tgl 1 : ', dayjs(pynTglPyn));
            console.log('tgl 2 : ', dayjs(tglOrder));
            Modal.warning({ title: 'Peringatan!', content: 'Tanggal List Order tidak sama dengan Tanggal Penyinaran!' })
        }
        else if (!pynMingguKe || pynMingguKe === "0") {
            Modal.warning({ title: 'Peringatan!', content: 'Penyinaran ke - masih kosong!' })
        }
        else if (!pynDosis) {
            Modal.warning({ title: 'Peringatan!', content: 'Dosis masih kosong!' })
        }
        else if (!pynWktRad) {
            Modal.warning({ title: 'Peringatan!', content: 'Waktu Radiasi masih kosong!' })
        }
        else if (pynJmlLap.length === 0 || pynJmlLap === '0') {
            Modal.warning({ title: 'Peringatan!', content: 'Jumlah Lapangan masih kosong!' })
        }
        else if (pynDosisTtl.length === 0 || pynDosisTtl === '0') {
            Modal.warning({ title: 'Peringatan!', content: 'Dosis Total masih kosong!' })
        }
        else if (!pynLapangan) {
            Modal.warning({ title: 'Peringatan!', content: 'Desk. Lapangan masih kosong!' })
        }
        else if (!pynDokter) {
            Modal.warning({ title: 'Peringatan!', content: 'Dokter masih kosong!' })
        }
        else if (!pynPetugas) {
            Modal.warning({ title: 'Peringatan!', content: 'Petugas masih kosong!' })
        }
        else if (!stsEksPilih) {
            Modal.warning({ title: 'Peringatan!', content: 'Pilihan Status Eksterna masih kosong!' })
        }
        else {
            let data = {}

            var d = new Date(dayjs(pynTglPyn));
            // var dayName = days[d.getDay()];

            if (pynIdListPenyinaran.length !== 0) {
                data.id = pynIdListPenyinaran;
            }
            data.registrasiId = noReg;
            data.pasienId = pasienId;
            data.idMinggu = pynMingguKe;
            data.tanggal = dayjs(pynTglPyn).format('YYYY-MM-DD');
            data.hari = days[d.getDay()];
            data.waktu = pynWktRad;
            data.dosis = pynDosis;
            data.jmlLapangan = pynJmlLap;
            data.dosisTotal = pynDosisTtl;
            data.deskripsiLapangan = pynLapangan;
            data.dokterId = pynDokter;
            data.petugasId = pynPetugas;
            data.userEntry = userEntry;
            data.clientIP = ipUser;
            data.clientHost = hostUser;
            data.noStsEksterna = stsEksPilih;

            // console.log('data : ', data);
            simpanPenyinaran(data)
        }
    };

    const klikPilih = () => {
        setmdListStsEksterna(true);
        getRiwayatRd(pasienId);
    }

    return (
        <div>
            <Card loading={spDataPasien}>
                <Divider orientation='left' style={{ backgroundColor: '#d9f7be', margin: '0px' }}>Lapangan Penyinaran</Divider>

                <Row style={{ marginTop: '5px' }}>
                    <Col span={24}>
                        <Button
                            onClick={() => klikTambah()}
                            type='primary'
                            size='small'
                            icon={<PlusOutlined />}
                            disabled={!noReg}
                            style={{ width: '150px' }}
                        >
                            Tambah
                        </Button>
                    </Col>
                </Row>

                <Table
                    // onRow={(record) => {
                    //     return {
                    //         onClick: () => {
                    //             klikRowRiwayat(record.NOREG);
                    //             // setnoReg(record.NOREG);
                    //             // getDataPasiendanStatusRd(record.NOREG);
                    //         },
                    //     };
                    // }}
                    columns={columnsa}
                    dataSource={pynListPenyinaran}
                    // loading={spDataPasien}
                    size='small'
                    scroll={{
                        x: 1500,
                        y: 300,
                    }}
                    bordered
                    pagination={false}
                    style={{ marginTop: '5px' }} />

                <Row style={{ marginTop: '5px' }}>
                    <Col>
                        <Space>
                            <Button type='primary' style={{ width: '150px' }} disabled>
                                Lihat Riwayat
                            </Button>
                            <Button type='primary' style={{ width: '150px' }} disabled>
                                Kosongkan Form
                            </Button>
                        </Space>
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={24}>
                        <TextArea
                            rows={4}
                            size='small' />
                    </Col>
                </Row>

            </Card>

            <Modal
                title="Data Penyinaran"
                visible={mdTambahData}
                // onCancel={() => setmdTambahData(false)}
                closable={false}
                footer={null}
                width={1000}
                style={{ top: 100 }}
            >
                <Card
                    loading={spPynSimpan}>
                    <Row style={{ marginTop: '2px' }}>
                        <Col span={3}>
                            <span>
                                Penyinaran ke- :
                            </span>
                        </Col>
                        <Col span={9}>
                            <Input
                                type='number'
                                value={pynMingguKe}
                                onChange={(e) => setpynMingguKe(e.target.value)}
                                size='small'
                                min={1}
                                max={999}
                                onInput={(e) => e.target.value = e.target.value.slice(0, 3)}
                            />
                            {/* <Select
                                value={pynMingguKe}
                                onChange={(e) => setpynMingguKe(e)}
                                size='small'
                                style={{ width: '30%' }}>
                                <Option key={1} value={1}>1</Option>
                                <Option key={2} value={2}>2</Option>
                                <Option key={3} value={3}>3</Option>
                                <Option key={4} value={4}>4</Option>
                                <Option key={5} value={5}>5</Option>
                                <Option key={6} value={6}>6</Option>
                                <Option key={7} value={7}>7</Option>
                                <Option key={8} value={8}>8</Option>
                                <Option key={9} value={9}>9</Option>
                                <Option key={10} value={10}>10</Option>
                                <Option key={11} value={11}>11</Option>
                                <Option key={12} value={12}>12</Option>
                                <Option key={13} value={13}>13</Option>
                                <Option key={14} value={14}>14</Option>
                                <Option key={15} value={15}>15</Option>
                                <Option key={16} value={16}>16</Option>
                                <Option key={17} value={17}>17</Option>
                                <Option key={18} value={18}>18</Option>
                                <Option key={19} value={19}>19</Option>
                                <Option key={20} value={10}>20</Option>
                            </Select> */}
                        </Col>
                        <Col span={3}>
                            <span style={{ marginLeft: '5px' }}>
                                Tgl Penyinaran :
                            </span>
                        </Col>
                        <Col span={9}>
                            <DatePicker
                                value={dayjs(pynTglPyn)}
                                onChange={(e) => setpynTglPyn(e)}
                                // disabledDate={(current) => {
                                //     let customDate = dayjs().format("YYYY-MM-DD");
                                //     return current && current < dayjs(customDate, "YYYY-MM-DD");
                                // }}
                                size='small'
                                format='DD-MM-YYYY'
                                allowClear={false}
                                inputReadOnly={true}
                                style={{ width: '100%' }} />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '2px' }}>
                        <Col span={3}>
                            <span>
                                Waktu Radiasi :
                            </span>
                        </Col>
                        <Col span={9}>
                            <Input
                                value={pynWktRad}
                                onChange={(e) => setpynWktRad(e.target.value)}
                                maxLength={50}
                                size='small'
                            />
                        </Col>
                        <Col span={3}>
                            <span style={{ marginLeft: '5px' }}>
                                Dosis :
                            </span>
                        </Col>
                        <Col span={9}>
                            <Input
                                value={pynDosis}
                                onChange={(e) => setpynDosis(e.target.value)}
                                maxLength={50}
                                addonAfter='Gy'
                                size='small'
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '2px' }}>
                        <Col span={3}>
                            <span>
                                Jml Lapangan :
                            </span>
                        </Col>
                        <Col span={9}>
                            <Input
                                type='number'
                                value={pynJmlLap}
                                onChange={(e) => setpynJmlLap(e.target.value)}
                                size='small'
                                min={1}
                                max={9}
                                onInput={(e) => e.target.value = e.target.value.slice(0, 1)}
                            />
                        </Col>
                        <Col span={3}>
                            <span style={{ marginLeft: '5px' }}>
                                Dosis Total :
                            </span>
                        </Col>
                        <Col span={9}>
                            <Input
                                type='number'
                                value={pynDosisTtl}
                                onChange={(e) => setpynDosisTtl(e.target.value)}
                                addonAfter='Gy'
                                size="small"
                                min={1}
                                max={999}
                                onInput={(e) => e.target.value = e.target.value.slice(0, 3)}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '2px' }}>
                        <Col span={3}>
                            <span>
                                Desk. Lapangan :
                            </span>
                        </Col>
                        <Col span={21}>
                            <Input
                                value={pynLapangan}
                                onChange={(e) => setpynLapangan(e.target.value)}
                                maxLength={255}
                                size='small'
                            />
                        </Col>


                    </Row>
                    <Row style={{ marginTop: '2px' }}>
                        <Col span={3}>
                            <span>
                                Dokter :
                            </span>
                        </Col>
                        <Col span={9}>
                            <Input.Group compact>
                                <Select
                                    // disabled
                                    value={pynDokter}
                                    onChange={(e) => setpynDokter(e)}
                                    showSearch
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    size='small'
                                    style={{ width: '80%' }}>
                                    {listDokter.map((optListDokter, index) => (
                                        <Option key={index} value={optListDokter.KODEDOKTER}>{optListDokter.NAMADOKTER}</Option>
                                    ))}
                                </Select>
                                <Tooltip title='klik disini jika option Dokter tidak muncul'>
                                    <Button
                                        onClick={() => klikLoadDokter()}
                                        loading={spGetDokter}
                                        type="primary"
                                        size="small"
                                        style={{ width: '20%' }}>
                                        <CloudDownloadOutlined />
                                    </Button>
                                </Tooltip>
                            </Input.Group>
                        </Col>
                        <Col span={3}>
                            <span style={{ marginLeft: '5px' }}>
                                Radiografer :
                            </span>
                        </Col>
                        <Col span={9}>
                            <Input.Group compact>
                                <Select
                                    value={pynPetugas}
                                    onChange={(e) => setpynPetugas(e)}
                                    // onFocus={() => getLoadDokter('1,2', '9404')}
                                    showSearch
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    size='small'
                                    style={{ width: '80%' }}>
                                    {listRd.map((optListRd, index) => (
                                        <Option key={index} value={optListRd.KODEDOKTER}>{optListRd.NAMADOKTER}</Option>
                                    ))}
                                </Select>
                                <Tooltip title='klik disini jika option Radiografer tidak muncul'>
                                    <Button
                                        onClick={() => klikLoadRd()}
                                        loading={spGetRadiografer}
                                        type="primary"
                                        size="small"
                                        style={{ width: '20%' }}>
                                        <CloudDownloadOutlined />
                                    </Button>
                                </Tooltip>
                            </Input.Group>
                        </Col>
                    </Row>

                    <Row style={{ marginTop: '2px' }}>
                        <Col span={3}>
                            <span>
                                Status Eksterna :
                            </span>
                        </Col>
                        <Col span={21}>
                            <Space.Compact
                                style={{
                                    width: '100%',
                                }}
                            >
                                <Button
                                    type='primary'
                                    onClick={() => klikPilih()}
                                    size='small'
                                    style={{ width: '20%' }}
                                >
                                    Pilih
                                </Button>
                                <Tooltip title='Pilih Status Eksterna yang sesuai dengan penyinaran yang dilakukan.'>
                                    <Input
                                        value={stsEksPilih}
                                        placeholder='No.Reg Status Eksterna'
                                        readOnly
                                        size='small'
                                    />
                                </Tooltip>
                                <Button
                                    type='primary'
                                    onClick={() => {
                                        setmdDtStsEksterna(true);
                                        ReportStsEksterna(stsEksPilih);
                                    }}
                                    icon={<FileSearchOutlined />}
                                    disabled={!stsEksPilih}
                                    size='small'
                                    style={{ width: '10%' }}
                                />
                            </Space.Compact>
                        </Col>
                    </Row>

                    <hr />

                    <Row>
                        <Col span={24}>
                            <Space style={{ float: 'right' }}>
                                <Button
                                    onClick={() => klikSimpan()}
                                    type='primary'
                                    style={{ width: '75px' }}
                                >
                                    Simpan
                                </Button>
                                <Button
                                    onClick={() => setmdTambahData(false)}
                                    style={{ width: '75px' }}
                                >
                                    Batal
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </Card>
            </Modal>

            <Modal
                title="Daftar Status Eksterna"
                visible={mdListStsEksterna}
                onCancel={() => setmdListStsEksterna(false)}
                closable={false}
                footer={null}
                width={1000}
                style={{ top: 100 }}
            >
                <Spin spinning={spRiwayatRd}>
                    <Table
                        columns={colRiwStsEksterna}
                        dataSource={listRiwayat}
                        size='small'
                        bordered
                        pagination={false} />
                </Spin>
            </Modal>

            <Modal
                // title="Daftar Status Eksterna"
                visible={mdDtStsEksterna}
                onCancel={() => setmdDtStsEksterna(false)}
                closable={false}
                footer={null}
                width={1000}
                style={{ top: 100 }}
            >
                <DetailRiwayatStsEksterna />
            </Modal>
        </div>
    )
}

export default FormPenyinaran