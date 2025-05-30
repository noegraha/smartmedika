import React, { useContext } from "react";
import { Form, Input, Row, Col, Button } from "antd";
import { PoliGigiContext } from "../../context/pemeriksaancontext/PoliGigiContext";
import { PasienContext } from "../../context/PasienContext";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const Poligigiortho = () => {
  const {
    insertGigiOrtho,
    overJet,
    overBite,
    hubMolarOd,
    hubMolarSos,
    midLineRa,
    midLineRb,
    jumlahRa,
    jumlahRb,
    awraniti,
    awrass,
    awrbniti,
    awrbss,
    ligasiRaod,
    ligasiRaodke,
    ligasiRaos,
    ligasiRaoske,
    ligasiRbod,
    ligasiRbodke,
    ligasiRbos,
    ligasiRboske,
    openCoil,
    openCoilKe,
    powerChain,
    powerChainKe,
    eintraOd,
    eintraOs,
    eintraBod,
    eintraBos,
    eintraIiod,
    eintraIios,
    eintraIiiod,
    eintraIiios,
    pasElSpa,
    pasBand,
    ekstraEti,
    braketRa,
    braketRb,
    jarakI,
    jarakIi,
    jarak,
    upDownElOd,
    upDownElOs,
    bdPro,
    lainLain,
    setOverJet,
    setOverBite,
    setHubMolarOd,
    setHubMolarSos,
    setMidLineRa,
    setMidLineRb,
    setJumlahRa,
    setJumlahRb,
    setAwraniti,
    setAwrass,
    setAwrbniti,
    setAwrbss,
    setLigasiRaod,
    setLigasiRaodke,
    setLigasiRaos,
    setLigasiRaoske,
    setLigasiRbod,
    setLigasiRbodke,
    setLigasiRbos,
    setLigasiRboske,
    setOpenCoil,
    setOpenCoilKe,
    setPowerChain,
    setPowerChainKe,
    setEintraOd,
    setEintraOs,
    setEintraBod,
    setEintraBos,
    setEintraIiod,
    setEintraIios,
    setEintraIiiod,
    setEintraIiios,
    setPasElSpa,
    setPasBand,
    setEkstraEti,
    setBraketRa,
    setBraketRb,
    setJarakI,
    setJarakIi,
    setJarak,
    setUpDownElOd,
    setUpDownElOs,
    setBdPro,
    setLainLain,
  } = useContext(PoliGigiContext);
  const { curpas } = useContext(PasienContext);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const datagigiortho = {
    registrasiId: curpas.registrasiId,
    overJet: overJet,
    overBite: overBite,
    hubMolarOd: hubMolarOd,
    hubMolarSos: hubMolarSos,
    midLineRa: midLineRa,
    midLineRb: midLineRb,
    jumlahRa: jumlahRa,
    jumlahRb: jumlahRb,
    awraniti: awraniti,
    awrass: awrass,
    awrbniti: awrbniti,
    awrbss: awrbss,
    ligasiRaod: ligasiRaod,
    ligasiRaodke: ligasiRaodke,
    ligasiRaos: ligasiRaos,
    ligasiRaoske: ligasiRaoske,
    ligasiRbod: ligasiRbod,
    ligasiRbodke: ligasiRbodke,
    ligasiRbos: ligasiRbos,
    ligasiRboske: ligasiRboske,
    openCoil: openCoil,
    openCoilKe: openCoilKe,
    powerChain: powerChain,
    powerChainKe: powerChainKe,
    eintraOd: eintraOd,
    eintraOs: eintraOs,
    eintraBod: eintraBod,
    eintraBos: eintraBos,
    eintraIiod: eintraIiod,
    eintraIios: eintraIios,
    eintraIiiod: eintraIiiod,
    eintraIiios: eintraIiios,
    pasElSpa: pasElSpa,
    pasBand: pasBand,
    ekstraEti: ekstraEti,
    braketRa: braketRa,
    braketRb: braketRb,
    jarakI: jarakI,
    jarakIi: jarakIi,
    jarak: jarak,
    upDownElOd: upDownElOd,
    upDownElOs: upDownElOs,
    bdPro: bdPro,
    lainLain: lainLain,
    clientHost: host,
    clientIP: ip,
  };
  const simpanGigiOrtho = () => {
    insertGigiOrtho(datagigiortho);
    console.log(datagigiortho);
  };
  const onOverJet = (e) => {
    setOverJet(e.target.value);
  };
  const onOverBite = (e) => {
    setOverBite(e.target.value);
  };
  const onHubMolarOd = (e) => {
    setHubMolarOd(e.target.value);
  };
  const onHubMolarSos = (e) => {
    setHubMolarSos(e.target.value);
  };
  const onMidLineRa = (e) => {
    setMidLineRa(e.target.value);
  };
  const onMidLineRb = (e) => {
    setMidLineRb(e.target.value);
  };
  const onJumlahRa = (e) => {
    setJumlahRa(e.target.value);
  };
  const onJumlahRb = (e) => {
    setJumlahRb(e.target.value);
  };
  const onAwraniti = (e) => {
    setAwraniti(e.target.value);
  };
  const onAwrass = (e) => {
    setAwrass(e.target.value);
  };
  const onAwrbniti = (e) => {
    setAwrbniti(e.target.value);
  };
  const onAwrbss = (e) => {
    setAwrbss(e.target.value);
  };
  const onLigasiRaod = (e) => {
    setLigasiRaod(e.target.value);
  };
  const onLigasiRaodke = (e) => {
    setLigasiRaodke(e.target.value);
  };
  const onLigasiRaos = (e) => {
    setLigasiRaos(e.target.value);
  };
  const onLigasiRaoske = (e) => {
    setLigasiRaoske(e.target.value);
  };
  const onLigasiRbod = (e) => {
    setLigasiRbod(e.target.value);
  };
  const onLigasiRbodke = (e) => {
    setLigasiRbodke(e.target.value);
  };
  const onLigasiRbos = (e) => {
    setLigasiRbos(e.target.value);
  };
  const onLigasiRboske = (e) => {
    setLigasiRboske(e.target.value);
  };
  const onOpenCoil = (e) => {
    setOpenCoil(e.target.value);
  };
  const onOpenCoilKe = (e) => {
    setOpenCoilKe(e.target.value);
  };
  const onPowerChain = (e) => {
    setPowerChain(e.target.value);
  };
  const onPowerChainKe = (e) => {
    setPowerChainKe(e.target.value);
  };
  const onEintraOd = (e) => {
    setEintraOd(e.target.value);
  };
  const onEintraOs = (e) => {
    setEintraOs(e.target.value);
  };
  const onEintraBod = (e) => {
    setEintraBod(e.target.value);
  };
  const onEintraBos = (e) => {
    setEintraBos(e.target.value);
  };
  const onEintraIiod = (e) => {
    setEintraIiod(e.target.value);
  };
  const onEintraIios = (e) => {
    setEintraIios(e.target.value);
  };
  const onEintraIiiod = (e) => {
    setEintraIiiod(e.target.value);
  };
  const onEintraIiios = (e) => {
    setEintraIiios(e.target.value);
  };
  const onPasElSpa = (e) => {
    setPasElSpa(e.target.value);
  };
  const onPasBand = (e) => {
    setPasBand(e.target.value);
  };
  const onEkstraEti = (e) => {
    setEkstraEti(e.target.value);
  };
  const onBraketRa = (e) => {
    setBraketRa(e.target.value);
  };
  const onBraketRb = (e) => {
    setBraketRb(e.target.value);
  };
  const onJarakI = (e) => {
    setJarakI(e.target.value);
  };
  const onJarakIi = (e) => {
    setJarakIi(e.target.value);
  };
  const onJarak = (e) => {
    setJarak(e.target.value);
  };
  const onUpDownElOd = (e) => {
    setUpDownElOd(e.target.value);
  };
  const onUpDownElOs = (e) => {
    setUpDownElOs(e.target.value);
  };
  const onBdPro = (e) => {
    setBdPro(e.target.value);
  };
  const onLainLain = (e) => {
    setLainLain(e.target.value);
  };
  return (
    <div>
      <Form {...layout} onFinish={simpanGigiOrtho}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              label="Over Jet"
              style={{ marginBottom: 0, textAlign: "left" }}
            >
              <Input
                defaultValue="..."
                value={overJet}
                addonAfter="mm"
                onChange={(e) => onOverJet(e)}
              />
            </Form.Item>
            <Form.Item label="Over Bite" style={{ marginBottom: 0 }}>
              <Input
                defaultValue="..."
                value={overBite}
                addonAfter="mm"
                onChange={(e) => onOverBite(e)}
              />
            </Form.Item>
            <Form.Item label="Hubungan Molar Kanan" style={{ marginBottom: 0 }}>
              <Input
                defaultValue="..."
                value={hubMolarOd}
                onChange={(e) => onHubMolarOd(e)}
              />
            </Form.Item>
            <Form.Item label="Hubungan Molar Kiri" style={{ marginBottom: 0 }}>
              <Input
                defaultValue="..."
                value={hubMolarSos}
                onChange={(e) => onHubMolarSos(e)}
              />
            </Form.Item>
            <Form.Item label="Mid Line RA" style={{ marginBottom: 0 }}>
              <Input
                defaultValue="..."
                value={midLineRa}
                onChange={(e) => onMidLineRa(e)}
              />
            </Form.Item>
            <Form.Item label="Mid Line RB" style={{ marginBottom: 0 }}>
              <Input
                defaultValue="..."
                value={midLineRb}
                onChange={(e) => onMidLineRb(e)}
              />
            </Form.Item>
            <Form.Item label="Jumlah RA" style={{ marginBottom: 0 }}>
              <Input
                defaultValue="..."
                value={jumlahRa}
                addonAfter="Gigi"
                onChange={(e) => onJumlahRa(e)}
              />
            </Form.Item>
            <Form.Item label="Jumlah RB" style={{ marginBottom: 0 }}>
              <Input
                defaultValue="..."
                value={jumlahRb}
                addonAfter="Gigi"
                onChange={(e) => onJumlahRb(e)}
              />
            </Form.Item>
            <Form.Item label="AW RA NITI" style={{ marginBottom: 0 }}>
              <Input
                defaultValue="..."
                value={awraniti}
                onChange={(e) => onAwraniti(e)}
              />
            </Form.Item>
            <Form.Item label="AW RA SS" style={{ marginBottom: 0 }}>
              <Input
                defaultValue="..."
                value={awrass}
                onChange={(e) => onAwrass(e)}
              />
            </Form.Item>
            <Form.Item label="AW RB NITI" style={{ marginBottom: 0 }}>
              <Input
                defaultValue="..."
                value={awrbniti}
                onChange={(e) => onAwrbniti(e)}
              />
            </Form.Item>
            <Form.Item label="AW RB SS" style={{ marginBottom: 0 }}>
              <Input
                defaultValue="..."
                value={awrbss}
                onChange={(e) => onAwrbss(e)}
              />
            </Form.Item>
            <Form.Item
              label="Ligasi RA 2 1 1 2"
              style={{ marginBottom: 0 }}
            ></Form.Item>
            <Form.Item label="Ligasi RA Kanan" style={{ marginBottom: 0 }}>
              <Form.Item
                style={{
                  display: "inline-block",
                  width: "calc(68% - 5px)",
                  marginRight: 8,
                  marginBottom: 0,
                }}
              >
                <Input
                  defaultValue="..."
                  value={ligasiRaod}
                  onChange={(e) => onLigasiRaod(e)}
                />
              </Form.Item>
              Ke&nbsp;
              <Form.Item
                style={{
                  display: "inline-block",
                  width: "calc(27% - 5px)",
                  marginBottom: 0,
                }}
              >
                <Input
                  defaultValue="..."
                  value={ligasiRaodke}
                  onChange={(e) => onLigasiRaodke(e)}
                />
              </Form.Item>
            </Form.Item>
            <Form.Item label="Ligasi RA Kiri" style={{ marginBottom: 0 }}>
              <Form.Item
                style={{
                  display: "inline-block",
                  width: "calc(68% - 5px)",
                  marginRight: 8,
                  marginBottom: 0,
                }}
              >
                <Input
                  defaultValue="..."
                  value={ligasiRaos}
                  onChange={(e) => onLigasiRaos(e)}
                />
              </Form.Item>
              Ke&nbsp;
              <Form.Item
                style={{
                  display: "inline-block",
                  width: "calc(27% - 5px)",
                  marginBottom: 0,
                }}
              >
                <Input
                  defaultValue="..."
                  value={ligasiRaoske}
                  onChange={(e) => onLigasiRaoske(e)}
                />
              </Form.Item>
            </Form.Item>
            <Form.Item label="Ligasi RB Kanan" style={{ marginBottom: 0 }}>
              <Form.Item
                style={{
                  display: "inline-block",
                  width: "calc(68% - 5px)",
                  marginRight: 8,
                  marginBottom: 0,
                }}
              >
                <Input
                  defaultValue="..."
                  value={ligasiRbod}
                  onChange={(e) => onLigasiRbod(e)}
                />
              </Form.Item>
              Ke&nbsp;
              <Form.Item
                style={{
                  display: "inline-block",
                  width: "calc(27% - 5px)",
                  marginBottom: 0,
                }}
              >
                <Input
                  defaultValue="..."
                  value={ligasiRbodke}
                  onChange={(e) => onLigasiRbodke(e)}
                />
              </Form.Item>
            </Form.Item>
            <Form.Item label="Ligasi RB Kiri" style={{ marginBottom: 0 }}>
              <Form.Item
                style={{
                  display: "inline-block",
                  width: "calc(68% - 5px)",
                  marginRight: 8,
                  marginBottom: 0,
                }}
              >
                <Input
                  defaultValue="..."
                  value={ligasiRbos}
                  onChange={(e) => onLigasiRbos(e)}
                />
              </Form.Item>
              Ke&nbsp;
              <Form.Item
                style={{
                  display: "inline-block",
                  width: "calc(27% - 5px)",
                  marginBottom: 0,
                }}
              >
                <Input
                  defaultValue="..."
                  value={ligasiRboske}
                  onChange={(e) => onLigasiRboske(e)}
                />
              </Form.Item>
            </Form.Item>
            <Form.Item label="Open Coil Spring" style={{ marginBottom: 0 }}>
              <Form.Item
                style={{
                  display: "inline-block",
                  width: "calc(68% - 5px)",
                  marginRight: 8,
                  marginBottom: 0,
                }}
              >
                <Input
                  defaultValue="..."
                  value={openCoil}
                  onChange={(e) => onOpenCoil(e)}
                />
              </Form.Item>
              Ke&nbsp;
              <Form.Item
                style={{
                  display: "inline-block",
                  width: "calc(27% - 5px)",
                  marginBottom: 0,
                }}
              >
                <Input
                  defaultValue="..."
                  value={openCoilKe}
                  onChange={(e) => onOpenCoilKe(e)}
                />
              </Form.Item>
            </Form.Item>
            <Form.Item label="Power Chain" style={{ marginBottom: 0 }}>
              <Form.Item
                style={{
                  display: "inline-block",
                  width: "calc(68% - 5px)",
                  marginRight: 8,
                  marginBottom: 0,
                }}
              >
                <Input
                  defaultValue="..."
                  value={powerChain}
                  onChange={(e) => onPowerChain(e)}
                />
              </Form.Item>
              Ke&nbsp;
              <Form.Item
                style={{
                  display: "inline-block",
                  width: "calc(27% - 5px)",
                  marginBottom: 0,
                }}
              >
                <Input
                  defaultValue="..."
                  value={powerChainKe}
                  onChange={(e) => onPowerChainKe(e)}
                />
              </Form.Item>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Elastic Intra RA Kanan"
              style={{ marginBottom: 0 }}
            >
              <Input
                defaultValue="..."
                value={eintraOd}
                onChange={(e) => onEintraOd(e)}
              />
            </Form.Item>
            <Form.Item
              label="Elastic Intra RA Kiri"
              style={{ marginBottom: 0 }}
            >
              <Input
                defaultValue="..."
                value={eintraOs}
                onChange={(e) => onEintraOs(e)}
              />
            </Form.Item>
            <Form.Item
              label="Elastic Intra RB Kanan"
              style={{ marginBottom: 0 }}
            >
              <Input
                defaultValue="..."
                value={eintraBod}
                onChange={(e) => onEintraBod(e)}
              />
            </Form.Item>
            <Form.Item
              label="Elastic Intra RB Kiri"
              style={{ marginBottom: 0 }}
            >
              <Input
                defaultValue="..."
                value={eintraBos}
                onChange={(e) => onEintraBos(e)}
              />
            </Form.Item>
            <Form.Item
              label="Elastic Inter Kls II Kanan"
              style={{ marginBottom: 0 }}
            >
              <Input
                defaultValue="..."
                value={eintraIiod}
                onChange={(e) => onEintraIiod(e)}
              />
            </Form.Item>
            <Form.Item
              label="Elastic Inter Kls II Kiri"
              style={{ marginBottom: 0 }}
            >
              <Input
                defaultValue="..."
                value={eintraIios}
                onChange={(e) => onEintraIios(e)}
              />
            </Form.Item>
            <Form.Item
              label="Elastic Inter Kls III Kanan"
              style={{ marginBottom: 0 }}
            >
              <Input
                defaultValue="..."
                value={eintraIiiod}
                onChange={(e) => onEintraIiiod(e)}
              />
            </Form.Item>
            <Form.Item
              label="Elastic Inter Kls III Kiri"
              style={{ marginBottom: 0 }}
            >
              <Input
                defaultValue="..."
                value={eintraIiios}
                onChange={(e) => onEintraIiios(e)}
              />
            </Form.Item>
            <Form.Item
              label="Pasang Elastic Separator"
              style={{ marginBottom: 0 }}
            >
              <Input
                defaultValue="..."
                value={pasElSpa}
                onChange={(e) => onPasElSpa(e)}
              />
            </Form.Item>
            <Form.Item label="Pasang Band" style={{ marginBottom: 0 }}>
              <Input
                defaultValue="..."
                value={pasBand}
                onChange={(e) => onPasBand(e)}
              />
            </Form.Item>
            <Form.Item label="Ekstraeti Gigi" style={{ marginBottom: 0 }}>
              <Input
                defaultValue="..."
                value={ekstraEti}
                onChange={(e) => onEkstraEti(e)}
              />
            </Form.Item>
            <Form.Item
              label="Pasang Bracket RA, AW NITI"
              style={{ marginBottom: 0 }}
            >
              <Input
                defaultValue="..."
                value={braketRa}
                onChange={(e) => onBraketRa(e)}
              />
            </Form.Item>
            <Form.Item
              label="Pasang Bracket RB, AW NITI"
              style={{ marginBottom: 0 }}
            >
              <Input
                defaultValue="..."
                value={braketRb}
                onChange={(e) => onBraketRb(e)}
              />
            </Form.Item>
            <Form.Item label="Jarak Gigi" style={{ marginBottom: 0 }}>
              <Input
                defaultValue="..."
                value={jarak}
                onChange={(e) => onJarak(e)}
              />
            </Form.Item>
            <Form.Item label="Jarak Gigi I" style={{ marginBottom: 0 }}>
              <Input
                defaultValue="..."
                value={jarakI}
                onChange={(e) => onJarakI(e)}
              />
            </Form.Item>
            <Form.Item label="Jarak Gigi II" style={{ marginBottom: 0 }}>
              <Input
                defaultValue="..."
                value={jarakIi}
                onChange={(e) => onJarakIi(e)}
              />
            </Form.Item>
            <Form.Item
              label="Up & Down Elastic Kanan"
              style={{ marginBottom: 0 }}
            >
              <Input
                defaultValue="..."
                value={upDownElOd}
                onChange={(e) => onUpDownElOd(e)}
              />
            </Form.Item>
            <Form.Item
              label="Up & Down Elastic Kiri"
              style={{ marginBottom: 0 }}
            >
              <Input
                defaultValue="..."
                value={upDownElOs}
                onChange={(e) => onUpDownElOs(e)}
              />
            </Form.Item>
            <Form.Item label="b.d. Pro" style={{ marginBottom: 0 }}>
              <Input
                defaultValue="..."
                value={bdPro}
                onChange={(e) => onBdPro(e)}
              />
            </Form.Item>
            <Form.Item label="Lain-lain" style={{ marginBottom: 0 }}>
              <Input
                defaultValue="..."
                value={lainLain}
                onChange={(e) => onLainLain(e)}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Simpan
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Poligigiortho;
