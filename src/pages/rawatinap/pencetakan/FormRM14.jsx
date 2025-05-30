import React, { useContext } from "react";
import {
  Form,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Card,
  TimePicker,
  Button,
  Table,
  Empty,
  Popconfirm,
  message,
  Space,
  Modal,
} from "antd";
import dayjs from "dayjs";
import Column from "antd/lib/table/Column";
import { PelayananContext } from "../../rawatjalan/context/Pelayanancontext";
import { MorfologiContext } from "../../master/context/MorfologiContext";
import { RM14Context } from "../context/RM14Context";
import { LoginContext } from "../../rawatjalan/context/LoginContext";
import { PasienRIContext } from "../context/PasienRIContext";
import { DiagnosaRIContext } from "../context/DiagnosaRIContext";

const { TextArea } = Input;
const formItemLayoutdpjp = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const formItemLayoutdpjp1 = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const formItemLayoutdpjp2 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const formItemLayoutdpjp6 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const { Option } = Select;

const FormRM14 = () => {
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const [form] = Form.useForm();
  const { detdiagnosa } = useContext(DiagnosaRIContext);
  const { morfologi } = useContext(MorfologiContext);
  const { curpasRI } = useContext(PasienRIContext);
  const { dokterall } = useContext(PelayananContext);
  const { namauser } = useContext(LoginContext);

  const {
    //  rm14, setemrResumeMedisId, registrasiId, setregistrasiId, tglPulang, settglPulang, jamPulang,  hariRawat, sethariRawat, lamaRawat, setlamaRawat,beratBadan, setberatBadan,tprosedurIdTransfusi,userId, setuserId, readRM13, setRM14,setjamPulang,setprosedurIdTransfusi,
    emrResumeMedisId,
    imunisasi,
    setimunisasi,
    caraKeluar,
    setcaraKeluar,
    keadaanKeluar,
    setkeadaanKeluar,
    diagnosisIdmasuk,
    setdiagnosisIdmasuk,
    diagnosisIdkeluar,
    setdiagnosisIdkeluar,
    rudaPaksa,
    setrudaPaksa,
    morfologiNeoplasma,
    setmorfologiNeoplasma,
    pelaksanaId,
    setpelaksanaId,
    pengobatanKhusus,
    setpengobatanKhusus,
    transfusi,
    settransfusi,
    hasilPenunjang,
    sethasilPenunjang,
    indikasiRawatInap,
    setindikasiRawatInap,
    terapi,
    setterapi,
    alihKelola,
    setalihKelola,
    informasiKlinisPasien,
    setinformasiKlinisPasien,
    insertRM14,
    kosongkanRM14,
    getobatpasien,
    infoPasien,
    setinfoPasien,
    getinfoPasienPulang,
    getKepulangan,
    infoKepulangan,
    setinfoKepulangan,
    beratBadan,
    getDiagnosaPulang,
    diagnosaPulang,
    setdiagnosaPulang,
    procedurePulang,
    setprocedurePulang,
    getProcedurePulang,
    getLabPulang,
    labPulang,
    setlabPulang,
    modalLab,
    setmodalLab,
    tprosedurIdTransfusi,
    setprosedurIdTransfusi,
    deleterm14,
    diagnosisSekunderId,
    setdiagnosisSekunderId,
    diagnosisSekunderDesk,
    setdiagnosisSekunderDesk,
    diagnosaKlinis,
    setdiagnosaKlinis,
    tindakanPokok,
    settindakanPokok,
  } = useContext(RM14Context);
  const { indikasi } = useContext(PelayananContext);

  const pasienpulang = dayjs(infoKepulangan.TanggalPulang).format("DD-MM-YYYY");
  const tglmasuk = dayjs(curpasRI.tanggalMasukRi).format("DD-MM-YYYY");
  const LamaRawat = Number(
    dayjs(
      dayjs(pasienpulang, "DD/MM/YYYY").diff(dayjs(tglmasuk, "DD/MM/YYYY"))
    ).format("D")
  );
  const HariRawat = LamaRawat - 1;
  const datarm14 = {
    registrasiId: curpasRI.registrasiId,
    tglPulang: dayjs(infoKepulangan.TanggalPulang).format("YYYY-MM-DD"),
    jamPulang: infoKepulangan.JamPulang,
    hariRawat: HariRawat,
    lamaRawat: LamaRawat,
    imunisasi: imunisasi,
    caraKeluar: caraKeluar,
    keadaanKeluar: keadaanKeluar,
    diagnosisIdmasuk: diagnosisIdmasuk,
    diagnosisIdkeluar: diagnosisIdkeluar,
    diagnosisSekunderId: diagnosisSekunderId,
    diagnosisSekunderDesk: diagnosisSekunderDesk,
    rudaPaksa: rudaPaksa,
    morfologiNeoplasma: morfologiNeoplasma,
    pelaksanaId:
      pelaksanaId === "" || pelaksanaId === null
        ? curpasRI.dokterId
        : pelaksanaId,
    pengobatanKhusus: pengobatanKhusus,
    transfusi: transfusi,
    tprosedurIdTransfusi: tprosedurIdTransfusi,
    hasilPenunjang: hasilPenunjang,
    indikasiRawatInap: indikasiRawatInap,
    terapi: terapi,
    alihKelola: alihKelola,
    beratBadan: 0,
    informasiKlinisPasien: informasiKlinisPasien,
    userId: namauser,
    clientHost: host,
    clientIP: ip,
    tindakanPokok: tindakanPokok,
    diagnosaKlinis: diagnosaKlinis,
  };

  const columnsb = [
    {
      title: "Pemeriksaan",
      dataIndex: "labNama",
    },
    {
      title: "Tanggal",
      dataIndex: "tanggal_Pelaporan",
      render(text, record) {
        return {
          props: {
            style: {
              cursor: "default",
            },
          },
          children: dayjs(text).format("DD-MM-YYYY"),
        };
      },
    },
    {
      title: "Normalitas",
      dataIndex: "flag",
      align: "center",
    },
    {
      title: "Hasil",
      dataIndex: "labHasil",
      align: "center",
    },
    {
      title: "Satuan",
      dataIndex: "labSatuan",
      align: "center",
    },
  ];

  const rowSelection = {
    onChange: (selectedRows, e) => {
      sethasilPenunjang(
        "Laborat PK " +
          "\n" +
          e
            .map(
              (d) =>
                d.namaLabHeader +
                " " +
                dayjs(d.tanggal_Pelaporan).format("DD-MM-YYYY") +
                " " +
                d.labHasil +
                " "
            )
            .toString()
      );
    },
  };

  return (
    <div>
      <Form form={form}>
        <Card
          // title='Rencana Pulang'
          size="small"
          // headStyle={{ fontWeight: "bolder", backgroundColor: 'beige' }}
          //     style={{
          //         borderWidth: "2px",
          //         borderColor: "darkgray",
          //         borderRadius: "4px",
          //     }}
        >
          <Row gutter={[5, 5]}>
            <Col span={24}>
              <Card>
                <Row>
                  <Col span={6}>
                    <Form.Item
                      {...formItemLayoutdpjp}
                      // name="keluar"
                      label="Tgl. Keluar"
                      style={{ marginBottom: 5 }}
                    >
                      {/* <p>
                        {dayjs(infoKepulangan.TanggalPulang).format(
                          "DD-MM-YYYY"
                        )}
                      </p> */}
                      <Input
                        type="text"
                        style={{ width: "100%" }}
                        // placeholder="..."
                        // onChange={(e) => setrudaPaksa(e.target.value)}
                        value={dayjs(infoKepulangan.TanggalPulang).format(
                          "DD-MM-YYYY"
                        )}
                        readOnly
                      />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      {...formItemLayoutdpjp}
                      // name="keluar"
                      label="Jam Keluar"
                      style={{ marginBottom: 5 }}
                    >
                      {/* <p>{infoKepulangan.JamPulang}</p> */}
                      <Input
                        type="text"
                        style={{ width: "100%" }}
                        // placeholder="..."
                        // onChange={(e) => setrudaPaksa(e.target.value)}
                        value={infoKepulangan.JamPulang}
                        readOnly
                      />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      {...formItemLayoutdpjp}
                      label="Hari Rawat"
                      style={{ marginBottom: 5 }}
                    >
                      <Input
                        type="text"
                        suffix="Hari"
                        style={{ width: "100%" }}
                        // disabled
                        value={HariRawat}
                        readOnly
                      />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      {...formItemLayoutdpjp}
                      label="Lama Rawat"
                      style={{ marginBottom: 5 }}
                    >
                      <Input
                        type="text"
                        suffix="Hari"
                        style={{ width: "100%" }}
                        // disabled
                        value={LamaRawat}
                        readOnly
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col span={24}>
              <Card>
                <Row>
                  <Col span={12}>
                    <Form.Item
                      {...formItemLayoutdpjp}
                      label="Alih Kelola"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        value={alihKelola}
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="..."
                        optionFilterProp="children"
                        onChange={(e) => setalihKelola(e)}
                      >
                        <Option value="Ya">Ya</Option>
                        <Option value="Tidak">Tidak</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp1}
                      label="Cara Keluar"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        value={caraKeluar}
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="..."
                        optionFilterProp="children"
                        onChange={(e) => setcaraKeluar(e)}
                      >
                        <Option value="Persetujuan">Persetujuan</Option>
                        <Option value="APS">APS</Option>
                        <Option value="Pindah RS Lain">Pindah RS Lain</Option>
                        <Option value="Dirujuk">Dirujuk</Option>
                        <Option value="Melarikan Diri">Melarikan Diri</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp1}
                      label="Keadaan Keluar"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        value={keadaanKeluar}
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="..."
                        optionFilterProp="children"
                        onChange={(e) => setkeadaanKeluar(e)}
                      >
                        <Option value="Sembuh">Sembuh</Option>
                        <Option value="Membaik">Membaik</Option>
                        <Option value="Memburuk">Memburuk</Option>
                        <Option value="Seperti Semula">Seperti Semula</Option>
                        <Option value="Dirujuk">Dirujuk</Option>
                        <Option value="Mati < 48 Jam">Mati &lt; 48 Jam</Option>
                        <Option value="Mati > 48 Jam">Mati &gt; 48 Jam</Option>
                        <Option value="APS">APS</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp1}
                      label="Imunisasi Didapat"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        value={imunisasi}
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="..."
                        optionFilterProp="children"
                        onChange={(e) => setimunisasi(e)}
                      >
                        <Option value="BCG">BCG </Option>
                        <Option value="DPT">DPT</Option>
                        <Option value="Polio">Polio</Option>
                        <Option value="DT">DT</Option>
                        <Option value="TFT">TFT</Option>
                        <Option value="Hepatitis">Hepatitis</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp1}
                      label="Indikasi Rawat Inap"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        value={indikasiRawatInap}
                        dataSource={indikasi}
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="..."
                        optionFilterProp="children"
                        onChange={(e) => setindikasiRawatInap(e)}
                      >
                        {indikasi.map((d) => (
                          <Option key={d.indikasiId}>{d.deskripsi}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp1}
                      label="Rudapaksa/Keracunan/Kecelakaan"
                      style={{ marginBottom: 5 }}
                    >
                      <Input
                        disabled
                        type="text"
                        style={{ width: "100%" }}
                        placeholder="..."
                        // onChange={(e) => setrudaPaksa(e.target.value)}
                        readOnly
                        value={rudaPaksa}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      {...formItemLayoutdpjp1}
                      label="Diagnosa Utama Masuk"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        value={diagnosisIdmasuk}
                        dataSource={diagnosaPulang}
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="..."
                        optionFilterProp="children"
                        onChange={(e) => setdiagnosisIdmasuk(e)}
                      >
                        {diagnosaPulang.map((e) => (
                          <Option key={e.diagnosisId}>
                            {e.diagnosisId + "-" + e.diagnosisDesk}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp1}
                      label="Diagnosa Utama Pulang"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        value={diagnosisIdkeluar}
                        dataSource={diagnosaPulang}
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="..."
                        optionFilterProp="children"
                        onChange={(e) => setdiagnosisIdkeluar(e)}
                      >
                        {diagnosaPulang.map((e) => (
                          <Option key={e.diagnosisId}>
                            {e.diagnosisId + "-" + e.diagnosisDesk}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      {...formItemLayoutdpjp1}
                      label="Penanggung Jawab"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        value={
                          pelaksanaId === null ? curpasRI.dokterId : pelaksanaId
                        }
                        dataSource={dokterall}
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="..."
                        optionFilterProp="children"
                        onChange={(e) => setpelaksanaId(e)}
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {dokterall.map((d) => (
                          <Option key={d.dokterId}>{d.namaDokter}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp1}
                      label="Morfologi Neoplasma/PA"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        value={morfologiNeoplasma}
                        dataSource={morfologi}
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="..."
                        optionFilterProp="children"
                        onChange={(e) => setmorfologiNeoplasma(e)}
                      >
                        {morfologi.map((d) => (
                          <Option key={d.morfologiId}>
                            {d.morfologiId + "-" + d.deskripsiMorfologi}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp1}
                      label="Spesial Drugs"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        disabled
                        // value={morfologiNeoplasma}
                        // dataSource={morfologi}
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="..."
                        optionFilterProp="children"
                        // onChange={(e) => setmorfologiNeoplasma(e)}
                        readOnly
                      >
                        {/* <Option>-</Option> */}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item
                      {...formItemLayoutdpjp1}
                      label="Informasi Klinis Pasien"
                      style={{ marginBottom: 5 }}
                    >
                      <TextArea
                        rows={2}
                        placeholder="..."
                        onChange={(e) =>
                          setinformasiKlinisPasien(e.target.value)
                        }
                        value={informasiKlinisPasien}
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp1}
                      label="Diagnosa Klinis"
                      style={{ marginBottom: 5 }}
                      required
                    >
                      <TextArea
                        rows={2}
                        placeholder="..."
                        onChange={(e) => setdiagnosaKlinis(e.target.value)}
                        value={diagnosaKlinis}
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp1}
                      label="Terapi"
                      style={{ marginBottom: 5 }}
                    >
                      <TextArea
                        rows={2}
                        placeholder="..."
                        onChange={(e) => setterapi(e.target.value)}
                        value={terapi}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      {...formItemLayoutdpjp1}
                      label="Pengobatan Khusus"
                      style={{ marginBottom: 5 }}
                    >
                      <TextArea
                        disabled
                        rows={2}
                        placeholder="..."
                        // onChange={(e) => setpengobatanKhusus(e.target.value)}
                        value={pengobatanKhusus}
                        readOnly
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp1}
                      label="Tindakan Pokok/Utama"
                      style={{ marginBottom: 5 }}
                      required
                    >
                      <TextArea
                        rows={2}
                        placeholder="..."
                        onChange={(e) => settindakanPokok(e.target.value)}
                        value={tindakanPokok}
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp1}
                      label="Transfusi"
                      style={{ marginBottom: 5 }}
                    >
                      <TextArea
                        disabled
                        rows={2}
                        placeholder="..."
                        // onChange={(e) => settransfusi(e.target.value)}
                        value={transfusi}
                        readOnly
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      {...formItemLayoutdpjp2}
                      label="Hasil Penunjang"
                      style={{ marginBottom: 5 }}
                    >
                      <Row>
                        <Col span={22}>
                          <TextArea
                            rows={5}
                            placeholder="..."
                            onChange={(e) => sethasilPenunjang(e.target.value)}
                            value={hasilPenunjang}
                            style={{ width: "100%" }}
                          />
                        </Col>
                        <Col span={2}>
                          <Button
                            onClick={() => {
                              getLabPulang(curpasRI.registrasiId);
                              // getLabPulang("2311050064");
                            }}
                          >
                            Pilih
                          </Button>
                        </Col>
                      </Row>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col span={24}>
              <Card>
                <Row>
                  <Col span={12}>
                    <Space>
                      <Button disabled>Cetak RM14</Button>
                      {/* <Button>Cetak CP</Button>
                      <Button>Kirim Ke INACBGs</Button>
                      <Button>Cetak Individual</Button>
                      <Button>Hapus Grouper</Button> */}
                    </Space>
                  </Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                    <Space>
                      {emrResumeMedisId === 0 ? (
                        <>
                          {" "}
                          <Button
                            disabled
                            type="primary"
                            danger
                            onClick={() => {
                              deleterm14(curpasRI.registrasiId);
                            }}
                          >
                            Hapus
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            type="primary"
                            danger
                            onClick={() => {
                              deleterm14(curpasRI.registrasiId);
                            }}
                          >
                            Hapus
                          </Button>
                        </>
                      )}

                      <Button
                        onClick={() => {
                          kosongkanRM14(curpasRI.registrasiId);
                        }}
                      >
                        Batal
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => {
                          insertRM14(datarm14);
                          console.log(datarm14);
                        }}
                      >
                        Simpan
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Card>
      </Form>

      <Modal
        open={modalLab}
        onCancel={() => setmodalLab(false)}
        closable={false}
        footer={null}
        width={800}
        style={{ top: 10 }}
      >
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columnsb}
          dataSource={labPulang}
          size="small"
          bordered
          pagination={false}
          scroll={{ y: 700 }}
        />
      </Modal>
    </div>
  );
};

export default FormRM14;
