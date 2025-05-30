import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Tabs,
  Typography,
  Avatar,
  Image,
  message,
  Alert,
  Card,
} from "antd";
import React, { useContext, useState, useRef, useEffect } from "react";
import FileResizer from "react-image-file-resizer";
import { LoginContext } from "../rawatjalan/context/LoginContext";
import { UserOutlined } from "@ant-design/icons";
import Popup from "reactjs-popup";
import SignaturePad from "react-signature-canvas";
import Text from "antd/lib/typography/Text";
const { TabPane } = Tabs;
const { Title } = Typography;
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const UserSetting = () => {
  const {
    user,
    namauser,
    datauser,
    editPassword,
    userName,
    passWord,
    setPassWord,
    passWordBaru,
    enkrip,
    setNamaLengkap,
    namaLengkap,
    setEmail,
    email,
    setTandaTangan,
    tandaTangan,
    pegawaiId,
    editProfile,
    cekToken,
    userBagAkses,
  } = useContext(LoginContext);
  const [passwordbaru, setPasswordBaru] = useState("");
  const [passwordbarulagi, setPasswordBaruLagi] = useState("");
  const userid = sessionStorage.getItem("userId");
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
  const dataUserPass = {
    userName: enkrip(userid),
    password: enkrip(passWord),
  };
  const simpanProfile = () => {
    if (passwordbaru === passwordbarulagi) {
      editProfile(dataUser, passWord);
    } else {
      message.warning("Password baru yang diinputkan berbeda!");
    }
  };
  const gantiPassword = () => {
    if (passwordbaru === passwordbarulagi) {
      editPassword(dataUserPass, passwordbaru);
      console.log(dataUserPass, passWordBaru);
    } else {
      message.warning("Password baru yang diinputkan berbeda!");
    }
  };
  const onFileResize = (e) => {
    const file = e.target.files[0];
    // console.log('ini adlah', file)
    // console.log("ini adalah", file);
    FileResizer.imageFileResizer(
      file, // the file from input
      1028, // width
      1028, // height
      "PNG", // compress format WEBP, JPEG, PNG
      100, // quality
      0, // rotation
      (uri) => {
        //setDatagambar(Buffer.from(uri, "base64"));
        setTandaTangan(uri.substr(22));
        //console.log('nek kie', uri);
      }
      // blob or base64 default base64
    );
  };
  useEffect(() => {
    cekToken(userid);
    // console.log(userid);
  }, [cekToken, userid]);
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        tabPosition="left"
        type="card"
        // onChange={(e) => onTab(e)}
      >
        <TabPane tab="Data Akun" key="1">
          <Title level={3}>User Info :</Title>
          <Form>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  {...formItemLayout}
                  label="AuthID"
                  style={{ marginBottom: 0 }}
                >
                  <Input disabled placeholder="..." value={datauser.authId} />
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Pegawai ID"
                  style={{ marginBottom: 0 }}
                >
                  <Input
                    disabled
                    placeholder="..."
                    value={datauser.pegawaiId}
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Nama"
                  style={{ marginBottom: 0 }}
                >
                  <Input
                    placeholder="..."
                    value={datauser.namaLengkap}
                    onChange={(e) => setNamaLengkap(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Email"
                  style={{ marginBottom: 0 }}
                >
                  <Input
                    placeholder="..."
                    value={datauser.email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Tanda Tangan"
                  style={{ marginBottom: 0 }}
                >
                  <Input
                    type="file"
                    id="file"
                    accept="image/*"
                    onChange={onFileResize}
                  />
                  <Image width={200} src={datauser.tandaTangan} />
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
              </Col>
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
                style={{ textAlign: "center" }}
              >
                <Avatar
                  size={150}
                  icon={<UserOutlined />}
                  style={{ marginBottom: 5 }}
                />
                <Title level={5}>{user.namaLengkap}</Title>
                <Button type="primary" onClick={() => userBagAkses(userName)}>
                  Sinkron Akses
                </Button>
              </Col>
            </Row>
          </Form>
        </TabPane>
        <TabPane tab="Ubah Password" key="2">
          <Title level={3}>Ubah Password : </Title>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Alert
                message={`Saat ini Anda sedang login dengan akun ${namauser}`}
                type="info"
              />
              <Card size="small">
                <Form {...formItemLayout}>
                  <Form.Item
                    required
                    label="Password Lama"
                    style={{ marginBottom: 0 }}
                  >
                    <Input.Password
                      onChange={(e) => setPassWord(e.target.value)}
                    />
                  </Form.Item>
                  <Col
                    span={24}
                    style={{ textAlign: "right", marginBottom: 10 }}
                  >
                    <Text type="secondary">Masukkan kata sandi yang lama</Text>
                  </Col>
                  <Form.Item
                    required
                    label="Password Baru"
                    style={{ marginBottom: 0 }}
                  >
                    <Input.Password
                      onChange={(e) => setPasswordBaru(e.target.value)}
                    />
                  </Form.Item>
                  <Col span={24} style={{ textAlign: "right" }}>
                    <Text type="secondary">Masukkan kata sandi yang baru</Text>
                  </Col>
                  <Form.Item
                    required
                    label="Ulangi Password Baru"
                    style={{ marginBottom: 0 }}
                    hasFeedback
                    validateStatus={
                      passwordbaru === passwordbarulagi ? "success" : "error"
                    }
                  >
                    <Input.Password
                      onChange={(e) => setPasswordBaruLagi(e.target.value)}
                    />
                  </Form.Item>
                  <Col span={24} style={{ textAlign: "right" }}>
                    <Text type="secondary">
                      Ulangi isian kata sandi yang baru
                    </Text>
                  </Col>
                  <Row>
                    <Col span={24} style={{ textAlign: "right" }}>
                      <Button type="primary" onClick={gantiPassword}>
                        Update
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Col>
            <Col span={12}>
              <Alert
                type="info"
                message={
                  <>
                    * Ubah sandi Anda dengan kombinasi huruf, angka, dan simbol.
                    <br />* Pastikan sandi berbeda dari nama pengguna.
                  </>
                }
              />
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default UserSetting;
