import { CheckOutlined, CheckSquareTwoTone, CloseOutlined, CloudDownloadOutlined } from '@ant-design/icons'
import { Button, Card, Col, Divider, Input, Modal, Row, Space, Spin, Table } from 'antd'
import React, { useContext } from 'react'
import { SatuSehatEncounterContext } from '../../context/SatuSehatEncounterContext'
import dayjs from 'dayjs'

const IdentitasPx = () => {
    const {
        env,
        identitasPx, setidentitasPx,
        ihsPasien, setihsPasien,
        // form ihs pasien
        ihstgllahir, setihstgllahir,
        ihsalamat, setihsalamat,
        ihsjenkel, setihsjenkel,
        ihsihsnumber, setihsihsnumber,
        ihsnik, setihsnik,
        ihslastupdate, setihslastupdate,
        ihsnama, setihsnama,
        setparamCoverage,
        setssDummySEP,
        // func
        getIhsPasien,
        insertIhsPasien,
        getDataPxDummy,
        getParamCoverage,
        // sp
        spIdentPx,
        // md
        // mdIhsPasien, setmdIhsPasien,
        mdIhsPasienv2, setmdIhsPasienv2,
        // dummy data 
        pxDummy,
    } = useContext(SatuSehatEncounterContext);

    const columns = [
        {
            title: 'No',
            dataIndex: 'index',
            key: 'index',
            align: 'center',
            ellipsis: true,
            width: 30,
            render: (text, record, index) => index + 1,
        },
        {
            title: 'NIK',
            dataIndex: 'Nik',
            align: 'center',
            key: 'Nik',
            width: 150,
        },
        {
            title: 'Nama',
            dataIndex: 'Nama',
            key: 'Nama',
        },
        {
            title: 'Gender',
            dataIndex: 'JenisKelamin',
            key: 'JenisKelamin',
            align: 'center',
            width: 70,
        },
        {
            title: 'Tgl Lahir',
            dataIndex: 'TanggalLahir',
            key: 'TanggalLahir',
            align: 'center',
            width: 100,
            render: (text) => dayjs(text).format('DD-MM-YYYY'),
        },
        {
            title: 'IHS Number',
            dataIndex: 'IHSNumber',
            key: 'IHSNumber',
            align: 'center',
            width: 100,
        },
        {
            title: 'Aksi',
            dataIndex: 'aksi',
            key: 'aksi',
            align: 'center',
            width: 70,
            render: (text, record, index) =>
                <div>
                    <Button
                        type='primary'
                        onClick={() => klikPxDummy(record)}
                        // disabled={!sstoken || record.StsKirim === 'true'}
                        icon={<CheckOutlined />}
                        size='small'
                        style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}
                    />
                </div>
        },
    ];

    const rstDefault = () => {
        setihstgllahir(null);
        setihsalamat(null);
        setihsjenkel(null);
        setihsihsnumber(null);
        setihsnik(null);
        setihslastupdate(null);
        setihsnama(null);
    }

    const klikIhsPasien = (nik) => {
        if (nik) {
            rstDefault();
            getIhsPasien(nik);
        }
        else {
            Modal.warn({
                title: 'Peringatan!',
                content: 'NIK Pasien tidak boleh kosong!',
            });
        }
    }

    const klikSesuai = () => {
        let pasienId = identitasPx ? identitasPx.PasienId : null;

        if (!pasienId) {
            Modal.warn({
                title: "Peringatan",
                content: 'No RM kosong!',
            });
        }
        else if (!ihsihsnumber) {
            Modal.warn({
                title: "Peringatan",
                content: 'Ihs Number kosong!',
            });
        }
        else {
            let data = {}

            data.pasienId = pasienId
            data.ihsNumber = ihsihsnumber

            insertIhsPasien(data)
        }
    }

    const klikPxDummy = (data) => {
        let obj = data;

        // Mengambil 6 digit terakhir
        const lastSixDigits = data.Nik.slice(-4);

        obj.RegistrasiId = identitasPx.RegistrasiId;
        obj.Alamat = 'Alamat Pasien Dummy';
        obj.PasienId = `DM${lastSixDigits}`;

        setidentitasPx(obj);
        setihsPasien(obj.IHSNumber);
        console.log('klikPxDummy : ', data);
    };

    const klikGetDummy = async (sReg) => {
        try {
            let data = await getDataPxDummy(sReg);
            console.log('klikGetDummy : ', data);
            setssDummySEP(data.result);

            const selectedPx = pxDummy.find((item) => item.Nik === data.result.NIK_Dummy_Px);
            klikPxDummy(selectedPx);

            getParamCoverage(identitasPx.RegistrasiId);
        } catch (error) {
            console.error('Error in klikGetDummy:', error);
            Modal.error({
                title: 'Error',
                content: 'Terjadi kesalahan saat mengambil data dummy pasien.',
            });
        }
    }

    return (
        <div>
            <Card>
                <Spin
                    spinning={spIdentPx}
                    tip="Loading... 😁"
                >
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            No.Registrasi
                        </Col>
                        <Col span={4}>
                            <Space size='small'>
                                <span>:</span>
                                <span>{identitasPx ? identitasPx.RegistrasiId : null}</span>
                            </Space>
                        </Col>
                        <Col span={16}>
                            {env === 'stg' ? <Button
                                type='default'
                                onClick={() => klikGetDummy(identitasPx.RegistrasiId)}
                                size='small'
                                style={{ float: 'right', width: '150px' }}
                            >
                                Get Dummy
                            </Button> : null}

                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            No. RM
                        </Col>
                        <Col span={20}>
                            <Space size='small'>
                                <span>:</span>
                                <span>{identitasPx ? identitasPx.PasienId : null}</span>
                            </Space>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            Nama Pasien
                        </Col>
                        <Col span={20}>
                            <Space size='small'>
                                <span>:</span>
                                <span>{identitasPx ? identitasPx.Nama : null}</span>
                            </Space>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            NIK
                        </Col>
                        <Col span={20}>
                            <Space size='small'>
                                <span>:</span>
                                <span>{identitasPx ? identitasPx.Nik : null}</span>
                            </Space>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            Alamat Pasien
                        </Col>
                        <Col span={20}>
                            <Space size='small'>
                                <span>:</span>
                                <span>{identitasPx ? identitasPx.Alamat : null}</span>
                            </Space>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            IHS Number Pasien
                        </Col>
                        <Col span={20}>
                            <Space size='small'>
                                <span>:</span>
                                <Input
                                    value={ihsPasien}
                                    placeholder='...'
                                    readOnly
                                    // maxLength={16}
                                    // onChange={(e) => setnik(e.target.value)}
                                    size='small' />
                                <Button
                                    size='small'
                                    type='primary'
                                    onClick={() => klikIhsPasien(identitasPx.Nik)}
                                    icon={<CloudDownloadOutlined />}
                                >
                                    Ambil IHS Number
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </Spin>



                {env === 'stg' ?
                    <div>
                        <Divider
                            variant="dotted"
                            orientation="left"
                            style={{
                                borderColor: '#7cb305',
                            }}
                        >
                            Dummy Pasien (Stagging)
                        </Divider>

                        <Table
                            bordered
                            // loading={spGetOrganization}
                            columns={columns}
                            dataSource={pxDummy}
                            pagination={false}
                            size='small'
                        />
                    </div> : null}
            </Card>

            <Modal
                visible={mdIhsPasienv2}
                onCancel={() => setmdIhsPasienv2(false)}
                width={1000}
                footer={null}
                closable={false}
                style={{ top: 50 }}
            >
                <Row>
                    <Col span={12}>
                        <Card
                            title='Detail Ihs Pasien'
                            size='small'
                            headStyle={{ backgroundColor: '#36cfc9' }}>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={5}>
                                    Nama
                                </Col>
                                <Col span={19}>
                                    : <b>{ihsnama}</b>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={5}>
                                    IHS Number
                                </Col>
                                <Col span={19}>
                                    : <b>{ihsihsnumber}</b>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={5}>
                                    NIK
                                </Col>
                                <Col span={19}>
                                    : <b>{ihsnik}</b>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={5}>
                                    Jenis Kelamin
                                </Col>
                                <Col span={19}>
                                    : {ihsjenkel}
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={5}>
                                    Terakhir Update
                                </Col>
                                <Col span={19}>
                                    : {ihslastupdate}
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={5}>
                                    Tanggal Lahir
                                </Col>
                                <Col span={19}>
                                    : {ihstgllahir}
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={5}>
                                    Alamat
                                </Col>
                                <Col span={19}>
                                    : {ihsalamat}
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    <Col span={12}>
                        <Card
                            title='Detail Lokal Pasien'
                            size='small'
                            headStyle={{ backgroundColor: '#4096ff' }}>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={5}>
                                    Nama
                                </Col>
                                <Col span={19}>
                                    : <b>{identitasPx ? identitasPx.Nama : null}</b>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={5}>
                                    IHS Number
                                </Col>
                                <Col span={19}>
                                    : -
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={5}>
                                    NIK
                                </Col>
                                <Col span={19}>
                                    : <b>{identitasPx ? identitasPx.Nik : null}</b>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={5}>
                                    Jenis Kelamin
                                </Col>
                                <Col span={19}>
                                    : {identitasPx ? identitasPx.JenisKelamin : null}
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={5}>
                                    Terakhir Update
                                </Col>
                                <Col span={19}>
                                    : -
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={5}>
                                    Tanggal Lahir
                                </Col>
                                <Col span={19}>
                                    : {identitasPx ? dayjs(identitasPx.TanggalLahir).format('DD-MM-YYYY') : null}
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={5}>
                                    Alamat
                                </Col>
                                <Col span={19}>
                                    : {identitasPx ? identitasPx.Alamat : null}
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                <hr />
                <Row>
                    <Col span={24}>
                        <Space style={{ float: 'right' }}>
                            <Button
                                onClick={() => klikSesuai()}
                                type='primary'
                                style={{ width: '150px' }}
                                icon={<CheckOutlined />}
                            >
                                Sesuai
                            </Button>
                            <Button
                                onClick={() => setmdIhsPasienv2(false)}
                                style={{ width: '150px' }}
                                icon={<CloseOutlined />}
                            >
                                Tidak Sesuai
                            </Button>
                        </Space>
                    </Col>
                </Row>

            </Modal>
        </div>
    )
}

export default IdentitasPx