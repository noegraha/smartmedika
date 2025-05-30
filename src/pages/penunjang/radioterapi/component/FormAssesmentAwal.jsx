import { Button, Card, Col, Spin, Input, InputNumber, Row, Select, Space, Tooltip, Typography, Table, Modal } from 'antd'
import React, { useContext } from 'react'
import { RadioterapiContext } from '../context/RadioterapiContext';
import { CloudDownloadOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';

const { Option } = Select;
const { Title } = Typography;
const { TextArea } = Input;

const FormAssesmentAwal = () => {
    const {
        // state
        noReg,
        unitId,
        dataPasien,
        // dataPasien,
        aaBBa,
        aaTBa,
        aaSuhua,
        aaNadia,
        aaRRa,
        aaSistolea,
        aaDiastolea,
        aaAssNyeria,
        aaAssResikoJatuha,
        aaDiagnosaa,
        aaBBb, setaaBBb,
        aaTBb, setaaTBb,
        aaSuhub, setaaSuhub,
        aaNadib, setaaNadib,
        aaRRb, setaaRRb,
        aaSistoleb, setaaSistoleb,
        aaDiastoleb, setaaDiastoleb,
        aaAssNyerib, setaaAssNyerib,
        aaAssResikoJatuhb, setaaAssResikoJatuhb,
        aaDiagnosab, setaaDiagnosab,
        aaDrPenunjang, setaaDrPenunjang,
        aaPlanning, setaaPlanning,
        ttvRajal,
        dxRajal,
        userEntry,
        ipUser,
        hostUser,
        // func
        getLoadDokter,
        simpanTTVPenunjang,
        // mst
        listDokter,
        // sp
        spTTVRajal,
        spTTVRadio,
    } = useContext(RadioterapiContext);

    const columnsa = [
        {
            title: 'Deskripsi',
            dataIndex: 'Deskripsi',
            key: 'Deskripsi',
        },
        {
            title: 'Jenis',
            dataIndex: 'Jenis',
            key: 'Jenis',
        },
    ];

    const klikLoadDokter = () => {
        getLoadDokter("1, 2", "9404");
    };

    const klikSimpan = () => {
        if (!aaDrPenunjang || !aaBBb || !aaTBb || !aaSuhub ||
            !aaNadib || !aaRRb || !aaSistoleb || !aaDiastoleb || !aaAssNyerib ||
            !aaAssResikoJatuhb || !aaDiagnosab) {
            let missingField = !aaDrPenunjang ? 'Dokter Penunjang' :
                !aaBBb ? 'Berat Badan' :
                    !aaTBb ? 'Tinggi Badan' :
                        !aaSuhub ? 'Suhu' :
                            !aaNadib ? 'Nadi' :
                                !aaRRb ? 'RR' :
                                    !aaSistoleb ? 'Sistole' :
                                        !aaDiastoleb ? 'Diastole' :
                                            !aaAssNyerib ? 'Assesment Nyeri' :
                                                !aaAssResikoJatuhb ? 'Resiko Jatuh' :
                                                    !aaDiagnosab ? 'Diagnosa Penunjang' : null;

            Modal.warning({ title: 'Peringatan!', content: `${missingField} masih kosong!` });
        }
        else {
            let data = {};

            data.registrasiId = noReg;
            data.ruangId = unitId;
            data.pegawaiId = aaDrPenunjang;
            data.tanggal = dayjs().format('YYYY-MM-DD');
            data.jam = dayjs().format();
            data.beratBadan = aaBBb;
            data.tinggiBadan = aaTBb;
            data.suhuTubuh = aaSuhub;
            data.frekuensiNadi = aaNadib;
            data.frekuensiNafas = aaRRb;
            data.tekananDarahSistolik = aaSistoleb;
            data.tekananDarahDiastolik = aaDiastoleb;
            data.skorNyeri = aaAssNyerib;
            data.resikoJatuh = aaAssResikoJatuhb;
            data.userId = userEntry;
            data.clientHost = hostUser;
            data.clientIP = ipUser;

            data.noPmr = `${dataPasien.NOPMR}`;
            data.kodePmr = dataPasien.KODEPMR;
            data.unitOrder = dataPasien.UNITORDER;
            data.diagnosa = aaDiagnosab;
            data.planning = aaPlanning;
            data.noOrder = dataPasien.NOORDER;

            console.log('data : ', data);
            console.log('dataPasien : ', dataPasien);

            simpanTTVPenunjang(data);
        }
    };

    return (
        <>
            <Card>
                <Row>
                    <Col span={12}
                        style={{ paddingRight: '5px' }}
                    >
                        <div style={{ width: '100%', paddingLeft: '5px', backgroundColor: '#ffadd2' }}>
                            <Title
                                level={5}
                                style={{ marginBottom: '-5px' }} >
                                Rawat Jalan
                            </Title>
                        </div>
                        <hr />

                        <Spin spinning={spTTVRajal} tip="Mengambil..">
                            <table
                                style={{ borderCollapse: "collapse", width: "100%" }} border={0}>
                                <tbody>
                                    <tr>
                                        <td style={{ width: "16.6667%" }}>B.Badan :</td>
                                        <td style={{ width: "16.6667%" }}>
                                            <InputNumber
                                                value={ttvRajal?.BeratBadan ? ttvRajal.BeratBadan : null}
                                                maxLength={3}
                                                controls={false}
                                                readOnly
                                                addonAfter='Kg'
                                                size='small' />
                                        </td>
                                        <td style={{ width: "16.6667%" }}>&nbsp;T.Badan :</td>
                                        <td style={{ width: "16.6667%" }}>
                                            <InputNumber
                                                value={ttvRajal?.TinggiBadan ? ttvRajal.TinggiBadan : null}
                                                maxLength={3}
                                                controls={false}
                                                readOnly
                                                addonAfter='Cm'
                                                size='small' />
                                        </td>
                                        <td style={{ width: "16.6667%" }}>&nbsp;Suhu :</td>
                                        <td style={{ width: "16.6667%" }}>
                                            <InputNumber
                                                value={ttvRajal?.SuhuTubuh ? ttvRajal.SuhuTubuh : null}
                                                maxLength={4}
                                                controls={false}
                                                readOnly
                                                addonAfter='&#176;C'
                                                size='small' />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "16.6667%" }}>Nadi :</td>
                                        <td style={{ width: "33.3334%" }} colSpan={2}>
                                            <InputNumber
                                                value={ttvRajal?.FrekuensiNadi ? ttvRajal.FrekuensiNadi : null}
                                                maxLength={3}
                                                controls={false}
                                                readOnly
                                                addonAfter='x/mnt'
                                                size='small' />
                                        </td>
                                        <td style={{ width: "16.6667%" }}>&nbsp;RR :</td>
                                        <td style={{ width: "16.6667%" }} colSpan={2}>
                                            <InputNumber
                                                value={ttvRajal?.FrekuensiNafas ? ttvRajal.FrekuensiNafas : null}
                                                maxLength={3}
                                                controls={false}
                                                readOnly
                                                addonAfter='x/mnt'
                                                size='small' />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "16.6667%" }} colSpan={2}>
                                            Tekanan Darah :
                                        </td>
                                        <td style={{ width: "16.6667%" }} colSpan={4}>
                                            <Input.Group compact>
                                                <InputNumber
                                                    value={ttvRajal?.TekananDarahSistolik ? ttvRajal.TekananDarahSistolik : null}
                                                    maxLength={3}
                                                    controls={false}
                                                    readOnly
                                                    addonAfter='/'
                                                    size='small'
                                                    style={{ width: '30%' }} />
                                                <InputNumber
                                                    value={ttvRajal?.TekananDarahDiastolik ? ttvRajal.TekananDarahDiastolik : null}
                                                    maxLength={3}
                                                    controls={false}
                                                    readonly
                                                    addonAfter='mmHg'
                                                    size='small'
                                                    style={{ width: '40%' }} />
                                            </Input.Group>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "16.6667%" }} colSpan={2}>
                                            Assesment Nyeri :
                                        </td>
                                        <td style={{ width: "16.6667%" }} colSpan={4}>
                                            <Select
                                                placeholder="..."
                                                style={{ width: "100%" }}
                                                value={ttvRajal?.SkorNyeri ? ttvRajal.SkorNyeri : null}
                                                size='small'
                                            >
                                                <Option value={1}>Tidak Nyeri (0)</Option>
                                                <Option value={2}>Nyeri Ringan (1-2-3)</Option>
                                                <Option value={3}>Nyeri Sedang (4-5-6)</Option>
                                                <Option value={4}>Nyeri Berat (7-8-9-10)</Option>
                                            </Select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "16.6667%" }} colSpan={2}>
                                            Assesment Resiko Jatuh :
                                        </td>
                                        <td style={{ width: "16.6667%" }} colSpan={4}>
                                            <Select
                                                placeholder="..."
                                                style={{ width: "100%" }}
                                                value={ttvRajal?.ResikoJatuh ? ttvRajal.ResikoJatuh : null}
                                                size='small'
                                            >
                                                <Option value={1}>Tidak Ada Resiko</Option>
                                                <Option value={2}>Resiko Rendah</Option>
                                                <Option value={3}>Resiko Tinggi</Option>
                                            </Select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "16.6667%" }} colSpan={2}>
                                            Diagnosa :
                                        </td>
                                        <td style={{ width: "16.6667%" }} colSpan={4}>
                                            <Table
                                                columns={columnsa}
                                                dataSource={dxRajal}
                                                // loading={spDataPasien}
                                                size='small'
                                                bordered
                                                pagination={false} />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Spin>
                    </Col>

                    <Col span={12}>
                        <div style={{ width: '100%', paddingLeft: '5px', backgroundColor: '#adc6ff' }}>
                            <Title
                                level={5}
                                style={{ marginBottom: '-5px' }} >
                                Penunjang
                            </Title>
                        </div>
                        <hr />

                        <Spin spinning={spTTVRadio} tip="Mengambil..">
                            <table
                                style={{ borderCollapse: "collapse", width: "100%" }} border={0}>
                                <tbody>
                                    <tr>
                                        <td style={{ width: "16.6667%" }}>B.Badan :</td>
                                        <td style={{ width: "16.6667%" }}>
                                            <InputNumber
                                                value={aaBBb}
                                                onChange={(e) => setaaBBb(e)}
                                                maxLength={3}
                                                controls={false}
                                                addonAfter='Kg'
                                                size='small' />
                                        </td>
                                        <td style={{ width: "16.6667%" }}>&nbsp;T.Badan :</td>
                                        <td style={{ width: "16.6667%" }}>
                                            <InputNumber
                                                value={aaTBb}
                                                onChange={(e) => setaaTBb(e)}
                                                maxLength={3}
                                                controls={false}
                                                addonAfter='Cm'
                                                size='small' />
                                        </td>
                                        <td style={{ width: "16.6667%" }}>&nbsp;Suhu :</td>
                                        <td style={{ width: "16.6667%" }}>
                                            <InputNumber
                                                value={aaSuhub}
                                                onChange={(e) => setaaSuhub(e)}
                                                maxLength={4}
                                                controls={false}
                                                addonAfter='&#176;C'
                                                size='small' />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "16.6667%" }}>Nadi :</td>
                                        <td style={{ width: "33.3334%" }} colSpan={2}>
                                            <InputNumber
                                                value={aaNadib}
                                                onChange={(e) => setaaNadib(e)}
                                                maxLength={3}
                                                controls={false}
                                                addonAfter='x/mnt'
                                                size='small' />
                                        </td>
                                        <td style={{ width: "16.6667%" }}>&nbsp;RR :</td>
                                        <td style={{ width: "16.6667%" }} colSpan={2}>
                                            <InputNumber
                                                value={aaRRb}
                                                onChange={(e) => setaaRRb(e)}
                                                maxLength={3}
                                                controls={false}
                                                addonAfter='x/mnt'
                                                size='small' />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "16.6667%" }} colSpan={2}>
                                            Tekanan Darah :
                                        </td>
                                        <td style={{ width: "16.6667%" }} colSpan={4}>
                                            <Input.Group compact>
                                                <InputNumber
                                                    value={aaSistoleb}
                                                    onChange={(e) => setaaSistoleb(e)}
                                                    maxLength={3}
                                                    controls={false}
                                                    addonAfter='/'
                                                    size='small'
                                                    style={{ width: '30%' }} />
                                                <InputNumber
                                                    value={aaDiastoleb}
                                                    onChange={(e) => setaaDiastoleb(e)}
                                                    maxLength={3}
                                                    controls={false}
                                                    addonAfter='mmHg'
                                                    size='small'
                                                    style={{ width: '40%' }} />
                                            </Input.Group>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "16.6667%" }} colSpan={2}>
                                            Assesment Nyeri :
                                        </td>
                                        <td style={{ width: "16.6667%" }} colSpan={4}>
                                            <Select
                                                value={aaAssNyerib}
                                                onChange={(e) => setaaAssNyerib(e)}
                                                size='small'
                                                style={{ width: "100%" }} >
                                                <Option value={1}>Tidak Nyeri (0)</Option>
                                                <Option value={2}>Nyeri Ringan (1-2-3)</Option>
                                                <Option value={3}>Nyeri Sedang (4-5-6)</Option>
                                                <Option value={4}>Nyeri Berat (7-8-9-10)</Option>
                                            </Select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "16.6667%" }} colSpan={2}>
                                            Assesment Resiko Jatuh :
                                        </td>
                                        <td style={{ width: "16.6667%" }} colSpan={4}>
                                            <Select
                                                value={aaAssResikoJatuhb}
                                                onChange={(e) => setaaAssResikoJatuhb(e)}
                                                size='small'
                                                style={{ width: "100%" }} >
                                                <Option value={1}>Tidak Ada Resiko</Option>
                                                <Option value={2}>Resiko Rendah</Option>
                                                <Option value={3}>Resiko Tinggi</Option>
                                            </Select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ width: "16.6667%" }} colSpan={2}>
                                            Diagnosa :
                                        </td>
                                        <td style={{ width: "16.6667%" }} colSpan={4}>
                                            <Input
                                                value={aaDiagnosab}
                                                onChange={(e) => setaaDiagnosab(e.target.value)}
                                                maxLength={100}
                                                size='small' />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Spin>
                    </Col>
                </Row>
                <hr />

                <Spin spinning={spTTVRadio} tip="Mengambil..">
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            Dokter Penunjang :
                        </Col>
                        <Col span={8}>
                            <Input.Group compact>
                                <Select
                                    value={aaDrPenunjang}
                                    onChange={(e) => setaaDrPenunjang(e)}
                                    size='small'
                                    style={{ width: '90%' }}>
                                    {listDokter.map((optListDokter, index) => (
                                        <Option key={index} value={optListDokter.KODEDOKTER}>{optListDokter.NAMADOKTER}</Option>
                                    ))}
                                </Select>
                                <Tooltip title='klik disini jika option Dokter tidak muncul'>
                                    <Button
                                        onClick={() => klikLoadDokter()}
                                        type="primary"
                                        size="small"
                                        style={{ width: '10%' }}
                                    >
                                        <CloudDownloadOutlined />
                                    </Button>
                                </Tooltip>
                            </Input.Group>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '5px' }}>
                        <Col span={4}>
                            Planning/ Tindakan :
                        </Col>
                        <Col span={20}>
                            <TextArea
                                value={aaPlanning}
                                onChange={(e) => setaaPlanning(e.target.value)}
                                rows={4}
                            />
                        </Col>
                    </Row>


                    <Row >
                        <Col span={12}>
                        </Col>
                        <Col span={12}>
                            {/* <Space style={{ float: 'right' }}>
                            <Button
                                type='ghost'
                                style={{ width: '75px' }} >
                                Cetak
                            </Button>
                        </Space> */}
                            <Button
                                onClick={() => klikSimpan()}
                                type='primary'
                                disabled={noReg ? false : true}
                                style={{ width: '75px', float: 'right' }} >
                                Simpan
                            </Button>
                        </Col>
                    </Row>
                </Spin>
            </Card>
        </>
    )
}

export default FormAssesmentAwal