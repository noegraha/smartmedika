import React, { useContext } from 'react';
import HdContext from '../../../HdContext';
import {
    Card,
    Form,
    InputNumber,
    Select,
    Row,
    Col,
    Input,
    Button,
    DatePicker,
    Tooltip,
    message,
    Modal
} from 'antd';
import {
    CloudDownloadOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

const {
    PasiensContext,
} = HdContext;

function PostHd() {
    const props = useContext(PasiensContext)

    const total = props.volumeSisaPriming + props.inTake + props.naCl + props.transfusi + props.bilasAkhir

    const klikSimpan = () => {
        !props.durasi ? Modal.warning({ title: 'Peringatan!', content: 'Durasi masih kosong!' }) :
            // !props.disabledWaktuSelesai ? message.warning("Intra HD belum tersimpan!") :
            !props.tekananDarahSistolika ? Modal.warning({ title: 'Peringatan!', content: 'TD Sistole masih kosong!' }) :
                !props.tekananDarahDiastolika ? Modal.warning({ title: 'Peringatan!', content: 'TD Diastole masih kosong!' }) :
                    !props.frekuensiNadia ? Modal.warning({ title: 'Peringatan!', content: 'Nadi masih kosong!' }) :
                        !props.frekuensiNafasa ? Modal.warning({ title: 'Peringatan!', content: 'RR masih kosong!' }) :
                            !props.suhuTubuha ? Modal.warning({ title: 'Peringatan!', content: 'Suhu masih kosong!' }) :
                                !props.suhuTubuha ? Modal.warning({ title: 'Peringatan!', content: 'Suhu masih kosong!' }) :
                                    !props.bba ? Modal.warning({ title: 'Peringatan!', content: 'Berat badan masih kosong!' }) :
                                        props.infeksius === '' || props.infeksius === null ? Modal.warning({ title: 'Peringatan!', content: 'Infeksius belum dipilih! ' + props.infeksius }) :
                                            props.infeksius === true && !props.ketInfeksius ? Modal.warning({ title: 'Peringatan!', content: 'Keterangan Infeksius tidak boleh kosong!' }) :
                                                // props.dialsiser === 'Baru' && props.infeksius !== true ? Modal.warning({ title: 'Peringatan!', content: 'Dialsiser Single-Use, INFEKSIUS wajib YA dan KET.INFEKSIUS harus diisi!' }) :
                                                !props.prwtAssId ? Modal.warning({ title: 'Peringatan!', content: 'Perawat Akses Vaskuler masih kosong!' }) :
                                                    !props.prwtPrimerId ? Modal.warning({ title: 'Peringatan!', content: 'Perawat Penanggung Jawab masih kosong!' }) :
                                                        props.userEntry && props.user !== props.userEntry ? Modal.warning({ title: 'Peringatan!', content: 'User Anda dan User Entry berbeda, tidak bisa simpan!' }) :
                                                            props.klikPostHd()
    }

    // test infeksius
    // const clearInfeksius1 = () => [
    //     props.setinfeksius('')
    // ]
    // const clearInfeksius2 = () => [
    //     props.setinfeksius(null)
    // ]

    const onChangeInfeksius = (e) => {
        props.setinfeksius(e);
        if (e === false) {
            props.setketInfeksius('')
        }
    }

    return (
        <div>
            <Card
                title="Post HD"
                size="small"
                loading={props.spinPostHd}
                headStyle={{ backgroundColor: "#87e8de" }}
                style={{ width: "100%" }}
            >
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    labelAlign="left"
                >
                    <Row>
                        <Col span={12}>
                            <Card
                                style={{
                                    backgroundColor: "#e6fffb",
                                    height: '225px'
                                }}>

                                <Form.Item
                                    label="Tekanan Darah"
                                    style={{ marginBottom: "0px" }}
                                >
                                    <InputNumber
                                        value={props.tekananDarahSistolika}
                                        onChange={props.changeTekananDarahSistolika}
                                        size="small"
                                        min={0}
                                        defaultValue={0}
                                        style={{ width: "30%" }} />
                                    <span>&ensp;/&ensp;</span>
                                    <InputNumber
                                        value={props.tekananDarahDiastolika}
                                        onChange={props.changeTekananDarahDiastolika}
                                        size="small"
                                        min={0}
                                        defaultValue={0}
                                        style={{ width: "30%" }} />
                                    <span>&ensp;mmHg</span>
                                </Form.Item>

                                <Form.Item
                                    label="Nadi"
                                    style={{ marginBottom: "0px" }}
                                >
                                    <InputNumber
                                        value={props.frekuensiNadia}
                                        onChange={props.changeFrekuensiNadia}
                                        size="small"
                                        min={0}
                                        defaultValue={0} />
                                    <span>&ensp;x/mnt&ensp;</span>
                                </Form.Item>

                                <Form.Item
                                    label="RR"
                                    style={{ marginBottom: "0px" }}>
                                    <InputNumber
                                        value={props.frekuensiNafasa}
                                        onChange={props.changeFrekuensiNafasa}
                                        size="small"
                                        min={0}
                                        defaultValue={0} />
                                    <span>&ensp;x/mnt&ensp;</span>
                                </Form.Item>

                                <Form.Item
                                    label="Suhu"
                                    style={{ marginBottom: "0px" }}>
                                    <InputNumber
                                        value={props.suhuTubuha}
                                        onChange={props.changeSuhuTubuha}
                                        size="small"
                                        min={0}
                                        defaultValue={0} />
                                    <span>&ensp;'C&ensp;</span>
                                </Form.Item>

                                <Form.Item
                                    label="BB"
                                    style={{ marginBottom: "0px" }}>
                                    <InputNumber
                                        value={props.bba}
                                        onChange={props.changeBba}
                                        size="small"
                                        min={0}
                                        defaultValue={0} />
                                    <span>&ensp;Kg</span>
                                </Form.Item>

                                <Tooltip
                                    title="Mengacu Waktu Selesai + 15 menit">
                                    <Form.Item
                                        label="Tanggal"
                                        style={{ marginBottom: "0px" }}>
                                        <DatePicker
                                            size="small"
                                            // defaultValue={props.tanggal}
                                            value={props.tanggala}
                                            format={"DD-MM-YYYY HH:mm"}
                                            showTime
                                            disabled
                                        // onChange={(e) => props.setTanggala(e)}
                                        />
                                    </Form.Item>
                                </Tooltip>

                            </Card>
                        </Col>

                        <Col span={12}>
                            <Card
                                style={{
                                    backgroundColor: "#e6fffb",
                                    height: '225px'
                                }}>
                                <Form.Item
                                    label="Volume Sisa Priming"
                                    style={{ marginBottom: "0px" }}>
                                    <InputNumber
                                        value={props.volumeSisaPriming}
                                        onChange={props.changeVolumeSisaPriming}
                                        size="small"
                                        min={0}
                                        defaultValue={0}
                                        style={{ width: "92%" }} />
                                    <span>&ensp;ml</span>
                                </Form.Item>

                                <Form.Item
                                    label="In Take Oral/Mkn/Min"
                                    style={{ marginBottom: "0px" }}>
                                    <InputNumber
                                        value={props.inTake}
                                        onChange={props.changeInTake}
                                        size="small"
                                        min={0}
                                        defaultValue={0}
                                        style={{ width: "92%" }} />
                                    <span>&ensp;ml</span>
                                </Form.Item>

                                <Form.Item
                                    label="Loading NaCl 0,9% / Terapi"
                                    style={{ marginBottom: "0px" }}>
                                    <InputNumber
                                        value={props.naCl}
                                        onChange={props.changeNaCl}
                                        size="small"
                                        min={0}
                                        defaultValue={0}
                                        style={{ width: "92%" }} />
                                    <span>&ensp;ml</span>
                                </Form.Item>

                                <Form.Item
                                    label="Golongan Darah"
                                    style={{ marginBottom: "0px" }}>
                                    <Select
                                        defaultValue="A"
                                        value={props.jenisDarah}
                                        onChange={props.changeJenisDarah}
                                        size="small"
                                        style={{ width: "92%" }} >
                                        <Option key="A" value="A">A</Option>
                                        <Option key="B" value="B">B</Option>
                                        <Option key="AB" value="AB">AB</Option>
                                        <Option key="O" value="O">O</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="Transfusi Darah"
                                    style={{ marginBottom: "0px" }}>
                                    <InputNumber
                                        value={props.transfusi}
                                        onChange={props.changeTransfusi}
                                        size="small"
                                        min={0}
                                        defaultValue={0}
                                        style={{ width: "92%" }} />
                                    <span>&ensp;ml</span>
                                </Form.Item>
                                <Form.Item
                                    label="Bilas Akhir"
                                    style={{ marginBottom: "0px" }}>
                                    <InputNumber
                                        value={props.bilasAkhir}
                                        onChange={props.changeBilasAkhir}
                                        size="small"
                                        min={0}
                                        defaultValue={0}
                                        style={{ width: "92%" }} />
                                    <span>&ensp;ml</span>
                                </Form.Item>

                                <Form.Item
                                    label="Total"
                                    style={{ marginBottom: "0px" }}>
                                    <InputNumber
                                        value={total}
                                        readOnly
                                        size="small"
                                        min={0}
                                        defaultValue={0}
                                        style={{ width: "92%" }} />
                                    <span>&ensp;ml</span>
                                </Form.Item>
                            </Card>

                            {/* <Card
                                title="Discharge Planning"
                                size="small"
                                headStyle={{ backgroundColor: "#87e8de" }}
                                style={{
                                    marginLeft: "5px",
                                    backgroundColor: "#e6fffb"
                                    // width: "100%"
                                }}
                            >
                                <Row>
                                    <Col span={12}>
                                        <Card
                                            style={{
                                                backgroundColor: "#e6fffb",
                                            }}>
                                            <span>Subject :</span>
                                            <TextArea
                                                value={props.subject}
                                                onChange={props.changeSubject}
                                                rows={4}
                                                maxLength={255} />
                                        </Card>
                                    </Col>
                                    <Col span={12}>
                                        <Card
                                            style={{
                                                backgroundColor: "#e6fffb",
                                            }}>
                                            <span>Object :</span>
                                            <TextArea
                                                value={props.object}
                                                onChange={props.changeObject}
                                                rows={4}
                                                maxLength={255} />
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Card
                                            style={{
                                                backgroundColor: "#e6fffb",
                                            }}>
                                            <span>Assesment :</span>
                                            <TextArea
                                                value={props.assesment}
                                                onChange={props.changeAssesment}
                                                rows={4}
                                                maxLength={255} />
                                        </Card>
                                    </Col>
                                    <Col span={12}>
                                        <Card
                                            style={{
                                                backgroundColor: "#e6fffb",
                                            }}>
                                            <span>Plan :</span>
                                            <TextArea
                                                value={props.plann}
                                                onChange={props.changePlann}
                                                rows={4}
                                                maxLength={255} />
                                        </Card>
                                    </Col>
                                </Row>
                            </Card> */}
                        </Col>
                    </Row>

                    <Card
                        style={{
                            backgroundColor: "#fff566"
                        }}>
                        <Row>
                            <Col span={4}>
                                Infeksius :
                            </Col>
                            <Col span={6}>
                                <Select
                                    style={{ width: '100%' }}
                                    placeholder="Pilih.."
                                    value={props.infeksius}
                                    onChange={(e) => onChangeInfeksius(e)}
                                    size='small'
                                >
                                    <Option key={0} value={true}>Infeksius</Option>
                                    <Option key={1} value={false}>Tidak Infeksius</Option>
                                </Select>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '2px' }}>
                            <Col span={4}>
                                Ket. Infeksius :
                            </Col>
                            <Col span={20}>
                                <TextArea
                                    value={props.ketInfeksius}
                                    disabled={!props.infeksius}
                                    onChange={(e) => props.setketInfeksius(e.target.value)}
                                    placeholder='...'
                                    rows={4} />
                            </Col>
                        </Row>
                    </Card>
                    <Card
                        style={{
                            backgroundColor: "#e6fffb"
                        }}>
                        <Row>
                            <Col span={4}>
                                Edukasi Pasien Pulang :
                            </Col>
                            <Col span={20}>
                                <Input.Group compact>
                                    <Select
                                        mode="multiple"
                                        style={{ width: '96%' }}
                                        placeholder="Pilih.."
                                        value={props.kompIntradialisis}
                                        onChange={props.changeKompIntradialisis}
                                        size='small'
                                        showSearch={true}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {props.optDialisisKompIntra.map((optDialKomp, index) => (
                                            <Option key={index} value={optDialKomp.komplikasiIntraId}>{optDialKomp.deskripsi}</Option>
                                        ))}
                                    </Select>
                                    <Button
                                        onClick={() => props.onClickLoadMst()}
                                        type="primary"
                                        size="small"
                                    // style={{ width: '5%' }}
                                    >
                                        <CloudDownloadOutlined />
                                    </Button>
                                </Input.Group>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '2px' }}>
                            <Col span={4}></Col>
                            <Col span={20}>
                                <Input
                                    value={props.subject}
                                    onChange={(e) => props.setSubject(e.target.value)}
                                    placeholder="Lainnya..."
                                    size="small" />
                            </Col>
                        </Row>

                        <hr />

                        <Row>
                            <Col span={4}>
                                Akses Vaskuler oleh :
                            </Col>
                            <Col span={20}>
                                <Input.Group compact>
                                    <Select
                                        // defaultValue="A"
                                        value={props.prwtAssId}
                                        onChange={props.changePrwtAssId}
                                        showSearch={true}
                                        size="small"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        style={{ width: "96%" }}
                                    >
                                        {props.optPerawat.map((optPrwt, index) => (
                                            <Option key={index} value={optPrwt.dokterId}>{optPrwt.namaDokter}</Option>
                                        ))}
                                    </Select>
                                    <Button
                                        onClick={() => props.onClickLoadMst()}
                                        type="primary"
                                        size="small">
                                        <CloudDownloadOutlined />
                                    </Button>
                                </Input.Group>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: '2px' }}>
                            <Col span={4}>
                                Perawat Pen.Jawab :
                            </Col>
                            <Col span={20}>
                                <Input.Group compact>
                                    <Select
                                        value={props.prwtPrimerId}
                                        onChange={props.changePrwtPrimerId}
                                        showSearch
                                        size="small"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        style={{ width: "96%" }} >
                                        {props.optPerawat.map((optPrwt, index) => (
                                            <Option key={index} value={optPrwt.dokterId}>{optPrwt.namaDokter}</Option>
                                        ))}
                                    </Select>
                                    <Button
                                        onClick={() => props.onClickLoadMst()}
                                        type="primary"
                                        size="small">
                                        <CloudDownloadOutlined />
                                    </Button>
                                </Input.Group>
                            </Col>
                        </Row>
                    </Card>

                    <Button
                        type="primary"
                        onClick={() => klikSimpan()}
                        // onClick={() => {
                        //     !props.durasi ? message.warning("Durasi masih kosong!") :
                        //         // !props.disabledWaktuSelesai ? message.warning("Intra HD belum tersimpan!") :
                        //         !props.tekananDarahSistolika ? message.warning("TD Sistole masih kosong!") :
                        //             !props.tekananDarahDiastolika ? message.warning("TD Diastole masih kosong!") :
                        //                 !props.frekuensiNadia ? message.warning("Nadi masih kosong!") :
                        //                     !props.frekuensiNafasa ? message.warning("RR masih kosong!") :
                        //                         !props.suhuTubuha ? message.warning("Suhu masih kosong!") :
                        //                             !props.suhuTubuha ? message.warning("Suhu masih kosong!") :
                        //                                 !props.bba ? message.warning("Berat badan masih kosong!") :
                        //                                     !props.prwtAssId ? message.warning("Perawat Akses Vaskuler masih kosong!") :
                        //                                         !props.prwtPrimerId ? message.warning("Perawat Penanggung Jawab masih kosong!") :
                        //                                             props.userEntry && props.user !== props.userEntry ? message.warning("User Anda dan User Entry berbeda, tidak bisa simpan!") :
                        //                                                 props.klikPostHd()
                        // }}
                        disabled={props.btnKeluhan}
                        loading={props.spinPostHd}
                        style={{
                            float: "right",
                            marginTop: "10px"
                        }}>
                        Simpan Post HD
                    </Button>

                    {/* button test */}
                    {/* <Button
                        onClick={() => clearInfeksius1()}>
                        Reset infeksius ''
                    </Button>
                    <Button
                        onClick={() => clearInfeksius2()}>
                        Reset infeksius null
                    </Button> */}

                </Form>

            </Card>
        </div>
    )
}

export default PostHd
