import React, { useContext, useState } from "react";
import {
  Form,
  Input,
  Radio,
  DatePicker,
  Button,
  Modal,
  Select,
  message,
} from "antd";
import { PasienContext } from "../context/PasienContext";
import { KonsulContext } from "../context/KonsulContext";
import {
  ExclamationCircleOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { PelayananContext } from "../context/Pelayanancontext";
import { LoginContext } from "../context";

const dateFormat = "DD-MM-YYYY";

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const { Option } = Select;
const { TextArea } = Input;
const { confirm } = Modal;
const Formjawabkonsul = () => {
  const { curpas } = useContext(PasienContext);
  const { pegawai } = useContext(LoginContext);
  const { dokter } = useContext(PelayananContext);
  const { konsul, insertKonsulJawab } = useContext(KonsulContext);
  const [modal1Visible, setModal1Visible] = useState(false);
  const [tandatangan, setTandaTangan] = useState("");
  const [verified, setVerified] = useState(false);
  const [jawab, setJawab] = useState("-");
  const [tindakan, setTindakan] = useState(null);
  const [dokterjawab, setDokter] = useState(null);
  const isikonsulan = konsul[konsul.length - 1];
  const namauser = sessionStorage.getItem("userId");
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const dataJawab = {
    registrasiId: curpas.registrasiId,
    ruangId: curpas.ruangId,
    dokterId: curpas.dokterId,
    ruangTujuan: isikonsulan.ruangTujuan,
    // smfjawab: 2,
    // subjectJawab: "-",
    // objectJawab: "-",
    // ajawab: "-",
    // pjawab: "-",
    hasilPemeriksaan: jawab,
    // kesimpulan: "-",
    tindakan: tindakan,
    dokterJawabId: dokterjawab,
    clientHost: host,
    clientIp: ip,
    userId: namauser,
  };

  function showConfirm() {
    confirm({
      title:
        "Pasien akan kembali ke Poli Asal. Anda yakin akan mengsubmit jawaban konsul?",
      icon: <ExclamationCircleOutlined />,
      content:
        "Pastikan semua tindakan dan transaksi sudah terisikan sebelum Anda mengirim jawaban !",
      onOk() {
        insertKonsulJawab(dataJawab);
        setModal1Visible(false);
        console.log(dataJawab);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }
  const onSubmit = () => {
    if (dokterjawab === null) {
      Modal.warning({
        title: "Dokter Jawab Masih Kosong",
        content: "Mohon Diisi Dokter Jawab terlebih Dahulu",
      });
    } else if (jawab === "." || jawab === null) {
      Modal.warning({
        title: "Jawaban tidak boleh kosong atau berisi . ",
        content: "Mohon diisikan dengan - jika tidak ada isian",
      });
    } else {
      showConfirm();
      // insertKonsulJawab(dataJawab);
      // setModal1Visible(false);
      // console.log(dataJawab);
    }
  };
  const setMV = (e) => {
    setModal1Visible(e);
    // getDokterDetail(props.dokterJawabId);
    // console.log(props.dokterJawabId);
  };
  const onPemeriksa = (e) => {
    setDokter(e);
  };
  const onJawab = (e) => {
    setJawab(e.target.value);
  };
  const onTindakan = (e) => {
    setTindakan(e.target.value);
  };
  const onTtd = () => {
    setVerified(true);
    setTandaTangan(sessionStorage.getItem("ttd"));
  };
  const onVerified = () => {
    onTtd();
  };
  const onNote = () => {
    confirm({
      title:
        "Pasien akan kembali ke Poli Asal setelah dijawab. Anda yakin akan menjawab konsul?",
      icon: <ExclamationCircleFilled />,
      cancelText: "Kembali",
      content:
        "Pastikan semua order tindakan resep dan transaksi sudah terisikan sebelum Anda mengirim jawaban. Order Resep setelah menjawab konsul tidak akan masuk data order.",
      onOk() {
        setMV(true);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  return (
    <div>
      <Button
        style={{ background: "limegreen", borderColor: "limegreen" }}
        type="primary"
        size="small"
        onClick={() => {
          pegawai !== null
            ? pegawai.slice(0, 1) === "D" || namauser === "SARKIM"
              ? onNote()
              : message.warning(
                  "Maaf Hanya Dokter yang bisa melakukan konsultasi"
                )
            : message.warning(
                "Maaf Hanya Dokter yang bisa melakukan konsultasi"
              );
          console.log(isikonsulan);
        }}
      >
        Jawab Konsul
      </Button>

      <Modal
        title="Form Jawab Konsul"
        style={{ top: 5 }}
        open={modal1Visible}
        onOk={() => onSubmit()}
        onCancel={() => {
          setMV(false);
          setVerified(false);
          setTandaTangan("");
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setMV(false);
              setVerified(false);
              setTandaTangan("");
            }}
          >
            Kembali
          </Button>,
          <Button
            disabled={!verified}
            key="submit"
            type="primary"
            onClick={() => onSubmit()}
          >
            Kirim
          </Button>,
        ]}
      >
        <Form.Item
          {...formItemLayout}
          label="No Transaksi"
          style={{ marginBottom: 0 }}
        >
          <Input placeholder="..." value={curpas.registrasiId} />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Tgl Registrasi"
          style={{ marginBottom: 0 }}
        >
          <DatePicker
            value={dayjs(curpas.tanggalMasuk, dateFormat)}
            format={dateFormat}
            disabled
          />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="No Pasien"
          style={{ marginBottom: 0 }}
        >
          <Input placeholder="..." value={curpas.pasienId} />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Nama Pasien"
          style={{ marginBottom: 0 }}
        >
          <Input placeholder="..." value={curpas.namaPasien} />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Nama PT"
          style={{ marginBottom: 0 }}
        >
          <Input placeholder="..." value={curpas.namaPembayaran} />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Asal Poli"
          style={{ marginBottom: 0 }}
        >
          <Input placeholder="..." value={curpas.ruangDeskripsi} />
        </Form.Item>
        {/* {doktertrue === null ? (
          <Form.Item
            required
            {...formItemLayout}
            label="Dokter Jawab"
            style={{ marginBottom: 0 }}
          >
            <Select
              dataSource={dokter}
              showSearch
              value={konsul.doktertujuan}
              // style={{ width: 275 }}
              placeholder="Pilih Pelaksana..."
              optionFilterProp="children"
              onChange={(e) => onPemeriksa(e)}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {dokter.map((p) => (
                <Option key={p.DokterId}>{p.NamaDokter}</Option>
              ))}
            </Select>
          </Form.Item>
        ) : ( */}
        <Form.Item
          required
          {...formItemLayout}
          label="Dokter Jawab"
          style={{ marginBottom: 0 }}
        >
          <Select
            dataSource={dokter}
            // disabled
            showSearch
            value={konsul.doktertujuan}
            // style={{ width: 275 }}
            placeholder="Pilih Pelaksana..."
            optionFilterProp="children"
            onChange={(e) => onPemeriksa(e)}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {dokter.map((p) => (
              <Option key={p.DokterId}>{p.NamaDokter}</Option>
            ))}
          </Select>
        </Form.Item>
        {/* )} */}
        <Form.Item
          {...formItemLayout}
          label="Jenis Konsul"
          style={{ marginBottom: 0 }}
        >
          <Radio.Group
            disabled
            name="radiogroup"
            value={isikonsulan.alihRawat ? 2 : 1}
          >
            <Radio value={1}>Konsul Biasa</Radio>
            <Radio value={2}>Alih Rawat</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Isi Konsul"
          style={{ marginBottom: 0 }}
        >
          <TextArea
            disabled
            rows={4}
            value={isikonsulan.ringkasanPemeriksaan}
          />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Jawaban Konsul"
          style={{ marginBottom: 0 }}
        >
          <TextArea value={jawab} rows={3} onChange={(e) => onJawab(e)} />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Tindakan/Terapi"
          style={{ marginBottom: 0 }}
        >
          <TextArea value={tindakan} rows={3} onChange={(e) => onTindakan(e)} />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Tanda Tangan"
          style={{ marginTop: 10, marginBottom: 0 }}
        >
          <img
            style={{
              width: 200,
              height: 90,
              backgroundColor: "#fff",
              borderStyle: "solid",
              borderRadius: 10,
              borderWidth: 1,
            }}
            src={tandatangan}
            onClick={onVerified}
            alt="Klik Disini untuk Tanda Tangan"
          />
        </Form.Item>
      </Modal>
    </div>
  );
};

export default Formjawabkonsul;
