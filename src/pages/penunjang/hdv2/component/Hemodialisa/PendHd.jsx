import React, { useContext, useState } from "react";
import {
  Row,
  Col,
  Card,
  DatePicker,
  InputNumber,
  Select,
  Input,
  Button,
  Form,
  Modal,
  message,
  Tooltip,
} from "antd";
import dayjs from "dayjs";
import HdContext from "../../HdContext";
import FormInformConsent from "./FormInformConsent";

const { PasiensContext } = HdContext;

const { Option } = Select;

function PendHd() {
  const props = useContext(PasiensContext);
  const [isModalVisiblea, setIsModalVisiblea] = useState(false);

  const showModala = () => {
    props.getInformConsent();
    setIsModalVisiblea(true);
  };

  const handleCancela = () => {
    setIsModalVisiblea(false);
  };

  const klikSimpan = () => {
    let tgl1 = dayjs(props.tglList).format("DD-MM-YYYY");
    let tgl2 = dayjs(props.tanggal).format("DD-MM-YYYY");

    tgl1 !== tgl2
      ? Modal.warning({
        title: "Peringatan!",
        content: `Tanggal order dan Tanggal RME tidak sama, mohon periksa kembali!`,
      })
      : props.riwAllObat === true &&
        (props.ketRiwAllObat === null ||
          props.ketRiwAllObat === "" ||
          props.ketRiwAllObat === undefined ||
          props.ketRiwAllObat === " ")
        ? Modal.warning({
          title: "Peringatan!",
          content: `Jika Riwayat Alergi Obat Ya, Keterangan Alergi Obat tidak boleh kosong!`,
        })
        : !props.mesinNo
          ? Modal.warning({
            title: "Peringatan!",
            content: `Nomor mesin tidak boleh kosong!`,
          })
          : // props.userEntry && props.user !== props.userEntry ? message.warning("User Anda dan User Entry berbeda, tidak bisa simpan!") :
          props.clickPendHd();
  };

  return (
    <div>
      <Card
        title="Pendaftaran HD"
        size="small"
        headStyle={{ backgroundColor: "#ffa39e" }}
        style={{ width: "100%", backgroundColor: "#fff1f0", height: "235px" }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          labelAlign="left"
        >
          <Row>
            <Col span={12}>
              <Form.Item label="Tanggal" style={{ marginBottom: "0px" }}>
                <Tooltip title="Tanggal hanya bisa disimpan 1 kali">
                  <DatePicker
                    size="small"
                    disabled={props.disabledTglPendHd}
                    value={props.tanggal}
                    format={"DD-MM-YYYY HH:mm"}
                    showTime
                    onChange={props.changeDatePendHd}
                  />
                </Tooltip>
              </Form.Item>

              <Form.Item label="HD ke" style={{ marginBottom: "0px" }}>
                <InputNumber
                  min={1}
                  value={props.hdKe ? props.hdKe : 1}
                  onChange={props.changeHdKe}
                  size="small"
                />
              </Form.Item>

              <Form.Item
                label="Riw. Alergi Obat"
                style={{ marginBottom: "0px" }}
              >
                <Select
                  defaultValue="Tidak"
                  value={props.riwAllObat}
                  onChange={props.changeRiwAllObat}
                  size="small"
                >
                  <Option value={true}>Ya</Option>
                  <Option value={false}>Tidak</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Ket. Alergi Obat"
                style={{ marginBottom: "0px" }}
              >
                <Input
                  value={props.ketRiwAllObat}
                  onChange={props.changeKetRiwAllObat}
                  disabled={!props.riwAllObat}
                  size="small"
                  placeholder="..."
                />
              </Form.Item>

              <Form.Item
                label="Verifikasi HD"
                tooltip="Inform Consent setiap 3 bulan"
                style={{ marginBottom: "5px" }}
              >
                <Input.Group compact>
                  <Button
                    onClick={() => {
                      props.pasien.result.length === 0
                        ? message.warning(
                          "Silahkan pilih pasien terlebih dahulu"
                        )
                        : showModala();
                    }}
                    type="primary"
                    htmlType="submit"
                    size="small"
                    style={{ width: "50%" }}
                  // disabled={!props.verifHd}
                  >
                    Informed Consent
                  </Button>
                  <Select
                    value={props.verifHd}
                    onChange={props.changeVerifHd}
                    defaultValue={false}
                    disabled={props.disabledVerifHd}
                    size="small"
                    style={{ width: "50%" }}
                  >
                    <Option value={true}>Ya</Option>
                    <Option value={false}>Tidak</Option>
                  </Select>
                </Input.Group>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Mesin No"
                style={{
                  marginBottom: "0px",
                  marginLeft: "10px",
                }}
              >
                <InputNumber
                  value={props.mesinNo ? props.mesinNo : 1}
                  onChange={props.changeMesinNo}
                  min={1}
                  max={50}
                  defaultValue={1}
                  size="small"
                />
              </Form.Item>

              <Form.Item
                label="Dialsiser"
                style={{
                  marginBottom: "0px",
                  marginLeft: "10px",
                }}
              >
                <Select
                  value={props.dialsiser}
                  onChange={props.changeDialsiser}
                  defaultValue="n"
                  size="small"
                >
                  <Option value="Baru">Baru</Option>
                  {/* <Option value="Re-use">Re-Use</Option> */}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Button
            onClick={() => klikSimpan()}
            // onClick={() => {
            //   let tgl1 = dayjs(props.tglList).format("DD-MM-YYYY");
            //   let tgl2 = dayjs(props.tanggal).format("DD-MM-YYYY");

            //   tgl1 !== tgl2
            //     ? message.warning(
            //       "Tanggal order dan Tanggal RME tidak sama, mohon periksa kembali!"
            //     )
            //     : props.riwAllObat === true &&
            //       (props.ketRiwAllObat === null ||
            //         props.ketRiwAllObat === "" ||
            //         props.ketRiwAllObat === undefined ||
            //         props.ketRiwAllObat === " ")
            //       ? message.warning(
            //         "Jika Riwayat Alergi Obat Ya, Keterangan Alergi Obat tidak boleh kosong!"
            //       )
            //       : !props.mesinNo
            //         ? message.warning("Nomor mesin tidak boleh kosong!")
            //         : // props.userEntry && props.user !== props.userEntry ? message.warning("User Anda dan User Entry berbeda, tidak bisa simpan!") :
            //         props.clickPendHd();
            // }}
            type="primary"
            htmlType="submit"
            disabled={!props.verifHd}
            loading={props.spinPendHD}
            style={{ float: "right" }}
          >
            Simpan
          </Button>

          <Modal
            visible={isModalVisiblea}
            onCancel={handleCancela}
            footer={null}
            width={790}
          >
            <FormInformConsent />
          </Modal>
        </Form>
      </Card>
    </div>
  );
}

export default PendHd;
