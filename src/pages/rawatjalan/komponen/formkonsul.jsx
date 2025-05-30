import React, { useContext, useState } from "react";
import {
  Form,
  Input,
  Radio,
  DatePicker,
  Select,
  Button,
  Modal,
  Alert,
  message,
} from "antd";
import { PasienContext } from "../context/PasienContext";
import { PelayananContext } from "../context/Pelayanancontext";
import { KonsulContext } from "../context/KonsulContext";
import { LoginContext } from "../context/LoginContext";
// import { CatatanmedisContext } from '../context/CatatanmedisContext';
import { ExclamationCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import Draggable from "react-draggable";

const draggleRef = React.createRef();
const dateFormat = "DD-MM-YYYY";
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const { Option } = Select;
const { confirm } = Modal;
const { TextArea } = Input;
const Formkonsul = () => {
  const RsLokasiKonsul = sessionStorage.getItem("RSMana");
  const { pegawai } = useContext(LoginContext);
  const { dokterpoli, setDokterpoli, getDokterShift } =
    useContext(PelayananContext);
  const { curpas, ruangpoli } = useContext(PasienContext);
  const { insertKonsul, modalkonsul, setModalKonsul, openmodal, setOpenModal } =
    useContext(KonsulContext);
  // const { catatanmedis } = useContext(CatatanmedisContext);
  const [pemeriksa, setPemeriksa] = useState(null);
  const [ringkasan, setRingkasan] = useState("");
  const [ruangtujuan, setRuangtujuan] = useState(null);
  const [jeniskonsul, setJenisKonsul] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const onStart = (event, uiData) => {
    const { clientWidth, clientHeight } = window?.document?.documentElement;
    const targetRect = draggleRef?.current?.getBoundingClientRect();
    setBounds({
      left: -targetRect?.left + uiData?.x,
      right: clientWidth - (targetRect?.right - uiData?.x),
      top: -targetRect?.top + uiData?.y,
      bottom: clientHeight - (targetRect?.bottom - uiData?.y),
    });
  };
  const namauser = sessionStorage.getItem("userId");
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const dataKonsul = {
    registrasiId: curpas.registrasiId,
    ruangId: curpas.ruangId,
    dokterId: curpas.dokterId,
    alihRawat: jeniskonsul,
    dokterTujuanId: pemeriksa,
    ruangTujuan: ruangtujuan,
    ringkasanPemeriksaan: ringkasan,
    dokterJawabId: pemeriksa,
    // smftujuan: 1,
    // subjective: catatanmedis.subjektif,
    // objective: catatanmedis.objektif,
    // assesment: catatanmedis.assesment,
    // planning: catatanmedis.planning,
    clientHost: host,
    clientIp: ip,
    userId: namauser,
  };
  const d = new Date();
  let day = d.getDay();
  const setMV = (e) => {
    setModalKonsul(e);
  };
  const onPoli = (e) => {
    getDokterShift(e, day + 1);
    // getDokter(e);
    setRuangtujuan(e);
    setPemeriksa(null);
    console.log(e);
  };
  const onPemeriksa = (e) => {
    setPemeriksa(e);
  };
  const onRingkasan = (e) => {
    setRingkasan(e.target.value);
  };
  const onJeniskonsul = (e) => {
    setJenisKonsul(e.target.value);
  };
  const simpanKonsul = (e) => {
    e.preventDefault();
    insertKonsul(dataKonsul);
    setOpenModal(true);
    console.log("konsul", dataKonsul);
  };
  function showConfirm(e) {
    jeniskonsul
      ? confirm({
          title: (
            <Alert
              message="Apakah Anda yakin akan Alih Rawat ?"
              type="warning"
            />
          ),
          icon: <ExclamationCircleOutlined />,
          content: "Data yang sudah diinputkan tidak bisa diubah kembali.",
          onOk() {
            pemeriksa === null
              ? Modal.warning({ content: "Dokter Tujuan belum diisi" })
              : simpanKonsul(e);
          },
          onCancel() {
            console.log(e);
          },
        })
      : confirm({
          title: (
            <Alert
              message="Apakah Anda yakin akan Konsul Biasa ?"
              type="info"
            />
          ),
          icon: <ExclamationCircleOutlined />,
          content: "Data yang sudah diinputkan tidak bisa diubah kembali.",
          onOk() {
            pemeriksa === null
              ? Modal.warning({ content: "Dokter Tujuan belum diisi" })
              : simpanKonsul(e);
          },
          onCancel() {
            console.log(e);
          },
        });
  }
  const openkonsul = () => {
    setMV(true);
    setPemeriksa(null);
    setRuangtujuan(null);
    setRingkasan("");
  };
  return (
    <div>
      <Button
        type="primary"
        size="small"
        onClick={() => {
          console.log(pegawai);
          pegawai !== null
            ? pegawai.slice(0, 1) === "D"
              ? openkonsul()
              : namauser === "NUGRAHA" || namauser === "SARKIM"
              ? openkonsul()
              : message.warning(
                  "Maaf Hanya Dokter yang bisa melakukan konsultasi"
                )
            : namauser === "NUGRAHA" || namauser === "SARKIM"
            ? openkonsul()
            : message.warning(
                "Maaf Hanya Dokter yang bisa melakukan konsultasi"
              );
        }}
      >
        Konsul
      </Button>
      <Modal
        confirmLoading={openmodal}
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            Form Konsul
          </div>
        }
        style={{ top: 5 }}
        open={modalkonsul}
        onOk={(e) =>
          curpas.ruangId === ruangtujuan
            ? message.warning(
                "Ruang tujuan tidak boleh sama dengan ruang asal!"
              )
            : showConfirm(e)
        }
        onCancel={() => {
          setMV(false);
          setDokterpoli([]);
        }}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
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
            // defaultValue={dayjs("2020/01/01", dateFormat)}
            format={dateFormat}
            value={dayjs(curpas.tanggalMasuk, dateFormat)}
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
        <Form.Item
          {...formItemLayout}
          label="Pindah ke Poli"
          style={{ marginBottom: 0 }}
          required
        >
          <Select
            dataSource={
              RsLokasiKonsul === "RSMS"
                ? ruangpoli.sort((a, b) =>
                    b.deskripsi
                      .split("- ")
                      .pop()
                      .localeCompare(a.deskripsi.split("- ").pop())
                  )
                : RsLokasiKonsul === "ABIYASA"
                ? ruangpoli.sort((a, b) =>
                    a.deskripsi
                      .split("- ")
                      .pop()
                      .localeCompare(b.deskripsi.split("- ").pop())
                  )
                : ruangpoli
            }
            showSearch
            placeholder="Pilih Ruang..."
            optionFilterProp="children"
            onSelect={(e) => onPoli(e)}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {RsLokasiKonsul === "RSMS"
              ? ruangpoli
                  .filter((e) => !e.deskripsi.includes("ABIYASA"))
                  .map((d) => (
                    <Option
                      key={d.ruangId}
                      className={
                        d.deskripsi.includes("ABIYASA") ? "backgroundaby" : ""
                      }
                    >
                      {d.deskripsi}
                    </Option>
                  ))
              : RsLokasiKonsul === "ABIYASA"
              ? ruangpoli
                  .filter((e) => !e.deskripsi.includes("RSMS"))
                  .map((d) => (
                    <Option
                      key={d.ruangId}
                      className={
                        d.deskripsi.includes("ABIYASA") ? "backgroundaby" : ""
                      }
                    >
                      {d.deskripsi}
                    </Option>
                  ))
              : ruangpoli.map((d) => (
                  <Option
                    key={d.ruangId}
                    className={
                      d.deskripsi.includes("ABIYASA") ? "backgroundaby" : ""
                    }
                  >
                    {d.deskripsi}
                  </Option>
                ))}
          </Select>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Dokter Konsul"
          style={{ marginBottom: 0 }}
          required
        >
          <Select
            dataSource={dokterpoli}
            value={pemeriksa}
            showSearch
            placeholder="Pilih Pelaksana..."
            optionFilterProp="children"
            onChange={(e) => onPemeriksa(e)}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {dokterpoli.map((p) => (
              <Option key={p.DokterId}>{p.NamaDokter}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Jenis Konsul"
          style={{ marginBottom: 0 }}
          s
        >
          <Radio.Group
            name="radiogroup"
            defaultValue={false}
            onChange={(e) => onJeniskonsul(e)}
          >
            <Radio value={false}>Konsul Biasa</Radio>
            <Radio value={true}>Alih Rawat</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Isi Konsul"
          style={{ marginBottom: 0 }}
        >
          <TextArea
            rows={4}
            onChange={(e) => onRingkasan(e)}
            defaultValue="Mohon konsultasi pasien yang identitasnya tersebut dalam dokumen rekam medis ini dengan diagnosa kerja :"
          />
        </Form.Item>
      </Modal>
    </div>
  );
};

export default Formkonsul;
