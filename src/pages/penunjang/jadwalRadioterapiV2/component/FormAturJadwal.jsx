/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Button,
  Card,
  Descriptions,
  Input,
  Select,
  Space,
  DatePicker,
  Modal,
  Row,
  Col,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { QuestionCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { JadwalPenunjangContext } from "../context/JadwalPenunjangContext";

const { TextArea } = Input;
const { Option } = Select;
const { confirm } = Modal;
const { Text } = Typography;

const FormAturJadwal = () => {
  const {
    ktgCari,
    setktgCari,
    // main
    unitId,
    idJadwal,
    noReg,
    setnoReg,
    bookingOpId,
    setbookingOpId,
    nama,
    setnama,
    alamat,
    setalamat,
    noRm,
    setnoRm,
    jenisKelamin,
    setjenisKelamin,
    noKartu,
    setnoKartu,
    noTelp,
    setnoTelp,
    diagnosa,
    setdiagnosa,
    tglLahir,
    settglLahir,
    jnsPelayanan,
    setjnsPelayanan,
    tglPelayanan,
    settglPelayanan,
    kodePmr,
    setkodePmr,
    catatan,
    setcatatan,
    ip,
    host,
    nmUser,
    listCounta,
    // modal
    mdBuatJadwal,
    setmdBuatJadwal,
    mdEditJadwal,
    setmdEditJadwal,
    // master
    jpRadioterapi,
    jpRadiologi,
    optJPelayanan,
    setoptJPelayanan,
    optPemeriksaan,
    // func
    getDetailPasien,
    countInfobyDate,
    insertJadwal,
    updateJadwal,
    // func mst
    loadPelayananRuang,
    // spin
    spinCariFormAtur,
    spinKlikPemeriksaan,
    spinTbListCounta,
  } = useContext(JadwalPenunjangContext);

  const [sCari, setsCari] = useState("");

  const columns = [
    {
      title: "Pelayanan",
      dataIndex: "KodeTindakan",
      key: "KodeTindakan",
      width: 50,
      render: (text) => <div style={{ textAlign: "left" }}>{text}</div>,
    },
    {
      title: "Jml",
      dataIndex: "Jumlah",
      key: "Jumlah",
      align: "center",
      width: 15,
      render: (text) => <div style={{ textAlign: "left" }}>{text}</div>,
    },
  ];

  const selectBefore = (
    <Select
      value={ktgCari}
      onChange={(e) => changeKtgCari(e)}
      // disabled
      style={{ width: 120 }}
    >
      <Option value="1">No RM</Option>
      <Option value="2">No Registrasi</Option>
    </Select>
  );

  const setOption = () => {
    if (unitId === "9404") {
      setoptJPelayanan(jpRadioterapi);
    } else {
      setoptJPelayanan(jpRadiologi);
    }
  };

  useEffect(() => {
    setOption();
  }, [unitId]);

  const changeKtgCari = (e) => {
    setktgCari(e);
    setsCari("");
    setnoReg("");
    setbookingOpId("");
    setnama("");
    setalamat("");
    setnoRm("");
    setjenisKelamin("");
    setnoKartu("");
    setnoTelp("");
    setdiagnosa("");
    settglLahir("");
    setjnsPelayanan("");
    settglPelayanan(dayjs());
    setkodePmr("");
    setcatatan("");
  };

  const rstKlikCari = () => {
    setdiagnosa("");
    setjnsPelayanan("");
    settglPelayanan(dayjs());
    setkodePmr("");
    setcatatan("");
  };

  const klikCari = (sKode, sSearch) => {
    // contoh noreg : 2206020000, noPasien : 00642911
    rstKlikCari();
    if (sKode === "2" && (sSearch.length < 10 || sSearch.length > 10)) {
      Modal.warn({
        title: "Peringatan!",
        content: "No.Registrasi yang Anda cari belum sesuai.",
      });
    } else if (sKode === "1" && (sSearch.length < 8 || sSearch.length > 8)) {
      Modal.warn({
        title: "Peringatan!",
        content: "No.Pasien yang Anda cari belum sesuai.",
      });
    } else {
      getDetailPasien(sKode, sSearch);
    }
  };

  const changeTgl = (e) => {
    settglPelayanan(e);
    countInfobyDate(unitId, dayjs(e).format("YYYY-MM-DD"));
  };

  const klikLoadPmr = (ruangId) => {
    loadPelayananRuang(ruangId);
  };

  const klikSimpan = () => {
    if (!jnsPelayanan) {
      Modal.warn({
        title: "Peringatan!",
        content: "Jenis Pelayanan belum dipilih!",
      });
    } else if (
      dayjs(tglPelayanan).format("DD-MM-YYYY") === dayjs().format("DD-MM-YYYY")
    ) {
      Modal.warn({
        title: "Peringatan!",
        content: "Tanggal Pelayanan tidak boleh sama dengan hari ini!",
      });
    } else if (!kodePmr) {
      Modal.warn({
        title: "Peringatan!",
        content: "Pemeriksaan belum dipilih!",
      });
    } else {
      if (mdBuatJadwal) {
        let opDetail = [];
        opDetail.push({
          pelayananId: kodePmr,
          userId: nmUser,
          clientHost: host,
          clientIP: ip,
        });

        let data = {
          registrasiId: noReg,
          pasienId: noRm,
          ruangId: unitId,
          // diagnosa: diagnosa,
          kodeTindakan: jnsPelayanan,
          tglOperasi: dayjs(tglPelayanan)
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .format(),
          kodePmr: kodePmr,
          nomorPeserta: noKartu,
          catatan: catatan,
          noTelpon: noTelp,
          userId: nmUser,
          clientHost: host,
          clientIP: ip,
          opDetail: opDetail,
        };

        // console.log('klikSimpan : ', data);

        insertJadwal(data);
      } else {
        confirm({
          title: "Konfirmasi",
          icon: <QuestionCircleOutlined />,
          content: "Simpan Perubahan Jadwal?",
          okText: "Simpan",
          cancelText: "Batal",
          onOk() {
            let opDetail = [];
            opDetail.push({
              pelayananId: kodePmr,
              userId: nmUser,
              clientHost: host,
              clientIP: ip,
            });

            let data = {
              registrasiId: noReg,
              pasienId: noRm,
              ruangId: unitId,
              bookingOpId: bookingOpId,
              // diagnosa: diagnosa,
              kodeTindakan: jnsPelayanan,
              tglOperasi: dayjs(tglPelayanan)
                .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
                .format(),
              kodePmr: kodePmr,
              nomorPeserta: noKartu,
              catatan: catatan,
              noTelpon: noTelp,
              userId: nmUser,
              clientHost: host,
              clientIP: ip,
              opDetail: opDetail,
            };

            // console.log('Update jadwal : ', data);

            updateJadwal(data);
          },
        });
      }
    }
  };

  const klikBatal = () => {
    setsCari("");
    setktgCari("2");
    if (mdBuatJadwal === true) {
      setmdBuatJadwal(false);
    } else {
      setmdEditJadwal(false);
    }
  };

  return (
    <div>
      <Card title="FORM ATUR JADWAL" loading={spinCariFormAtur}>
        <Descriptions size="small" bordered>
          {mdBuatJadwal === true ? (
            <Descriptions.Item label="Cari Pasien" span={4} disabled>
              <Input.Group compact>
                <Tooltip title="Masukkan No Registrasi">
                  <Input
                    addonBefore={selectBefore}
                    value={sCari}
                    onChange={(e) => setsCari(e.target.value)}
                    type="number"
                    style={{ width: "91%" }}
                  />
                </Tooltip>
                <Button type="primary" onClick={() => klikCari(ktgCari, sCari)}>
                  Cari
                </Button>
              </Input.Group>
            </Descriptions.Item>
          ) : (
            ""
          )}
          <Descriptions.Item label="Nama Pasien" span={2}>
            {nama}
          </Descriptions.Item>
          <Descriptions.Item label="No Reg." span={2}>
            {noReg}
          </Descriptions.Item>
          <Descriptions.Item label="Alamat" span={4}>
            {alamat}
          </Descriptions.Item>
          <Descriptions.Item label="No RM" span={2}>
            {noRm}
          </Descriptions.Item>
          <Descriptions.Item label="Jenis Kelamin" span={2}>
            {!jenisKelamin
              ? ""
              : jenisKelamin === "L"
              ? "Laki-laki"
              : "Perempuan"}
          </Descriptions.Item>
          <Descriptions.Item label="No Kartu" span={2}>
            {noKartu}
          </Descriptions.Item>
          <Descriptions.Item label="No Telp" span={2}>
            <Input
              value={noTelp}
              onChange={(e) => setnoTelp(e.target.value)}
              size="small"
              // disabled
            />
          </Descriptions.Item>
          <Descriptions.Item label="Diagnosa" span={2}>
            <Input
              value={diagnosa}
              onChange={(e) => setdiagnosa(e.target.value)}
              size="small"
              disabled
            />
          </Descriptions.Item>
          <Descriptions.Item label="Tanggal Lahir" span={2}>
            {tglLahir ? dayjs(tglLahir).format("DD-MM-YYYY") : ""}
          </Descriptions.Item>
          <Descriptions.Item label="Jenis Pelayanan" span={2}>
            <Select
              dataSource={unitId === "9404" ? jpRadioterapi : jpRadiologi}
              value={jnsPelayanan}
              showSearch
              style={{ width: "100%", marginBottom: "3px" }}
              size="small"
              placeholder="Unit Pelayanan"
              optionFilterProp="children"
              onChange={(e) => setjnsPelayanan(e)}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {optJPelayanan.map((d) => (
                <Option key={d}>{d}</Option>
              ))}
            </Select>
          </Descriptions.Item>
          {/* <Descriptions.Item label="Diagnosa Penunjang" span={2}>Diagnosa Penunjang</Descriptions.Item> */}
          <Descriptions.Item label="Tanggal Pelayanan" span={2}>
            <DatePicker
              value={dayjs(tglPelayanan)}
              onChange={(e) => changeTgl(e)}
              disabledDate={(current) => {
                let customDate = dayjs().format("YYYY-MM-DD");
                return current && current < dayjs(customDate, "YYYY-MM-DD");
              }}
              size="small"
              format="DD-MM-YYYY"
              allowClear={false}
              inputReadOnly={true}
              style={{ width: "100%" }}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Pemeriksaan" span={4}>
            <Input.Group compact>
              <Select
                dataSource={optPemeriksaan}
                value={kodePmr}
                showSearch
                style={{ width: "96%", marginBottom: "3px" }}
                size="small"
                placeholder="Pemeriksaan"
                optionFilterProp="children"
                onChange={(e) => setkodePmr(e)}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {optPemeriksaan.map((d) => (
                  <Option key={d.pelayananId}>
                    {d.pelayananId + " - " + d.deskripsi}
                  </Option>
                ))}
              </Select>
              <Button
                onClick={() => klikLoadPmr(unitId)}
                disabled={unitId ? false : true}
                type="primary"
                size="small"
                loading={spinKlikPemeriksaan}
                icon={<SyncOutlined />}
              />
            </Input.Group>
          </Descriptions.Item>
          <Descriptions.Item label="Catatan" span={4}>
            <TextArea
              rows={2}
              value={catatan}
              onChange={(e) => setcatatan(e.target.value)}
              maxLength={200}
            />
            <Text italic>*&#41; Isikan diagnosa pasien di kolom Catatan</Text>
          </Descriptions.Item>
        </Descriptions>

        <Row>
          <Col span={12}>
            <Table
              dataSource={listCounta}
              columns={columns}
              bordered
              loading={spinTbListCounta}
              pagination={false}
              size="small"
              style={{ marginTop: 5 }}
            />
          </Col>
          <Col span={12}>
            <Space style={{ marginTop: 5, float: "right" }}>
              <Button
                onClick={() => klikSimpan()}
                type="primary"
                disabled={!noRm ? true : false}
                style={{ width: 75 }}
              >
                Simpan
              </Button>
              <Button
                onClick={() => klikBatal()}
                type="primary"
                danger
                style={{ width: 75 }}
              >
                Batal
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default FormAturJadwal;
