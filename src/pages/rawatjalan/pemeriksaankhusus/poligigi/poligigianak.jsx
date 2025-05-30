import React, { useContext } from "react";
import { Checkbox, Row, Col, Divider, Form, Input, Button } from "antd";
import { PasienContext } from "../../context/PasienContext";
import { PoliGigiContext } from "../../context/pemeriksaancontext/PoliGigiContext";

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 10 },
};

const Poligigianak = () => {
  const { curpas } = useContext(PasienContext);
  const {
    insertGigi,
    setElemen,
    setDiagnosa,
    setTerapi,
    elemen,
    diagnosa,
    terapi,
    g11,
    g12,
    g13,
    g14,
    g15,
    g16,
    g17,
    g18,
    g21,
    g22,
    g23,
    g24,
    g25,
    g26,
    g27,
    g28,
    g31,
    g32,
    g33,
    g34,
    g35,
    g36,
    g37,
    g38,
    g41,
    g42,
    g43,
    g44,
    g45,
    g46,
    g47,
    g48,
    setG11,
    setG12,
    setG13,
    setG14,
    setG15,
    setG16,
    setG17,
    setG18,
    setG21,
    setG22,
    setG23,
    setG24,
    setG25,
    setG26,
    setG27,
    setG28,
    setG31,
    setG32,
    setG33,
    setG34,
    setG35,
    setG36,
    setG37,
    setG38,
    setG41,
    setG42,
    setG43,
    setG44,
    setG45,
    setG46,
    setG47,
    setG48,
  } = useContext(PoliGigiContext);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const datagigiumum = {
    registrasiId: curpas.registrasiId,
    elemen: elemen.toString(),
    diagnosa: diagnosa,
    terapi: terapi,
    g11: g11,
    g12: g12,
    g13: g13,
    g14: g14,
    g15: g15,
    g16: g16,
    g17: g17,
    g18: g18,
    g21: g21,
    g22: g22,
    g23: g23,
    g24: g24,
    g25: g25,
    g26: g26,
    g27: g27,
    g28: g28,
    g31: g31,
    g32: g32,
    g33: g33,
    g34: g34,
    g35: g35,
    g36: g36,
    g37: g37,
    g38: g38,
    g41: g41,
    g42: g42,
    g43: g43,
    g44: g44,
    g45: g45,
    g46: g46,
    g47: g47,
    g48: g48,
    isAnak: curpas.umur.split(" ").shift() > 16 ? false : true,
    clientHost: host,
    clientIP: ip,
  };
  const onElemen = (e) => {
    setElemen(e.target.value);
  };
  const onDiagnosa = (e) => {
    setDiagnosa(e.target.value);
  };
  const onTerapi = (e) => {
    setTerapi(e.target.value);
  };
  const on11 = (e) => {
    setG11(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const on12 = (e) => {
    setG12(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const on13 = (e) => {
    setG13(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const on14 = (e) => {
    setG14(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const on15 = (e) => {
    setG15(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const on16 = (e) => {
    setG16(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const on17 = (e) => {
    setG17(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const on18 = (e) => {
    setG18(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const on21 = (e) => {
    setG21(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const on22 = (e) => {
    setG22(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const on23 = (e) => {
    setG23(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const on24 = (e) => {
    setG24(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const on25 = (e) => {
    setG25(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const on26 = (e) => {
    setG26(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const on27 = (e) => {
    setG27(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const on28 = (e) => {
    setG28(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const on31 = (e) => {
    setG31(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const on32 = (e) => {
    setG32(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const on33 = (e) => {
    setG33(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const on34 = (e) => {
    setG34(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const on35 = (e) => {
    setG35(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const on36 = (e) => {
    setG36(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const on37 = (e) => {
    setG37(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const on38 = (e) => {
    setG38(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const on41 = (e) => {
    setG41(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const on42 = (e) => {
    setG42(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const on43 = (e) => {
    setG43(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const on44 = (e) => {
    setG44(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const on45 = (e) => {
    setG45(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const on46 = (e) => {
    setG46(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const on47 = (e) => {
    setG47(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const on48 = (e) => {
    setG48(e.target.checked);
    e.target.checked
      ? setElemen([...elemen, e.target.name])
      : setElemen(elemen.filter((item) => item !== e.target.name));
  };
  const simpanDataGigi = () => {
    insertGigi(datagigiumum);
    console.log(datagigiumum);
  };

  // const [elemen, setElemen] = useState([]);
  return (
    <div>
      <Form {...layout} onFinish={simpanDataGigi}>
        {/* <Checkbox.Group style={{ width: '100%' }}> */}
        <Row>
          <Col span={8}>
            <Checkbox name="55" checked={g15} onChange={(e) => on15(e)}>
              55
            </Checkbox>
            <Checkbox name="54" checked={g14} onChange={(e) => on14(e)}>
              54
            </Checkbox>
            <Checkbox name="53" checked={g13} onChange={(e) => on13(e)}>
              53
            </Checkbox>
            <Checkbox name="52" checked={g12} onChange={(e) => on12(e)}>
              52
            </Checkbox>
            <Checkbox name="51" checked={g11} onChange={(e) => on11(e)}>
              51
            </Checkbox>
          </Col>
          <Divider type="vertical" />
          <Col span={8}>
            <Checkbox name="61" checked={g21} onChange={(e) => on21(e)}>
              61
            </Checkbox>
            <Checkbox name="62" checked={g22} onChange={(e) => on22(e)}>
              62
            </Checkbox>
            <Checkbox name="63" checked={g23} onChange={(e) => on23(e)}>
              63
            </Checkbox>
            <Checkbox name="64" checked={g24} onChange={(e) => on24(e)}>
              64
            </Checkbox>
            <Checkbox name="65" checked={g25} onChange={(e) => on25(e)}>
              65
            </Checkbox>
          </Col>
          <Divider />
          <Col span={8}>
            <Checkbox name="85" checked={g45} onChange={(e) => on45(e)}>
              85
            </Checkbox>
            <Checkbox name="84" checked={g44} onChange={(e) => on44(e)}>
              84
            </Checkbox>
            <Checkbox name="83" checked={g43} onChange={(e) => on43(e)}>
              83
            </Checkbox>
            <Checkbox name="82" checked={g42} onChange={(e) => on42(e)}>
              82
            </Checkbox>
            <Checkbox name="81" checked={g41} onChange={(e) => on41(e)}>
              81
            </Checkbox>
          </Col>
          <Divider type="vertical" />
          <Col span={8}>
            <Checkbox name="71" checked={g31} onChange={(e) => on31(e)}>
              71
            </Checkbox>
            <Checkbox name="72" checked={g32} onChange={(e) => on32(e)}>
              72
            </Checkbox>
            <Checkbox name="73" checked={g33} onChange={(e) => on33(e)}>
              73
            </Checkbox>
            <Checkbox name="74" checked={g34} onChange={(e) => on34(e)}>
              74
            </Checkbox>
            <Checkbox name="75" checked={g35} onChange={(e) => on35(e)}>
              75
            </Checkbox>
          </Col>
        </Row>
        {/* </Checkbox.Group> */}

        <Form.Item label="Kesimpulan :"></Form.Item>
        <Form.Item label="Elemen">
          <Input
            style={{ width: 300 }}
            value={
              elemen
              // .sort(function (a, b) {
              // return a - b;
              // })
            }
            onChange={(e) => onElemen(e)}
          />
        </Form.Item>
        <Form.Item label="Diagnosa">
          <Input
            style={{ width: 300 }}
            value={diagnosa}
            onChange={(e) => onDiagnosa(e)}
          />
        </Form.Item>
        <Form.Item label="Terapi">
          <Input
            style={{ width: 300 }}
            value={terapi}
            onChange={(e) => onTerapi(e)}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">
            Simpan
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Poligigianak;
