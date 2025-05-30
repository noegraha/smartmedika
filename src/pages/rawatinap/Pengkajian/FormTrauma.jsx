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
import { PasienRIContext } from "../context/PasienRIContext";
import { LoginContext } from "../../rawatjalan/context";
import dayjs from "dayjs";
import { PengkajianContext } from "../context/PengkajianContext";

const { Option } = Select;

const FormTrauma = () => {
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const { curpasRI } = useContext(PasienRIContext);
  const { namauser } = useContext(LoginContext);
  const {
    listTrauma,
    setlistTrauma,
    getTrauma,
    insertTrauma,
    delTrauma,
    pengkajianTraumaId,
    setpengkajianTraumaId,
    tglTrauma,
    settglTrauma,
    flagTrauma,
    setflagTrauma,
    perasaanSedih,
    setperasaanSedih,
    perasaanBersalah,
    setperasaanBersalah,
    bunuhDiri,
    setbunuhDiri,
    insomniaEarly,
    setinsomniaEarly,
    insomniaMiddle,
    setinsomniaMiddle,
    insomniaLate,
    setinsomniaLate,
    kerjaKegiatan,
    setkerjaKegiatan,
    retardasi,
    setretardasi,
    agitasi,
    setagitasi,
    anxietasPsikis,
    setanxietasPsikis,
    anxietasSomatic,
    setanxietasSomatic,
    gejalaGastroinntesnial,
    setgejalaGastroinntesnial,
    gejalaSomatikUmum,
    setgejalaSomatikUmum,
    gejalaGenital,
    setgejalaGenital,
    hipokondriasis,
    sethipokondriasis,
    kehilanganBB,
    setkehilanganBB,
    kehilanganBBNilai,
    setkehilanganBBNilai,
    tilikan,
    settilikan,
    variasiDiurnal,
    setvariasiDiurnal,
    depersonalisasi,
    setdepersonalisasi,
    gejalaParanoid,
    setgejalaParanoid,
    gejalaObsesif,
    setgejalaObsesif,
    ketidakberdayaan,
    setketidakberdayaan,
    keputusasaan,
    setkeputusasaan,
    perasaaanTidakberharga,
    setperasaaanTidakberharga,
    nilaitrauma,
    keterangantrauma,
  } = useContext(PengkajianContext);

  const dataTrauma = {
    pengkajianTraumaId: pengkajianTraumaId,
    registrasiId: curpasRI.registrasiId,
    ruangId: curpasRI.ruangId,
    tanggal: dayjs(tglTrauma).format("YYYY-MM-DDTHH:mm"),
    flagAssesment: flagTrauma,
    perasaanSedih: perasaanSedih,
    perasaanBersalah: perasaanBersalah,
    bunuhDiri: bunuhDiri,
    insomniaEarly: insomniaEarly,
    insomniaMiddle: insomniaMiddle,
    insomniaLate: insomniaLate,
    kerjaKegiatan: kerjaKegiatan,
    retardasi: retardasi,
    agitasi: agitasi,
    anxietasPsikis: anxietasPsikis,
    anxietasSomatic: anxietasSomatic,
    gejalaGastroinntesnial: gejalaGastroinntesnial,
    gejalaSomatikUmum: gejalaSomatikUmum,
    gejalaGenital: gejalaGenital,
    hipokondriasis: hipokondriasis,
    kehilanganBB: kehilanganBB,
    kehilanganBBNilai: kehilanganBBNilai,
    tilikan: tilikan,
    variasiDiurnal: variasiDiurnal,
    depersonalisasi: depersonalisasi,
    gejalaParanoid: gejalaParanoid,
    gejalaObsesif: gejalaObsesif,
    ketidakberdayaan: ketidakberdayaan,
    keputusasaan: keputusasaan,
    perasaaanTidakberharga: perasaaanTidakberharga,
    nilai: nilaitrauma,
    keterangan: keterangantrauma,
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
        const nilaitrauma = record.nilai; // Sesuaikan jika nilaitotal disimpan di data lain
        const style =
          nilaitrauma < 10
            ? { color: "black", backgroundColor: "green", width: "80%" }
            : nilaitrauma > 10 && nilaitrauma < 21
            ? { color: "black", backgroundColor: "yellowgreen", width: "80%" }
            : nilaitrauma > 20 && nilaitrauma < 31
            ? { color: "black", backgroundColor: "yellow", width: "80%" }
            : nilaitrauma > 30 && nilaitrauma < 41
            ? { color: "black", backgroundColor: "orange", width: "80%" }
            : nilaitrauma > 40
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
              delTrauma(record.pengkajianTraumaId, record.registrasiId);
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
              setpengkajianTraumaId(record.pengkajianTraumaId);
              settglTrauma(dayjs(record.tanggal));
              setperasaanSedih(record.perasaanSedih);
              setperasaanBersalah(record.perasaanBersalah);
              setbunuhDiri(record.bunuhDiri);
              setinsomniaEarly(record.insomniaEarly);
              setinsomniaMiddle(record.insomniaMiddle);
              setinsomniaLate(record.insomniaLate);
              setkerjaKegiatan(record.kerjaKegiatan);
              setretardasi(record.retardasi);
              setagitasi(record.agitasi);
              setanxietasPsikis(record.anxietasPsikis);
              setanxietasSomatic(record.anxietasSomatic);
              setgejalaGastroinntesnial(record.gejalaGastroinntesnial);
              setgejalaSomatikUmum(record.gejalaSomatikUmum);
              setgejalaGenital(record.gejalaGenital);
              sethipokondriasis(record.hipokondriasis);
              setkehilanganBB(record.kehilanganBB);
              setkehilanganBBNilai(record.kehilanganBBNilai);
              settilikan(record.tilikan);
              setvariasiDiurnal(record.variasiDiurnal);
              setdepersonalisasi(record.depersonalisasi);
              setgejalaParanoid(record.gejalaParanoid);
              setgejalaObsesif(record.gejalaObsesif);
              setketidakberdayaan(record.ketidakberdayaan);
              setkeputusasaan(record.keputusasaan);
              setperasaaanTidakberharga(record.perasaaanTidakberharga);
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
          {" "}
          <>
            <Row>
              <Col
                span={8}
                style={{
                  textAlign: " left",
                  paddingRight: 5,
                  paddingBottom: 2,
                }}
              >
                Tanggal Pengkajian
              </Col>
              <Col span={16} style={{ paddingBottom: 2 }}>
                {" "}
                <DatePicker
                  value={tglTrauma}
                  format="DD-MM-YYYY HH:mm"
                  showTime
                  onChange={(date) => {
                    settglTrauma(date);
                  }}
                  style={{ width: "100%" }}
                  placeholder="..."
                />
              </Col>
            </Row>
            <Row>
              <Col
                span={8}
                style={{
                  textAlign: " left",
                  paddingRight: 5,
                  paddingBottom: 2,
                }}
              >
                1. Keadaan perasaan sedih (sedih , putus asa, tdk berdaya, tdk
                berguna)
              </Col>
              <Col span={16} style={{ paddingBottom: 2 }}>
                <Select
                  value={perasaanSedih}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setperasaanSedih(e);
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
                  <Option value={0}>Tidak ada</Option>
                  <Option value={1}>Perasaan ini ada hanya bila ditanya</Option>
                  <Option value={2}>
                    Perasaan dinyatakan spontan secara verbal dan non verbal
                  </Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col
                span={8}
                style={{
                  textAlign: " left",
                  paddingRight: 5,
                  paddingBottom: 2,
                }}
              >
                2. Perasaan Bersalah
              </Col>
              <Col span={16} style={{ paddingBottom: 2 }}>
                <Select
                  value={perasaanBersalah}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setperasaanBersalah(e);
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
                  <Option value={0}>Tidak ada</Option>
                  <Option value={1}>
                    Menyalahkan diri sendiri, merasa telah mengecewakan orang
                    lain
                  </Option>
                  <Option value={2}>
                    Ide-ide bersalah atau renungan tentang perbuatan salah atau
                    berdosa di masa lalu
                  </Option>
                  <Option value={3}>
                    Sakit merupakan hukuman, waham bersalah
                  </Option>
                  <Option value={4}>
                    Mendengar suara-suara kutukan atau mengalami halusinasi yang
                    mengancam
                  </Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col
                span={8}
                style={{
                  textAlign: " left",
                  paddingRight: 5,
                  paddingBottom: 2,
                }}
              >
                3. Bunuh Diri
              </Col>
              <Col span={16} style={{ paddingBottom: 2 }}>
                <Select
                  value={bunuhDiri}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setbunuhDiri(e);
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
                  <Option value={0}>Tidak ada</Option>
                  <Option value={1}>Merasa hidup tidak berharga</Option>
                  <Option value={2}>
                    Mengharapkan kematian atau segala hal tentang kemungkinan
                    tersebut
                  </Option>
                  <Option value={3}>
                    Ide-ide atau gerakan-gerakan tentang bunuh diri
                  </Option>
                  <Option value={4}>Percobaan bunuh diri</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col
                span={8}
                style={{
                  textAlign: " left",
                  paddingRight: 5,
                  paddingBottom: 2,
                }}
              >
                4. Insomnia (early)
              </Col>
              <Col span={16} style={{ paddingBottom: 2 }}>
                <Select
                  value={insomniaEarly}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setinsomniaEarly(e);
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
                  <Option value={0}>Tidak ada kesulitan jatuh tidur</Option>
                  <Option value={1}>
                    Kadang-kadang mengeluh sulit tidur &gt; 15 menit
                  </Option>
                  <Option value={2}>Mengeluh sulit tidur setiap malam</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col
                span={8}
                style={{
                  textAlign: " left",
                  paddingRight: 5,
                  paddingBottom: 2,
                }}
              >
                4. Insomnia (middle)
              </Col>
              <Col span={16} style={{ paddingBottom: 2 }}>
                <Select
                  value={insomniaMiddle}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setinsomniaMiddle(e);
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
                    Tidak ada kesulitan mempertahankan tidur
                  </Option>
                  <Option value={1}>
                    Mengeluh gelisah dan terganggu tiap malam
                  </Option>
                  <Option value={2}>Terjaga sepanjang malam</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col
                span={8}
                style={{
                  textAlign: " left",
                  paddingRight: 5,
                  paddingBottom: 2,
                }}
              >
                5. Insomnia (late)
              </Col>
              <Col span={16} style={{ paddingBottom: 2 }}>
                <Select
                  value={insomniaLate}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setinsomniaLate(e);
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
                  <Option value={0}>Tidak ada kesulitan</Option>
                  <Option value={1}>
                    Bangun terlalu pagi tetapi tidur kembali
                  </Option>
                  <Option value={2}>
                    Bila telah bangun/bangkit tidak dapat tidur kembali
                  </Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col
                span={8}
                style={{
                  textAlign: " left",
                  paddingRight: 5,
                  paddingBottom: 2,
                }}
              >
                7. Kerja dan Kegiatan
              </Col>
              <Col span={16} style={{ paddingBottom: 2 }}>
                <Select
                  value={kerjaKegiatan}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setkerjaKegiatan(e);
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
                  <Option value={0}>Tidak ada kesulitan</Option>
                  <Option value={1}>
                    Pikiran dan perasaan tentang ketidakmampuan, keletihan, atau
                    kelemahan sehubungan dengan kegiatan atau kerja
                  </Option>
                  <Option value={2}>
                    Hilangnya minat dalam melakukan kegiatan dilaporkan langsung
                    atau tidak langsung melalui kelesuan, keraguan, dan bimbang
                  </Option>
                  <Option value={3}>
                    Berkurangnya waktu aktual yang dihabiskan dalam melakukan
                    kegiatan dan menurunnya produktivitas. Di RS diberikan nilai
                    3 bila tidak menghabiskan waktu 3 jam sehari dalam melakukan
                    kegiatan
                  </Option>
                  <Option value={4}>
                    Berhenti bekerja karena sakitnya sekarang, di RS diberi
                    nilai 4 jika karena sakitnya tidak melakukan kegiatan apapun
                  </Option>
                </Select>
              </Col>
            </Row>

            <Row>
              <Col
                span={8}
                style={{
                  textAlign: " left",
                  paddingRight: 5,
                  paddingBottom: 2,
                }}
              >
                8. Retardasi (Lambat dalam berpikir dan berbicara, kemampuan
                konsentrasi, menurunkan katifitas motorik)
              </Col>
              <Col span={16} style={{ paddingBottom: 2 }}>
                <Select
                  value={retardasi}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setretardasi(e);
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
                  <Option value={1}>Sedikit lamban dalam wawancara</Option>
                  <Option value={2}>Jelas lamban dalam wawancara</Option>
                  <Option value={3}>Sulit diwawancara</Option>
                  <Option value={4}>Stupor lengkap</Option>
                </Select>
              </Col>
            </Row>

            <Row>
              <Col
                span={8}
                style={{
                  textAlign: " left",
                  paddingRight: 5,
                  paddingBottom: 2,
                }}
              >
                9. Agitasi
              </Col>
              <Col span={16} style={{ paddingBottom: 2 }}>
                <Select
                  value={agitasi}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setagitasi(e);
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
                  <Option value={0}>Tidak ada</Option>
                  <Option value={1}>
                    Memainkan tangan, rambut, dan lain-lain
                  </Option>
                  <Option value={2}>
                    Meremas tangan, menggigit kuku, menggigit bibir
                  </Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col
                span={8}
                style={{
                  textAlign: " left",
                  paddingRight: 5,
                  paddingBottom: 2,
                }}
              >
                10. Anxietas Psikis
              </Col>
              <Col span={16} style={{ paddingBottom: 2 }}>
                <Select
                  value={anxietasPsikis}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setanxietasPsikis(e);
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
                  <Option value={0}>Tidak ada kesulitan</Option>
                  <Option value={1}>
                    Ketegangan dan mudah tersinggung, bersifat obyektif
                  </Option>
                  <Option value={2}>Menguatkan hal-hal kecil</Option>
                  <Option value={3}>
                    Sikap khawatir yang tercermin di wajah atau berbicara
                  </Option>
                  <Option value={4}>Ketakutan di ekspresi tanpa ditanya</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col
                span={8}
                style={{
                  textAlign: " left",
                  paddingRight: 5,
                  paddingBottom: 2,
                }}
              >
                11. Anxietas somatic
              </Col>
              <Col span={16} style={{ paddingBottom: 2 }}>
                <Select
                  value={anxietasSomatic}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setanxietasSomatic(e);
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
                  <Option value={0}>Tidak ada</Option>
                  <Option value={1}>Ringan</Option>
                  <Option value={2}>Sedang</Option>
                  <Option value={3}>Berat</Option>
                  <Option value={4}>
                    Inkapasitas, keadaan fisiologis yang mengiringi anxietas
                    seperti gastrointestinal, kardiovaskuler, pernafasan, sering
                    BAK, berkeringat
                  </Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col
                span={8}
                style={{
                  textAlign: " left",
                  paddingRight: 5,
                  paddingBottom: 2,
                }}
              >
                12. Gejala somatic (Gastroinntestinal)
              </Col>
              <Col span={16} style={{ paddingBottom: 2 }}>
                <Select
                  value={gejalaGastroinntesnial}
                  // gej={listSpesialisDBRS}
                  onChange={(e) => {
                    setgejalaGastroinntesnial(e);
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
                  <Option value={0}>Tidak ada</Option>
                  <Option value={1}>
                    Tidak ada nafsu makan tanpa dorongan orang lain
                  </Option>
                  <Option value={2}>
                    Sulit makan tanpa dorongan orang lain, meminta atau
                    membutuhkan pencahar atau obat-obatan untuk buang air besar
                    atau obat simptom gastrointestinal
                  </Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col
                span={8}
                style={{
                  textAlign: " left",
                  paddingRight: 5,
                  paddingBottom: 2,
                }}
              >
                13. Gejala somatik (umum)
              </Col>
              <Col span={16} style={{ paddingBottom: 2 }}>
                <Select
                  value={gejalaSomatikUmum}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setgejalaSomatikUmum(e);
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
                  <Option value={0}>Tidak ada</Option>
                  <Option value={1}>
                    Anggota gerak punggung dan kepala berat, nyeri punggung,
                    nyeri kepala, nyeri otot, hilang tenaga, dan kelelahan
                  </Option>
                  <Option value={2}>Segala gejala di atas diberi nilai</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col
                span={8}
                style={{
                  textAlign: " left",
                  paddingRight: 5,
                  paddingBottom: 2,
                }}
              >
                14. Gejala Genital (misalnya hilang libido, gangguan menstruasi)
              </Col>
              <Col span={16} style={{ paddingBottom: 2 }}>
                <Select
                  value={gejalaGenital}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setgejalaGenital(e);
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
                  <Option value={0}>Tidak ada</Option>
                  <Option value={1}>Ringan</Option>
                  <Option value={2}>Berat</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col
                span={8}
                style={{
                  textAlign: " left",
                  paddingRight: 5,
                  paddingBottom: 2,
                }}
              >
                15. Hipokondriasis
              </Col>
              <Col span={16} style={{ paddingBottom: 2 }}>
                <Select
                  value={hipokondriasis}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    sethipokondriasis(e);
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
                  <Option value={0}>Tidak ada</Option>
                  <Option value={1}>Dihayati sendiri</Option>
                  <Option value={2}>Preokupasi tentang kesehatan diri</Option>
                  <Option value={3}>
                    Sering mengeluh, meminta pertolongan, dll
                  </Option>
                  <Option value={4}>Waham hipokondriasis</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col
                span={8}
                style={{
                  textAlign: " left",
                  paddingRight: 5,
                  paddingBottom: 2,
                }}
              >
                16. Kehilangan berat badan (pilih antara A atau B)
              </Col>
              <Col span={16} style={{ paddingBottom: 2 }}>
                <Select
                  value={kehilanganBB}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setkehilanganBB(e);
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
                  <Option value="A">
                    A. Bila di nilai berdasarkan riwayat
                  </Option>
                  <Option value="B">
                    B. Bila di ukur perubahan berat badan aktual, dinilai setiap
                    minggu oleh psikiater
                  </Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col
                span={8}
                style={{
                  textAlign: " left",
                  paddingRight: 5,
                  paddingBottom: 2,
                }}
              ></Col>
              <Col span={16} style={{ paddingBottom: 2 }}>
                {kehilanganBB === "A" ? (
                  <>
                    {" "}
                    <Select
                      value={kehilanganBBNilai}
                      // dataSource={listSpesialisDBRS}
                      onChange={(e) => {
                        setkehilanganBBNilai(e);
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
                        Tidak ada kehilangan berat badan
                      </Option>
                      <Option value={1}>
                        Kemungkinan berat badan berkurang sehubungan sakit
                        sekarang
                      </Option>
                      <Option value={2}>Berat badan jelas berkurang</Option>
                    </Select>
                  </>
                ) : kehilanganBB === "B" ? (
                  <>
                    {" "}
                    <Select
                      value={kehilanganBBNilai}
                      // dataSource={listSpesialisDBRS}
                      onChange={(e) => {
                        setkehilanganBBNilai(e);
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
                        Kehilangan BB &lt; 0.5 KG / Minggu
                      </Option>
                      <Option value={1}>
                        Kehilangan BB &gt; 0.5 KG / Minggu
                      </Option>
                      <Option value={2}>
                        Kehilangan BB &gt; 1 KG seminggu
                      </Option>
                    </Select>
                  </>
                ) : (
                  <></>
                )}
              </Col>
            </Row>

            <Row>
              <Col
                span={8}
                style={{
                  textAlign: " left",
                  paddingRight: 5,
                  paddingBottom: 2,
                }}
              >
                17. Tilikan
              </Col>
              <Col span={16} style={{ paddingBottom: 2 }}>
                <Select
                  value={tilikan}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    settilikan(e);
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
                    Mengetahui dirinya depresi dan sakit
                  </Option>
                  <Option value={1}>
                    Mengetahui dirinya sakit tetapi disebabkan oleh makanan
                    buruk, iklim, kerja berlebihan, virus, perlu istirahat, dll
                  </Option>
                  <Option value={2}>
                    Menyangkal sepenuhnya bahwa dirinya sakit
                  </Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col
                span={8}
                style={{
                  textAlign: " left",
                  paddingRight: 5,
                  paddingBottom: 2,
                }}
              >
                18. Variasi Diurnal
              </Col>
              <Col span={16} style={{ paddingBottom: 2 }}>
                <Select
                  value={variasiDiurnal}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setvariasiDiurnal(e);
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
                  <Option value={0}>Tidak ada</Option>
                  <Option value={1}>Ringan</Option>
                  <Option value={2}>Berat</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col
                span={8}
                style={{
                  textAlign: " left",
                  paddingRight: 5,
                  paddingBottom: 2,
                }}
              >
                19. Depersonalisasi dan derealisasi (misalnya merasa tidak
                nyata, ide mhilistic)
              </Col>
              <Col span={16} style={{ paddingBottom: 2 }}>
                <Select
                  value={depersonalisasi}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setdepersonalisasi(e);
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
                  <Option value={0}>Tidak ada</Option>
                  <Option value={1}>Ringan</Option>
                  <Option value={2}>Sedang</Option>
                  <Option value={3}>Berat</Option>
                  <Option value={4}>Inkapasitas</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col
                span={8}
                style={{
                  textAlign: " left",
                  paddingRight: 5,
                  paddingBottom: 2,
                }}
              >
                20. Gejala Paranoid
              </Col>
              <Col span={16} style={{ paddingBottom: 2 }}>
                <Select
                  value={gejalaParanoid}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setgejalaParanoid(e);
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
                  <Option value={0}>Tidak ada</Option>
                  <Option value={1}>Kecurigaan ringan</Option>
                  <Option value={2}>Ide Referensi</Option>
                  <Option value={3}>Waham</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col
                span={8}
                style={{
                  textAlign: " left",
                  paddingRight: 5,
                  paddingBottom: 2,
                }}
              >
                21. Gejala Obsesif dan Kompulsif
              </Col>
              <Col span={16} style={{ paddingBottom: 2 }}>
                <Select
                  value={gejalaObsesif}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setgejalaObsesif(e);
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
                  <Option value={0}>Tidak ada</Option>
                  <Option value={1}>Ringan</Option>
                  <Option value={2}>Berat</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col
                span={8}
                style={{
                  textAlign: " left",
                  paddingRight: 5,
                  paddingBottom: 2,
                }}
              >
                22. Ketidakberdayaan
              </Col>
              <Col span={16} style={{ paddingBottom: 2 }}>
                <Select
                  value={ketidakberdayaan}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setketidakberdayaan(e);
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
                  <Option value={0}>Tidak ada</Option>
                  <Option value={1}>
                    Perasan subyektif yang diperoleh hanya tanya
                  </Option>
                  <Option value={2}>
                    Perasaan tidak berdaya dinyatakan langsung oleh pasien
                  </Option>
                  <Option value={3}>
                    Memerlukan dorongan, bimbingan, dan penentraman hati untuk
                    menyelesaikan tugas bangsal dan hygiene diri
                  </Option>
                  <Option value={4}>
                    Memerlukan bantuan fisik untuk berpakaian, makan, bedside
                    task, atau hygiene diri
                  </Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col
                span={8}
                style={{
                  textAlign: " left",
                  paddingRight: 5,
                  paddingBottom: 2,
                }}
              >
                23. Keputusasaan
              </Col>
              <Col span={16} style={{ paddingBottom: 2 }}>
                <Select
                  value={keputusasaan}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setkeputusasaan(e);
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
                  <Option value={0}>Tidak ada</Option>
                  <Option value={1}>
                    Sering merasa ragu bahwa keadaan akan membaik tetapi masih
                    dapat di tentramkan
                  </Option>
                  <Option value={2}>
                    Merasa putus asa secara konsisten tetapi masih menerima
                    penentraman
                  </Option>
                  <Option value={3}>
                    Mengekspresikan perasaan putus asa, hilang harapan, pesimis
                    tentang masa depan, yang tidak dapat dihilangkan
                  </Option>
                  <Option value={4}>
                    Keteguhan spontan dan tidak sesuai bahwa saya tidak akan
                    pernah sembuh atau padanannya
                  </Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col
                span={8}
                style={{
                  textAlign: " left",
                  paddingRight: 5,
                  paddingBottom: 2,
                }}
              >
                24. Perasaan tidak berharga (terentang dari hilangnya harga
                diri, perasaan rendah diri, mencela diri yang ringan sampai
                waham tentang ketidakberhargaan
              </Col>
              <Col span={16} style={{ paddingBottom: 2 }}>
                <Select
                  value={perasaaanTidakberharga}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setperasaaanTidakberharga(e);
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
                  <Option value={0}>Tidak ada</Option>
                  <Option value={1}>
                    Menunjukkan perasaan tidak berharga (kehilangan harga diri)
                    hanya bila ditanya
                  </Option>
                  <Option value={2}>
                    Menunjukkan perasaan tidak berharga (kehilangan harga diri)
                    secara spontan
                  </Option>
                  <Option value={3}>
                    Berbeda dengan nilai 2 di atas, berdasarkan derajat pasien
                    secara sukarela menyatakan bahwa dia tidak baik rendah
                  </Option>
                  <Option value={4}>
                    Waham tentang ketidakberhargaan, misalnya saya ada tumpukan
                    sampah atau padannanya
                  </Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col
                span={8}
                style={{
                  textAlign: " right",
                  paddingRight: 5,
                  paddingBottom: 2,
                }}
              >
                <p style={{ backgroundColor: "beige" }}>Keterangan</p>
              </Col>
              <Col span={16} style={{ paddingBottom: 2 }}>
                <Input.Group compact>
                  <Input
                    type="text"
                    placeholder="..."
                    readOnly
                    value={nilaitrauma}
                    style={{ width: "20%" }}
                  />
                  <Input
                    type="text"
                    placeholder="..."
                    disabled
                    value={keterangantrauma}
                    style={
                      nilaitrauma < 10
                        ? {
                            color: "black",
                            backgroundColor: "green",
                            width: "80%",
                          }
                        : nilaitrauma > 10 && nilaitrauma < 21
                        ? {
                            color: "black",
                            backgroundColor: "yellowgreen",
                            width: "80%",
                          }
                        : nilaitrauma > 20 && nilaitrauma < 31
                        ? {
                            color: "black",
                            backgroundColor: "yellow",
                            width: "80%",
                          }
                        : nilaitrauma > 30 && nilaitrauma < 41
                        ? {
                            color: "black",
                            backgroundColor: "orange",
                            width: "80%",
                          }
                        : nilaitrauma > 40
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
              <Col span={24} style={{ textAlign: "right" }}>
                <Space>
                  <Button
                    // type="primary"
                    onClick={() => {
                      setpengkajianTraumaId(0);
                      settglTrauma(dayjs());
                      setperasaanSedih("");
                      setperasaanBersalah("");
                      setbunuhDiri("");
                      setinsomniaEarly("");
                      setinsomniaMiddle("");
                      setinsomniaLate("");
                      setkerjaKegiatan("");
                      setretardasi("");
                      setagitasi("");
                      setanxietasPsikis("");
                      setanxietasSomatic("");
                      setgejalaGastroinntesnial("");
                      setgejalaSomatikUmum("");
                      setgejalaGenital("");
                      sethipokondriasis("");
                      setkehilanganBB("");
                      setkehilanganBBNilai("");
                      settilikan("");
                      setvariasiDiurnal("");
                      setdepersonalisasi("");
                      setgejalaParanoid("");
                      setgejalaObsesif("");
                      setketidakberdayaan("");
                      setkeputusasaan("");
                      setperasaaanTidakberharga("");
                    }}
                  >
                    Batal
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      insertTrauma(dataTrauma);
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
            dataSource={listTrauma}
            rowKey="pengkajianNIHSSId"
          />
        </Col>
      </Row>
    </div>
  );
};

export default FormTrauma;
