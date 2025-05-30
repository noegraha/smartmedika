import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Image,
  Input,
  message,
  Row,
  Select,
  Spin,
} from "antd";
import React, { useContext, useRef, useState } from "react";
import {
  CloudDownloadOutlined,
  DownloadOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { LoginContext } from "../rawatjalan/context";
import FileResizer from "react-image-file-resizer";
import SignaturePad from "react-signature-canvas";
import Popup from "reactjs-popup";
import axios from "axios";
import { UserContext } from "../appsetting/UserContext";
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const MasterUserSync = () => {
  const {
    cekPasswordUser,
    userName,
    passWord,
    enkrip,
    namaLengkap,
    email,
    tandaTangan,
    pegawaiId,
    setNamaLengkap,
    setEmail,
    setTandaTangan,
    editProfileTtd,
    setPegawaiID,
    userBagAkses,
    loadingUser,
    usersync,
    setUserSync,
    passWordsaja,
    namauser,
  } = useContext(LoginContext);
  const { groupName } = useContext(UserContext);
  const onFileResize = (e) => {
    const file = e.target.files[0];
    FileResizer.imageFileResizer(
      file, // the file from input
      1028, // width
      1028, // height
      "PNG", // compress format WEBP, JPEG, PNG
      100, // quality
      0, // rotation
      (uri) => {
        setTandaTangan(uri.substr(22));
      }
    );
  };

  const sigCanvas = useRef({});
  const clear = () => sigCanvas.current.clear();
  const save = () =>
    setTandaTangan(sigCanvas.current.getTrimmedCanvas().toDataURL().substr(22));
  const dataUser = {
    namaLengkap: namaLengkap,
    userName: enkrip(userName),
    email: email,
    password: enkrip(passWord),
    tandaTangan: tandaTangan,
    pegawaiId: pegawaiId,
  };
  const simpanProfile = () => {
    editProfileTtd(dataUser, passWord);
  };
  const [showpassword, setShowPassword] = useState(true);
  const [ruang, setRuang] = useState([]);
  const [grup, setGrup] = useState("2");
  const [openLoadingDaftar, setOpenLoadingDaftar] = React.useState(false);
  const [openLoading, setOpenLoading] = React.useState(false);

  const apiku = sessionStorage.getItem("api");
  const tok = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };

  const userBag = (user) => {
    axios
      .get(`${apiku}/SisJwt/RuangByUser/${user}/%20/${grup}/%20`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          setRuang(res.data.result);
        } else {
          console.log(res.data);
          setRuang([]);
        }
      })
      .catch((err) => {
        setRuang([]);
        console.log(err);
      });
    console.log(`${apiku}/SisJwt/RuangByUser/${user}/%20/${grup}/%20`);
  };

  return (
    <div>
      <Card
        size="small"
        title="Master User"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
        loading={loadingUser}
      >
        <Form {...formItemLayout}>
          <Form.Item label="User" style={{ marginBottom: 0 }}>
            <Input
              value={usersync}
              style={{ width: "40%" }}
              onChange={(e) => setUserSync(e.target.value)}
              placeholder="Masukkan username..."
              onPressEnter={() => cekPasswordUser(usersync.toUpperCase())}
            />
            <Button
              style={{ width: "25px" }}
              type="primary"
              onClick={() => cekPasswordUser(usersync.toUpperCase())}
            >
              <CloudDownloadOutlined />
            </Button>{" "}
            <Button
              disabled={usersync === null}
              style={{ backgroundColor: "#389e0d", borderColor: "#389e0d" }}
              type="primary"
              onClick={() => userBagAkses(usersync.toUpperCase())}
            >
              <SyncOutlined /> Sync UserBag Dari KHS
            </Button>
          </Form.Item>

          <Form.Item label="Username" style={{ marginBottom: 0 }}>
            <Input value={userName} />
          </Form.Item>

          {namauser === "NUGRAHA" ||
          namauser === "GALIH" ||
          namauser === "DANU" ? (
            <Form.Item label="Password" style={{ marginBottom: 0 }}>
              <Input
                style={{ width: 200 }}
                addonAfter={
                  <Button
                    type="text"
                    size="small"
                    onClick={() => setShowPassword(!showpassword)}
                  >
                    {showpassword ? "Show" : "Hide"}
                  </Button>
                }
                disabled={showpassword}
                value={
                  showpassword
                    ? passWordsaja.replace(/\w(?=\w{0})/g, "*")
                    : passWordsaja
                }
              />
            </Form.Item>
          ) : (
            <></>
          )}
          <Form.Item label="Nama Lengkap" style={{ marginBottom: 0 }}>
            <Input
              value={namaLengkap}
              onChange={(e) => setNamaLengkap(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Email" style={{ marginBottom: 0 }}>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item label="Pegawai ID" style={{ marginBottom: 0 }}>
            <Input
              value={pegawaiId}
              onChange={(e) => setPegawaiID(e.target.value)}
            />
            {/* <Button
              type="primary"
              onClick={() => editProfile(dataUser, passWord)}
            >
              Update
            </Button> */}
          </Form.Item>
          <Divider>Hak Akses</Divider>
          <Form.Item label="Grup User" style={{ marginBottom: 0 }}>
            <Input value={groupName} />
          </Form.Item>
          <Form.Item label="Grup Ruang" style={{ marginBottom: 0 }}>
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Pilih Grup"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              onSelect={(e) => setGrup(e)}
              value={grup}
            >
              <Option key={"1"}>Rawat Inap</Option>
              <Option key={"2"}>Rawat Jalan</Option>
              <Option key={"3"}>IGD</Option>
              <Option key={"4"}>Penunjang Medis</Option>
              <Option key={"5"}>Penunjang Non Medis</Option>
              <Option key={"6"}>Struktural</Option>
              <Option key={"7"}>Apotik Farmasi</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Ruang Akses" style={{ marginBottom: 0 }}>
            <Select
              dataSource={ruang}
              showSearch
              onFocus={() => userBag(encodeURIComponent(enkrip(usersync)))}
              style={{ width: "100%" }}
              placeholder="Lihat Ruang"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {ruang.map((d) => (
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
          <Divider>Otentikasi</Divider>
          <Form.Item label="Finger Print" style={{ marginBottom: 0 }}>
            <Button
              disabled={usersync === null}
              type="primary"
              onClick={() => {
                setOpenLoading(true);
                axios
                  .post(`http://localhost:5000/api/show-form`, {
                    Username: usersync,
                  })
                  .then((res) => {
                    if (res.data.StatusCode === 200) {
                      setOpenLoading(false);
                      console.log(res);
                      message.success(res.data.Result);
                    } else {
                      setOpenLoading(false);
                      message.warning(res.data.Result);
                    }
                  })
                  .catch((err) => {
                    setOpenLoading(false);
                    console.log(err);
                  });

                // setTimeout(() => {
                //   setOpenLoading(false);
                //   // message.error("Timed Out. Silahkan coba lagi!");
                // }, 10000);
              }}
            >
              Cek Sidik Jari
            </Button>{" "}
            <Button
              disabled={usersync === null}
              type="primary"
              style={{ backgroundColor: "#13c2c2", borderColor: "#13c2c2" }}
              onClick={() => {
                setOpenLoadingDaftar(true);
                axios
                  .post(`http://localhost:5000/api/fingerprint/enrollment`, {
                    Username: usersync,
                    FingerprintCode: "",
                  })
                  .then((res) => {
                    if (res.data.StatusCode === 200) {
                      setOpenLoadingDaftar(false);
                      console.log(res);
                      message.success(res.data.Result);
                    } else {
                      setOpenLoadingDaftar(false);
                      message.warning(res.data.Result);
                    }
                  })
                  .catch((err) => {
                    setOpenLoadingDaftar(false);
                    console.log(err);
                  });

                // setTimeout(() => {
                // setOpenLoadingDaftar(false);
                // message.error("Timed Out. Silahkan coba lagi!");
                // }, 50000);
              }}
            >
              Daftar Sidik Jari
            </Button>{" "}
            <Button
              type="primary"
              onClick={() =>
                window.open(
                  "http://182.168.2.247:8080/share.cgi?ssid=0XzspDd",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              icon={<DownloadOutlined />}
            />
          </Form.Item>
          <Form.Item label="Tanda Tangan" style={{ marginBottom: 0 }}>
            <Input
              type="file"
              id="file"
              accept="image/*"
              onChange={onFileResize}
            />
            <Image width={200} src={`data:image/jpeg;base64,` + tandaTangan} />
            <br />
            <Popup
              modal
              trigger={<Button>Open Signature Pad</Button>}
              closeOnDocumentClick={false}
              contentStyle={{ width: 400 }}
            >
              {(close) => (
                <>
                  <div style={{ border: "1px solid #000000" }}>
                    <SignaturePad
                      ref={sigCanvas}
                      canvasProps={{
                        width: 388,
                        height: 200,
                        className: "signatureCanvas",
                        border: "1px solid #000000",
                      }}
                    />
                  </div>
                  <button onClick={save}>Save</button>
                  <button onClick={clear}>Clear</button>
                  <button onClick={close}>Close</button>
                </>
              )}
            </Popup>
          </Form.Item>
          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <Button type="primary" onClick={simpanProfile}>
                Update
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
      {openLoading && (
        <div>
          <Spin
            spinning={openLoading}
            fullscreen
            tip="Tempelkan Jari Anda ke Fingerprint"
          />
        </div>
      )}
      {openLoadingDaftar && (
        <div>
          <Spin
            spinning={openLoadingDaftar}
            fullscreen
            tip="Daftarkan Jari Anda. Tempelkan Jari Anda ke Fingerprint 4 kali"
          />
        </div>
      )}
    </div>
  );
};

export default MasterUserSync;
