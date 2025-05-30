import React, { useContext, useState } from "react";
import {
    Form,
    Row,
    Col,
    Button,
    Input,
    Select,
    Card,
    Radio,
} from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { AssessmentHDContext } from "../context/AssessmentHDContext";
import { PelayananHDContext } from "../context/PelayananHDContext";
import { PasienHDContext } from "../context/PasienHDContext";
const { Option } = Select;
function handleChange(value) {
    console.log(`selected ${value}`);
};
const formItemLayoutFull = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

const FormAssessmentHD = () => {
    const { curpas } = useContext(PasienHDContext);
    const {
        namaKeluhan,
        namaAV
    } = useContext(AssessmentHDContext);
    const {
        prevHistory,
        getPreviousHistoryHD
    } = useContext(PelayananHDContext);

    const simpanTandavital = (e) => {
        e.preventDefault();
        // insertTandavital(datatanda);
        // console.log("tanda vital", datatanda);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        simpanTandavital(e);
    };

    const onBBKering = (e) => {
        // setSuhu(e.target.value);
    };
    const onBBPre = (e) => {
        // setSuhu(e.target.value);
    };
    const onBBPost = (e) => {
        // setSuhu(e.target.value);
    };
    const onTDSistolik = (e) => {
        // setSuhu(e.target.value);
    };
    const onTDDiastolik = (e) => {
        // setSuhu(e.target.value);
    };
    const onNadi = (e) => {
        // setSuhu(e.target.value);
    };
    const onRR = (e) => {
        // setSuhu(e.target.value);
    };
    const onSuhu = (e) => {
        // setSuhu(e.target.value);
    };
    const onURR = (e) => {
        // setSuhu(e.target.value);
    };
    const onKtV = (e) => {
        // setSuhu(e.target.value);
    };

    return (
        <Form onFinish={(e) => onSubmit(e)}>
            <Card
                size="small"
                title="1. Keluhan"
                headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
                style={{
                    marginBottom: 6,
                    borderWidth: "2px",
                    borderColor: "darkgray",
                    borderRadius: "4px",
                }}
            >
                <Row gutter={16, 16}>
                    <Col span={8}>
                        Keluhan Utama
                            <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Select style={{ width: '100%' }}
                                onChange={handleChange}
                                placeholder="..."
                            >
                                <Option value="SESAK NAFAS">Sesak Nafas</Option>
                                <Option value="MUAL">Mual, Muntah</Option>
                                <Option value="GATAL">Gatal</Option>
                            </Select>
                        </Form.Item>
                        <br />
                        Keluhan Tambahan
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Select
                                dataSource={namaKeluhan}
                                mode="multiple"
                                style={{ width: "100%" }}
                                placeholder="..."
                                optionFilterProp="children"
                                onChange={handleChange}
                                filterOption={(input, option) =>
                                    option.props.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {namaKeluhan.map((kel) => (
                                    <Option key={kel.keluhanId}>{kel.deskripsi}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item {...formItemLayoutFull} label="Skala Nyeri" style={{ marginTop: 0 }}>
                            <Select
                                // defaultValue={1}
                                placeholder="..."
                                style={{ width: "100%" }}
                            // value={skornyeri}
                            // onChange={onSkorNyeri}
                            >
                                <Option value={1}>Tidak Nyeri (0)</Option>
                                <Option value={2}>Nyeri Ringan (1-2-3)</Option>
                                <Option value={3}>Nyeri Sedang (4-5-6)</Option>
                                <Option value={4}>Nyeri Berat (7-8-9-10)</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item {...formItemLayoutFull} label="P" style={{ marginBottom: 0 }}>
                            <Input placeholder="Pain" />
                        </Form.Item>
                        <Form.Item {...formItemLayoutFull} label="Q" style={{ marginBottom: 0 }}>
                            <Input placeholder="Quality" />
                        </Form.Item>
                        <Form.Item {...formItemLayoutFull} label="R" style={{ marginBottom: 0 }}>
                            <Input placeholder="Radiation" />
                        </Form.Item>
                        <Form.Item {...formItemLayoutFull} label="S" style={{ marginBottom: 0 }}>
                            <Input placeholder="Scale" />
                        </Form.Item>
                        <Form.Item {...formItemLayoutFull} label="T" style={{ marginBottom: 0 }}>
                            <Input placeholder="Time" />
                        </Form.Item>
                    </Col>
                </Row>
            </Card>

            <Card
                size="small"
                title="2. Pemeriksaan Fisik"
                headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
                style={{
                    marginBottom: 6,
                    borderWidth: "2px",
                    borderColor: "darkgray",
                    borderRadius: "4px",
                }}
            >
                <Form.Item label="Keadaan Umum" style={{ marginBottom: 5 }}>
                    <Radio.Group buttonStyle="solid">
                        <Radio.Button value="BAIK">Baik</Radio.Button>
                        <Radio.Button value="SEDANG">Sedang</Radio.Button>
                        <Radio.Button value="BURUK">Buruk</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Row gutter={[16, 16]}>
                    <Col span={8} xs={12} sm={12} md={8} lg={8} xl={8}>
                        BB Kering
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Input
                                type="number"
                                suffix="kg"
                                step={0.1}
                                placeholder="..."
                                value={prevHistory.bbKering}
                                onChange={(e) => onBBKering(e)}
                            />
                        </Form.Item>
                        BB Pre HD
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Input
                                type="number"
                                suffix="kg"
                                step={0.1}
                                placeholder="..."
                                value={prevHistory.beratBadan}
                                onChange={(e) => onBBPre(e)}
                            />
                        </Form.Item>
                        BB Post HD Sebelumnya
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Input
                                type="number"
                                suffix="kg"
                                step={0.1}
                                placeholder="..."
                                // value={nadi}
                                onChange={(e) => onBBPost(e)}
                            />
                        </Form.Item>
                        Suhu
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Input
                                type="number"
                                suffix="°C"
                                step={0.1}
                                placeholder="..."
                                // value={suhu}
                                onChange={(e) => onSuhu(e)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={12} sm={12} md={8} lg={8} xl={8}>
                        TD Sistolik
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Input
                                type="number"
                                suffix="mmHg"
                                placeholder="..."
                                // value={suhu}
                                onChange={(e) => onTDSistolik(e)}
                            />
                        </Form.Item>
                        TD Diastolik
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Input
                                type="number"
                                suffix="mmHg"
                                placeholder="..."
                                // value={suhu}
                                onChange={(e) => onTDDiastolik(e)}
                            />
                        </Form.Item>
                        Nadi
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Input
                                type="number"
                                suffix="x/menit"
                                placeholder="..."
                                // value={berat}
                                onChange={(e) => onNadi(e)}
                            />
                        </Form.Item>
                        RR
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Input
                                type="number"
                                suffix="x/menit"
                                placeholder="..."
                                // value={tinggi}
                                onChange={(e) => onRR(e)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={12} sm={12} md={8} lg={8} xl={8}>
                        Konjungtiva
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Select style={{ width: '100%' }}
                                onChange={handleChange}
                                placeholder="..."
                            >
                                <Option value="ANEMIS">Anemis</Option>
                                <Option value="TIDAK ANEMIS">Tidak Anemis</Option>
                            </Select>
                        </Form.Item>
                        Ekstremitas
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Select style={{ width: '100%' }}
                                onChange={handleChange}
                                placeholder="..."
                            >
                                <Option value="NORMAL">Normal</Option>
                                <Option value="DEHIDRASI">Dehidrasi</Option>
                                <Option value="EDEMA">Edema</Option>
                            </Select>
                        </Form.Item>
                        Akses Vaskuler
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                            {/* <Cascader options={optionsAksesVaskuler} /> */}
                            <Select
                                dataSource={namaAV}
                                // showSearch
                                // value={caramasukid}
                                style={{ width: "100%" }}
                                placeholder="..."
                                optionFilterProp="children"
                                onChange={handleChange}
                                filterOption={(input, option) =>
                                    option.props.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {namaAV.map((av) => (
                                    <Option key={av.aksesVaskulerId}>{av.deskripsi}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        Resiko Jatuh
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Select style={{ width: '100%' }}
                                onChange={handleChange}
                                placeholder="..."
                            >
                                <Option value="RINGAN">0-24 (Resiko Ringan)</Option>
                                <Option value="SEDANG">25-44 (Resiko Sedang)</Option>
                                <Option value="TINGGI">{"≥"}45 (Resiko Tinggi)</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Card>

            <Card
                size="small"
                title="3. Pemeriksaan Penunjang"
                headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
                style={{
                    marginBottom: 6,
                    borderWidth: "2px",
                    borderColor: "darkgray",
                    borderRadius: "4px",
                }}
            >
                <Form.Item style={{ marginBottom: 0 }}>
                    <Select style={{ width: '100%' }}
                        onChange={handleChange}
                        placeholder="..."
                    >
                        <Option value="HB">Hb</Option>
                        <Option value="HT">Ht</Option>
                        <Option value="UREUM">Ureum</Option>
                        <Option value="CREATIN">Creatin</Option>
                        <Option value="HBSAG">HbsAg</Option>
                        <Option value="ANTI HCV">Anti HCV</Option>
                        <Option value="ANTI HIV">Anti HIV</Option>
                        <Option value="ALBUMIN">Albumin</Option>
                        <Option value="KALIUM">Kalium</Option>
                        <Option value="NATRIUM">Natrium</Option>
                    </Select>
                </Form.Item>
            </Card>
            <Card
                size="small"
                title="4. Status Nutrisi (3-6 bulan sekali)"
                headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
                style={{
                    marginBottom: 6,
                    borderWidth: "2px",
                    borderColor: "darkgray",
                    borderRadius: "4px",
                    width: "100%"
                }}
            >
                <Form.Item style={{ marginBottom: 0 }}>
                    {/* <Cascader options={optionsStatusNutrisi} /> */}
                    <Select style={{ width: '100%' }}
                        onChange={handleChange}
                        placeholder="..."
                    >
                        <Option value="TANPA MALNUTRISI">Tanpa Malnutrisi {"(<6)"}</Option>
                        <Option value="MALNUTRISI RINGAN">Malnutrisi {"(>6)"} Ringan</Option>
                        <Option value="MALNUTRISI SEDANG">Malnutrisi {"(>6)"} Sedang</Option>
                        <Option value="MALNUTRISI BERAT">Malnutrisi {"(>6)"} Berat</Option>
                    </Select>
                </Form.Item>
            </Card>

            <Card
                size="small"
                title="5. Adekuasi Dialisis (tiap 3 bulan)"
                headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
                style={{
                    marginBottom: 6,
                    borderWidth: "2px",
                    borderColor: "darkgray",
                    borderRadius: "4px",
                }}
            >
                <Row gutter={[16, 16]}>
                    <Col span={12} xs={12} sm={12} md={12} lg={12} xl={12}>
                        Ureum Pre HD
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Input
                                type="number"
                                placeholder="..."
                            />
                        </Form.Item>
                        Ureum Post HD
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Input
                                type="number"
                                placeholder="..."
                            />
                        </Form.Item>
                        URR
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Input placeholder="..." />
                        </Form.Item>
                    </Col>
                    <Col span={12} xs={12} sm={12} md={12} lg={12} xl={12}>
                        K
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Input
                                type="number"
                                suffix=""
                                placeholder="..."
                                // value={tinggi}
                                onChange={(e) => onKtV(e)}
                            />
                        </Form.Item>
                        t
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Input
                                type="number"
                                suffix=""
                                placeholder="..."
                                // value={tinggi}
                                onChange={(e) => onKtV(e)}
                            />
                        </Form.Item>
                        V
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Input
                                type="number"
                                suffix=""
                                placeholder="..."
                                // value={tinggi}
                                onChange={(e) => onKtV(e)}
                            />
                        </Form.Item>
                        Kt/V
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Input
                                type="number"
                                suffix=""
                                placeholder="..."
                                // value={tinggi}
                                onChange={(e) => onKtV(e)}
                                disabled
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Form.Item label="Kesimpulan" style={{ marginBottom: 5 }}>
                        <Radio.Group buttonStyle="solid">
                            <Radio.Button value="a">Adekuat</Radio.Button>
                            <Radio.Button value="b">Tidak Adekuat</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Row>
            </Card>

            <Row>
                <Col span={24} style={{ textAlign: "right" }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={(e) => onSubmit(e)}
                    >
                        Simpan
                        </Button>
                </Col>
            </Row>
        </Form >
    );
};

export default FormAssessmentHD;
