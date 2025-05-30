import { Button, Card, Col, Input, Modal, Row, Space, Table } from 'antd'
import React, { useContext, useState } from 'react'
import { SatuSehatPracticionerContext } from '../context/SatuSehatPracticionerContext'
import dayjs from 'dayjs'
import { CheckOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons'

const SSEditPracticioner = () => {
    const {
        sstoken,
        drId,
        namaDokter,
        namaBag,
        jnsKelamin,
        alamat,
        nik, setnik,
        tglLahir, settglLahir,
        ihsNumber, setihsNumber,
        ipKomp,
        hostKomp,
        userid,
        detailResp, setdetailResp,
        listCariDr, setlistCariDr,
        // md
        setmdEdit,
        mdDetailResp, setmdDetailResp,
        mdCariNIK, setmdCariNIK,
        // sp
        spFormEdit,
        spTbCariNIK,
        // func
        simpanDetailDr,
        getPraktisibyNIK,
        SatuSehatGetToken,
        getCariNIK,
    } = useContext(SatuSehatPracticionerContext)

    const [namaCari, setnamaCari] = useState()

    const columns = [
        {
            title: 'Nama',
            dataIndex: 'Nama',
            key: 'Nama',
        },
        {
            title: 'NIK',
            dataIndex: 'NIK',
            key: 'NIK',
            width: 200,
        },
        {
            title: 'Tgl. Lahir',
            dataIndex: 'TglLahir',
            key: 'TglLahir',
            width: 200,
            render: (text, record, index) =>
                <span>
                    {dayjs(text).format('DD-MM-YYYY')}
                </span>
        },
        {
            title: 'Aksi',
            key: 'operation',
            align: 'center',
            fixed: 'right',
            width: 100,
            render: (text, record, index) =>
                <div>
                    <Button
                        type='primary'
                        onClick={() => {
                            setnik(record.NIK)
                            settglLahir(dayjs(record.TglLahir).format('DD-MM-YYYY'))
                            setmdCariNIK(false)
                        }}
                        icon={<CheckOutlined />}
                        size='small'
                        style={{ width: '25px' }}
                    />
                    {/* <Button
                        type='primary'
                        onClick={() => klikSimpanDb(record)}
                        icon={<SaveOutlined />}
                        size='small'
                        style={{ width: '25px', marginLeft: '2px' }}
                    /> */}
                </div>
        },
    ];

    const klikGetToken = () => {
        SatuSehatGetToken()
    }

    const klikGetIhs = () => {
        if (!nik || nik === null || nik.length === 0) {
            Modal.warn({
                title: 'Informasi!',
                content: 'NIK tidak boleh kosong!',
            });
        }
        else {
            setdetailResp([])
            getPraktisibyNIK(nik)
        }
    }

    const klikSimpan = () => {
        let data = {}

        data.dokterId = drId;
        data.nik = nik;
        data.ihsNumber = ihsNumber;
        data.clientHost = ipKomp;
        data.clientIP = hostKomp;
        data.userId = userid;

        console.log('klikSimpan : ', data);
        simpanDetailDr(data)
    }

    const klikSesuai = () => {
        setihsNumber(detailResp.resource.id)
        setmdDetailResp(false)
    }

    const klikCariNIK = () => {
        setmdCariNIK(true)
        setnamaCari(namaDokter)
        setlistCariDr([])
    }

    const klikCariNama = (data) => {
        getCariNIK(data)
    }

    return (
        <>
            <Card
                title='Detail Dokter'
                loading={spFormEdit}
                size='small'
                headStyle={{ backgroundColor: '#36cfc9' }}>
                <Row style={{ marginBottom: '3px' }}>
                    <Col span={4}>
                        Dokter Id
                    </Col>
                    <Col span={20}>
                        : {drId}
                    </Col>
                </Row>
                <Row style={{ marginBottom: '3px' }}>
                    <Col span={4}>
                        Nama Dokter
                    </Col>
                    <Col span={20}>
                        : {namaDokter}
                    </Col>
                </Row>
                <Row style={{ marginBottom: '3px' }}>
                    <Col span={4}>
                        Nama Bagian
                    </Col>
                    <Col span={20}>
                        : {namaBag}
                    </Col>
                </Row>
                <Row style={{ marginBottom: '3px' }}>
                    <Col span={4}>
                        Jenis Kelamin
                    </Col>
                    <Col span={20}>
                        : {jnsKelamin}
                    </Col>
                </Row>
                <Row style={{ marginBottom: '3px' }}>
                    <Col span={4}>
                        Alamat
                    </Col>
                    <Col span={20}>
                        : {alamat}
                    </Col>
                </Row>
                <Row style={{ marginBottom: '3px' }}>
                    <Col span={4}>
                        NIK
                    </Col>
                    <Col span={20}>
                        <Space>
                            <Input
                                value={nik}
                                placeholder='...'
                                maxLength={16}
                                onChange={(e) => setnik(e.target.value)}
                                size='small'
                                style={{ width: '200px' }} />
                            <Button
                                onClick={() => klikCariNIK()}
                                type='primary'
                                size='small'
                                icon={<SearchOutlined />} >
                                Cari NIK
                            </Button>
                        </Space>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '3px' }}>
                    <Col span={4}>
                        Tanggal Lahir
                    </Col>
                    <Col span={20}>
                        : {tglLahir}
                    </Col>
                </Row>
                <Row style={{ marginBottom: '3px' }}>
                    <Col span={4}>
                        Ihs Number
                    </Col>
                    <Col span={20}>
                        <Space>
                            <Input
                                value={ihsNumber}
                                placeholder='...'
                                onChange={(e) => setihsNumber(e.target.value)}
                                // readOnly
                                size='small'
                                style={{ width: '200px' }} />
                            <Button
                                disabled={nik && sstoken ? false : true}
                                onClick={() => klikGetIhs()}
                                type='primary'
                                size='small'
                            >
                                Get Ihs Number
                            </Button>
                            {/* <Button
                                // disabled={!nik}
                                onClick={() => klikGetToken()}
                                type='primary'
                                size='small'
                            >
                                Get Token
                            </Button> */}
                        </Space>
                    </Col>
                </Row>

                <hr />

                <Space style={{ float: 'right' }}>
                    <Button
                        type='primary'
                        onClick={() => klikSimpan(false)}
                        style={{ width: '75px' }}>
                        Simpan
                    </Button>
                    <Button
                        onClick={() => setmdEdit(false)}
                        style={{ width: '75px' }}>
                        Batal
                    </Button>
                </Space>
            </Card>

            <Modal
                visible={mdCariNIK}
                title="Cari NIK dengan nama :"
                width={1000}
                footer={null}
                closable={false}
                onCancel={() => setmdCariNIK(false)}
                style={{ top: 150 }}
            >
                <Row style={{ marginBottom: '5px' }}>
                    <Col span={2}>
                        Nama :
                    </Col>
                    <Col span={20}>
                        <Space>
                            <Input
                                value={namaCari}
                                placeholder='...'
                                // maxLength={16}
                                onChange={(e) => setnamaCari(e.target.value)}
                                size='small'
                                style={{ width: '200px' }}
                            />
                            <Button
                                onClick={() => klikCariNama(namaCari)}
                                type='primary'
                                size='small'
                                icon={<SearchOutlined />} >
                                Cari
                            </Button>
                            <span> - {namaDokter}</span>
                        </Space>
                    </Col>
                </Row>

                <Table
                    bordered
                    loading={spTbCariNIK}
                    columns={columns}
                    dataSource={listCariDr}
                    size='small'
                    pagination={false}
                />

            </Modal>

            <Modal
                visible={mdDetailResp}
                title="Detail Data Practicioner dari SatuSehat :"
                width={1500}
                footer={null}
                closable={false}
                style={{ top: 150 }}
            >
                <Row>
                    <Col span={12}>
                        <Card
                            title='Resource SatuSehat'
                            size='small'
                            headStyle={{ backgroundColor: '#36cfc9' }}>
                            <Row>
                                <Col span={4}>
                                    IHS Number
                                </Col>
                                <Col span={20}>
                                    : <b>{detailResp.hasOwnProperty('resource') ? detailResp.resource.id : null}</b>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>
                                    Nama
                                </Col>
                                <Col span={20}>
                                    : <b>{detailResp.hasOwnProperty('resource') ? detailResp.resource.name[0].text : null}</b>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>
                                    NIK
                                </Col>
                                <Col span={20}>
                                    : <b>{detailResp.hasOwnProperty('resource') ? detailResp.resource.identifier[1].value : null}</b>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>
                                    Tgl.Lahir
                                </Col>
                                <Col span={20}>
                                    : <b>{detailResp.hasOwnProperty('resource') ? dayjs(detailResp.resource.birthDate).format('DD-MM-YYYY') : null}</b>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>
                                    Jenis Kelamin
                                </Col>
                                <Col span={20}>
                                    : {detailResp.hasOwnProperty('resource') ? detailResp.resource.gender : null}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>
                                    Alamat
                                </Col>
                                <Col span={20}>
                                    : {detailResp.hasOwnProperty('resource') ? detailResp.resource.address[0].line : null}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>
                                    Terakhir diUpdate
                                </Col>
                                <Col span={20}>
                                    : {detailResp.hasOwnProperty('resource') ? dayjs(detailResp.resource.meta.lastUpdated).format('DD-MM-YYYY') : null}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>
                                    Full Url
                                </Col>
                                <Col span={20}>
                                    : {detailResp.fullUrl}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>
                                    Resource Type
                                </Col>
                                <Col span={20}>
                                    : {detailResp.hasOwnProperty('resource') ? detailResp.resource.resourceType : null}
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card
                            title='Resource Lokal'
                            size='small'
                            headStyle={{ backgroundColor: '#4096ff' }}>
                            <Row>
                                <Col span={4}>
                                    IHS Number
                                </Col>
                                <Col span={20}>
                                    : <b>-</b>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>
                                    Nama
                                </Col>
                                <Col span={20}>
                                    : <b>{namaDokter}</b>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>
                                    NIK
                                </Col>
                                <Col span={20}>
                                    : <b>{nik}</b>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>
                                    Tgl.Lahir
                                </Col>
                                <Col span={20}>
                                    : <b>{tglLahir}</b>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>
                                    Jenis Kelamin
                                </Col>
                                <Col span={20}>
                                    : {jnsKelamin}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>
                                    Alamat
                                </Col>
                                <Col span={20}>
                                    : {alamat}
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>
                                    Terakhir diUpdate
                                </Col>
                                <Col span={20}>
                                    : -
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>
                                    Full Url
                                </Col>
                                <Col span={20}>
                                    : -
                                </Col>
                            </Row>
                            <Row>
                                <Col span={4}>
                                    Resource Type
                                </Col>
                                <Col span={20}>
                                    : -
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
                                onClick={() => setmdDetailResp(false)}
                                style={{ width: '150px' }}
                                icon={<CloseOutlined />}
                            >
                                Tidak Sesuai
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default SSEditPracticioner