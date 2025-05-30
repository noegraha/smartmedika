import React, { useContext, useState } from "react";
import {
  Select,
  Form,
  Row,
  Col,
  Card,
  Button,
  Space,
  message,
  Input,
  Alert,
} from "antd";
import dayjs from "dayjs";
import { AskepContext } from "../../rawatinap/context/AskepContext";
import { MasterDiagnosaAskepContext } from "../../master/context/masteraskep/MasterDiagnosaAskepContext";
import { MasterLuaranAskepContext } from "../../master/context/masteraskep/MasterLuaranAskepContext";
// import { MasterIntervensiAskepContext } from '../../master/context/masteraskep/MasterIntervensiAskepContext';
import { MasterKriteriaAskepContext } from "../../master/context/masteraskep/MasterKriteriaAskepContext";
import { PasienContext } from "../context/PasienContext";
import { LoginContext } from "../context";
import { MasterImplementasiAskepContext } from "../../master/context/masteraskep/MasterImplementasiAskepContext";
const { TextArea } = Input;

const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
// let index = 1;

const FormPengkajianAskepRJNEW = () => {
  const { curpas } = useContext(PasienContext);
  // const [modalPanduan, setmodalPanduan] = useState(false);
  const { pegawai } = useContext(LoginContext);
  // const [visibleTGejala, setvisibleTGejala] = useState(false);
  const {
    // valuecekAssesment, cekAssement,
    tanggal,
    settanggal,
    diagnosaId,
    setdiagnosaId,
    nTandaGejala,
    // insertEmrAskep,
    settargetWaktu,
    // targetWaktu,
    setnTandaGejala,
    nIntervensi,
    setnIntervensi,
    nKriteria,
    setnKriteria,
    // getListAskepById,
    nImplementasi,
    setnImplementasi,
    nKesimpulan,
    setnKesimpulan,
    // ListAskepById,getAskepByIdByDx,
    // registrasiId, deleteAskpeByIdByDx,
    listmsttandagejala,
    jenisKriteria,
    setJenisKriteria,
    // userIdAskep,
    hiddenSaveButton,
    setHiddenSaveButton,
    hiddenSaveEdit,
    setHiddenSaveEdit,
    getTandaGejalaByNoreg,
    catatan,
    setCatatan,
    // insertImplementasiAskepMulti,
    insertAskepRj,
    idCatatan,
    // kosongkanformaskepRJ,
    // getKriterianEvaluasiByIdByDx,
    getCatatanRJ,
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
  // const { intervensibydx, getintervensibydx } = useContext(MasterIntervensiAskepContext);
  const {
    // listImplementasiByIntervensi,
    setlistImplementasiByIntervensi,
    // getImplementasiByIntervensiId,
    getImplementasiByDiagnosaId,
    // setimplementasiByDx,
    implementasiByDx,
  } = useContext(MasterImplementasiAskepContext);
  const {
    // kriteriaByLuaran,
    // getbyluaranjns,
    // jnsKriteriaByLuaran,
    // getJnsKriteriaByLuaran,
    kesimpulanByTarget,
    setkesimpulanByTarget,
    // getKesimpulanByhasilTarget,
    kriteriaKesimpulan,
    // setkriteriaKesimpulan, getKriteriaKesimpulan
  } = useContext(MasterKriteriaAskepContext);
  // const dateFormat = 'DD-MM-YYYY HH:mm';
  // const [slki, setSlki] = useState([]);
  //const [kriteria, setKriteria] = useState([]);
  // const [hiddenTgejala, sethiddenTgejala] = useState(true);
  // const [hiddenKriteria, sethiddenKriteria] = useState(true);
  // const [hiddenIntervensi, sethiddenIntervensi] = useState(true);
  // const [hiddenSave, setHiddenSave] = useState(true);

  // const [jnskriteria1, setjnskreiteria1] = useState('');
  // const [hiddendelete, sethiddendelete] = useState(true);
  // const [isiaturan, setIsiAturan] = useState([
  //   "3 menit",
  //   "5 menit",
  //   "6 menit",
  //   "7 menit",
  //   "8 menit",
  //   "9 menit",
  //   "10 menit",
  //   "0.25 jam",
  //   "0.5 jam",
  //   "1 jam",
  //   "2 jam",
  //   "3 jam"
  // ]);
  // const options = [
  //   { value: '3 menit' },
  //   { value: '5 menit' },
  //   { value: '6 menit' },
  //   { value: '7 menit' },
  //   { value: '8 menit' },
  //   { value: '9 menit' },
  //   { value: '10 menit' }
  // ];
  // const [name, setName] = useState("");
  const ontandagejala = (value) => {
    setdiagnosaId([]);
    setnTandaGejala(value);
  };
  // const onKriteria = (value) => {
  //   setnKriteria(value);
  // }
  const onintervensi = (value) => {
    setnImplementasi(value);
    // getImplementasiByIntervensiId(value);
    console.log(value);
  };
  // const onTglajuan = (date, dateString) => {
  //   settanggal(date);
  // }
  // const onSlki = (e) => {
  //   console.log(e)
  //   settargetWaktu(e);
  //   getJnsKriteriaByLuaran(luaranbydx.luaranId);
  //   console.log(luaranbydx.luaranId);
  // }
  // const onLainnya = (e) => {
  //   settargetWaktu(e.target.value);
  //   // getJnsKriteriaByLuaran(luaranbydx.luaranId);
  //   console.log(e);
  // }
  // const pilihjnskriteria = (e) => {
  //   setJenisKriteria(e);
  //   setnKriteria([]);
  //   getbyluaranjns(luaranbydx.luaranId, e);
  //   setnKesimpulan('');
  //   setkesimpulanByTarget('');
  //   console.log(luaranbydx.luaranId);
  //   console.log(e);
  // }

  const onpilihdx = (e) => {
    setdiagnosaId(e);
    //setLuaranbydx(e);
    getluaranbydiagnosaid(e); //unutk menampilkan luaran berdasarkan diagnosa
    // getintervensibydx(e);//untuk menampilkan intervensi berdasarkan diagnosa
    // settargetWaktu('');
    //setluaranId('');
    // setnIntervensi([]);
    // setnKriteria([]);
    // setJenisKriteria('');
    // setlistImplementasiByIntervensi([]);
    // setkesimpulanByTarget('');
    // setnKesimpulan('');
    getCatatanRJ(
      curpas.registrasiId,
      curpas.ruangId,
      dayjs(tanggal).format("YYYY-MM-DD")
    );
    getImplementasiByDiagnosaId(e);
    setnIntervensi([]);
    setnImplementasi([]);

    //console.log(gjlbaru);
    // getJnsKriteriaByLuaran(luaranbydx.luaranId);
  };

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

    const kriteriabarueva = [];
    for (var i = 0; i < kriteriaKesimpulan.length; i++) {
      kriteriabarueva.push({
        id: 0,
        registrasiId: curpas.registrasiId,
        diagnosaId: diagnosaId,
        kriteriaId: kriteriaKesimpulan.map((b) => b.kriteriaId)[i],
        jenis: parseInt(nKesimpulan),
        tanggal: dayjs(tanggal).format("YYYY-MM-DDTHH:mm"),
        kesimpulan: kesimpulanByTarget,
        userId: namauser,
      });
    }

    // const datapengkajian = {
    //   registrasiId: curpas.registrasiId,
    //   pasienId: curpas.pasienId,
    //   tanggal: dayjs(tanggal).format('YYYY-MM-DDTHH:mm'),
    //   ruangId: curpas.ruangId,
    //   pegawaiId: curpas.dokterId,
    //   diagnosaId: diagnosaId,
    //   targetWaktu: targetWaktu,
    //   luaranId: luaranbydx.luaranId,
    //   userId: namauser,
    //   nTandaGejala: gjlbaru,
    //   nIntervensi: intvbaru,
    //   nKriteria: kriteriabaru
    // }

    const datacatatan = {
      id: idCatatan,
      registrasiId: curpas.registrasiId,
      pasienId: curpas.pasienId,
      ruangId: curpas.ruangId,
      tanggal: dayjs(tanggal).format("YYYY-MM-DDTHH:mm"),
      catatan: catatan,
      userId: namauser,
    };

    const implementasiMulti = [];
    for (var i = 0; i < nImplementasi.length; i++) {
      implementasiMulti.push({
        id: 0,
        registrasiId: curpas.registrasiId,
        diagnosaId: diagnosaId,
        ruangId: curpas.ruangId,
        implementasiId: nImplementasi[i],
        tanggal: dayjs(tanggal).format("YYYY-MM-DDTHH:mm"),
        userId: namauser,
      });
    }

    const dataAskepRJ = {
      registrasiId: curpas.registrasiId,
      pasienId: curpas.pasienId,
      tanggal: dayjs(tanggal).format("YYYY-MM-DDTHH:mm"),
      ruangId: curpas.ruangId,
      pegawaiId: curpas.dokterId,
      diagnosaId: diagnosaId,
      targetWaktu: "6 menit",
      luaranId: luaranbydx.luaranId,
      userId: namauser,
      nTandaGejala: gjlbaru,
      nImplementasi: implementasiMulti,
      nCatatan: datacatatan,
    };

    // nTandaGejala === '' || nTandaGejala === [] ? message.warning('Pilih Tanda Gejala Pasien Terebih Dahulu') :
    // diagnosaId === '' || diagnosaId === [] ? message.warning('Pilih Diagnosa Pasien Terebih Dahulu') :
    // targetWaktu === '' ? message.warning('Pilih Target Waktu Pasien Terebih Dahulu') :
    // nKriteria === '' ? message.warning('Pilih Kriteria Pasien Terebih Dahulu') :
    // nImplementasi === '' ? message.warning('Pilih Implmentasi Pasien Terebih Dahulu') :
    // catatan === '' ? message.warning('Silahkan Isi Catatan Terebih Dahulu') :
    // nKesimpulan === '' ? message.warning('Pilih Kesimpulan Terebih Dahulu') :
    insertAskepRj(dataAskepRJ);
    console.log(dataAskepRJ);
  };

  const onfocusdiagnosa = () => {
    // setHiddenSave(true);
    // sethiddenIntervensi(true);
    // sethiddenTgejala(true);
    // sethiddenKriteria(true);
    diagnosabytandagejala(nTandaGejala);
  };

  // const onNameChange = (e) => {
  //   setName(e.target.value);
  // };
  // const addAturan = () => {
  //   console.log("addItem");
  //   setIsiAturan([...isiaturan, name || `Aturan baru ${index++}`]);
  //   setName("");
  // };

  const onbatal = () => {
    settanggal(dayjs());
    setdiagnosaId("");
    settargetWaktu("");
    //setluaranId('');
    setnTandaGejala([]);
    setnIntervensi([]);
    setnImplementasi([]);
    setnKriteria([]);
    setJenisKriteria("");
    setLuaranbydx([]);
    setHiddenSaveButton(false);
    setHiddenSaveEdit(true);
    setCatatan("");
    setkesimpulanByTarget("");
    setlistImplementasiByIntervensi([]);
    setnKesimpulan([]);
    console.log("kosongkan form askep");
  };

  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Card size="small">
            <Row gutter={[4, 0]}>
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

              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  label="Diagnosa Keperawatan"
                  style={{ marginBottom: 2 }}
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

              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  xs={2}
                  sm={4}
                  md={6}
                  lg={8}
                  xl={8}
                  label="Implementasi"
                  style={{ marginBottom: 2 }}
                >
                  <Select
                    value={nImplementasi}
                    // onFocus={onfocusIntervensi}
                    style={{ width: "100%", maxWidth: "78vw" }}
                    mode="multiple"
                    allowClear
                    showSearch
                    source={implementasiByDx}
                    onChange={onintervensi}
                    placeholder="..."
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {implementasiByDx.map((b) => (
                      <Option key={b.ImplementasiId}>{b.Deskripsi}</Option>
                    ))}
                  </Select>
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
                  label="Catatan"
                  style={{ marginBottom: 2 }}
                >
                  <TextArea
                    rows={2}
                    placeholder="..."
                    value={catatan}
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      setCatatan(e.target.value);
                    }}
                    // placeholder="..."
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Space></Space>
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
                          : // tanggal === null ? message.warning("Tanggal masih kosong.") :
                          nTandaGejala.length === 0
                          ? message.warning("Tanda Gejala masih kosong.")
                          : diagnosaId === null
                          ? message.warning("Diagnosa masih kosong.")
                          : nImplementasi.length === 0
                          ? message.warning(
                              "Pilih Implmentasi Pasien Terebih Dahulu"
                            )
                          : catatan === ""
                          ? message.warning(
                              "Silahkan Isi Catatan Terebih Dahulu"
                            )
                          : // luaranbydx.deskripsi === null ? message.warning("Luaran masih kosong.") :
                            // targetWaktu === null ? message.warning("Lama Intervensi masih kosong.") :
                            // jenisKriteria === null ? message.warning("Jenis Kriteria masih kosong.") :
                            // nKriteria.length === 0 ? message.warning("Kriteria masih kosong.") :
                            // nIntervensi.length === 0 ? message.warning("Intervensi masih kosong.") :
                            onSimpan()
                        : // console.log('berhasil simpan')

                        // tanggal === null ? message.warning("Tanggal masih kosong.") :
                        nTandaGejala.length === 0
                        ? message.warning("Tanda Gejala masih kosong.")
                        : diagnosaId === null
                        ? message.warning("Diagnosa masih kosong.")
                        : nImplementasi.length === 0
                        ? message.warning(
                            "Pilih Implmentasi Pasien Terebih Dahulu"
                          )
                        : catatan === ""
                        ? message.warning("Silahkan Isi Catatan Terebih Dahulu")
                        : // luaranbydx.deskripsi === null ? message.warning("Luaran masih kosong.") :
                          // targetWaktu === null ? message.warning("Lama Intervensi masih kosong.") :
                          // jenisKriteria === null ? message.warning("Jenis Kriteria masih kosong.") :
                          // nKriteria.length === 0 ? message.warning("Kriteria masih kosong.") :
                          // nIntervensi.length === 0 ? message.warning("Intervensi masih kosong.") :
                          onSimpan();
                      // console.log('berhasil simpan')
                    }}
                    hidden={hiddenSaveButton}
                  >
                    Simpan
                  </Button>

                  {/* <Tooltip title={
                    userIdAskep.toUpperCase() === namauser.toUpperCase() ? '' : 'Akun Anda Tidak Bisa Mengedit'
                  }
                    color='red'> */}
                  <Button
                    type="primary"
                    onClick={onSimpan}
                    hidden={hiddenSaveEdit}
                    //  disabled={userIdAskep.toUpperCase() === namauser.toUpperCase() ? false : true}
                  >
                    Simpan
                  </Button>
                  {/* </Tooltip> */}
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

export default FormPengkajianAskepRJNEW;
