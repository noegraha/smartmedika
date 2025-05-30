import React, { useContext, useState } from "react";
import {
  Select,
  Form,
  Row,
  Col,
  Card,
  Button,
  Space,
  DatePicker,
  Divider,
  message,
  Input,
  Tooltip,
  Alert,
} from "antd";

// import { LoadingOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import dayjs from "dayjs";
// import Column from 'antd/lib/table/Column';
import { PlusOutlined } from "@ant-design/icons";
import { AskepContext } from "../../rawatinap/context/AskepContext";
import { MasterDiagnosaAskepContext } from "../../master/context/masteraskep/MasterDiagnosaAskepContext";
import { MasterLuaranAskepContext } from "../../master/context/masteraskep/MasterLuaranAskepContext";
import { MasterIntervensiAskepContext } from "../../master/context/masteraskep/MasterIntervensiAskepContext";
import { MasterKriteriaAskepContext } from "../../master/context/masteraskep/MasterKriteriaAskepContext";
import { PasienContext } from "../context/PasienContext";
import { LoginContext } from "../context";

const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
let index = 1;

const FormPengkajianAskep = () => {
  const { curpas } = useContext(PasienContext);
  const { pegawai } = useContext(LoginContext);
  const {
    // valuecekAssesment, cekAssement,
    tanggal,
    settanggal,
    diagnosaId,
    setdiagnosaId,
    nTandaGejala,
    insertEmrAskep,
    settargetWaktu,
    targetWaktu,
    setnTandaGejala,
    nIntervensi,
    setnIntervensi,
    nKriteria,
    setnKriteria,
    // getListAskepById,
    // ListAskepById,getAskepByIdByDx,
    // registrasiId, deleteAskpeByIdByDx,
    listmsttandagejala,
    jenisKriteria,
    setJenisKriteria,
    userIdAskep,
    hiddenSaveButton,
    setHiddenSaveButton,
    hiddenSaveEdit,
    setHiddenSaveEdit,
    getTandaGejalaByNoreg,
    // listdataaskep, dataaskepid, targetWaktu,  luaranId, setluaranId, setregistrasiId,settargetWaktu,setluaranId,AskepByIdByDx,
  } = useContext(AskepContext);
  const { namauser } = useContext(LoginContext);
  // const { namauser } = useContext(LoginContext);
  //const [tandagejalapasein, setTandagejalapasien] = useState([]);
  // const [intervensipasien, setintervensipasien] = useState([]);
  const { dxbyGejala, diagnosabytandagejala } = useContext(
    MasterDiagnosaAskepContext
  );
  const { luaranbydx, getluaranbydiagnosaid, setLuaranbydx } = useContext(
    MasterLuaranAskepContext
  );
  const { intervensibydx, getintervensibydx } = useContext(
    MasterIntervensiAskepContext
  );
  const {
    kriteriaByLuaran,
    getbyluaranjns,
    jnsKriteriaByLuaran,
    getJnsKriteriaByLuaran,
  } = useContext(MasterKriteriaAskepContext);
  const dateFormat = "DD-MM-YYYY HH:mm";
  // const [slki, setSlki] = useState([]);
  //const [kriteria, setKriteria] = useState([]);
  // const [hiddenTgejala, sethiddenTgejala] = useState(true);
  // const [hiddenKriteria, sethiddenKriteria] = useState(true);
  // const [hiddenIntervensi, sethiddenIntervensi] = useState(true);
  // const [hiddenSave, setHiddenSave] = useState(true);

  // const [jnskriteria1, setjnskreiteria1] = useState('');
  // const [hiddendelete, sethiddendelete] = useState(true);
  const [isiaturan, setIsiAturan] = useState([
    "0.25 jam",
    "0.5 jam",
    "1 jam",
    "2 jam",
    "3 jam",
  ]);
  const [name, setName] = useState("");
  const ontandagejala = (value) => {
    setdiagnosaId([]);
    setnTandaGejala(value);
  };
  const onKriteria = (value) => {
    setnKriteria(value);
  };
  const onintervensi = (value) => {
    setnIntervensi(value);
  };
  const onTglajuan = (date, dateString) => {
    settanggal(date);
  };
  const onSlki = (e) => {
    settargetWaktu(e);
    getJnsKriteriaByLuaran(luaranbydx.luaranId);
    console.log(luaranbydx.luaranId);
  };
  const onLainnya = (e) => {
    settargetWaktu(e.target.value);
    // getJnsKriteriaByLuaran(luaranbydx.luaranId);
    console.log(e);
  };
  const pilihjnskriteria = (e) => {
    setJenisKriteria(e);
    setnKriteria([]);
    getbyluaranjns(luaranbydx.luaranId, e);
    console.log(luaranbydx.luaranId);
    console.log(e);
  };
  // const pilihtandagejala = () => {
  //   //setnTandaGejala()
  //   diagnosabytandagejala(nTandaGejala);
  // }
  const onpilihdx = (e) => {
    setdiagnosaId(e);
    //setLuaranbydx(e);
    getluaranbydiagnosaid(e); //unutk menampilkan luaran berdasarkan diagnosa
    getintervensibydx(e); //untuk menampilkan intervensi berdasarkan diagnosa
    settargetWaktu("");
    //setluaranId('');
    setnIntervensi([]);
    setnKriteria([]);
    setJenisKriteria("");
    //console.log(gjlbaru);
  };
  // const pilihintervensi = () => {
  //   const intvbaru = [];
  //   for (var i = 0; i < nIntervensi.length; i++) {
  //     intvbaru.push({
  //       //registrasiId: curpasRI.registrasiId,
  //       // diagnosaId: diagnosaId,
  //       intervensiId: nIntervensi[i]
  //     })
  //   };
  //   setnIntervensi(intvbaru);
  //   setHiddenSave(false);
  //   sethiddenIntervensi(true);
  //   console.log(intvbaru)
  // }

  // const pilihkriteria = () => {
  //   const kriteriabaru = [];
  //   for (var i = 0; i < nKriteria.length; i++) {
  //     kriteriabaru.push({
  //       //registrasiId: curpasRI.registrasiId,
  //       //diagnosaId: diagnosaId,
  //       kriteriaId: nKriteria[i],
  //       jenis: parseInt(jenisKriteria)
  //     })
  //   };
  //   setnKriteria(kriteriabaru);
  // }

  // const onFokusSimpan = () => {
  //   const intvbaru = [];
  //   for (var i = 0; i < nIntervensi.length; i++) {
  //     intvbaru.push({
  //       //registrasiId: curpasRI.registrasiId,
  //       // diagnosaId: diagnosaId,
  //       intervensiId: nIntervensi[i]
  //     })
  //   };
  //   setnIntervensi(intvbaru);
  //   setHiddenSave(false);
  //   sethiddenIntervensi(true);
  //   console.log(intvbaru)
  // }
  // const dataaskep = {
  //     registrasiId: curpasRI.noreg,
  //     pasienId: curpasRI.nopasien,
  //     tanggal: tanggal,
  //     ruangId: '9301',
  //     pegawaiId: 'D460',
  //     diagnosaId: diagnosaId,
  //     targetWaktu: targetWaktu,
  //     luaranId: luaranbydx.luaranId,
  //     userId: userlog,
  //     nTandaGejala: nTandaGejala,
  //     nIntervensi: nIntervensi,
  //     nKriteria: nKriteria
  // }
  const onSimpan = () => {
    const gjlbaru = [];
    for (var i = 0; i < nTandaGejala.length; i++) {
      gjlbaru.push({
        // registrasiId: curpasRI.registrasiId,
        // diagnosaId: e,
        tandaGejalaId: nTandaGejala[i],
      });
    }
    //setnTandaGejala(gjlbaru);

    const kriteriabaru = [];
    for (var i = 0; i < nKriteria.length; i++) {
      kriteriabaru.push({
        //registrasiId: curpasRI.registrasiId,
        //diagnosaId: diagnosaId,
        kriteriaId: nKriteria[i],
        jenis: parseInt(jenisKriteria),
      });
    }
    //setnKriteria(kriteriabaru);

    const intvbaru = [];
    for (var i = 0; i < nIntervensi.length; i++) {
      intvbaru.push({
        //registrasiId: curpasRI.registrasiId,
        // diagnosaId: diagnosaId,
        intervensiId: nIntervensi[i],
      });
    }
    // setnIntervensi(intvbaru);
    // console.log(intvbaru)
    // console.log('ini data yang mau disimpan', {
    //   registrasiId: curpas.registrasiId,
    //   pasienId: curpas.pasienId,
    //   tanggal: tanggal,
    //   ruangId: curpas.ruangId,
    //   pegawaiId: curpas.dpjpRuangOrder,
    //   diagnosaId: diagnosaId,
    //   targetWaktu: targetWaktu,
    //   luaranId: luaranbydx.luaranId,
    //   userId: namauser,
    //   nTandaGejala: gjlbaru,
    //   nIntervensi: intvbaru,
    //   nKriteria: kriteriabaru
    // });

    nTandaGejala === ""
      ? message.warning("Pilih Tanda Gejala Pasien Terebih Dahulu")
      : diagnosaId === ""
      ? message.warning("Pilih Diagnosa Pasien Terebih Dahulu")
      : targetWaktu === ""
      ? message.warning("Pilih Target Waktu Pasien Terebih Dahulu")
      : nKriteria === ""
      ? message.warning("Pilih Kriteria Pasien Terebih Dahulu")
      : nIntervensi === ""
      ? message.warning("Pilih Intervensi Pasien Terebih Dahulu")
      : insertEmrAskep({
          registrasiId: curpas.registrasiId,
          pasienId: curpas.pasienId,
          tanggal: dayjs(tanggal).format("YYYY-MM-DDTHH:mm"),
          ruangId: curpas.ruangId,
          pegawaiId: curpas.dokterId,
          diagnosaId: diagnosaId,
          targetWaktu: targetWaktu,
          luaranId: luaranbydx.luaranId,
          userId: namauser,
          nTandaGejala: gjlbaru,
          nIntervensi: intvbaru,
          nKriteria: kriteriabaru,
        });
  };
  // const onAmbilAskepByIdByDx = (id, dx, luaran) => {
  //     getAskepByIdByDx(id, dx.slice(0, 6));
  //     console.log(id, dx, luaran.slice(0, 5));
  //     sethiddendelete(false);
  // }
  // const onCanceltip = () => {
  //   message.info('Batal Dihapus!');
  // }
  // const onHapusAskep = (id, dx) => {
  //   deleteAskpeByIdByDx(id, dx.split(' -').shift());
  //   getListAskepById(id);
  //   console.log(id, dx);
  // }
  // const onfocusTgejala = () => {
  //   setHiddenSave(true);
  //   sethiddenTgejala(false);
  //   sethiddenKriteria(true);
  //   sethiddenIntervensi(true);
  // }
  // const onfocusKriteria = () => {
  //   setHiddenSave(true);
  //   sethiddenKriteria(false);
  //   sethiddenIntervensi(true);
  //   sethiddenTgejala(true);
  // }
  // const onfocusIntervensi = () => {
  //   setHiddenSave(true);
  //   sethiddenIntervensi(false);
  //   sethiddenTgejala(true);
  //   sethiddenKriteria(true);

  // }
  // const onfocustgl = () => {
  //   setHiddenSave(true);
  //   sethiddenIntervensi(true);
  //   sethiddenTgejala(true);
  //   sethiddenKriteria(true);
  // }
  const onfocusdiagnosa = () => {
    // setHiddenSave(true);
    // sethiddenIntervensi(true);
    // sethiddenTgejala(true);
    // sethiddenKriteria(true);
    diagnosabytandagejala(nTandaGejala);
  };
  // const onfocuswaktu = () => {
  //   setHiddenSave(true);
  //   sethiddenIntervensi(true);
  //   sethiddenTgejala(true);
  //   sethiddenKriteria(true);
  // }
  // const onfocusslki = () => {
  //   setHiddenSave(true);
  //   sethiddenIntervensi(true);
  //   sethiddenTgejala(true);
  //   sethiddenKriteria(true);
  // }
  const onNameChange = (e) => {
    setName(e.target.value);
  };
  const addAturan = () => {
    console.log("addItem");
    setIsiAturan([...isiaturan, name || `Aturan baru ${index++}`]);
    setName("");
  };

  const onbatal = () => {
    settanggal(dayjs());
    setdiagnosaId("");
    settargetWaktu("");
    //setluaranId('');
    setnTandaGejala([]);
    setnIntervensi([]);
    setnKriteria([]);
    setJenisKriteria("");
    setLuaranbydx([]);
    setHiddenSaveButton(false);
    setHiddenSaveEdit(true);
    console.log("kosongkan form askep");
  };
  // const jammasukri = dayjs(curpasRI.jamMasuk).add(24, 'hours');
  // const jamsekarang = dayjs();
  return (
    <div>
      <Row gutter={[8, 8]}>
        {/* <Col span={24}>
                    <Card title='Diagnosa Pasien' headStyle={{ fontWeight: "bolder", backgroundColor: 'whitesmoke' }}
                        size="small"
                        style={{
                            borderWidth: "2px",
                            borderColor: "darkgray",
                            borderRadius: "4px",
                        }}>
                        <Table
                            bordered
                            locale={{ emptyText: <Empty description='Data Konsultasi Kosong' /> }}
                            pagination={false}
                            dataSource={ListAskepById}
                            size="small"
                            rowKey="reg"
                        >
                            <Column title="Tanggal" key="reg" className="bgcolortunggu" width="20%"
                                render={(ListAskepById) => (
                                    <Button style={{ width: '2%' }} type="link" size="small"
                                        onClick={() => onAmbilAskepByIdByDx(ListAskepById.registrasiId, ListAskepById.diagnosaId, ListAskepById.luaranId)}
                                    >
                                        {dayjs(ListAskepById.tanggal).format('DD-MM-YYYY HH:mm')}
                                    </Button>
                                )} />
                            <Column title="Diagnosa" key="reg" width="30%"
                                render={(ListAskepById) => (
                                    <span>
                                        {(ListAskepById.diagnosaId).slice(9, 1000)}
                                    </span>
                                )} />
                            <Column title="Luaran" key="reg" width="30%"
                                render={(ListAskepById) => (
                                    <span>
                                        {(ListAskepById.luaranId).slice(8, 1000)}
                                    </span>
                                )} />
                            <Column title="Lama Intervensi" key="reg" width="30%"
                                render={(ListAskepById) => (
                                    <span>
                                        {ListAskepById.targetWaktu}
                                    </span>
                                )} />
                        </Table>
                    </Card>
                </Col> */}
        <Col span={24}>
          <Card
            title="Form Pengkajian Dan Intervensi"
            headStyle={{ fontWeight: "bolder", backgroundColor: "beige" }}
            size="small"
            style={{
              borderWidth: "2px",
              borderColor: "darkgray",
              borderRadius: "4px",
            }}
          >
            <Row gutter={[4, 4]}>
              <Col span={24}>
                {pegawai !== null ? (
                  pegawai.slice(0, 1) === "D" ? (
                    <div>
                      <Alert
                        message="Maaf Dokter Tidak Dapat Melakukan Pengisian Asuhan Keperawatan"
                        type="warning"
                        showIcon
                        style={{
                          textAlign: "center",
                        }}
                      />
                    </div>
                  ) : (
                    <div></div>
                  )
                ) : (
                  <div></div>
                )}
              </Col>
              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  label="Tanggal"
                  style={{ marginBottom: 5 }}
                >
                  <DatePicker
                    // onFocus={onfocustgl}
                    value={tanggal}
                    onChange={onTglajuan}
                    disabled
                    style={{ width: "100%" }}
                    format={dateFormat}
                    showTime
                    // value={tglTindakan}
                    //defaultValue={dayjs().add(1, 'days')}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  xs={2}
                  sm={4}
                  md={6}
                  lg={8}
                  xl={8}
                  label="Tanda dan Gejala"
                  style={{ marginBottom: 2 }}
                >
                  <Select
                    //className="ant-select-selection"
                    value={nTandaGejala}
                    //style={{ width: '100 %' }}
                    onFocus={() => {
                      // jamsekarang > jammasukri ?
                      getTandaGejalaByNoreg("%20");
                      // cekAssement(curpas.registrasiId, 3);
                      // getTandaGejalaByNoreg(curpasRI.noreg);
                    }}
                    style={{ width: "100%", maxWidth: "78vw" }}
                    mode="multiple"
                    allowClear
                    showSearch
                    source={listmsttandagejala}
                    onChange={ontandagejala}
                    tokenSeparators={[","]}
                    placeholder="..."
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {listmsttandagejala.map((b) => (
                      <Option key={b.tandaGejalaId}>{b.deskripsi}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={2}>
                {/* <Button type='primary' onClick={pilihtandagejala} hidden={hiddenTgejala}>Simpan</Button> */}
              </Col>
              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  label="Diagnosa"
                  style={{ marginBottom: 5 }}
                >
                  <Select
                    onFocus={onfocusdiagnosa}
                    value={diagnosaId}
                    showSearch
                    source={dxbyGejala}
                    onChange={onpilihdx}
                    // tokenSeparators={[',']}
                    placeholder="..."
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {dxbyGejala.map((b) => (
                      <Option key={b.diagnosaId}>{b.deskripsi}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={2}>
                {/* <Button type="primary" onClick={pilihtandagejala}>Ambil</Button> */}
              </Col>
              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  xs={2}
                  sm={4}
                  md={6}
                  lg={8}
                  xl={8}
                  label="Luaran"
                  style={{ marginBottom: 2 }}
                >
                  <Input
                    value={luaranbydx.deskripsi}
                    disabled
                    style={{ fontWeight: "bold", color: "black" }}
                  />
                  {/* <Alert message={luaranbydx.deskripsi} type="info" span={24} /> */}
                </Form.Item>
              </Col>
              <Col span={2}></Col>
              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  xs={2}
                  sm={4}
                  md={6}
                  lg={8}
                  xl={8}
                  label="Lama Intervensi"
                  style={{ marginBottom: 2 }}
                >
                  <Select
                    value={targetWaktu}
                    placeholder="..."
                    onChange={(e) => onSlki(e)}
                    dropdownRender={(menu) => (
                      <div>
                        {menu}
                        <Divider style={{ margin: "4px 0" }} />
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "nowrap",
                            padding: 8,
                          }}
                        >
                          <Input
                            style={{ flex: "auto" }}
                            value={name}
                            onChange={onNameChange}
                          />
                          <Button
                            type="link"
                            size="small"
                            style={{
                              flex: "none",
                              padding: "3px",
                              display: "block",
                              cursor: "pointer",
                            }}
                            onClick={addAturan}
                          >
                            <PlusOutlined />
                          </Button>
                        </div>
                      </div>
                    )}
                  >
                    {isiaturan.map((item) => (
                      <Option key={item}>{item}</Option>
                    ))}
                  </Select>
                  {/* <Select
                                        onFocus={onfocuswaktu}
                                        source={datawaktu}
                                        //value={targetWaktu}
                                        onChange={onSlki}
                                        showSearch
                                        //mode="tags"
                                        // style={{ width: 500 }}
                                        placeholder="..."
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {datawaktu.map(b => (
                                            <Option key={b}>{b}</Option>
                                        ))}
                                        <Option value="0.25 jam">0.25 jam</Option>
                                        <Option value="0.5 jam">0.5 jam</Option>
                                        <Option value="1 jam">1 jam</Option>
                                        <Option value="2 jam">2 jam</Option>
                                        <Option value="3 jam">3 jam</Option>
                                        <Option value="6 jam">6 jam</Option>
                                        <Option value="12 jam">12 jam</Option>
                                        <Option value="24 jam">24 jam</Option>
                                        <Option value="2x24 jam">2x24 jam</Option>
                                        <Option value="3x24 jam">3x24 jam</Option>
                                        <Option value="5x24 jam">5x24 jam</Option>
                                        <Option value="lainnya">Lainnya</Option>
                                    </Select> */}
                </Form.Item>
              </Col>
              {targetWaktu === "lainnya" ? (
                <Col span={22}>
                  <Form.Item
                    {...formItemLayout}
                    xs={2}
                    sm={4}
                    md={6}
                    lg={8}
                    xl={8}
                    label="."
                    style={{ marginBottom: 2 }}
                  >
                    <Input onChange={onLainnya} placeholder="..." />
                  </Form.Item>
                </Col>
              ) : null}
              <Col span={2}></Col>
              <Col span={24}>
                <Form.Item
                  xs={2}
                  sm={4}
                  md={6}
                  lg={8}
                  xl={8}
                  {...formItemLayout}
                  label="Jenis Kriteria"
                  style={{ marginBottom: 2 }}
                >
                  <Select
                    value={jenisKriteria}
                    // onFocus={onfocusslki}
                    onChange={pilihjnskriteria}
                    showSearch
                    // style={{ width: 500 }}
                    placeholder="..."
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {jnsKriteriaByLuaran.map((b) => (
                      <Option key={b.jenisKriteria}>
                        Kriteria {b.jenisKriteria}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={2}></Col>
              <Col span={24}>
                <Form.Item
                  xs={2}
                  sm={4}
                  md={6}
                  lg={8}
                  xl={8}
                  {...formItemLayout}
                  label="Kriteria"
                  style={{ marginBottom: 2 }}
                >
                  <Select
                    value={nKriteria}
                    // onFocus={onfocusKriteria}
                    style={{ width: "100%", maxWidth: "78vw" }}
                    mode="multiple"
                    allowClear
                    showSearch={false}
                    source={kriteriaByLuaran}
                    onChange={onKriteria}
                    tokenSeparators={[","]}
                    placeholder="..."
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {kriteriaByLuaran.map((b) => (
                      <Option key={b.kriteriaId}>{b.deskripsi}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={2}>
                {/* <Button type='primary' onClick={pilihkriteria} hidden={hiddenKriteria}>Simpan</Button> */}
              </Col>
              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  xs={2}
                  sm={4}
                  md={6}
                  lg={8}
                  xl={8}
                  label="Intervensi"
                  style={{ marginBottom: 2 }}
                >
                  <Select
                    value={nIntervensi}
                    // onFocus={onfocusIntervensi}
                    style={{ width: "100%", maxWidth: "78vw" }}
                    mode="multiple"
                    allowClear
                    showSearch
                    source={intervensibydx}
                    onChange={onintervensi}
                    placeholder="..."
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {intervensibydx.map((b) => (
                      <Option key={b.intervensiId}>{b.deskripsi}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={2}>
                {/* <Button type='primary' onClick={pilihintervensi} hidden={hiddenIntervensi}>Simpan</Button> */}
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Space>
                  {/* <Button onClick={onlihatkriteria}>Cetak</Button> */}
                </Space>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <Space>
                  <Button
                    type="primary"
                    onClick={() => {
                      pegawai !== null
                        ? pegawai.slice(0, 1) === "D"
                          ? message.warning(
                              "Maaf Dokter Tidak Dapat Melakukan Pengisian Evaluasi Keperawatan"
                            )
                          : tanggal === null
                          ? message.warning("Tanggal masih kosong.")
                          : nTandaGejala.length === 0
                          ? message.warning("Tanda Gejala masih kosong.")
                          : diagnosaId === null
                          ? message.warning("Diagnosa masih kosong.")
                          : luaranbydx.deskripsi === null
                          ? message.warning("Luaran masih kosong.")
                          : targetWaktu === null
                          ? message.warning("Lama Intervensi masih kosong.")
                          : jenisKriteria === null
                          ? message.warning("Jenis Kriteria masih kosong.")
                          : nKriteria.length === 0
                          ? message.warning("Kriteria masih kosong.")
                          : nIntervensi.length === 0
                          ? message.warning("Intervensi masih kosong.")
                          : onSimpan()
                        : // console.log('berhasil simpan')

                        tanggal === null
                        ? message.warning("Tanggal masih kosong.")
                        : nTandaGejala.length === 0
                        ? message.warning("Tanda Gejala masih kosong.")
                        : diagnosaId === null
                        ? message.warning("Diagnosa masih kosong.")
                        : luaranbydx.deskripsi === null
                        ? message.warning("Luaran masih kosong.")
                        : targetWaktu === null
                        ? message.warning("Lama Intervensi masih kosong.")
                        : jenisKriteria === null
                        ? message.warning("Jenis Kriteria masih kosong.")
                        : nKriteria.length === 0
                        ? message.warning("Kriteria masih kosong.")
                        : nIntervensi.length === 0
                        ? message.warning("Intervensi masih kosong.")
                        : onSimpan();
                      // console.log('berhasil simpan')
                    }}
                    hidden={hiddenSaveButton}
                  >
                    Simpan
                  </Button>

                  <Tooltip
                    title={
                      userIdAskep.toUpperCase() === namauser.toUpperCase()
                        ? ""
                        : "Akun Anda Tidak Bisa Mengedit"
                    }
                    color="red"
                  >
                    <Button
                      type="primary"
                      onClick={onSimpan}
                      hidden={hiddenSaveEdit}
                      disabled={
                        userIdAskep.toUpperCase() === namauser.toUpperCase()
                          ? false
                          : true
                      }
                    >
                      Simpan
                    </Button>
                  </Tooltip>
                  {/* <Button>Batal</Button> */}
                  {/* <Popconfirm
                                        title="Apakah data sudah benar?"
                                        onConfirm={() => onHapusAskep(registrasiId, diagnosaId)}
                                        onCancel={onCanceltip}
                                        okText="Ya"
                                        cancelText="Tidak"

                                    >
                                        <Button type='primary' danger >Hapus</Button>
                                    </Popconfirm> */}
                  {/* <Button >Cetak</Button> */}
                  <Button onClick={onbatal}>Bersihkan</Button>
                </Space>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FormPengkajianAskep;
