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
const { TextArea, Search } = Input;

const { Option } = Select;

const FormDisfagia = () => {
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const { curpasRI } = useContext(PasienRIContext);
  const { namauser } = useContext(LoginContext);
  const {
    listDisfagia,
    setlistDisfagia,
    getDisfagia,
    insertDisfagia,
    delDisfagia,
    pengkajianDisfagiaId,
    setpengkajianDisfagiaId,
    tglDisfagia,
    settglDisfagia,
    flagDisfagia,
    setflagDisfagia,
    kesadaranPasien,
    setkesadaranPasien,
    afasia,
    setafasia,
    merapatkanGigi,
    setmerapatkanGigi,
    reflekMuntah,
    setreflekMuntah,
    menelanAir,
    setmenelanAir,
    berikanMinum,
    setberikanMinum,
    ketDisfagia,
    setketDisfagia,
  } = useContext(PengkajianContext);

  const datadisfagia = {
    pengkajianDisfagiaId: pengkajianDisfagiaId,
    registrasiId: curpasRI.registrasiId,
    ruangId: curpasRI.ruangId,
    tanggal: dayjs(tglDisfagia).format("YYYY-MM-DDTHH:mm"),
    flagAssesment: flagDisfagia,
    kesadaranPasien: kesadaranPasien,
    afasia: afasia,
    merapatkanGigi: merapatkanGigi,
    reflekMuntah: reflekMuntah,
    menelanAir: menelanAir,
    berikanMinum: berikanMinum,
    nilai: null,
    keterangan: ketDisfagia,
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
      // render: (text, record) => {
      //   const nilaiNihss = record.nilai; // Sesuaikan jika nilaitotal disimpan di data lain
      //   const style =
      //     nilaiNihss < 5
      //       ? { color: "black", backgroundColor: "yellowgreen", width: "80%" }
      //       : nilaiNihss >= 5 && nilaiNihss <= 14
      //       ? { color: "black", backgroundColor: "yellow", width: "80%" }
      //       : nilaiNihss >= 15 && nilaiNihss <= 24
      //       ? { color: "black", backgroundColor: "orange", width: "80%" }
      //       : nilaiNihss >= 25
      //       ? { color: "black", backgroundColor: "red", width: "80%" }
      //       : { color: "", backgroundColor: "", width: "80%" };

      //   return (
      //     <div
      //       style={{
      //         ...style,
      //         padding: "4px",
      //         textAlign: "center",
      //         borderRadius: "4px",
      //       }}
      //     >
      //       {text}
      //     </div>
      //   );
      // },
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
              delDisfagia(record.pengkajianDisfagiaId, record.registrasiId);
            }}
            onCancel={(e) => {}}
            okText="Ya"
            cancelText="Tidak"
          >
            <Button size="small" type="primary" danger>
              Hapus
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Row gutter={[10, 10]}>
        <Col span={12}>
          <Row gutter={[10, 10]}>
            <Col span={24}>
              <Row>
                <Col span={1}>
                  <p></p>
                </Col>
                <Col span={6}>
                  <p>Tanggal Pengkajian</p>
                </Col>
                <Col span={17}>
                  <DatePicker
                    value={tglDisfagia}
                    format="DD-MM-YYYY"
                    onChange={(date) => {
                      settglDisfagia(date);
                    }}
                    style={{ width: "100%" }}
                    placeholder="..."
                    showTime
                  />
                </Col>
              </Row>
              <Row>
                <Col span={1}>
                  <p>1.</p>
                </Col>
                <Col span={6}>
                  <p>Kesadaran Pasien</p>
                </Col>
                <Col span={17}>
                  <Select
                    value={kesadaranPasien}
                    // dataSource={listSpesialisDBRS}
                    onChange={(e) => {
                      setkesadaranPasien(e);
                      if (e === 0) {
                        setafasia(null);
                        setmerapatkanGigi(null);
                        setreflekMuntah(null);
                        setmenelanAir(null);
                        setberikanMinum(null);
                        setketDisfagia("Pasien Tidak Sadar, Hentikan Skrining");
                      } else {
                      }
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
                    <Option value={1}>Sadar</Option>
                    <Option value={0}>Tidak Sadar</Option>
                  </Select>
                </Col>
              </Row>
              {kesadaranPasien === 0 ? (
                <></>
              ) : kesadaranPasien === 1 ? (
                <>
                  <Row>
                    <Col span={1}>
                      <p>2.</p>
                    </Col>
                    <Col span={6}>
                      <p>Afasia Atau Disatria</p>
                    </Col>
                    <Col span={17}>
                      <Select
                        value={afasia}
                        // dataSource={listSpesialisDBRS}
                        onChange={(e) => {
                          setafasia(e);
                          setmerapatkanGigi(null);
                          setreflekMuntah(null);
                          setmenelanAir(null);
                          setberikanMinum(null);
                          setketDisfagia(null);
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
                        <Option value={1}>Ya</Option>
                        <Option value={0}>Tidak</Option>
                      </Select>
                    </Col>
                  </Row>
                </>
              ) : (
                <></>
              )}
              {afasia === 1 || afasia === 0 ? (
                <>
                  <Row>
                    <Col span={1}>
                      <p>3.</p>
                    </Col>
                    <Col span={6}>
                      <p>
                        Apakah Ditemukan Lebih Dari 3 Gejala? ( Dapat merapatkan
                        gigi, merapatkan bibir, wajah simetris, letak lidah
                        ditengah, uvula di tengah)
                      </p>
                    </Col>
                    <Col span={17}>
                      <Select
                        value={merapatkanGigi}
                        // dataSource={listSpesialisDBRS}
                        onChange={(e) => {
                          setmerapatkanGigi(e);
                          setreflekMuntah(null);
                          setmenelanAir(null);
                          setberikanMinum(null);
                          setketDisfagia(null);
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
                        <Option value={1}>Ya</Option>
                        <Option value={0}>Tidak</Option>
                      </Select>
                    </Col>
                  </Row>
                </>
              ) : (
                <></>
              )}
              {merapatkanGigi === 1 || merapatkanGigi === 0 ? (
                <Row>
                  <Col span={1}>
                    <p>4.</p>
                  </Col>
                  <Col span={6}>
                    <p>Reflek muntah ada, batuk spontan, reflek menelan baik</p>
                  </Col>
                  <Col span={17}>
                    <Select
                      value={reflekMuntah}
                      // dataSource={listSpesialisDBRS}
                      onChange={(e) => {
                        setreflekMuntah(e);
                        setmenelanAir(null);
                        setberikanMinum(null);
                        setketDisfagia(null);
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
                      <Option value={1}>Ya</Option>
                      <Option value={0}>Tidak</Option>
                    </Select>
                  </Col>
                </Row>
              ) : (
                <></>
              )}
              {reflekMuntah === 1 || reflekMuntah === 0 ? (
                <Row>
                  <Col span={1}>
                    <p>5.</p>
                  </Col>
                  <Col span={6}>
                    <p>Tes menelan air putih satu sendok teh</p>
                  </Col>
                  <Col span={17}>
                    <Select
                      value={menelanAir}
                      // dataSource={listSpesialisDBRS}
                      onChange={(e) => {
                        setmenelanAir(e);
                        setberikanMinum(null);
                        e === 0
                          ? setketDisfagia(
                              "Hasil skrining disfagia positif. Lakukan latihan menelan: Protokol L. Jangan berikan makan/ minum per oral, pasang NGT, kolaborasi dengan dokter, terapis wicara, dan ahli gizi"
                            )
                          : setketDisfagia(null);
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
                      <Option value={1}>Mampu Menelan</Option>
                      <Option value={0}>Tidak Mampu Menelan</Option>
                    </Select>
                  </Col>
                </Row>
              ) : (
                // </>
                <></>
              )}
              {menelanAir === 1 ? (
                <Row>
                  <Col span={1}>
                    <p>6.</p>
                  </Col>
                  <Col span={6}>
                    <p>
                      Berikan minum air putih bertahap mulai dari 25 ml, 50 ml,
                      dan 100 ml.
                    </p>
                  </Col>
                  <Col span={17}>
                    <Select
                      value={berikanMinum}
                      // dataSource={listSpesialisDBRS}
                      onChange={(e) => {
                        setberikanMinum(e);
                        e === 1
                          ? setketDisfagia(
                              "Hasil skrining disfagia positif, pasien tidak mampu menelan cairan. Lakukan latihan menelan: Protokol II, berikan modifikasi diet sesuai toleransi, pasang NGT bila diperlukan untuk asupan cairan, kolaborasi dg dokter, terapis wicara, dan ahli gizi"
                            )
                          : setketDisfagia(
                              "Hasil Skrening Disfagia Negatif atau Fungsi Menelan Normal"
                            );
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
                      <Option value={1}>Tersedak/Batuk</Option>
                      <Option value={0}>Tidak Tersedak</Option>
                    </Select>
                  </Col>
                </Row>
              ) : (
                <></>
              )}{" "}
              <Row>
                <Col span={1}>
                  <p></p>
                </Col>
                <Col span={6}>
                  <p>Kesimpulan</p>
                </Col>
                <Col span={17}>
                  <TextArea
                    rows={3}
                    placeholder="..."
                    // onChange={(e) => setpengobatan(e.target.value)}
                    value={ketDisfagia}
                  />
                </Col>
              </Row>
            </Col>

            <Col span={[22]} style={{ textAlign: "right" }}>
              <Space>
                <Button
                  // type="primary"
                  onClick={() => {
                    setpengkajianDisfagiaId(0);
                    settglDisfagia(dayjs());
                    setkesadaranPasien(null);
                    setafasia(null);
                    setmerapatkanGigi(null);
                    setreflekMuntah(null);
                    setmenelanAir(null);
                    setberikanMinum(null);
                    setketDisfagia(null);
                  }}
                >
                  Batal
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    insertDisfagia(datadisfagia);
                  }}
                >
                  Simpan
                </Button>
              </Space>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          {" "}
          <Table
            columns={columns}
            dataSource={listDisfagia}
            rowKey="pengkajianNIHSSId"
          />
        </Col>
      </Row>
    </div>
  );
};

export default FormDisfagia;
