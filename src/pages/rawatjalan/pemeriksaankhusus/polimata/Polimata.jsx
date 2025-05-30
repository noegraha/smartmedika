import React, { useContext } from "react";
import { Form, Row, Col, Input, Select, Card, Radio, Button, Tabs } from "antd";
import { PoliMataContext } from "../../context/pemeriksaancontext/PoliMataContext";
import { PasienContext } from "../../context/PasienContext";
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
function onBlur() {
  console.log("blur");
}

function onFocus() {
  console.log("focus");
}

function onSearch(val) {
  console.log("search:", val);
}
const formItemLayoutdpjp6 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const Polimata = () => {
  const { curpas } = useContext(PasienContext);
  const {
    insertMata,
    sph1A,
    setsph1A,
    sph1B,
    setsph1B,
    cyl1A,
    setcyl1A,
    cyl1B,
    setcyl1B,
    axs1A,
    setaxs1A,
    axs1B,
    setaxs1B,
    sph2A,
    setsph2A,
    sph2B,
    setsph2B,
    cyl2A,
    setcyl2A,
    cyl2B,
    setcyl2B,
    axs2A,
    setaxs2A,
    axs2B,
    setaxs2B,
    mma,
    mmb,
    ad,
    jh,
    dkt,
    setdkt,
    bfc,
    optical,
    ribuan,
    // setmma,  setmmb,  setad, setjh,   setbfc,  setoptical,  setribuan,setlns,setlkp,settanggal, setperimet,setresikoJatuh ,
    tanggal,
    lkp,
    lns,
    virusSeblOd,
    setvirusSeblOd,
    virusSeblOs,
    setvirusSeblOs,
    binokulerSebl,
    setbinokulerSebl,
    virusSesdOd,
    setvirusSesdOd,
    virusSesdOs,
    setvirusSesdOs,
    binokulerSesd,
    setbinokulerSesd,
    tonometriOd,
    settonometriOd,
    tonometriOs,
    settonometriOs,
    jenisTonometri,
    setjenisTonometri,
    flouresceinTest,
    setflouresceinTest,
    keratometri1Od,
    setkeratometri1Od,
    keratometri2Od,
    setkeratometri2Od,
    keratometri1Os,
    setkeratometri1Os,
    keratometri2Os,
    setkeratometri2Os,
    biometriOd,
    setbiometriOd,
    biometriOs,
    setbiometriOs,
    axialOd,
    setaxialOd,
    axialOs,
    setaxialOs,
    perimet,
    fundusCmetode,
    setfundusCmetode,
    fundusCpnii,
    setfundusCpnii,
    fundusCvasa,
    setfundusCvasa,
    fundusCretina,
    setfundusCretina,
    fundusCmacula,
    setfundusCmacula,
    fundusCketeranganOd,
    setfundusCketeranganOd,
    fundusCpniios,
    setfundusCpniios,
    fundusCvasaOs,
    setfundusCvasaOs,
    fundusCretinaOs,
    setfundusCretinaOs,
    fundusCmaculaOs,
    setfundusCmaculaOs,
    fundusCketeranganOs,
    setfundusCketeranganOs,
    resikoJatuh,
  } = useContext(PoliMataContext);
  // const onFunduscoy = (e) => {
  //     console.log(e);
  // }
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const dataMata = {
    registrasiId: curpas.registrasiId,
    sph1A: sph1A,
    sph1B: sph1B,
    cyl1A: cyl1A,
    cyl1B: cyl1B,
    axs1A: axs1A,
    axs1B: axs1B,
    sph2A: sph2A,
    sph2B: sph2B,
    cyl2A: cyl2A,
    cyl2B: cyl2B,
    axs2A: axs2A,
    axs2B: axs2B,
    mma: mma,
    mmb: mmb,
    ad: ad,
    jh: jh,
    dkt: dkt,
    bfc: bfc,
    optical: optical,
    ribuan: ribuan,
    tanggal: tanggal,
    lkp: lkp,
    lns: lns,
    virusSeblOd: virusSeblOd,
    virusSeblOs: virusSeblOs,
    binokulerSebl: binokulerSebl,
    virusSesdOd: virusSesdOd,
    virusSesdOs: virusSesdOs,
    binokulerSesd: binokulerSesd,
    tonometriOd: tonometriOd,
    tonometriOs: tonometriOs,
    jenisTonometri: jenisTonometri,
    flouresceinTest: flouresceinTest,
    keratometri1Od: keratometri1Od,
    keratometri2Od: keratometri2Od,
    keratometri1Os: keratometri1Os,
    keratometri2Os: keratometri2Os,
    biometriOd: biometriOd,
    biometriOs: biometriOs,
    axialOd: axialOd,
    axialOs: axialOs,
    perimet: perimet,
    fundusCmetode: fundusCmetode,
    fundusCpnii: fundusCpnii,
    fundusCvasa: fundusCvasa,
    fundusCretina: fundusCretina,
    fundusCmacula: fundusCmacula,
    fundusCketeranganOd: fundusCketeranganOd,
    fundusCpniios: fundusCpniios,
    fundusCvasaOs: fundusCvasaOs,
    fundusCretinaOs: fundusCretinaOs,
    fundusCmaculaOs: fundusCmaculaOs,
    fundusCketeranganOs: fundusCketeranganOs,
    resikoJatuh: resikoJatuh,
    clientHost: host,
    clientIP: ip,
  };
  const simpanMata = () => {
    insertMata(dataMata);
    console.log(dataMata);
  };
  const onsph1A = (e) => {
    setsph1A(e.target.value);
  };
  const onsph1B = (e) => {
    setsph1B(e.target.value);
  };
  const oncyl1A = (e) => {
    setcyl1A(e.target.value);
  };
  const oncyl1B = (e) => {
    setcyl1B(e.target.value);
  };
  const onaxs1A = (e) => {
    setaxs1A(e.target.value);
  };
  const onaxs1B = (e) => {
    setaxs1B(e.target.value);
  };
  const onsph2A = (e) => {
    setsph2A(e.target.value);
  };
  const onsph2B = (e) => {
    setsph2B(e.target.value);
  };
  const oncyl2A = (e) => {
    setcyl2A(e.target.value);
  };
  const oncyl2B = (e) => {
    setcyl2B(e.target.value);
  };
  const onaxs2A = (e) => {
    setaxs2A(e.target.value);
  };
  const onaxs2B = (e) => {
    setaxs2B(e.target.value);
  };
  const ondkt = (e) => {
    setdkt(e.target.value);
  };
  // const onmma = (e) => { setmma(e.target.value); }
  // const onmmb = (e) => { setmmb(e.target.value); }
  // const onad = (e) => { setad(e.target.value); }
  // const onjh = (e) => { setjh(e.target.value); }
  // const onbfc = (e) => { setbfc(e.target.value); }
  // const onoptical = (e) => { setoptical(e.target.value); }
  // const onribuan = (e) => { setribuan(e.target.value); }
  // const ontanggal = (e) => { settanggal(e.target.value); }
  // const onlkp = (e) => { setlkp(e.target.value); }
  // const onlns = (e) => { setlns(e.target.value); }
  const onvirusSeblOd = (e) => {
    setvirusSeblOd(e.target.value);
  };
  const onvirusSeblOs = (e) => {
    setvirusSeblOs(e.target.value);
  };
  const onbinokulerSebl = (e) => {
    setbinokulerSebl(e.target.value);
  };
  const onvirusSesdOd = (e) => {
    setvirusSesdOd(e.target.value);
  };
  const onvirusSesdOs = (e) => {
    setvirusSesdOs(e.target.value);
  };
  const onbinokulerSesd = (e) => {
    setbinokulerSesd(e.target.value);
  };
  const ontonometriOd = (e) => {
    settonometriOd(e.target.value);
  };
  const ontonometriOs = (e) => {
    settonometriOs(e.target.value);
  };
  const onjenisTonometri = (e) => {
    setjenisTonometri(e.target.value);
  };
  const onflouresceinTest = (e) => {
    setflouresceinTest(e);
  };
  const onkeratometri1Od = (e) => {
    setkeratometri1Od(e.target.value);
  };
  const onkeratometri2Od = (e) => {
    setkeratometri2Od(e.target.value);
  };
  const onkeratometri1Os = (e) => {
    setkeratometri1Os(e.target.value);
  };
  const onkeratometri2Os = (e) => {
    setkeratometri2Os(e.target.value);
  };
  const onbiometriOd = (e) => {
    setbiometriOd(e.target.value);
  };
  const onbiometriOs = (e) => {
    setbiometriOs(e.target.value);
  };
  const onaxialOd = (e) => {
    setaxialOd(e.target.value);
  };
  const onaxialOs = (e) => {
    setaxialOs(e.target.value);
  };
  // const onperimet = (e) => { setperimet(e.target.value); }
  const onfundusCmetode = (e) => {
    setfundusCmetode(e.target.value);
  };
  const onfundusCpnii = (e) => {
    setfundusCpnii(e.target.value);
  };
  const onfundusCvasa = (e) => {
    setfundusCvasa(e.target.value);
  };
  const onfundusCretina = (e) => {
    setfundusCretina(e.target.value);
  };
  const onfundusCmacula = (e) => {
    setfundusCmacula(e.target.value);
  };
  const onfundusCketeranganOd = (e) => {
    setfundusCketeranganOd(e.target.value);
  };
  const onfundusCpniios = (e) => {
    setfundusCpniios(e.target.value);
  };
  const onfundusCvasaOs = (e) => {
    setfundusCvasaOs(e.target.value);
  };
  const onfundusCretinaOs = (e) => {
    setfundusCretinaOs(e.target.value);
  };
  const onfundusCmaculaOs = (e) => {
    setfundusCmaculaOs(e.target.value);
  };
  const onfundusCketeranganOs = (e) => {
    setfundusCketeranganOs(e.target.value);
  };
  // const onresikoJatuh = (e) => { setresikoJatuh(e.target.value); }

  return (
    <div>
      <Card
        headStyle={{ fontWeight: "bolder", backgroundColor: "#ffe7ba" }}
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
          width: "100%",
        }}
        title="Tindakan Pemeriksaan Mata"
      >
        <Form onFinish={simpanMata}>
          <Tabs tabPosition={"left"} type="card">
            <TabPane tab="Biometri" key="1">
              <Row>
                <Col span={12}>
                  <Card
                    size="small"
                    title="Biometri"
                    headStyle={{
                      fontWeight: "bolder",
                      backgroundColor: "aliceblue",
                    }}
                  >
                    <Form.Item
                      {...formItemLayoutdpjp6}
                      label="OD"
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        type="text"
                        value={biometriOd}
                        suffix="Dioptri"
                        style={{ width: "100%" }}
                        placeholder="..."
                        onChange={(e) => onbiometriOd(e)}
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp6}
                      label="OS"
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        type="text"
                        value={biometriOs}
                        suffix="Dioptri"
                        style={{ width: "100%" }}
                        placeholder="..."
                        onChange={(e) => onbiometriOs(e)}
                      />
                    </Form.Item>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card
                    size="small"
                    title="Axial Length"
                    headStyle={{
                      fontWeight: "bolder",
                      backgroundColor: "aliceblue",
                    }}
                  >
                    <Form.Item
                      {...formItemLayoutdpjp6}
                      name="OD"
                      label="OD"
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        type="text"
                        suffix="mm"
                        style={{ width: "100%" }}
                        value={axialOd}
                        placeholder="..."
                        onChange={(e) => onaxialOd(e)}
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp6}
                      name="OS"
                      label="OS"
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        type="text"
                        suffix="mm"
                        style={{ width: "100%" }}
                        value={axialOs}
                        placeholder="..."
                        onChange={(e) => onaxialOs(e)}
                      />
                    </Form.Item>
                  </Card>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Flourescein Test" key="2">
              <Form.Item
                {...formItemLayoutdpjp6}
                label="..."
                style={{ marginBottom: 0 }}
              >
                <Select
                  value={flouresceinTest}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="..."
                  optionFilterProp="children"
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  onChange={(e) => onflouresceinTest(e)}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="+">+</Option>
                  <Option value="-">-</Option>
                </Select>
              </Form.Item>
            </TabPane>
            <TabPane tab="Funduscoy" key="3">
              <Form.Item
                {...formItemLayoutdpjp6}
                name="Funduscoy"
                label="Funduscoy"
                style={{ marginBottom: 0 }}
              >
                <Radio.Group onChange={(e) => onfundusCmetode(e)}>
                  <Radio value="Direct">Direct </Radio>
                  <Radio value="In Direct">In Direct</Radio>
                </Radio.Group>
              </Form.Item>
              <Row>
                <Col span={12}>
                  <Card size="small" title="OD">
                    <Form.Item
                      {...formItemLayoutdpjp6}
                      label="P.N.II"
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        value={fundusCpnii}
                        style={{ width: "100%" }}
                        onChange={(e) => onfundusCpnii(e)}
                        placeholder="..."
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp6}
                      label="Vasa Darah"
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        value={fundusCvasa}
                        style={{ width: "100%" }}
                        onChange={(e) => onfundusCvasa(e)}
                        placeholder="..."
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp6}
                      label="Retina"
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        value={fundusCretina}
                        style={{ width: "100%" }}
                        onChange={(e) => onfundusCretina(e)}
                        placeholder="..."
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp6}
                      label="Macula"
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        value={fundusCmacula}
                        style={{ width: "100%" }}
                        onChange={(e) => onfundusCmacula(e)}
                        placeholder="..."
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp6}
                      label="Keterangan"
                      style={{ marginBottom: 0 }}
                    >
                      <TextArea
                        value={fundusCketeranganOd}
                        rows={2}
                        placeholder="..."
                        onChange={(e) => onfundusCketeranganOd(e)}
                      />
                    </Form.Item>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card size="small" title="OS">
                    <Form.Item
                      {...formItemLayoutdpjp6}
                      label="P.N.II"
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        value={fundusCpniios}
                        style={{ width: "100%" }}
                        placeholder="..."
                        onChange={(e) => onfundusCpniios(e)}
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp6}
                      label="Vasa Darah"
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        value={fundusCvasaOs}
                        style={{ width: "100%" }}
                        placeholder="..."
                        onChange={(e) => onfundusCvasaOs(e)}
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp6}
                      label="Retina"
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        value={fundusCretinaOs}
                        style={{ width: "100%" }}
                        placeholder="..."
                        onChange={(e) => onfundusCretinaOs(e)}
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp6}
                      label="Macula"
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        value={fundusCmaculaOs}
                        style={{ width: "100%" }}
                        placeholder="..."
                        onChange={(e) => onfundusCmaculaOs(e)}
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp6}
                      label="Keterangan"
                      style={{ marginBottom: 0 }}
                    >
                      <TextArea
                        value={fundusCketeranganOs}
                        rows={2}
                        placeholder="..."
                        onChange={(e) => onfundusCketeranganOs(e)}
                      />
                    </Form.Item>
                  </Card>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Keratometri" key="4">
              <Row>
                <Col span={12}>
                  <Card size="small" title="OD">
                    <Form.Item
                      {...formItemLayoutdpjp6}
                      label="K1"
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        value={keratometri1Od}
                        style={{ width: "100%" }}
                        placeholder="..."
                        onChange={(e) => onkeratometri1Od(e)}
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp6}
                      label="K2"
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        value={keratometri2Od}
                        style={{ width: "100%" }}
                        placeholder="..."
                        onChange={(e) => onkeratometri2Od(e)}
                      />
                    </Form.Item>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card size="small" title="OS">
                    <Form.Item
                      {...formItemLayoutdpjp6}
                      label="K1"
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        value={keratometri1Os}
                        style={{ width: "100%" }}
                        placeholder="..."
                        onChange={(e) => onkeratometri1Os(e)}
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp6}
                      label="K2"
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        value={keratometri2Os}
                        style={{ width: "100%" }}
                        placeholder="..."
                        onChange={(e) => onkeratometri2Os(e)}
                      />
                    </Form.Item>
                  </Card>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Perimetri" key="5">
              -
            </TabPane>
            <TabPane tab="Tonometri" key="6">
              <Row>
                <Col span={12}>
                  <Form.Item
                    {...formItemLayoutdpjp6}
                    label="OD"
                    style={{ marginBottom: 0 }}
                  >
                    <Input
                      value={tonometriOd}
                      style={{ width: "100%" }}
                      placeholder="..."
                      onChange={(e) => ontonometriOd(e)}
                    />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayoutdpjp6}
                    label="OS"
                    style={{ marginBottom: 0 }}
                  >
                    <Input
                      value={tonometriOs}
                      style={{ width: "100%" }}
                      placeholder="..."
                      onChange={(e) => ontonometriOs(e)}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    {...formItemLayoutdpjp6}
                    label="Dibawah ini namanya field apa?"
                    style={{ marginBottom: 0 }}
                  >
                    <Radio.Group
                      value={jenisTonometri}
                      onChange={(e) => onjenisTonometri(e)}
                    >
                      <Radio value={1}>SCHIOETZ </Radio>
                      <Radio value={2}>APLANASI </Radio>
                      <Radio value={3}>NON-CONTACT</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Visus / Refraksi" key="7">
              <Form.Item
                {...formItemLayoutdpjp6}
                label="Visus Sebelum Koreksi"
                style={{ marginBottom: 0 }}
              >
                <Row>
                  <Col span={8}>
                    OD
                    <Input
                      value={virusSeblOd}
                      style={{ width: "80%" }}
                      placeholder="..."
                      onChange={(e) => onvirusSeblOd(e)}
                    />
                  </Col>
                  <Col span={8}>
                    OS
                    <Input
                      value={virusSeblOs}
                      style={{ width: "80%" }}
                      placeholder="..."
                      onChange={(e) => onvirusSeblOs(e)}
                    />
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item
                {...formItemLayoutdpjp6}
                label="Visus Sebelum Koreksi"
                style={{ marginBottom: 0 }}
              >
                <table border="1" cellspacing="0" cellpadding="0">
                  <tbody>
                    <tr>
                      <td width="78" rowspan="2">
                        <p align="center">Pro</p>
                      </td>
                      <td width="204" colspan="3">
                        <p align="center">OD</p>
                      </td>
                      <td width="204" colspan="3">
                        <p align="center">OS</p>
                      </td>
                      <td width="78" rowspan="2">
                        <p align="center">Pup Dist</p>
                      </td>
                    </tr>
                    <tr>
                      <td width="68">
                        <p align="center">Sph</p>
                      </td>
                      <td width="68">
                        <p align="center">Cyl</p>
                      </td>
                      <td width="68">
                        <p align="center">Axis</p>
                      </td>
                      <td width="68">
                        <p align="center">Sph</p>
                      </td>
                      <td width="68">
                        <p align="center">Cyl</p>
                      </td>
                      <td width="68">
                        <p align="center">Axis</p>
                      </td>
                    </tr>
                    <tr>
                      <td width="78">
                        <p align="center">Longin Quitato</p>
                      </td>
                      <td width="68">
                        <p align="center">
                          <Input
                            value={sph1A}
                            style={{ width: "100%" }}
                            placeholder="..."
                            onChange={(e) => onsph1A(e)}
                          />
                        </p>
                      </td>
                      <td width="68">
                        <p align="center">
                          <Input
                            value={cyl1A}
                            style={{ width: "100%" }}
                            placeholder="..."
                            onChange={(e) => oncyl1A(e)}
                          />
                        </p>
                      </td>
                      <td width="68">
                        <p align="center">
                          <Input
                            value={axs1A}
                            style={{ width: "100%" }}
                            placeholder="..."
                            onChange={(e) => onaxs1A(e)}
                          />
                        </p>{" "}
                      </td>
                      <td width="68">
                        <p align="center">
                          <Input
                            value={sph1B}
                            style={{ width: "100%" }}
                            placeholder="..."
                            onChange={(e) => onsph1B(e)}
                          />
                        </p>
                      </td>
                      <td width="68">
                        <p align="center">
                          <Input
                            value={cyl1B}
                            style={{ width: "100%" }}
                            placeholder="..."
                            onChange={(e) => oncyl1B(e)}
                          />
                        </p>
                      </td>
                      <td width="68">
                        <p align="center">
                          <Input
                            value={axs1B}
                            style={{ width: "100%" }}
                            placeholder="..."
                            onChange={(e) => onaxs1B(e)}
                          />
                        </p>
                      </td>
                      <td width="78">
                        <p align="center">
                          <Input
                            value={dkt}
                            style={{ width: "100%" }}
                            placeholder="..."
                            onChange={(e) => ondkt(e)}
                          />
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td width="78">
                        <p align="center">Propin Quitato</p>
                      </td>
                      <td width="68">
                        <p align="center">
                          <Input
                            value={sph2A}
                            style={{ width: "100%" }}
                            placeholder="..."
                            onChange={(e) => onsph2A(e)}
                          />
                        </p>
                      </td>
                      <td width="68">
                        <p align="center">
                          <Input
                            value={cyl2A}
                            style={{ width: "100%" }}
                            placeholder="..."
                            onChange={(e) => oncyl2A(e)}
                          />
                        </p>
                      </td>
                      <td width="68">
                        <p align="center">
                          <Input
                            value={axs2A}
                            style={{ width: "100%" }}
                            placeholder="..."
                            onChange={(e) => onaxs2A(e)}
                          />
                        </p>
                      </td>
                      <td width="68">
                        <p align="center">
                          <Input
                            value={sph2B}
                            style={{ width: "100%" }}
                            placeholder="..."
                            onChange={(e) => onsph2B(e)}
                          />
                        </p>
                      </td>
                      <td width="68">
                        <p align="center">
                          <Input
                            value={cyl2B}
                            style={{ width: "100%" }}
                            placeholder="..."
                            onChange={(e) => oncyl2B(e)}
                          />
                        </p>
                      </td>
                      <td width="68">
                        <p align="center">
                          <Input
                            value={axs2B}
                            style={{ width: "100%" }}
                            placeholder="..."
                            onChange={(e) => onaxs2B(e)}
                          />
                        </p>
                      </td>
                      <td width="78">
                        <p align="center">
                          <Input
                            value={sph1A}
                            style={{ width: "100%" }}
                            placeholder="..."
                            onChange={(e) => onsph1A(e)}
                          />
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Form.Item>
              <Form.Item
                {...formItemLayoutdpjp6}
                label="Binokuler Sebelum Koreksi"
                style={{ marginBottom: 0 }}
              >
                <TextArea
                  value={binokulerSebl}
                  rows={2}
                  placeholder="..."
                  onChange={(e) => onbinokulerSebl(e)}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayoutdpjp6}
                label="Visus Sesudah Koreksi"
                style={{ marginBottom: 0 }}
              >
                <Row>
                  <Col span={8}>
                    OD
                    <Input
                      value={virusSesdOd}
                      style={{ width: "80%" }}
                      placeholder="..."
                      onChange={(e) => onvirusSesdOd(e)}
                    />
                  </Col>
                  <Col span={8}>
                    OS
                    <Input
                      value={virusSesdOs}
                      style={{ width: "80%" }}
                      placeholder="..."
                      onChange={(e) => onvirusSesdOs(e)}
                    />
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item
                {...formItemLayoutdpjp6}
                label="Binokuler Sesudah Koreksi"
                style={{ marginBottom: 0 }}
              >
                <TextArea
                  value={binokulerSesd}
                  rows={2}
                  placeholder="..."
                  onChange={(e) => onbinokulerSesd(e)}
                />
              </Form.Item>
            </TabPane>
          </Tabs>
          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <Button type="primary" onClick={() => simpanMata()}>
                Simpan
              </Button>
            </Col>
          </Row>
        </Form>

        {/* <Form onFinish={simpanMata}>
          <Row>
            <Col span={12}>
              <Card
                size="small"
                bodyStyle={{ padding: "0px" }}
                title="Biometri"
                headStyle={{
                  textAlign: "center",
                  fontWeight: "bolder",
                  backgroundColor: "aliceblue",
                }}
              >
                <Row>
                  <Col span={12}>
                    <Card
                      size="small"
                      title="Biometri"
                      headStyle={{
                        fontWeight: "bolder",
                        backgroundColor: "aliceblue",
                      }}
                    >
                      <Form.Item
                        {...formItemLayoutdpjp6}
                        label="OD"
                        style={{ marginBottom: 0 }}
                      >
                        <Input
                          type="text"
                          value={biometriOd}
                          suffix="Dioptri"
                          style={{ width: "100%" }}
                          placeholder="..."
                          onChange={(e) => onbiometriOd(e)}
                        />
                      </Form.Item>
                      <Form.Item
                        {...formItemLayoutdpjp6}
                        label="OS"
                        style={{ marginBottom: 0 }}
                      >
                        <Input
                          type="text"
                          value={biometriOs}
                          suffix="Dioptri"
                          style={{ width: "100%" }}
                          placeholder="..."
                          onChange={(e) => onbiometriOs(e)}
                        />
                      </Form.Item>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card
                      size="small"
                      title="Axial Length"
                      headStyle={{
                        fontWeight: "bolder",
                        backgroundColor: "aliceblue",
                      }}
                    >
                      <Form.Item
                        {...formItemLayoutdpjp6}
                        name="OD"
                        label="OD"
                        style={{ marginBottom: 0 }}
                      >
                        <Input
                          type="text"
                          suffix="mm"
                          style={{ width: "100%" }}
                          value={axialOd}
                          placeholder="..."
                          onChange={(e) => onaxialOd(e)}
                        />
                      </Form.Item>
                      <Form.Item
                        {...formItemLayoutdpjp6}
                        name="OS"
                        label="OS"
                        style={{ marginBottom: 0 }}
                      >
                        <Input
                          type="text"
                          suffix="mm"
                          style={{ width: "100%" }}
                          value={axialOs}
                          placeholder="..."
                          onChange={(e) => onaxialOs(e)}
                        />
                      </Form.Item>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                size="small"
                style={{ textAlign: "center" }}
                title="Flourescein Test"
                headStyle={{
                  fontWeight: "bolder",
                  backgroundColor: "aliceblue",
                }}
              >
                <Form.Item
                  {...formItemLayoutdpjp6}
                  label="..."
                  style={{ marginBottom: 0 }}
                >
                  <Select
                    value={flouresceinTest}
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="..."
                    optionFilterProp="children"
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    onChange={(e) => onflouresceinTest(e)}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="+">+</Option>
                    <Option value="-">-</Option>
                  </Select>
                </Form.Item>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Card
                size="small"
                headStyle={{
                  textAlign: "center",
                  fontWeight: "bolder",
                  backgroundColor: "aliceblue",
                }}
                title="Funduscoy"
              >
                <Form.Item
                  {...formItemLayoutdpjp6}
                  name="Funduscoy"
                  label="Funduscoy"
                  style={{ marginBottom: 0 }}
                >
                  <Radio.Group onChange={(e) => onfundusCmetode(e)}>
                    <Radio value="Direct">Direct </Radio>
                    <Radio value="In Direct">In Direct</Radio>
                  </Radio.Group>
                </Form.Item>
              </Card>
              <Row>
                <Col span={12}>
                  <Card size="small" title="OD">
                    <Form.Item
                      {...formItemLayoutdpjp6}
                      label="P.N.II"
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        value={fundusCpnii}
                        style={{ width: "100%" }}
                        onChange={(e) => onfundusCpnii(e)}
                        placeholder="..."
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp6}
                      label="Vasa Darah"
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        value={fundusCvasa}
                        style={{ width: "100%" }}
                        onChange={(e) => onfundusCvasa(e)}
                        placeholder="..."
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp6}
                      label="Retina"
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        value={fundusCretina}
                        style={{ width: "100%" }}
                        onChange={(e) => onfundusCretina(e)}
                        placeholder="..."
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp6}
                      label="Macula"
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        value={fundusCmacula}
                        style={{ width: "100%" }}
                        onChange={(e) => onfundusCmacula(e)}
                        placeholder="..."
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp6}
                      label="Keterangan"
                      style={{ marginBottom: 0 }}
                    >
                      <TextArea
                        value={fundusCketeranganOd}
                        rows={2}
                        placeholder="..."
                        onChange={(e) => onfundusCketeranganOd(e)}
                      />
                    </Form.Item>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card size="small" title="OS">
                    <Form.Item
                      {...formItemLayoutdpjp6}
                      label="P.N.II"
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        value={fundusCpniios}
                        style={{ width: "100%" }}
                        placeholder="..."
                        onChange={(e) => onfundusCpniios(e)}
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp6}
                      label="Vasa Darah"
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        value={fundusCvasaOs}
                        style={{ width: "100%" }}
                        placeholder="..."
                        onChange={(e) => onfundusCvasaOs(e)}
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp6}
                      label="Retina"
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        value={fundusCretinaOs}
                        style={{ width: "100%" }}
                        placeholder="..."
                        onChange={(e) => onfundusCretinaOs(e)}
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp6}
                      label="Macula"
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        value={fundusCmaculaOs}
                        style={{ width: "100%" }}
                        placeholder="..."
                        onChange={(e) => onfundusCmaculaOs(e)}
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp6}
                      label="Keterangan"
                      style={{ marginBottom: 0 }}
                    >
                      <TextArea
                        value={fundusCketeranganOs}
                        rows={2}
                        placeholder="..."
                        onChange={(e) => onfundusCketeranganOs(e)}
                      />
                    </Form.Item>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Card
                size="small"
                bodyStyle={{ padding: "0px" }}
                title="Keratometri"
                headStyle={{
                  textAlign: "center",
                  fontWeight: "bolder",
                  backgroundColor: "aliceblue",
                }}
              >
                <Row>
                  <Col span={12}>
                    <Card size="small" title="OD">
                      <Form.Item
                        {...formItemLayoutdpjp6}
                        label="K1"
                        style={{ marginBottom: 0 }}
                      >
                        <Input
                          value={keratometri1Od}
                          style={{ width: "100%" }}
                          placeholder="..."
                          onChange={(e) => onkeratometri1Od(e)}
                        />
                      </Form.Item>
                      <Form.Item
                        {...formItemLayoutdpjp6}
                        label="K2"
                        style={{ marginBottom: 0 }}
                      >
                        <Input
                          value={keratometri2Od}
                          style={{ width: "100%" }}
                          placeholder="..."
                          onChange={(e) => onkeratometri2Od(e)}
                        />
                      </Form.Item>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card size="small" title="OS">
                      <Form.Item
                        {...formItemLayoutdpjp6}
                        label="K1"
                        style={{ marginBottom: 0 }}
                      >
                        <Input
                          value={keratometri1Os}
                          style={{ width: "100%" }}
                          placeholder="..."
                          onChange={(e) => onkeratometri1Os(e)}
                        />
                      </Form.Item>
                      <Form.Item
                        {...formItemLayoutdpjp6}
                        label="K2"
                        style={{ marginBottom: 0 }}
                      >
                        <Input
                          value={keratometri2Os}
                          style={{ width: "100%" }}
                          placeholder="..."
                          onChange={(e) => onkeratometri2Os(e)}
                        />
                      </Form.Item>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={12}>
              <Card
                size="small"
                title="Tonometri"
                headStyle={{
                  textAlign: "center",
                  fontWeight: "bolder",
                  backgroundColor: "aliceblue",
                }}
              >
                <Row>
                  <Col span={12}>
                    <Form.Item
                      {...formItemLayoutdpjp6}
                      label="OD"
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        value={tonometriOd}
                        style={{ width: "100%" }}
                        placeholder="..."
                        onChange={(e) => ontonometriOd(e)}
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp6}
                      label="OS"
                      style={{ marginBottom: 0 }}
                    >
                      <Input
                        value={tonometriOs}
                        style={{ width: "100%" }}
                        placeholder="..."
                        onChange={(e) => ontonometriOs(e)}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      {...formItemLayoutdpjp6}
                      label="Dibawah ini namanya field apa?"
                      style={{ marginBottom: 0 }}
                    >
                      <Radio.Group
                        value={jenisTonometri}
                        onChange={(e) => onjenisTonometri(e)}
                      >
                        <Radio value={1}>SCHIOETZ </Radio>
                        <Radio value={2}>APLANASI </Radio>
                        <Radio value={3}>NON-CONTACT</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Card
                size="small"
                style={{ textAlign: "center" }}
                title="Visus / Refraksi"
                headStyle={{
                  textAlign: "center",
                  fontWeight: "bolder",
                  backgroundColor: "aliceblue",
                }}
              >
                <Form.Item
                  {...formItemLayoutdpjp6}
                  label="Visus Sebelum Koreksi"
                  style={{ marginBottom: 0 }}
                >
                  <Row>
                    <Col span={8}>
                      OD
                      <Input
                        value={virusSeblOd}
                        style={{ width: "80%" }}
                        placeholder="..."
                        onChange={(e) => onvirusSeblOd(e)}
                      />
                    </Col>
                    <Col span={8}>
                      OS
                      <Input
                        value={virusSeblOs}
                        style={{ width: "80%" }}
                        placeholder="..."
                        onChange={(e) => onvirusSeblOs(e)}
                      />
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item
                  {...formItemLayoutdpjp6}
                  label="Visus Sebelum Koreksi"
                  style={{ marginBottom: 0 }}
                >
                  <table border="1" cellspacing="0" cellpadding="0">
                    <tbody>
                      <tr>
                        <td width="78" rowspan="2">
                          <p align="center">Pro</p>
                        </td>
                        <td width="204" colspan="3">
                          <p align="center">OD</p>
                        </td>
                        <td width="204" colspan="3">
                          <p align="center">OS</p>
                        </td>
                        <td width="78" rowspan="2">
                          <p align="center">Pup Dist</p>
                        </td>
                      </tr>
                      <tr>
                        <td width="68">
                          <p align="center">Sph</p>
                        </td>
                        <td width="68">
                          <p align="center">Cyl</p>
                        </td>
                        <td width="68">
                          <p align="center">Axis</p>
                        </td>
                        <td width="68">
                          <p align="center">Sph</p>
                        </td>
                        <td width="68">
                          <p align="center">Cyl</p>
                        </td>
                        <td width="68">
                          <p align="center">Axis</p>
                        </td>
                      </tr>
                      <tr>
                        <td width="78">
                          <p align="center">Longin Quitato</p>
                        </td>
                        <td width="68">
                          <p align="center">
                            <Input
                              value={sph1A}
                              style={{ width: "100%" }}
                              placeholder="..."
                              onChange={(e) => onsph1A(e)}
                            />
                          </p>
                        </td>
                        <td width="68">
                          <p align="center">
                            <Input
                              value={cyl1A}
                              style={{ width: "100%" }}
                              placeholder="..."
                              onChange={(e) => oncyl1A(e)}
                            />
                          </p>
                        </td>
                        <td width="68">
                          <p align="center">
                            <Input
                              value={axs1A}
                              style={{ width: "100%" }}
                              placeholder="..."
                              onChange={(e) => onaxs1A(e)}
                            />
                          </p>{" "}
                        </td>
                        <td width="68">
                          <p align="center">
                            <Input
                              value={sph1B}
                              style={{ width: "100%" }}
                              placeholder="..."
                              onChange={(e) => onsph1B(e)}
                            />
                          </p>
                        </td>
                        <td width="68">
                          <p align="center">
                            <Input
                              value={cyl1B}
                              style={{ width: "100%" }}
                              placeholder="..."
                              onChange={(e) => oncyl1B(e)}
                            />
                          </p>
                        </td>
                        <td width="68">
                          <p align="center">
                            <Input
                              value={axs1B}
                              style={{ width: "100%" }}
                              placeholder="..."
                              onChange={(e) => onaxs1B(e)}
                            />
                          </p>
                        </td>
                        <td width="78">
                          <p align="center">
                            <Input
                              value={dkt}
                              style={{ width: "100%" }}
                              placeholder="..."
                              onChange={(e) => ondkt(e)}
                            />
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td width="78">
                          <p align="center">Propin Quitato</p>
                        </td>
                        <td width="68">
                          <p align="center">
                            <Input
                              value={sph2A}
                              style={{ width: "100%" }}
                              placeholder="..."
                              onChange={(e) => onsph2A(e)}
                            />
                          </p>
                        </td>
                        <td width="68">
                          <p align="center">
                            <Input
                              value={cyl2A}
                              style={{ width: "100%" }}
                              placeholder="..."
                              onChange={(e) => oncyl2A(e)}
                            />
                          </p>
                        </td>
                        <td width="68">
                          <p align="center">
                            <Input
                              value={axs2A}
                              style={{ width: "100%" }}
                              placeholder="..."
                              onChange={(e) => onaxs2A(e)}
                            />
                          </p>
                        </td>
                        <td width="68">
                          <p align="center">
                            <Input
                              value={sph2B}
                              style={{ width: "100%" }}
                              placeholder="..."
                              onChange={(e) => onsph2B(e)}
                            />
                          </p>
                        </td>
                        <td width="68">
                          <p align="center">
                            <Input
                              value={cyl2B}
                              style={{ width: "100%" }}
                              placeholder="..."
                              onChange={(e) => oncyl2B(e)}
                            />
                          </p>
                        </td>
                        <td width="68">
                          <p align="center">
                            <Input
                              value={axs2B}
                              style={{ width: "100%" }}
                              placeholder="..."
                              onChange={(e) => onaxs2B(e)}
                            />
                          </p>
                        </td>
                        <td width="78">
                          <p align="center">
                            <Input
                              value={sph1A}
                              style={{ width: "100%" }}
                              placeholder="..."
                              onChange={(e) => onsph1A(e)}
                            />
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Form.Item>
                <Form.Item
                  {...formItemLayoutdpjp6}
                  label="Binokuler Sebelum Koreksi"
                  style={{ marginBottom: 0 }}
                >
                  <TextArea
                    value={binokulerSebl}
                    rows={2}
                    placeholder="..."
                    onChange={(e) => onbinokulerSebl(e)}
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayoutdpjp6}
                  label="Visus Sesudah Koreksi"
                  style={{ marginBottom: 0 }}
                >
                  <Row>
                    <Col span={8}>
                      OD
                      <Input
                        value={virusSesdOd}
                        style={{ width: "80%" }}
                        placeholder="..."
                        onChange={(e) => onvirusSesdOd(e)}
                      />
                    </Col>
                    <Col span={8}>
                      OS
                      <Input
                        value={virusSesdOs}
                        style={{ width: "80%" }}
                        placeholder="..."
                        onChange={(e) => onvirusSesdOs(e)}
                      />
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item
                  {...formItemLayoutdpjp6}
                  label="Binokuler Sesudah Koreksi"
                  style={{ marginBottom: 0 }}
                >
                  <TextArea
                    value={binokulerSesd}
                    rows={2}
                    placeholder="..."
                    onChange={(e) => onbinokulerSesd(e)}
                  />
                </Form.Item>
                <Row>
                  <Col span={24} style={{ textAlign: "right" }}>
                    <Button type="primary" onClick={() => simpanMata()}>
                      Simpan
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Form> */}
      </Card>
    </div>
  );
};

export default Polimata;
