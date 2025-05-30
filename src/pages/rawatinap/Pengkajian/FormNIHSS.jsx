import React, { useContext, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Slider,
  Space,
  Row,
  Col,
  DatePicker,
  Table,
  Alert,
  Popconfirm,
} from "antd";
import { PengkajianContext } from "../context/PengkajianContext";
import { PasienRIContext } from "../context/PasienRIContext";
import { LoginContext } from "../../rawatjalan/context";
import dayjs from "dayjs";
const { Option } = Select;

const FormNIHSS = () => {
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const { curpasRI } = useContext(PasienRIContext);
  const { namauser } = useContext(LoginContext);
  const {
    listNihss,
    setlistNihss,
    getNihss,
    insertNihss,
    delNihss,
    pengkajianNIHSSId,
    setpengkajianNIHSSId,
    tglNihss,
    settglNihss,
    flagNihss,
    setflagNihss,
    tingkatKesadaran,
    settingkatKesadaran,
    menjawabPertanyaan,
    setmenjawabPertanyaan,
    mengikutiPerintah,
    setmengikutiPerintah,
    gaze,
    setgaze,
    visual,
    setvisual,
    paresisWajah,
    setparesisWajah,
    lenganKanan,
    setlenganKanan,
    lenganKiri,
    setlenganKiri,
    tungkaiKanan,
    settungkaiKanan,
    tungkaiKiri,
    settungkaiKiri,
    ataksia,
    setataksia,
    sensorik,
    setsensorik,
    kemampuanBahasa,
    setkemampuanBahasa,
    disartria,
    setdisartria,
    inatensi,
    setinatensi,
    nilaiNihss,
    ketNihss,
  } = useContext(PengkajianContext);

  const databraden = {
    pengkajianNIHSSId: pengkajianNIHSSId,
    registrasiId: curpasRI.registrasiId,
    ruangId: curpasRI.ruangId,
    tanggal: dayjs(tglNihss).format("YYYY-MM-DDTHH:mm"),
    flagAssesment: flagNihss,
    tingkatKesadaran: tingkatKesadaran,
    menjawabPertanyaan: menjawabPertanyaan,
    mengikutiPerintah: mengikutiPerintah,
    gaze: gaze,
    visual: visual,
    paresisWajah: paresisWajah,
    lenganKanan: lenganKanan,
    lenganKiri: lenganKiri,
    tungkaiKanan: tungkaiKanan,
    tungkaiKiri: tungkaiKiri,
    ataksia: ataksia,
    sensorik: sensorik,
    kemampuanBahasa: kemampuanBahasa,
    disartria: disartria,
    inatensi: inatensi,
    nilai: nilaiNihss,
    keterangan: ketNihss,
    userId: namauser,
    hapus: false,
    clientHost: host,
    dateEntry: dayjs().format("YYYY-MM-DDTHH:mm"),
    clientIp: ip,
  };

  const columns = [
    {
      title: "Tanggal",
      dataIndex: "tanggal",
      key: "tanggal",
      render: (text) => dayjs(text).format("DD-MM-YYYY HH:mm"), // Memformat tanggal
    },
    {
      title: "Nilai",
      dataIndex: "nilai",
      key: "nilai",
    },
    {
      title: "Keterangan",
      dataIndex: "keterangan",
      key: "keterangan",
      render: (text, record) => {
        const nilaiNihss = record.nilai; // Sesuaikan jika nilaitotal disimpan di data lain
        const style =
          nilaiNihss < 5
            ? { color: "black", backgroundColor: "yellowgreen", width: "80%" }
            : nilaiNihss >= 5 && nilaiNihss <= 14
            ? { color: "black", backgroundColor: "yellow", width: "80%" }
            : nilaiNihss >= 15 && nilaiNihss <= 24
            ? { color: "black", backgroundColor: "orange", width: "80%" }
            : nilaiNihss >= 25
            ? { color: "black", backgroundColor: "red", width: "80%" }
            : { color: "", backgroundColor: "", width: "80%" };

        return (
          <div
            style={{
              ...style,
              padding: "4px",
              textAlign: "center",
              borderRadius: "4px",
            }}
          >
            {text}
          </div>
        );
      },
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Aksi",
      key: "aksi",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="Anda Yakin Dihapus ?"
            onConfirm={(e) => {
              delNihss(record.pengkajianNIHSSId, record.registrasiId);
            }}
            onCancel={(e) => {}}
            okText="Ya"
            cancelText="Tidak"
          >
            <Button size="small" type="primary" danger>
              Hapus
            </Button>
          </Popconfirm>

          <Button
            size="small"
            style={{ color: "white", backgroundColor: "green" }}
            onClick={() => {
              setpengkajianNIHSSId(record.pengkajianNIHSSId);
              settglNihss(dayjs(record.tanggal));
              settingkatKesadaran(record.tingkatKesadaran);
              setmenjawabPertanyaan(record.menjawabPertanyaan);
              setmengikutiPerintah(record.mengikutiPerintah);
              setgaze(record.gaze);
              setvisual(record.visual);
              setparesisWajah(record.paresisWajah);
              setlenganKanan(record.lenganKanan);
              setlenganKiri(record.lenganKiri);
              settungkaiKanan(record.tungkaiKanan);
              settungkaiKiri(record.tungkaiKiri);
              setataksia(record.ataksia);
              setsensorik(record.sensorik);
              setkemampuanBahasa(record.kemampuanBahasa);
              setdisartria(record.disartria);
              setinatensi(record.inatensi);
            }}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Row gutter={[10, 10]}>
        <Col span={12}>
          <>
            {pengkajianNIHSSId === 0 ? (
              <></>
            ) : (
              <>
                <Alert
                  message="Anda Akana MElakukan Pengeditan Data"
                  type="info"
                  showIcon
                />
              </>
            )}
            <Row>
              <Col span={10}>
                <p>Tanggal Pengkajian</p>
              </Col>
              <Col span={14}>
                <DatePicker
                  value={tglNihss}
                  format="DD-MM-YYYY HH:mm"
                  showTime
                  onChange={(date) => {
                    settglNihss(date);
                  }}
                  style={{ width: "100%" }}
                  placeholder="..."
                />
              </Col>
            </Row>
            <Row>
              <Col span={1}>
                <p>1</p>
              </Col>
              <Col span={9}>
                <p>a. Tingkat kesadaran</p>
              </Col>
              <Col span={14}>
                <Select
                  value={tingkatKesadaran}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    settingkatKesadaran(e);
                  }}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="..."
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value={0}>Sadar Penuh</Option>
                  <Option value={1}>Somnolen</Option>
                  <Option value={2}>Stupor</Option>
                  <Option value={3}>Koma</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={1}>
                <p></p>
              </Col>
              <Col span={9} style={{ wordWrap: "break-word" }}>
                <p>b. Menjawab pertanyaan. Tanyakan bulan dan usia pasien. </p>
              </Col>
              <Col span={14}>
                <Select
                  value={menjawabPertanyaan}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setmenjawabPertanyaan(e);
                  }}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="..."
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value={0}>Benar semua (2 pertanyaan)</Option>
                  <Option value={1}>1 Benar/ETT/disartria</Option>
                  <Option value={2}>Salah semua/afasia/stupor/koma</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={1}>
                <p></p>
              </Col>
              <Col span={9} style={{ wordWrap: "break-word" }}>
                <p>
                  c. Mengikuti perintah. Berikan 2 perintah sederhana, membuka
                  dan menutup mata, menggenggam tangan dan melepaskannya atau 2
                  perintah lain
                </p>
              </Col>
              <Col span={14}>
                <Select
                  value={mengikutiPerintah}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setmengikutiPerintah(e);
                  }}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="..."
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value={0}>Mampu melakukan 2 perintah</Option>
                  <Option value={1}>Mampu melakukan 1 perintah</Option>
                  <Option value={2}>Tidak mampu melakukan perintah</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={1}>
                <p>2.</p>
              </Col>
              <Col span={9}>
                <p>Gaze : gerakan mata konyugat horizontal</p>
              </Col>
              <Col span={14}>
                <Select
                  value={gaze}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setgaze(e);
                  }}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="..."
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value={0}>Normal</Option>
                  <Option value={1}>Abnormal pada satu mata</Option>
                  <Option value={2}>
                    Deviasi konyugat kuat atau paresis konyugat pada 2 mata
                  </Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={1}>
                <p>3</p>
              </Col>
              <Col span={9}>
                <p>Visual : lapang pandang pada tes konfrontasi</p>
              </Col>
              <Col span={14}>
                <Select
                  value={visual}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setvisual(e);
                  }}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="..."
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value={0}>Tidak ada gangguan</Option>
                  <Option value={1}>Kuadrianopsia</Option>
                  <Option value={2}>Hemianopia total</Option>
                  <Option value={3}>Hemianopia bilateral/buta kortikal</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={1}>
                <p>4</p>
              </Col>
              <Col span={9} style={{ wordWrap: "break-word" }}>
                <p>
                  Paresis wajah. Anjurkan pasien menyeringai atau mengangkat
                  alis dan menutup mata
                </p>
              </Col>
              <Col span={14}>
                <Select
                  value={paresisWajah}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setparesisWajah(e);
                  }}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="..."
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value={0}>Normal</Option>
                  <Option value={1}>
                    Paresis wajah ringan /lipatan nasolabial datar, senyum
                    asimetris
                  </Option>
                  <Option value={2}>
                    Paresis wajah partial /paresis wajah bawah total atau hampir
                    total
                  </Option>
                  <Option value={3}>
                    Paresis wajah total /paresis wajah sesisi atau 2 sisi
                  </Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={1}>
                <p>5.</p>
              </Col>
              <Col span={9} style={{ wordWrap: "break-word" }}>
                <p>
                  KANAN Motorik lengan. Anjurkan pasien mengangkat lengan 45⁰
                  bila tidur berbaring atau 90⁰ bila posisi duduk. Bila pasien
                  afasia berikan perintah menggunakan pantomime atau peragaan
                </p>
              </Col>
              <Col span={14}>
                <Select
                  value={lenganKanan}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setlenganKanan(e);
                  }}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="..."
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value={0}>
                    Mampu mengangkat lengan minimal 10 detik
                  </Option>
                  <Option value={1}>Lengan terjatuh sebelum 10 detik</Option>
                  <Option value={2}>
                    Tidak mampu mengangkat secara penuh 90⁰ atau 45⁰
                  </Option>
                  <Option value={3}>
                    Tidaka mampu mengakat hanya bergeser
                  </Option>
                  <Option value={4}>Tidak ada gerakan</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={1}>
                <p></p>
              </Col>
              <Col span={9} style={{ wordWrap: "break-word" }}>
                <p>
                  KIRI Motorik lengan. Anjurkan pasien mengangkat lengan 45⁰
                  bila tidur berbaring atau 90⁰ bila posisi duduk. Bila pasien
                  afasia berikan perintah menggunakan pantomime atau peragaan
                </p>
              </Col>
              <Col span={14}>
                <Select
                  value={lenganKiri}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setlenganKiri(e);
                  }}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="..."
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value={0}>
                    Mampu mengangkat lengan minimal 10 detik
                  </Option>
                  <Option value={1}>Lengan terjatuh sebelum 10 detik</Option>
                  <Option value={2}>
                    Tidak mampu mengangkat secara penuh 90⁰ atau 45⁰
                  </Option>
                  <Option value={3}>
                    Tidaka mampu mengakat hanya bergeser
                  </Option>
                  <Option value={4}>Tidak ada gerakan</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={1}>
                <p>6</p>
              </Col>
              <Col span={9} style={{ wordWrap: "break-word" }}>
                <p>
                  KANAN Motorik tungkai. Anjurkan pasien tidur terlentang dan
                  mengangkat tungkai 30⁰
                </p>
              </Col>
              <Col span={14}>
                <Select
                  value={tungkaiKanan}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    settungkaiKanan(e);
                  }}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="..."
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value={0}>
                    Mampu mengangkat tungkai minimal 5 detik
                  </Option>
                  <Option value={1}>
                    Tungkai jatuh ke tempat tidur pada akhir detik ke-5 secara
                    perlahan
                  </Option>
                  <Option value={2}>
                    Tungkai jatuh sebelum 5 detik tetapi ada usaha untuk melawan
                    gravitasi
                  </Option>
                  <Option value={3}>Tidaka mampu melawan gravitasi</Option>
                  <Option value={4}>Tidak ada gerakan</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={1}>
                <p></p>
              </Col>
              <Col span={9} style={{ wordWrap: "break-word" }}>
                <p>
                  KIRI Motorik tungkai. Anjurkan pasien tidur terlentang dan
                  mengangkat tungkai 30⁰
                </p>
              </Col>
              <Col span={14}>
                <Select
                  value={tungkaiKiri}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    settungkaiKiri(e);
                  }}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="..."
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value={0}>
                    Mampu mengangkat tungkai minimal 5 detik
                  </Option>
                  <Option value={1}>
                    Tungkai jatuh ke tempat tidur pada akhir detik ke-5 secara
                    perlahan
                  </Option>
                  <Option value={2}>
                    Tungkai jatuh sebelum 5 detik tetapi ada usaha untuk melawan
                    gravitasi
                  </Option>
                  <Option value={3}>Tidaka mampu melawan gravitasi</Option>
                  <Option value={4}>Tidak ada gerakan</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={1}>
                <p>7.</p>
              </Col>
              <Col span={9} style={{ wordWrap: "break-word" }}>
                <p>Ataksia anggota badan. Menggunakan test unjuk jari hidung</p>
              </Col>
              <Col span={14}>
                <Select
                  value={ataksia}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setataksia(e);
                  }}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="..."
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value={0}>Tidak ada ataksia</Option>
                  <Option value={1}>Ataksia pada satu ekstremitas</Option>
                  <Option value={2}>
                    Ataksia pada dua atau lebih ekstremitas
                  </Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={1}>
                <p>8.</p>
              </Col>
              <Col span={9} style={{ wordWrap: "break-word" }}>
                <p>
                  Sensorik. Lakukan tes pada seluruh tubuh, tungkai, lengan,
                  badan, dan wajah. Pasien afasia di beri nilai 1 Pasien stupor
                  atau koma diberi nilai 2
                </p>
              </Col>
              <Col span={14}>
                <Select
                  value={sensorik}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setsensorik(e);
                  }}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="..."
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value={0}>Normal</Option>
                  <Option value={1}>
                    Gangguan sensorik ringan hingga sedang. Ada gangguan
                    sensorik terhadap nyeri tetapi masih merasa bila disentuh
                  </Option>
                  <Option value={2}>Gangguan sensorik berat atau total</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={1}>
                <p>9.</p>
              </Col>
              <Col span={9} style={{ wordWrap: "break-word" }}>
                <p>
                  Kemampuan berbahasa. Anjurkan pasien untuk menjelaskan suatu
                  gambar atau membaca suatu tulisan. Bila pasien mengalami
                  kebutaan, letakkan suatu benda di tangan pasien dan anjurkan
                  untuk menjelaskan benda tersebut.
                </p>
              </Col>
              <Col span={14}>
                <Select
                  value={kemampuanBahasa}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setkemampuanBahasa(e);
                  }}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="..."
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value={0}>Normal</Option>
                  <Option value={1}>Afasia ringan hingga sedang</Option>
                  <Option value={2}>Afasia berat</Option>
                  <Option value={3}>Mute, afasia global, coma</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={1}>
                <p>10.</p>
              </Col>
              <Col span={9}>
                <p>Disartria</p>
              </Col>
              <Col span={14}>
                <Select
                  value={disartria}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setdisartria(e);
                  }}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="..."
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value={0}>Normal</Option>
                  <Option value={1}>Disartria ringan</Option>
                  <Option value={2}>Disartria berat</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={1}>
                <p>11.</p>
              </Col>
              <Col span={9}>
                <p>Neglect atau inatensi</p>
              </Col>
              <Col span={14}>
                <Select
                  value={inatensi}
                  // ina={listSpesialisDBRS}
                  onChange={(e) => {
                    setinatensi(e);
                  }}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="..."
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value={0}>Tidak ada neglect</Option>
                  <Option value={1}>
                    Tidak ada antensi pada salah satu modalitas berikut: visual,
                    tactile, auditory, spatial, or personal inattention
                  </Option>
                  <Option value={2}>
                    Tidak ada atensi pada lebih dari satu modalitas
                  </Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={1}>
                <p></p>
              </Col>
              <Col span={9}>
                <p>Keterangan</p>
              </Col>
              <Col span={14}>
                <Input.Group compact>
                  <Input
                    type="text"
                    placeholder="..."
                    readOnly
                    value={nilaiNihss}
                    style={{ width: "20%" }}
                  />
                  <Input
                    type="text"
                    placeholder="..."
                    disabled
                    value={ketNihss}
                    style={
                      nilaiNihss < 5
                        ? {
                            color: "black",
                            backgroundColor: "yellowgreen",
                            width: "80%",
                          }
                        : nilaiNihss >= 5 && nilaiNihss <= 14
                        ? {
                            color: "black",
                            backgroundColor: "yellow",
                            width: "80%",
                          }
                        : nilaiNihss >= 15 && nilaiNihss <= 24
                        ? {
                            color: "black",
                            backgroundColor: "orange",
                            width: "80%",
                          }
                        : nilaiNihss >= 25
                        ? {
                            color: "black",
                            backgroundColor: "red",
                            width: "80%",
                          }
                        : { color: "", backgroundColor: "", width: "80%" }
                    }
                    readOnly
                  />
                </Input.Group>
              </Col>
            </Row>
            <Row>
              <Col span={[24]} style={{ textAlign: "right" }}>
                <Space>
                  <Button
                    // type="primary"
                    onClick={() => {
                      setpengkajianNIHSSId(0);
                      settglNihss(dayjs());
                      settingkatKesadaran("");
                      setmenjawabPertanyaan("");
                      setmengikutiPerintah("");
                      setgaze("");
                      setvisual("");
                      setparesisWajah("");
                      setlenganKanan("");
                      setlenganKiri("");
                      settungkaiKanan("");
                      settungkaiKiri("");
                      setataksia("");
                      setsensorik("");
                      setkemampuanBahasa("");
                      setdisartria("");
                      setinatensi("");
                    }}
                  >
                    Batal
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      insertNihss(databraden);
                    }}
                  >
                    Simpan
                  </Button>
                </Space>
              </Col>
            </Row>
          </>
        </Col>
        <Col span={12}>
          <Table
            columns={columns}
            dataSource={listNihss}
            rowKey="pengkajianNIHSSId"
          />
        </Col>
      </Row>
    </div>
  );
};

export default FormNIHSS;
