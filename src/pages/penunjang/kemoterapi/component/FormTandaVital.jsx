import React from 'react'
import {
    Form,
    Row,
    Col,
    Button,
    Input,
    Select,
    Card,
    Tooltip,
    InputNumber,
    Modal,
    Spin,
} from 'antd';

const { Option } = Select;

const FormTandaVital = () => {
    return (
        <div>
            <Card
                size="small"
                title="Tanda Vital / Pemeriksaan Fisik"
                headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
            >
                <Spin
                    spinning={false}
                >
                    <Row>
                        <Col span={3}>
                            <span>Tensi :</span>
                        </Col>
                        <Col span={4}>
                            <Tooltip title="Tensi Atas">
                                <InputNumber
                                    placeholder="..."
                                    // value={sistolik}
                                    // onChange={(e) => setSistolik(e)}
                                    maxLength={3}
                                    max={225}
                                    min={70}
                                    style={{ width: "100%" }}
                                />
                            </Tooltip>
                        </Col>
                        <Col span={5}>
                            <Tooltip title="Tensi Bawah">
                                <InputNumber
                                    placeholder="..."
                                    // value={diastolik}
                                    // onChange={(e) => setDiastolik(e)}
                                    addonAfter='Mmhg'
                                    maxLength={3}
                                    max={225}
                                    min={40}
                                    style={{ width: "100%" }}
                                />
                            </Tooltip>
                        </Col>

                        <Col span={3}>
                            <span style={{ marginLeft: '4px' }}>Frekuensi Nafas :</span>
                        </Col>
                        <Col span={9}>
                            <InputNumber
                                placeholder="..."
                                // value={nafas}
                                // onChange={(e) => setNafas(e)}
                                addonAfter='/Menit'
                                maxLength={3}
                                max={100}
                                min={0}
                                style={{ width: "100%" }}
                            />
                        </Col>
                    </Row>

                    <Row style={{ marginTop: '2px' }}>
                        <Col span={3}>
                            <span>Nadi :</span>
                        </Col>
                        <Col span={9}>
                            <InputNumber
                                placeholder="..."
                                // value={nadi}
                                // onChange={(e) => setNadi(e)}
                                addonAfter='/Menit'
                                maxLength={3}
                                max={200}
                                min={0}
                                style={{ width: "100%" }}
                            />
                        </Col>
                        <Col span={3}>
                            <span style={{ marginLeft: '4px' }}>Irama Nadi :</span>
                        </Col>
                        <Col span={9}>
                            <Select
                                defaultValue="Teratur"
                                placeholder="..."
                                style={{ width: "100%" }}
                            // value={iramanadi}
                            // onChange={(e) => setIramaNadi(e)}
                            >
                                <Option value="Teratur">Teratur</Option>
                                <Option value="Tidak Teratur">Tidak Teratur</Option>
                            </Select>
                        </Col>
                    </Row>

                    <Row style={{ marginTop: '2px' }}>
                        <Col span={3}>
                            <span>Suhu :</span>
                        </Col>
                        <Col span={9}>
                            <Tooltip
                                title="Desimal Gunakan Tanda Titik [.]"
                                placement="topRight"
                            >
                                <InputNumber
                                    placeholder="..."
                                    type="number"
                                    // value={suhu}
                                    // onChange={(e) => {
                                    //     setSuhu(e);
                                    //     // if (e !== null) {
                                    //     //   if (e.toString().indexOf(",") !== -1) {
                                    //     //     message.warning("Desimal Gunakan Tanda Titik [.]!");
                                    //     //   }
                                    //     // }
                                    // }}
                                    addonAfter='°C'
                                    maxLength={2}
                                    max={70}
                                    min={10}
                                    step={0.1}
                                    style={{ width: "100%" }}
                                    stringMode={true}
                                />
                            </Tooltip>
                        </Col>
                        <Col span={3}>
                            <span style={{ marginLeft: '4px' }}>Skala Nyeri :</span>
                        </Col>
                        <Col span={9}>
                            <Select
                                defaultValue={1}
                                placeholder="..."
                                style={{ width: "100%" }}
                            // value={skornyeri}
                            // onChange={(e) => setSkorNyeri(e)}
                            >
                                <Option value={1}>Tidak Nyeri (0)</Option>
                                <Option value={2}>Nyeri Ringan (1-2-3)</Option>
                                <Option value={3}>Nyeri Sedang (4-5-6)</Option>
                                <Option value={4}>Nyeri Berat (7-8-9-10)</Option>
                            </Select>
                        </Col>
                    </Row>

                    <Row style={{ marginTop: '2px' }}>
                        <Col span={3}>
                            <span>Berat Badan :</span>
                        </Col>
                        <Col span={9}>
                            <InputNumber
                                stringMode
                                type="number"
                                step={0.1}
                                placeholder="..."
                                // value={berat}
                                // onChange={(e) => setBerat(e)}
                                addonAfter='Kg'
                                maxLength={3}
                                max={200}
                                min={0}
                                style={{ width: "100%" }}
                            />
                        </Col>
                        <Col span={3}>
                            <span style={{ marginLeft: '4px' }}>Resiko Jatuh :</span>
                        </Col>
                        <Col span={9}>
                            <Select
                                defaultValue={1}
                                placeholder="..."
                                style={{ width: "100%" }}
                            // value={resikojatuh}
                            // onChange={(e) => setResikoJatuh(e)}
                            >
                                <Option value={1}>Tidak Ada Resiko</Option>
                                <Option value={2}>Resiko Rendah</Option>
                                <Option value={3}>Resiko Tinggi</Option>
                            </Select>
                        </Col>
                    </Row>

                    <Row style={{ marginTop: '2px' }}>
                        <Col span={3}>
                            <span>Tinggi Badan :</span>
                        </Col>
                        <Col span={9}>
                            <InputNumber
                                stringMode
                                type="number"
                                step={0.1}
                                placeholder="..."
                                // value={tinggi}
                                // onChange={(e) => setTinggi(e)}
                                addonAfter='Cm'
                                maxLength={3}
                                max={300}
                                min={0}
                                style={{ width: "100%" }}
                            />
                        </Col>
                        <Col span={3}>
                            <span style={{ marginLeft: '4px' }}>IMT :</span>
                        </Col>
                        <Col span={9}>
                            <Input.Group compact>
                                <Input
                                    style={{ width: "25%" }}
                                // value={isNaN(IMT) ? "" : IMT.toFixed(2)}
                                // placeholder="..."
                                />
                                <Input
                                    style={{ width: '75%' }}
                                // value={isNaN(IMT) ? null : IMTket}
                                // placeholder="..."
                                />
                            </Input.Group>
                        </Col>
                    </Row>

                    <Row style={{ marginTop: '2px' }}>
                        <Col span={3}>
                            <span>Saturasi O2 :</span>
                        </Col>
                        <Col span={9}>
                            <InputNumber
                                placeholder="..."
                                // value={saturasi}
                                // onChange={(e) => setSaturasi(e)}
                                addonAfter='%'
                                maxLength={3}
                                max={100}
                                min={0}
                                style={{ width: "100%" }}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24} style={{ textAlign: "right" }}>
                            <Button
                                type="primary"
                            // htmlType="submit"
                            // onClick={(e) => onSubmit(e)}
                            // disabled={
                            //     dayjs().format("DD-MM-YYYY") === curpas.tanggalMasuk ||
                            //         poli1 === "91A7"
                            //         ? false
                            //         : true
                            // }
                            >
                                Simpan
                            </Button>

                            {/* <Button type="primary" htmlType="submit" onClick={filterSubmit}>
                Simpan
              </Button> */}
                        </Col>
                    </Row>
                </Spin>
            </Card>
        </div>
    )
}

export default FormTandaVital