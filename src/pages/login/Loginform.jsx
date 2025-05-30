import React, {
  Fragment,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";
import {
  Input,
  Tooltip,
  Button,
  Form,
  Spin,
  Modal,
  message,
  Radio,
  Select,
  Row,
  Col,
  Typography,
} from "antd";
import {
  UserOutlined,
  InfoCircleOutlined,
  KeyOutlined,
  SettingTwoTone,
  CameraTwoTone,
} from "@ant-design/icons";
import { LoginContext } from "../rawatjalan/context/LoginContext";
import Logo from "../../assets/img/companylogo.png";
import { LoadingOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";
import FaceRecognition from "../tools/FaceRecognition";
import axios from "axios";
const { version } = require("../../../package.json");
const { Option } = Select;
const { Text } = Typography;

const Loginform = () => {
  const {
    token,
    signIn,
    loading,
    setLoading,
    setAPI,
    apiku,
    environment,
    setEnvironment,
    apiPenunjang,
    setapiPenunjang,
    apiReport,
    setapiReport,
  } = useContext(LoginContext);
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [face, setFace] = useState(false);
  const [warning, setWarning] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;
  const inputRef2 = useRef(null);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  // Fungsi untuk menangani submit form password
  function CaptchaS() {
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
      // Generate dua angka acak antara 1 dan 10
      setNum1(Math.floor(Math.random() * 10) + 1);
      setNum2(Math.floor(Math.random() * 10) + 1);
    }, []);

    const handleInputChange = (event) => {
      setUserAnswer(event.target.value);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      const correctAnswer = num1 + num2;
      if (parseInt(userAnswer) === correctAnswer) {
        if (username !== "" || pass !== "") {
          setError("");
          // Lakukan proses login di sini
          alert("Login berhasil!");
        } else {
          message.warning("Isi Username dan Password");
        }
      } else {
        setError("Jawaban Anda salah. Silakan coba lagi.");
      }
    };

    return (
      <div className="fadeIn fourth">
        <form onSubmit={handleSubmit}>
          <Text code>
            Berapakah hasil dari {num1} + {num2}?
          </Text>
          <Input
            type="text"
            value={userAnswer}
            onChange={handleInputChange}
            //   placeholder="Masukkan jawaban"
            style={{ width: "20%" }}
          />
          <br />
          <Button
            htmlType="submit"
            type="primary"
            className="fadeIn fourth"
            style={{ width: "60%" }}
          >
            Login
          </Button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
  }
  //CEK CURRENT URL
  const currentURL = new URL(window.location.href);
  const host = currentURL.host;
  useEffect(() => {
    if (host !== "smart.rsmargono.id") {
      cekIP();
    }
  }, []);

  const cekIP = () => {
    axios
      .get(`${apiku}/SisGetIP/GetIp`)
      .then((res) => {
        axios
          .get(
            `${apiku}/SisJwt/GetGroupLayananByIP/${res.data.result.currentIP}`
          )
          .then((res) =>
            res.data.result.groupLayananId === 1 ||
            res.data.result.groupLayananId === 0
              ? info()
              : {}
          )
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const info = () => {
    Modal.info({
      title: "Perpindahan alamat!",
      content: (
        <div>
          Untuk peningkatan keamanan sistem, Smartmedika beralih ke alamat :
          <div style={{ fontSize: "20", fontWeight: "bold" }}>
            smart.rsmargono.id
          </div>
        </div>
      ),
      onOk() {
        window.location.href = "https://smart.rsmargono.id";
      },
    });
  };
  const handlePasswordSubmit = () => {
    if (password === process.env.REACT_APP_API_PASS) {
      setIsModalVisible(true);
    } else {
      message.error("Password salah!");
    }
  };
  const handleSubmit = () => {
    setLoading(true);
    signIn(username, pass);
    // console.log('Username: ' + username + ', Pass: ' + pass);
  };
  const handleSignIn = (e) => {
    e.preventDefault();
    handleSubmit();
  };
  const handleUsername = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };
  const handlePass = (e) => {
    e.preventDefault();
    setPass(e.target.value);
  };
  const onApi = (e) => {
    setAPI(e.target.value);
  };
  const onKeyDown = (keyEvent) => {
    if (keyEvent.getModifierState("CapsLock")) {
      setWarning(true);
    } else {
      setWarning(false);
    }
  };
  const optionsapi = [
    {
      label: "Production Domain",
      value: process.env.REACT_APP_API_BASE_SECURE,
    },
    {
      label: "Production SSL",
      value: process.env.REACT_APP_API_BASE_URLS,
    },
    {
      label: "Production",
      value: process.env.REACT_APP_API_BASE_URL,
    },
    {
      label: "Production Linux",
      value: process.env.REACT_APP_API_BASE_LINUX,
    },
    {
      label: "Development",
      value: process.env.REACT_APP_API_BASE_DEV,
    },
    {
      label: "Local",
      value: process.env.REACT_APP_API_BASE_LOCAL,
    },
  ];

  const optPenunjang = [
    {
      label: "Production Domain",
      value: process.env.REACT_APP_API_BASE_SECURE,
    },
    {
      label: "Production SSL",
      value: process.env.REACT_APP_API_BASE_URLS,
    },
    {
      label: "Production",
      value: process.env.REACT_APP_API_BASE_URL,
    },
    {
      label: "Production Linux",
      value: process.env.REACT_APP_API_BASE_LINUX,
    },
    {
      label: "Development Lokal",
      value: process.env.REACT_APP_API_BASE_LOCAL,
    },
  ];
  const optReporting = [
    {
      label: "Production Domain",
      value: process.env.REACT_APP_API_BASE_URL_REPORTSECURE,
    },
    {
      label: "Production SSL",
      value: process.env.REACT_APP_API_BASE_URLS_REPORT,
    },
    {
      label: "Production",
      value: process.env.REACT_APP_API_BASE_URL_REPORT,
    },
  ];
  const options = [
    {
      label: "Production",
      value: "prod",
    },
    {
      label: "Stagging",
      value: "stg",
    },
    {
      label: "Development",
      value: "dev",
    },
  ];
  if (token) {
    return <Redirect to="/" />;
  } else {
    // if (loading) {
    //   return <h3>Loading dela hu...</h3>
    // }
    return (
      <Fragment>
        <Spin
          size="large"
          indicator={antIcon}
          spinning={loading}
          tip="Mohon Bersabar.."
        >
          <div className="backcontentlogin">
            <div style={{ textAlign: "right", padding: 10 }}>
              <CameraTwoTone
                style={{ fontSize: 20 }}
                onClick={() => setFace(true)}
              />
              {"   "}
              <SettingTwoTone
                style={{ fontSize: 20 }}
                onClick={() => {
                  setOpen(true);
                  // setPassword(" ");
                  form.resetFields();
                }}
              />
              <Modal
                style={{ top: 20 }}
                footer={null}
                onCancel={() => setFace(false)}
                width={670}
                open={face}
                title="Face Recognition"
              >
                <FaceRecognition />
              </Modal>

              <Modal
                title="Masukkan Password"
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
                closable={false}
              >
                <Form name="passwordForm" onFinish={handlePasswordSubmit}>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      { required: true, message: "Password wajib diisi!" },
                    ]}
                  >
                    <Input.Password
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <div
                      style={{
                        textAlign: "right",
                      }}
                    >
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </Modal>

              {/* Modal yang hanya terbuka setelah password benar */}
              <Modal
                open={isModalVisible}
                onCancel={() => {
                  setOpen(false);
                  setIsModalVisible(false);
                  // setPassword(" ");
                }}
                onClose={() => {
                  setOpen(false);
                  setIsModalVisible(false);
                  // setPassword(" ");
                }}
                footer={null}
              >
                <span>
                  <b>API</b>
                </span>
                <hr style={{ marginTop: "-3px" }} />

                <Row style={{ marginBottom: "2px" }}>
                  <Col span={5}>
                    <span>Base API :</span>
                  </Col>
                  <Col span={7}>
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Pilih.."
                      value={apiku}
                      onChange={(e) => setAPI(e)}
                    >
                      {optionsapi.map((opt, index) => (
                        <Option key={index} value={opt.value}>
                          {opt.label}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                  <Col span={12}>
                    <Input
                      value={apiku}
                      onChange={onApi}
                      onPressEnter={() => {
                        setOpen(false);
                        setIsModalVisible(false);
                        setPassword(" ");
                        message.success("Berhasil ganti API!");
                      }}
                      style={{ width: "95%", marginLeft: "13px" }}
                    />
                  </Col>
                </Row>
                <Row style={{ marginBottom: "2px" }}>
                  <Col span={5}>
                    <span>API Penunjang :</span>
                  </Col>
                  <Col span={7}>
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Pilih.."
                      value={apiPenunjang}
                      onChange={(e) => setapiPenunjang(e)}
                    >
                      {optPenunjang.map((opt, index) => (
                        <Option key={index} value={opt.value}>
                          {opt.label}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                  <Col span={12}>
                    <Input
                      value={apiPenunjang}
                      onChange={(e) => setapiPenunjang(e.target.value)}
                      style={{ width: "95%", marginLeft: "13px" }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col span={5}>
                    <span>API Reporting :</span>
                  </Col>
                  <Col span={7}>
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Pilih.."
                      value={apiReport}
                      onChange={(e) => setapiReport(e)}
                    >
                      {optReporting.map((opt, index) => (
                        <Option key={index} value={opt.value}>
                          {opt.label}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                  <Col span={12}>
                    <Input
                      value={apiReport}
                      onChange={(e) => setapiReport(e.target.value)}
                      // onPressEnter={handleOk}
                      style={{ width: "95%", marginLeft: "13px" }}
                    />
                  </Col>
                </Row>

                <Row style={{ marginTop: "5px" }}>
                  <Col span={24}>
                    <span>
                      <b>SatuSehat</b>
                    </span>
                    <hr style={{ marginTop: "-3px" }} />

                    <p> </p>
                  </Col>
                </Row>
                <Row>
                  <Col span={4}>
                    <span>Environment :</span>
                  </Col>
                  <Col span={20}>
                    <Radio.Group
                      optionType="button"
                      buttonStyle="solid"
                      options={options}
                      onChange={(e) => setEnvironment(e.target.value)}
                      value={environment}
                    />
                  </Col>
                </Row>
              </Modal>
            </div>
            {/* <div className="wrapper fadeInDown"> */}
            <div className="wrapper">
              <div id="formContent">
                <div className="fadeIn first">
                  <img src={Logo} alt="Logo" className="logologin2" />
                </div>
                <Form
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={(e) => handleSubmit(e)}
                >
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input
                      autoFocus
                      autoComplete={false}
                      placeholder="Enter your username"
                      className="fadeIn second"
                      style={{ width: "60%" }}
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      suffix={
                        <Tooltip title="User KHS">
                          <InfoCircleOutlined
                            style={{ color: "rgba(0,0,0,.45)" }}
                          />
                        </Tooltip>
                      }
                      onChange={(e) => handleUsername(e)}
                      onPressEnter={() => inputRef2.current.focus()}
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                    validateStatus={warning ? "warning" : null}
                    help={warning ? "Capslock is ON" : null}
                  >
                    <Input.Password
                      className="fadeIn third"
                      placeholder="Password"
                      prefix={<KeyOutlined className="site-form-item-icon" />}
                      style={{ width: "60%" }}
                      onChange={(e) => handlePass(e)}
                      onPressEnter={(e) => handleSignIn(e)}
                      onKeyDown={(e) => onKeyDown(e)}
                      onBlur={() => setWarning(false)}
                      ref={inputRef2}
                    />
                  </Form.Item>
                  {/* <CaptchaS className="fadeIn fourth" /> */}
                  <Form.Item>
                    <Button
                      htmlType="submit"
                      type="primary"
                      className="fadeIn fourth"
                      style={{ width: "60%" }}
                    >
                      Login
                    </Button>
                  </Form.Item>
                </Form>
                <div id="formFooter">
                  <Text style={{ marginBottom: 10 }}>
                    RSMS - SmartMedika 2020
                    <br />
                    Version : {version}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </Spin>
      </Fragment>
    );
  }
};

export default Loginform;
