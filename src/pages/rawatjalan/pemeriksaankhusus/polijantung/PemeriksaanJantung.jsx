import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Space,
  Tabs,
} from "antd";
import React, { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";
import { PasienContext } from "../../context/PasienContext";
import { PoliJantungContext } from "../../context/pemeriksaancontext/PoliJantungContext";
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const formItemLayout2 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const { TabPane } = Tabs;

const PemeriksaanJantung = () => {
  const { curpas } = useContext(PasienContext);
  const {
    insertEkokardiografi,
    insertTreadmill,
    insertHolter,
    jenisEko,
    setJenisEko,
    irama,
    setIrama,
    hr,
    setHr,
    aksis,
    setAksis,
    lainya,
    setLainya,
    dxKlinis,
    setDxKlinis,
    dimensiRuangJantung,
    setDimensiRuangJantung,
    fungsiSistolikGlobal,
    setFungsiSistolikGlobal,
    ef,
    setEf,
    kinetik,
    setKinetik,
    iaSdanIVS,
    setIaSdanIVS,
    fungsiDiastolikLV,
    setFungsiDiastolikLV,
    fungsiSistolikRV,
    setFungsiSistolikRV,
    katupKatup,
    setKatupKatup,
    lainLain,
    setLainLain,
    situs,
    setSitus,
    avva,
    setAvva,
    muaravv,
    setMuaravv,
    kontraktilitasMiokard,
    setKontraktilitasMiokard,
    ias,
    setIas,
    ivs,
    setIvs,
    arcusAorta,
    setArcusAorta,
    pda,
    setPda,
    coA,
    setCoA,
    simpulan,
    setSimpulan,
    responsIskemik,
    setresponsIskemik,
    dts,
    setdts,
    responsHemodinamik,
    setresponsHemodinamik,
    kronotropikKompetensi,
    setkronotropikKompetensi,
    kelasKebugaran,
    setkelasKebugaran,
    aritmia,
    setaritmia,
    iramaDasar,
    setiramaDasar,
    sinusPause,
    setsinusPause,
    konduksiAV,
    setkonduksiAV,
    apc,
    setapc,
    vpc,
    setvpc,
    perubahanSegmen,
    setperubahanSegmen,
  } = useContext(PoliJantungContext);
  const { namauser } = useContext(LoginContext);

  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const datajantung = {
    registrasiId: curpas.registrasiId,
    kodeBagian: curpas.ruangId,
    dpjp: curpas.dokterId,
    jenisEko: jenisEko,
    // tglMulai: "2021-11-23T03:14:49.162Z",
    // tglSelesai: "2021-11-23T03:14:49.162Z",
    irama: irama,
    hr: hr,
    aksis: aksis,
    lainya: lainya,
    dxKlinis: dxKlinis,
    dimensiRuangJantung: dimensiRuangJantung,
    fungsiSistolikGlobal: fungsiSistolikGlobal,
    ef: ef,
    kinetik: kinetik,
    iaSdanIVS: iaSdanIVS,
    fungsiDiastolikLV: fungsiDiastolikLV,
    fungsiSistolikRV: fungsiSistolikRV,
    katupKatup: katupKatup,
    lainLain: lainLain,
    situs: situs,
    avva: avva,
    muaravv: muaravv,
    kontraktilitasMiokard: kontraktilitasMiokard,
    ias: ias,
    ivs: ivs,
    arcusAorta: arcusAorta,
    pda: pda,
    coA: coA,
    simpulan: simpulan,
    userID: namauser,
    clientHost: host,
    clientIP: ip,
  };
  const dataTreadmill = {
    registrasiId: curpas.registrasiId,
    kodeBagian: curpas.ruangId,
    dpjp: curpas.dokterId,
    // dxKlinis: "string",
    // tglMulai: "2021-11-24T04:21:34.652Z",
    // tglSelesai: "2021-11-24T04:21:34.652Z",
    responsIskemik: responsIskemik,
    dts: dts,
    responsHemodinamik: responsHemodinamik,
    kronotropikKompetensi: kronotropikKompetensi,
    kelasKebugaran: kelasKebugaran,
    aritmia: aritmia,
    userID: namauser,
    clientHost: host,
    clientIP: ip,
  };
  const dataHolter = {
    registrasiId: curpas.registrasiId,
    kodeBagian: curpas.ruangId,
    dpjp: curpas.dokterId,
    // dxKlinis: "string",
    // tglMulai: "2021-11-24T06:11:07.277Z",
    // tglSelesai: "2021-11-24T06:11:07.277Z",
    iramaDasar: iramaDasar,
    sinusPause: sinusPause,
    konduksiAV: konduksiAV,
    kronotropikKompetensi: kronotropikKompetensi,
    apc: apc,
    vpc: vpc,
    perubahanSegmen: perubahanSegmen,
    userID: namauser,
    clientHost: host,
    clientIP: ip,
  };
  return (
    <Card
      size="small"
      headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
      title="Pemeriksaan Jantung"
    >
      <Tabs defaultActiveKey="1" tabPosition="left" type="card">
        <TabPane tab="EKG " key="1">
          <Card
            size="small"
            headStyle={{ fontWeight: "bolder", backgroundColor: "gold" }}
            title="EKG"
          >
            <Form {...formItemLayout}>
              <Form.Item label="Irama" style={{ marginBottom: 0 }}>
                <Input
                  value={irama}
                  onChange={(e) => setIrama(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="HR" style={{ marginBottom: 0 }}>
                <Input value={hr} onChange={(e) => setHr(e.target.value)} />
              </Form.Item>
              <Form.Item label="Aksis" style={{ marginBottom: 0 }}>
                <Input
                  value={aksis}
                  onChange={(e) => setAksis(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Lainnya" style={{ marginBottom: 0 }}>
                <Input
                  value={lainya}
                  onChange={(e) => setLainya(e.target.value)}
                />
              </Form.Item>
            </Form>
            <Row>
              <Col span={24} style={{ textAlign: "right" }}>
                <Button
                  type="primary"
                  onClick={() => insertEkokardiografi(datajantung)}
                >
                  Simpan
                </Button>
              </Col>
            </Row>
          </Card>
        </TabPane>
        <TabPane tab="Echocardiography " key="4">
          {jenisEko === "Dewasa" ? (
            <Card
              size="small"
              headStyle={{ fontWeight: "bolder", backgroundColor: "gold" }}
              title="Echocardiography (Dewasa)"
              extra={
                <Radio.Group
                  onChange={(e) => setJenisEko(e.target.value)}
                  value={jenisEko}
                >
                  <Radio value={"Dewasa"}>Dewasa</Radio>
                  <Radio value={"Anak"}>Anak</Radio>
                </Radio.Group>
              }
            >
              <Form {...formItemLayout}>
                <Form.Item label="Diagnosis Klinis" style={{ marginBottom: 0 }}>
                  <Input
                    value={dxKlinis}
                    onChange={(e) => setDxKlinis(e.target.value)}
                  />
                </Form.Item>
                <Divider orientation="left">Hasil Pemeriksaan</Divider>
                <Form.Item
                  label="Dimensi ruang jantung"
                  style={{ marginBottom: 0 }}
                >
                  <Input
                    value={dimensiRuangJantung}
                    onChange={(e) => setDimensiRuangJantung(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayout2}
                  label="Fungsi sistolik global dan segmental LV"
                  style={{ marginBottom: 0 }}
                >
                  <Input.Group>
                    <Row gutter={8}>
                      <Col span={16}>
                        <Input
                          value={fungsiSistolikGlobal}
                          onChange={(e) =>
                            setFungsiSistolikGlobal(e.target.value)
                          }
                        />
                      </Col>
                      <Col span={8}>
                        <Space>
                          dengan EF :
                          <Input
                            value={ef}
                            onChange={(e) => setEf(e.target.value)}
                          />
                        </Space>
                      </Col>
                    </Row>
                  </Input.Group>
                </Form.Item>
                <Form.Item
                  label="Kinetik (wall motion)"
                  style={{ marginBottom: 0 }}
                >
                  <Input
                    value={kinetik}
                    onChange={(e) => setKinetik(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="IAS dan IVS" style={{ marginBottom: 0 }}>
                  <Input
                    value={iaSdanIVS}
                    onChange={(e) => setIaSdanIVS(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="Fungsi diastolik LV"
                  style={{ marginBottom: 0 }}
                >
                  <Input
                    value={fungsiDiastolikLV}
                    onChange={(e) => setFungsiDiastolikLV(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="Fungsi sistolik RV"
                  style={{ marginBottom: 0 }}
                >
                  <Input
                    value={fungsiSistolikRV}
                    onChange={(e) => setFungsiSistolikRV(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Katup-katup" style={{ marginBottom: 0 }}>
                  <Input
                    value={katupKatup}
                    onChange={(e) => setKatupKatup(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Lain-lain" style={{ marginBottom: 0 }}>
                  <Input
                    value={lainLain}
                    onChange={(e) => setLainLain(e.target.value)}
                  />
                </Form.Item>
                <Divider />
                <Form.Item label="Simpulan" style={{ marginBottom: 0 }}>
                  <Input
                    value={simpulan}
                    onChange={(e) => setSimpulan(e.target.value)}
                  />
                </Form.Item>
              </Form>
              <Row>
                <Col span={24} style={{ textAlign: "right" }}>
                  <Button
                    type="primary"
                    onClick={() => insertEkokardiografi(datajantung)}
                  >
                    Simpan
                  </Button>
                </Col>
              </Row>
            </Card>
          ) : (
            <Card
              size="small"
              headStyle={{ fontWeight: "bolder", backgroundColor: "gold" }}
              title="Echocardiography (Anak)"
              extra={
                <Radio.Group
                  onChange={(e) => setJenisEko(e.target.value)}
                  value={jenisEko}
                >
                  <Radio value={"Dewasa"}>Dewasa</Radio>
                  <Radio value={"Anak"}>Anak</Radio>
                </Radio.Group>
              }
            >
              <Form {...formItemLayout}>
                <Form.Item label="Diagnosis Klinis" style={{ marginBottom: 0 }}>
                  <Input
                    value={dxKlinis}
                    onChange={(e) => setDxKlinis(e.target.value)}
                  />
                </Form.Item>
                <Divider orientation="left">Hasil Pemeriksaan</Divider>
                <Form.Item label="Situs" style={{ marginBottom: 0 }}>
                  <Input.Group style={{ width: "100%" }}>
                    <Row gutter={8}>
                      <Col span={10}>
                        <Input
                          value={situs}
                          onChange={(e) => setSitus(e.target.value)}
                        />
                      </Col>
                      <Col span={14}>
                        <Space style={{ width: "100%" }}>
                          AV-VA :
                          <Input
                            style={{ width: "calc(100% - 32px)" }}
                            value={avva}
                            onChange={(e) => setAvva(e.target.value)}
                          />
                        </Space>
                      </Col>
                    </Row>
                  </Input.Group>
                </Form.Item>
                <Form.Item
                  label="Muara vv. Pulmonalis dan sistemik"
                  style={{ marginBottom: 0 }}
                >
                  <Input
                    value={muaravv}
                    onChange={(e) => setMuaravv(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="Dimensi ruang jantung"
                  style={{ marginBottom: 0 }}
                >
                  <Input
                    value={dimensiRuangJantung}
                    onChange={(e) => setDimensiRuangJantung(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="Kontraktilitas miokard "
                  style={{ marginBottom: 0 }}
                >
                  <Input.Group>
                    <Row gutter={8}>
                      <Col span={16}>
                        <Input
                          value={kontraktilitasMiokard}
                          onChange={(e) =>
                            setKontraktilitasMiokard(e.target.value)
                          }
                        />
                      </Col>
                      <Col span={8}>
                        <Space>
                          dengan EF :
                          <Input
                            value={ef}
                            onChange={(e) => setEf(e.target.value)}
                          />
                        </Space>
                      </Col>
                    </Row>
                  </Input.Group>
                </Form.Item>
                <Form.Item label="IAS" style={{ marginBottom: 0 }}>
                  <Input value={ias} onChange={(e) => setIas(e.target.value)} />
                </Form.Item>
                <Form.Item label="IVS" style={{ marginBottom: 0 }}>
                  <Input value={ivs} onChange={(e) => setIvs(e.target.value)} />
                </Form.Item>
                <Form.Item label="Katup-katup" style={{ marginBottom: 0 }}>
                  <Input
                    value={katupKatup}
                    onChange={(e) => setKatupKatup(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  label="Arcus aorta berada di"
                  style={{ marginBottom: 0 }}
                >
                  <Input.Group>
                    <Row gutter={8}>
                      <Col span={8}>
                        <Input
                          value={arcusAorta}
                          onChange={(e) => setArcusAorta(e.target.value)}
                        />
                      </Col>
                      <Col span={8}>
                        <Space>
                          PDA
                          <Input
                            style={{ width: "18vw" }}
                            value={pda}
                            onChange={(e) => setPda(e.target.value)}
                          />
                        </Space>
                      </Col>
                      <Col span={8}>
                        <Space>
                          CoA
                          <Input
                            style={{ width: "18vw" }}
                            value={coA}
                            onChange={(e) => setCoA(e.target.value)}
                          />
                        </Space>
                      </Col>
                    </Row>
                  </Input.Group>
                </Form.Item>
                <Form.Item label="Lain-lain" style={{ marginBottom: 0 }}>
                  <Input
                    value={lainLain}
                    onChange={(e) => setLainLain(e.target.value)}
                  />
                </Form.Item>
                <Divider />
                <Form.Item label="Simpulan" style={{ marginBottom: 0 }}>
                  <Input
                    value={simpulan}
                    onChange={(e) => setSimpulan(e.target.value)}
                  />
                </Form.Item>
              </Form>
              <Row>
                <Col span={24} style={{ textAlign: "right" }}>
                  <Button
                    type="primary"
                    onClick={() => insertEkokardiografi(datajantung)}
                  >
                    Simpan
                  </Button>
                </Col>
              </Row>
            </Card>
          )}
        </TabPane>
        <TabPane tab="Treadmill Test" key="2">
          <Card
            size="small"
            headStyle={{ fontWeight: "bolder", backgroundColor: "gold" }}
            title="Treadmill Test"
          >
            <Form {...formItemLayout}>
              <Form.Item label="Respons iskemik" style={{ marginBottom: 0 }}>
                <Input
                  value={responsIskemik}
                  onChange={(e) => setresponsIskemik(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="DTS" style={{ marginBottom: 0 }}>
                <Input value={dts} onChange={(e) => setdts(e.target.value)} />
              </Form.Item>
              <Form.Item
                label="Respons hemodinamik"
                style={{ marginBottom: 0 }}
              >
                <Input
                  value={responsHemodinamik}
                  onChange={(e) => setresponsHemodinamik(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label="Kronotropik kompetensi"
                style={{ marginBottom: 0 }}
              >
                <Input
                  value={kronotropikKompetensi}
                  onChange={(e) => setkronotropikKompetensi(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Kelas kebugaran" style={{ marginBottom: 0 }}>
                <Input
                  value={kelasKebugaran}
                  onChange={(e) => setkelasKebugaran(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Aritmia" style={{ marginBottom: 0 }}>
                <Input
                  value={aritmia}
                  onChange={(e) => setaritmia(e.target.value)}
                />
              </Form.Item>
            </Form>
            <Row>
              <Col span={24} style={{ textAlign: "right" }}>
                <Button
                  type="primary"
                  onClick={() => insertTreadmill(dataTreadmill)}
                >
                  Simpan
                </Button>
              </Col>
            </Row>
          </Card>
        </TabPane>
        <TabPane tab="Holter Monitoring" key="3">
          <Card
            size="small"
            headStyle={{ fontWeight: "bolder", backgroundColor: "gold" }}
            title="Holter Monitoring"
          >
            <Form {...formItemLayout}>
              <Form.Item label="Irama dasar" style={{ marginBottom: 0 }}>
                <Input
                  value={iramaDasar}
                  onChange={(e) => setiramaDasar(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                label="Sinus pause dan sinus arrest"
                style={{ marginBottom: 0 }}
              >
                <Input
                  value={sinusPause}
                  onChange={(e) => setsinusPause(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Konduksi AV kesan" style={{ marginBottom: 0 }}>
                <Input
                  value={konduksiAV}
                  onChange={(e) => setkonduksiAV(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="APC" style={{ marginBottom: 0 }}>
                <Input value={apc} onChange={(e) => setapc(e.target.value)} />
              </Form.Item>
              <Form.Item label="VPC" style={{ marginBottom: 0 }}>
                <Input value={vpc} onChange={(e) => setvpc(e.target.value)} />
              </Form.Item>
              <Form.Item
                label="Perubahan segmen ST"
                style={{ marginBottom: 0 }}
              >
                <Input
                  value={perubahanSegmen}
                  onChange={(e) => setperubahanSegmen(e.target.value)}
                />
              </Form.Item>
            </Form>
            <Row>
              <Col span={24} style={{ textAlign: "right" }}>
                <Button type="primary" onClick={() => insertHolter(dataHolter)}>
                  Simpan
                </Button>
              </Col>
            </Row>
          </Card>
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default PemeriksaanJantung;
