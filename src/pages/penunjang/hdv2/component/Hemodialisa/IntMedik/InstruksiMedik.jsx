import React, { useContext, useState } from 'react';
import HdContext from '../../../HdContext';
import {
    Card,
    Form,
    Select,
    InputNumber,
    Input,
    Row,
    Col,
    Button,
    Spin,
    message,
    Modal,
    Space,
    Alert,
    Divider,
    Table
} from 'antd';
import {
    CloudDownloadOutlined
} from '@ant-design/icons';
import HeparinasiFalse from './HeparinasiFalse';
import HeparinasiTrue from './HeparinasiTrue';
import PemeriksaanFisik from './PemeriksaanFisik';
import dayjs from 'dayjs';

const {
    PasiensContext,
} = HdContext;

const { Option } = Select;
const { TextArea } = Input;

function InstruksiMedik() {
    const props = useContext(PasiensContext)

    const [mdDaftarObat, setmdDaftarObat] = useState(false)

    const columnsa = [
        {
            title: 'NAMA BARANG',
            dataIndex: 'NAMABARANG',
            key: 'NAMABARANG',
            // align: 'center',
            // width: 50,
        },
        {
            title: 'QTY BARANG',
            dataIndex: 'QTYBAR',
            key: 'QTYBAR',
            align: 'center',
        },
        {
            title: 'SATUAN',
            dataIndex: 'SATUAN',
            key: 'SATUAN',
            align: 'center',
        },
        {
            title: 'ATURAN PAKAI',
            dataIndex: 'KODEATRPK',
            key: 'KODEATRPK',
            align: 'center',
        },
        // {
        //     title: "Aksi",
        //     key: "operation",
        //     fixed: "right",
        //     align: "center",
        //     width: 90,
        //     render: (text, record, index) => (
        //         <Space size="small">
        //             <Button
        //                 onClick={() => klikEditImp(index)}
        //                 type="primary"
        //                 icon={<EditOutlined />}
        //                 // disabled={record.StsDatang}
        //                 // disabled
        //                 size="small"
        //                 style={{ width: '30px' }}
        //             />
        //             <Button
        //                 type="primary"
        //                 danger
        //                 onClick={() => klikDelImp(index)}
        //                 size="small"
        //                 style={{ width: '30px' }}
        //             >
        //                 <DeleteOutlined />
        //             </Button>
        //         </Space>
        //     ),
        // },
    ]

    const columnsb = [
        {
            title: 'NAMA BARANG',
            dataIndex: 'NAMABARANG',
            key: 'NAMABARANG',
            // align: 'center',
            // width: 50,
        },
        {
            title: 'QTY BARANG',
            dataIndex: 'QTYBAR',
            key: 'QTYBAR',
            align: 'center',
        },
        {
            title: 'SATUAN',
            dataIndex: 'SATRSP',
            key: 'SATRSP',
            align: 'center',
        },
        {
            title: 'ATURAN PAKAI',
            dataIndex: 'KODEATRPK',
            key: 'KODEATRPK',
            align: 'center',
        },
        // {
        //     title: "Aksi",
        //     key: "operation",
        //     fixed: "right",
        //     align: "center",
        //     width: 90,
        //     render: (text, record, index) => (
        //         <Space size="small">
        //             <Button
        //                 onClick={() => klikEditImp(index)}
        //                 type="primary"
        //                 icon={<EditOutlined />}
        //                 // disabled={record.StsDatang}
        //                 // disabled
        //                 size="small"
        //                 style={{ width: '30px' }}
        //             />
        //             <Button
        //                 type="primary"
        //                 danger
        //                 onClick={() => klikDelImp(index)}
        //                 size="small"
        //                 style={{ width: '30px' }}
        //             >
        //                 <DeleteOutlined />
        //             </Button>
        //         </Space>
        //     ),
        // },
    ]


    const klikSimpan = () => {
        !props.jenisKasus ? Modal.warning({ title: 'Peringatan!', content: 'Jenis masih kosong!' }) :
            !props.mode ? Modal.warning({ title: 'Peringatan!', content: 'Mode masih kosong!' }) :
                !props.durasi ? Modal.warning({ title: 'Peringatan!', content: 'Durasi masih kosong!' }) :
                    !props.qb ? props.setQb(100) :
                        !props.qb1 ? Modal.warning({ title: 'Peringatan!', content: 'Qb range masih kosong!' }) :
                            props.qb1 < props.qb ? Modal.warning({ title: 'Peringatan!', content: 'Range Qb masih salah!' }) :
                                !props.qd ? Modal.warning({ title: 'Peringatan!', content: 'Qd masih Kosong!' }) :
                                    // !props.ufGoal ? message.warning("UF Goal masih Kosong!") :
                                    !props.conductivity ? Modal.warning({ title: 'Peringatan!', content: 'Conductivity masih Kosong!' }) :
                                        !props.suhu ? Modal.warning({ title: 'Peringatan!', content: 'Temperature masih Kosong!' }) :
                                            !props.na ? Modal.warning({ title: 'Peringatan!', content: 'Na masih Kosong!' }) :
                                                !props.dokterPelaksanaId ? Modal.warning({ title: 'Peringatan!', content: 'Dokter Penanggung Jawab masih Kosong!' }) :
                                                    props.pemeriksaanFisik && props.user !== props.pemeriksaanFisik ? Modal.warning({ title: 'Peringatan!', content: 'User Anda dan User Entry berbeda, tidak bisa simpan!' }) :
                                                        props.klikIntMedik()
    }

    const klikRst = () => {
        props.setDialisisHeaderId('')
    }

    const klikDaftarObat = (sReg, sRuangId) => {
        setmdDaftarObat(true);
        console.log('klikDaftarObat : ', sReg, sRuangId);
        props.getDataObat(sReg, sRuangId);
    }

    return (
        <>
            <Card
                loading={props.spinIntMedik}
                style={{ marginBottom: "8px", backgroundColor: "#e6f7ff" }}>
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                // labelAlign="left"
                >
                    <Spin spinning={props.spPlanTerapi}>
                        {
                            Object.keys(props.dataPlanTerapi).length === 0 ?
                                <Alert
                                    message="Informasi Plan Terapi Tindakan Penunjang"
                                    description="Belum ada Plan Terapi yang tersimpan atau yang tervalidasi."
                                    type="warning"
                                    showIcon
                                    style={{ marginBottom: '5px' }}
                                />
                                :
                                <Alert
                                    message="Informasi Plan Terapi Tindakan Penunjang dari Poli HD"
                                    description={props.dataPlanTerapi.Planning +
                                        ". Nama Pelaksana : " + props.dataPlanTerapi.NamaPelaksana +
                                        ". Verifikasi : " + dayjs(props.dataPlanTerapi.VerifiedTime).format("DD-MM-YYYY HH:mm") +
                                        ". No.Registrasi : " + props.dataPlanTerapi.RegistrasiId}
                                    type="info"
                                    showIcon
                                    style={{ marginBottom: '5px' }}
                                />
                        }
                    </Spin>

                    <Row>
                        <Col span={24}>
                            <Card
                                style={{
                                    marginBottom: "8px",
                                    height: "200px"
                                }}>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Jenis"
                                            style={{ marginBottom: "0px" }}>
                                            <Select
                                                value={props.jenisKasus ? props.jenisKasus : "1"}
                                                onChange={props.changeJenisKasus}
                                                size="small"
                                                style={{ width: "85%" }}>
                                                <Option value="1">Inisiasi</Option>
                                                <Option value="2">Akut</Option>
                                                <Option value="3">Rutin</Option>
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            label="Mode"
                                            style={{ marginBottom: "0px" }}>
                                            <Select
                                                value={props.mode ? props.mode : "1"}
                                                onChange={props.changeMode}
                                                size="small"
                                                style={{ width: "85%" }}>
                                                <Option value="1">Ultrafiltrasi</Option>
                                                <Option value="2">Konstan</Option>
                                                <Option value="3">Pre-op</Option>
                                                <Option value="4">SLED</Option>
                                                <Option value="5">Squenultrafiltrasi</Option>
                                                <Option value="6">Profiling</Option>
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            label="Dialisat"
                                            style={{ marginBottom: "0px" }}>
                                            <Select
                                                value={props.dialisat ? props.dialisat : "1"}
                                                onChange={props.changeDialisat}
                                                size="small"
                                                style={{ width: "85%" }} >
                                                <Option value="1">Bicarbonat</Option>
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            label="Durasi"
                                            style={{ marginBottom: "0px" }}>
                                            <InputNumber
                                                value={props.durasi ? props.durasi : 0}
                                                onChange={props.changeDurasi}
                                                size="small"
                                                min={0}
                                                max={9} />
                                            <span>&ensp;jam</span>
                                        </Form.Item>

                                        <Form.Item
                                            label="Kec.Aliran Darah (QB)"
                                            style={{ marginBottom: "0px" }}>
                                            <InputNumber
                                                value={props.qb ? props.qb : 100}
                                                onChange={props.changeQb}
                                                size="small"
                                                min={100}
                                                style={{ width: '30%' }} />
                                            <span>&ensp;-&ensp;</span>
                                            <InputNumber
                                                value={props.qb1 ? props.qb1 : 100}
                                                onChange={props.changeQb1}
                                                size="small"
                                                min={100}
                                                style={{ width: '30%' }} />
                                            <span>&ensp;ml/mnt</span>
                                        </Form.Item>

                                        <Form.Item
                                            label="Kec.Aliran Dialisat (QD)"
                                            style={{ marginBottom: "0px" }}>
                                            <Select
                                                value={props.qd ? props.qd : 300}
                                                onChange={props.changeQd}
                                                size="small"
                                                style={{ width: "85%" }}>
                                                <Option value={300}>300</Option>
                                                <Option value={500}>500</Option>
                                                <Option value={800}>800</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item
                                            label="UF Goal"
                                            style={{ marginBottom: "0px" }}>
                                            <InputNumber
                                                value={props.ufGoal ? props.ufGoal : 0}
                                                onChange={props.changeUfGoal}
                                                size="small"
                                                min={0} />
                                            <span>&ensp;ml</span>
                                        </Form.Item>

                                        <Form.Item
                                            label="Conductivity"
                                            style={{ marginBottom: "0px" }}>
                                            <InputNumber
                                                value={props.conductivity ? props.conductivity : 0}
                                                onChange={props.changeConductivity}
                                                size="small"
                                                min={0}
                                                defaultValue={0} />
                                        </Form.Item>

                                        <Form.Item
                                            label="Temperatur"
                                            style={{ marginBottom: "0px" }}>
                                            <InputNumber
                                                value={props.suhu ? props.suhu : 0}
                                                onChange={props.changeSuhu}
                                                size="small"
                                                min={0} />
                                            <span>&ensp;'C</span>
                                        </Form.Item>

                                        <Form.Item
                                            label="Na"
                                            style={{ marginBottom: "0px" }}>
                                            <InputNumber
                                                value={props.na ? props.na : 0}
                                                onChange={props.changeNa}
                                                size="small"
                                                min={0} />
                                        </Form.Item>

                                        <Form.Item
                                            label="Na Concentrat"
                                            style={{ marginBottom: "0px" }}>
                                            <InputNumber
                                                value={props.naContentrat ? props.naContentrat : 0}
                                                onChange={props.changeNaContentrat}
                                                size="small"
                                                min={0} />
                                            <span>&ensp;mmol/lt</span>
                                        </Form.Item>

                                        <Form.Item
                                            label="UF Rate"
                                            style={{ marginBottom: "0px" }}>
                                            <InputNumber
                                                value={props.uf1 ? props.uf1 : 0}
                                                onChange={props.changeUf1}
                                                size="small"
                                                min={0}
                                                style={{ width: "70px" }} />
                                            <span>&ensp;/&ensp;</span>
                                            <InputNumber
                                                value={props.uf2 ? props.uf2 : 0}
                                                onChange={props.changeUf2}
                                                size="small"
                                                min={0}
                                                style={{ width: "70px" }} />
                                            <span>&ensp;/&ensp;</span>
                                            <InputNumber
                                                value={props.uf3 ? props.uf3 : 0}
                                                onChange={props.changeUf3}
                                                size="small"
                                                min={0}
                                                style={{ width: "70px" }} />
                                            <span>&ensp;/&ensp;</span>
                                            <InputNumber
                                                value={props.uf4 ? props.uf4 : 0}
                                                onChange={props.changeUf4}
                                                size="small"
                                                min={0}
                                                style={{ width: "70px" }} />
                                            <span>&ensp;/&ensp;</span>
                                            <InputNumber
                                                value={props.uf5 ? props.uf5 : 0}
                                                onChange={props.changeUf5}
                                                size="small"
                                                min={0}
                                                style={{ width: "70px" }} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>

                    <Row style={{ marginBottom: '8px' }}>
                        <Col span={24}>
                            <Card
                                title="Heparinisasi"
                                size="small"
                                headStyle={{ backgroundColor: "#91d5ff" }}
                                style={{
                                    width: "100%",
                                    margin: "auto",
                                    // height: "224px"
                                }}
                            >
                                <Row>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Heparinasi"
                                            style={{ marginBottom: "0px" }}>
                                            <Select
                                                value={props.heparinasi}
                                                onChange={props.changeHeparinasi}
                                                size="small"
                                                style={{ width: "100%" }} >
                                                <Option value={true}>Ya</Option>
                                                <Option value={false}>Tidak</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                {props.showHeparisani ? <HeparinasiTrue /> : <HeparinasiFalse />}

                            </Card>
                        </Col>
                    </Row>

                    <Card
                        style={{
                            marginBottom: "5px"
                        }}>
                        <span>Pemeriksaan Fisik :</span>
                        <Card style={{ marginTop: '5px', backgroundColor: "#e6f7ff" }}>
                            <PemeriksaanFisik />
                        </Card>
                        {/* <TextArea
                                    value={props.pemeriksaanFisik}
                                    onChange={props.changePemeriksaanFisik}
                                    rows={5}
                                    style={{ width: "150%" }} /> */}
                    </Card>

                    <Card
                        style={{
                            marginBottom: "5px"
                        }}>
                        <Row style={{ marginBottom: '5px' }}>
                            <Col span={12}>
                                <span>Terapi selama HD :</span>
                            </Col>
                            <Col span={12}>
                                <Button
                                    // disabled={noReg.length === 0 ? true : false}
                                    onClick={() => klikDaftarObat(props.pasien.result.registrasiId, props.pasien.result.ruangId)}
                                    type='default'
                                    size='small'
                                    style={{ width: '50%', float: 'right' }}>
                                    Daftar Order Obat
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <TextArea
                                    value={props.terapiHd ? props.terapiHd : ""}
                                    onChange={(e) => props.setTerapiHd(e.target.value)}
                                    rows={4}
                                    style={{ width: "150%", marginBottom: "5px" }} />
                            </Col>
                        </Row>

                        <span>Dokter Penanggung Jawab :</span>
                        <Input.Group compact>
                            <Select
                                value={props.dokterPelaksanaId}
                                onChange={props.changeDokterPelaksanaId}
                                size="small"
                                showSearch
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                style={{ width: "94%" }}>
                                {props.optDpjp.map((optDokter, index) => (
                                    <Option key={index} value={optDokter.dokterId}>{optDokter.namaDokter}</Option>
                                ))}
                            </Select>
                            <Button
                                onClick={() => props.onClickLoadMst()}
                                type="primary"
                                size="small"
                                style={{ width: '6%' }}>
                                <CloudDownloadOutlined />
                            </Button>
                        </Input.Group>
                    </Card>

                    {/* <Space>
                        <Button
                            type='primary'
                            onClick={() => klikRst()}>
                            Rst DialisisHeaderId
                        </Button>
                    </Space> */}
                    <Button
                        loading={props.spinIntMedik}
                        // onClick={() => {
                        //     !props.jenisKasus ? message.warning("Jenis masih kosong!") :
                        //         !props.mode ? message.warning("Mode masih kosong!") :
                        //             !props.durasi ? message.warning("Durasi masih kosong!") :
                        //                 !props.qb ? props.setQb(100) :
                        //                     !props.qb1 ? message.warning("Qb range masih kosong!") :
                        //                         props.qb1 < props.qb ? message.warning("Range Qb masih salah!") :
                        //                             !props.qd ? message.warning("Qd masih Kosong!") :
                        //                                 // !props.ufGoal ? message.warning("UF Goal masih Kosong!") :
                        //                                 !props.conductivity ? message.warning("Conductivity masih Kosong!") :
                        //                                     !props.suhu ? message.warning("Temperature masih Kosong!") :
                        //                                         !props.na ? message.warning("Na masih Kosong!") :
                        //                                             !props.dokterPelaksanaId ? message.warning("Dokter Penanggung Jawab masih Kosong!") :
                        //                                                 props.pemeriksaanFisik && props.user !== props.pemeriksaanFisik ? message.warning("User Anda dan User Entry berbeda, tidak bisa simpan!") :
                        //                                                     props.klikIntMedik()
                        // }}
                        onClick={() => klikSimpan()}
                        disabled={props.btnKeluhan}
                        type="primary"
                        style={{ float: "right" }}>
                        Simpan Instruksi Medik
                    </Button>
                </Form>

            </Card>

            <Modal
                title="Data Order/ Validasi Obat"
                open={mdDaftarObat}
                onCancel={() => setmdDaftarObat(false)}
                closable={false}
                footer={null}
                width={800}
                style={{ top: 100 }}
            >
                <Spin
                    tip="Mengambil Data Obat"
                    spinning={props.spListObat}>
                    <Divider
                        orientation='left'
                        style={{ backgroundColor: '#d9f7be', margin: '0px' }}>
                        Daftar Order Obat
                    </Divider>

                    {props.listOrderObat.map((item, index) => (
                        <div>
                            <hr />
                            <Row>
                                <Col span={5}>
                                    <span>No.Order : {item.NOORDER}</span>
                                </Col>
                                <Col span={5}>
                                    <span>No.Reg. : {item.NOREG}</span>
                                </Col>
                                <Col span={5}>
                                    <span>Tgl.Order : {dayjs(item.TGLORDER).format('DD-MM-YYYY')}</span>
                                </Col>
                                <Col span={9}>
                                    <span>Apt.Tujuan : {item.NAMABAGIAN}</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <span>Daftar Obat Paten :</span>
                                </Col>
                            </Row>
                            <Table
                                columns={columnsa}
                                dataSource={item.Paten}
                                size='small'
                                onRow={(record, rowIndex) => {
                                    return {
                                        onClick: () => {
                                            let tempObat =
                                                (props.terapiHd ? props.terapiHd : "") +
                                                (!props.terapiHd ? "" : ",\n") +
                                                record.NAMABARANG +
                                                " : " +
                                                record.QTYBAR +
                                                " " +
                                                record.SATUAN
                                            if (tempObat.length <= 4000) {
                                                props.setTerapiHd(tempObat);
                                                Modal.info({
                                                    title: "Sukses",
                                                    content: `Anda memasukkan ${record.NAMABARANG + " : " + record.QTYBAR + " " + record.SATUAN}`,
                                                });
                                            } else {
                                                Modal.error({
                                                    title: "Error",
                                                    content:
                                                        "Inputan Pemeriksaan Penunjang tidak boleh lebih dari 4000 karakter!",
                                                });
                                            }
                                        },
                                    };
                                }}
                                // scroll={{
                                //     y: 310,
                                // }}
                                bordered
                                pagination={false}
                            // style={{ marginTop: '2px', width: '98%' }} 
                            />
                            <Row>
                                <Col>
                                    <span>Daftar Obat Racikan :</span>
                                </Col>
                            </Row>
                            <Table
                                columns={columnsa}
                                dataSource={item.Racik}
                                size='small'
                                onRow={(record, rowIndex) => {
                                    return {
                                        onClick: () => {
                                            let tempObat =
                                                (props.terapiHd ? props.terapiHd : "") +
                                                (!props.terapiHd ? "" : ", ") +
                                                record.NAMABARANG +
                                                " : " +
                                                record.QTYBAR +
                                                " " +
                                                record.SATUAN
                                            if (tempObat.length <= 4000) {
                                                props.setTerapiHd(tempObat);

                                            } else {
                                                Modal.error({
                                                    title: "Error",
                                                    content:
                                                        "Inputan Pemeriksaan Penunjang tidak boleh lebih dari 4000 karakter!",
                                                });
                                            }
                                        },
                                    };
                                }}
                                // scroll={{
                                //     y: 310,
                                // }}
                                bordered
                                pagination={false}
                            // style={{ marginTop: '2px', width: '98%' }}
                            />
                        </div>
                    ))}

                    <Divider
                        orientation='left'
                        style={{ backgroundColor: '#d9f7be', margin: '0px' }}>
                        Daftar Obat Tervalidasi
                    </Divider>

                    {props.listValidObat.map((item, index) => (
                        <div>
                            <hr />
                            <Row>
                                <Col span={5}>
                                    <span>No.Resep : {item.NORESEP}</span>
                                </Col>
                                <Col span={5}>
                                    <span>No.Reg. : {item.NOREG}</span>
                                </Col>
                                <Col span={5}>
                                    <span>Tgl.Resep : {dayjs(item.TGLRESEP).format('DD-MM-YYYY')}</span>
                                </Col>
                                <Col span={9}>
                                    <span>Apt.Tujuan : {item.NAMABAGIAN}</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <span>Daftar Obat Tervalidasi :</span>
                                </Col>
                            </Row>
                            <Table
                                columns={columnsb}
                                dataSource={item.Obat}
                                size='small'
                                onRow={(record, rowIndex) => {
                                    return {
                                        onClick: () => {
                                            let tempObat =
                                                (props.terapiHd ? props.terapiHd : "") +
                                                (!props.terapiHd ? "" : ", ") +
                                                record.NAMABARANG +
                                                " : " +
                                                record.QTYBAR +
                                                " " +
                                                record.SATRSP
                                            if (tempObat.length <= 4000) {
                                                props.setTerapiHd(tempObat);
                                                Modal.info({
                                                    title: "Sukses",
                                                    content: `Anda memasukkan ${record.NAMABARANG + " : " + record.QTYBAR + " " + record.SATRSP}`,
                                                });
                                            } else {
                                                Modal.error({
                                                    title: "Error",
                                                    content:
                                                        "Inputan terapi tidak boleh lebih dari 4000 karakter!",
                                                });
                                            }
                                        },
                                    };
                                }}
                                // scroll={{
                                //     y: 310,
                                // }}
                                bordered
                                pagination={false}
                            // style={{ marginTop: '2px', width: '98%' }} 
                            />
                        </div>
                    ))}
                </Spin>
            </Modal>
        </>
    )
}

export default InstruksiMedik
