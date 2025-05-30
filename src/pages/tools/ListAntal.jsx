import {
  Button,
  Card,
  Select,
  Table,
  message,
  Col,
  Row,
  Descriptions,
  Input,
  Modal,
  Tag,
  ConfigProvider,
  Form,
  Radio,
  Space,
  Popconfirm,
  InputNumber,
  Divider,
} from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { PasienRIContext } from "../rawatinap/context/PasienRIContext";
import { PlusOutlined } from "@ant-design/icons";
import { LoginContext } from "../rawatjalan/context";
import dayjs from "dayjs";
import Column from "antd/lib/table/Column";
import { UserContext } from "../appsetting/UserContext";

const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const formItemLayoutdpjp = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const ListAntal = () => {
  const { ruang } = useContext(PasienRIContext);
  const { namauser } = useContext(LoginContext);
  const { menuOrderTT, setmenuOrderTT } = useContext(UserContext);

  const apiku = sessionStorage.getItem("api");
  const tok = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };
  // state untuk order bed
  const [modalBed, setmodalBed] = useState(false);
  const [orderKamarId, setorderKamarId] = useState("");
  const [listKamar, setlistKamar] = useState([]);
  const [orderRuang, setorderRuang] = useState("");
  const [orderKelas, setorderKelas] = useState("");
  const [orderKelasDesk, setorderKelasDesk] = useState("");
  const [orderBedId, setorderBedIdd] = useState("");
  const [orderKet, setorderKet] = useState("");
  const [orderKamarAda, setorderKamarAda] = useState([]);
  const [listOrderKamar, setlistOrderKamar] = useState([]);
  const [listOrderBlm, setlistOrderBlm] = useState([]);
  const [listApprov, setlistApprov] = useState([]);
  const [listApprovACC, setlistApprovACC] = useState([]);
  const [listorderbed, setlistorderbed] = useState([]);
  const [jmlApprov, setjmlApprov] = useState("");
  const [ketSK, setketSK] = useState("");
  const [listApprovKASI, setListApprovKASI] = useState([]);

  const [ruangp, setRuang] = useState(null);
  const [bed, setBed] = useState(null);
  const [extra, setExtra] = useState("-");
  const [kelas, setKelas] = useState(null);
  const [kelaslist, setKelasList] = useState([]);
  const [kamar, setKamar] = useState([]);

  const [registrasiIdToMove, setRegistrasiIdToMove] = useState(""); // State untuk menyimpan registrasiId yang akan dipindahkan
  const [selectedbedId, setSelectedbedId] = useState(""); // State untuk menyimpan bedId yang dipilih
  const [selectedNoBed, setSelectedNoBed] = useState(""); // State untuk menyimpan noBed yang dipilih
  const [selectedKet, setselectedKet] = useState(""); // State untuk menyimpan noBed yang dipilih

  const [modal, setModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const dataorderbed = {};

  const Popup = () =>
    visible && (
      <ul className="popup" style={{ left: `${x}px`, top: `${y}px` }}>
        <li>Pindahkan ke :</li>
        <li>
          Bed ID : <Select></Select>
        </li>
        <li>
          No. Bed : <Select></Select>
        </li>
        <li>
          Keterangan : <Select></Select>
        </li>
        <li
          style={{ color: "green" }}
          onClick={() => {
            console.log("ok");
          }}
        >
          Pindah
        </li>
      </ul>
    );

  const lookupRegByRuang = (ruangp, kelas, extra) => {
    axios
      .get(`${apiku}/MstKamar/LookupRegByRuang/${ruangp}/${kelas}/${extra}`, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          setKamar(res.data.result);
          console.log(res.data.result);
        } else {
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Ambil!");
      });
  };

  const ambilKelas = (ruang) => {
    axios
      .get(`${apiku}/MstKamar/LookupKelasRawat/${ruang}`, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          setKelasList(res.data.result);
        } else {
          setKelasList([]);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        setKelasList([]);
        console.log(err);
        message.error("Gagal Ambil!");
      });
  };

  const ambilKamarByruang = (ruang, kelas) => {
    axios
      .get(`${apiku}/MstKamar/LookupBedId/${ruang}/${kelas}`, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistKamar(res.data.result);
        } else {
          setlistKamar([]);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        setlistKamar([]);
        console.log(err);
        message.error("Gagal Ambil!");
      });
  };

  const ambilListOrder = (ruang, kelas) => {
    axios
      .get(`${apiku}/MstKamar/LookupRequest/${ruang}/${kelas}`, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistOrderKamar(res.data.result);
          console.log(res.data.result, orderKamarId);
          orderKamarId === ""
            ? setlistOrderBlm("")
            : setlistOrderBlm(
                res.data.result
                  .filter(
                    (item) =>
                      item.BedId === orderKamarId && item.Approve === false
                  )
                  .map((item) => item.NoBed)
              );

          setorderBedIdd("");
        } else {
          setlistOrderKamar([]);
          // message.warning(res.data.message);
        }
      })
      .catch((err) => {
        setlistOrderKamar([]);
        console.log(err);
        message.error("Gagal Ambil!");
      });
  };

  const getlistApprove = () => {
    axios
      .get(`${apiku}/MstKamar/History/-`, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistApprov(
            res.data.result.filter((item) => item.userApprove === null) || []
          ); // Ensure it's an array
          setlistApprovACC(
            res.data.result.filter((item) => item.userApprove !== null) || []
          ); // Ensure it's an array
        } else {
          setlistApprov([]);
          message.warning(res.data.message || "No data found");
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Ambil!");
        setlistApprov([]);
      });
  };

  const UpdateAntal = (dataMutasi) => {
    axios
      .post(
        `${apiku}/MstKamar/PostBedKamar`,
        {
          ruangId: ruangp,
          kelasRawatId: kelas,
          listBed: dataMutasi,
        },
        {
          headers: options.headers,
        }
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            content: "Sukses diupdate!",
          });
        } else {
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.response);
        message.error("Gagal Simpan!");
      });
  };
  const tambahData = () => {
    // Cek apakah No Bed sudah ada di TT Terpakai atau TT Order
    const bedExistsInTTTerpakai = orderKamarAda.includes(orderBedId);
    const bedExistsInTTOrder = listorderbed.some(
      (item) => item.noBed === orderBedId
    );

    if (
      bedExistsInTTTerpakai ||
      bedExistsInTTOrder ||
      !orderBedId ||
      orderBedId.trim() === ""
    ) {
      Modal.success({
        content:
          "No Bed Sudah Terpakai Atau Dalam Permintaan Atau Tidak Boleh Kosong",
      });
    } else {
      const newEntry = {
        bedId: orderKamarId,
        noBed: orderBedId,
        kelasRawatId: orderKelas.split("-").shift(),
        kelasRawatDesk: orderKelasDesk,
        extra: true,
      };

      setlistorderbed((prevDataorderbed) => [...prevDataorderbed, newEntry]);
      console.log("Data ditambahkan: ", newEntry);
    }
  };
  const insertorderbed = () => {
    console.log({
      keterangan: orderKet,
      userRequest: namauser,
      dateRequest: dayjs().format("YYYY-MM-DDTHH:mm"),
      kamar: listorderbed,
    });
    axios
      .post(
        `${apiku}/MstKamar/RequestKamar`,
        {
          keterangan: orderKet,
          userRequest: namauser,
          dateRequest: dayjs().format("YYYY-MM-DDTHH:mm"),
          ruangId: orderRuang,
          kamar: listorderbed,
        },
        {
          headers: options.headers,
        }
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            content: "Berhasil Order Bed!",
          });
          // lookupRegByRuang(orderRuang, orderKelas, "-");
          ambilListOrder(orderRuang, orderKelas);
        } else {
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.response);
        message.error("Gagal Simpan!");
      });
  };

  const countRegistrasiId = (data) => {
    let withRegistrasiId = 0;
    let withoutRegistrasiId = 0;
    let extraTrueCount = 0;
    let extraFalseCount = 0;
    let extraTrueEmptyRegistrasi = 0;
    let extraTrueFilledRegistrasi = 0;
    let extraFalseEmptyRegistrasi = 0;
    let extraFalseFilledRegistrasi = 0;

    data.forEach((item) => {
      if (
        item.registrasiId &&
        item.registrasiId.trim() !== "" &&
        item.registrasiId !== null
      ) {
        withRegistrasiId++;
      } else {
        withoutRegistrasiId++;
      }
      if (item.extra === true) {
        extraTrueCount++;
      } else {
        extraFalseCount++;
      }
      if (item.extra) {
        // Jika extra true
        if (
          item.registrasiId &&
          item.registrasiId.trim() !== "" &&
          item.registrasiId !== null
        ) {
          extraTrueFilledRegistrasi++;
        } else {
          extraTrueEmptyRegistrasi++;
        }
      } else {
        // Jika extra false
        if (
          item.registrasiId &&
          item.registrasiId.trim() !== "" &&
          item.registrasiId !== null
        ) {
          extraFalseFilledRegistrasi++;
        } else {
          extraFalseEmptyRegistrasi++;
        }
      }
    });

    return {
      withRegistrasiId,
      withoutRegistrasiId,
      extraTrueCount,
      extraFalseCount,
      extraTrueEmptyRegistrasi,
      extraTrueFilledRegistrasi,
      extraFalseEmptyRegistrasi,
      extraFalseFilledRegistrasi,
    };
  };
  const {
    withRegistrasiId,
    withoutRegistrasiId,
    extraTrueCount,
    extraFalseCount,
    extraTrueEmptyRegistrasi,
    extraTrueFilledRegistrasi,
    extraFalseEmptyRegistrasi,
    extraFalseFilledRegistrasi,
  } = countRegistrasiId(kamar);

  const tableData = [];
  let currentBedId = null;

  kamar.forEach((item) => {
    const { bedId, noBed, registrasiId, extra } = item;
    if (bedId !== currentBedId) {
      tableData.push({
        bedId,
        noBed,
        registrasiId,
        extra: extra ? "Extra Bed" : "Utama",
        extraColor: extra ? "red" : "green",
      });
      currentBedId = bedId;
    } else {
      tableData.push({
        bedId: "",
        noBed,
        registrasiId,
        extra: extra ? "Extra Bed" : "Utama",
        extraColor: extra ? "red" : "green",
      });
    }
  });

  const columns = [
    {
      title: "Bed ID",
      dataIndex: "bedId",
      key: "bedId",
      width: "75px",
    },
    {
      title: "No. Bed",
      dataIndex: "noBed",
      key: "noBed",
      width: "70px",
    },
    {
      title: "No. Reg",
      dataIndex: "registrasiId",
      key: "registrasiId",
      width: "100px",
    },
    {
      title: "Jenis",
      dataIndex: "extra",
      key: "extra",
      width: "75px",
      render: (text, record) => {
        return {
          children: text ? "Extra Bed" : "Utama",
          props: {
            style: { color: record.extra ? "Red" : "Green" },
          },
        };
      },
    },
    {
      title: "Nama Pasien",
      dataIndex: "namaPasien",
      key: "registrasiId",
    },
    {
      title: "Nama DPJP",
      dataIndex: "namaDPJP",
      key: "registrasiId",
    },
    {
      title: "Keterangan",
      dataIndex: "keterangan",
      key: "registrasiId",
    },
  ];

  const moveRegistrasiId = () => {
    if (selectedbedId.trim() === "" || selectedNoBed.trim() === "") {
      message.warning("Harap pilih bedId dan noBed yang kosong.");
      return;
    }

    const newData = [...kamar];

    // Temukan entri yang memiliki registrasiId yang akan dipindahkan
    const selectedRegistrasiId = newData.find(
      (bed) => bed.registrasiId === registrasiIdToMove
    );

    // Temukan entri yang memiliki bedId dan noBed yang dipilih
    const selectedBed = newData.find(
      (bed) => bed.bedId === selectedbedId && bed.noBed === selectedNoBed
    );

    if (selectedRegistrasiId && selectedBed) {
      // Simpan data dari entri yang akan dipindahkan
      const tempRegistrasiId = selectedBed.registrasiId;
      const tempPasienId = selectedBed.pasienId;
      const tempNamaPasien = selectedBed.namaPasien;
      const tempNamaDPJP = selectedBed.namaDPJP;
      const tempKeterangan = selectedBed.keterangan;

      // Tukar data antara entri yang akan dipindahkan dan entri yang dipilih
      selectedBed.registrasiId = selectedRegistrasiId.registrasiId;
      selectedBed.pasienId = selectedRegistrasiId.pasienId;
      selectedBed.namaPasien = selectedRegistrasiId.namaPasien;
      selectedBed.namaDPJP = selectedRegistrasiId.namaDPJP;
      selectedBed.keterangan = selectedKet;

      selectedRegistrasiId.registrasiId = tempRegistrasiId;
      selectedRegistrasiId.pasienId = tempPasienId;
      selectedRegistrasiId.namaPasien = tempNamaPasien;
      selectedRegistrasiId.namaDPJP = tempNamaDPJP;
      selectedRegistrasiId.keterangan = tempKeterangan;

      // Reset nilai registrasiId yang dipilih setelah dipindahkan
      setRegistrasiIdToMove("");

      // Reset nilai selectedbedId dan selectedNoBed setelah dipindahkan
      setSelectedbedId("");
      setSelectedNoBed("");

      // Perbarui state 'data' dengan data yang baru
      setKamar(newData);

      console.log(newData);
      // Tampilkan data yang sudah diubah
    } else {
      console.log(
        "RegistrasiId yang dipilih tidak ditemukan atau bedId dan noBed yang dipilih sudah terisi."
      );
    }
  };

  const items = [
    {
      label: "Jumlah Bed Terisi",
      children: withRegistrasiId,
    },
    {
      label: "Jumlah Bed Kosong",
      children: withoutRegistrasiId,
    },
    {
      label: "Jumlah Bed Utama",
      children: extraFalseCount,
    },
    {
      label: "Jumlah Bed Extra",
      children: extraTrueCount,
    },
    {
      label: "Jumlah Bed Utama Terisi",
      children: extraFalseFilledRegistrasi,
    },
    {
      label: "Jumlah Bed Extra Terisi:",
      children: extraTrueFilledRegistrasi,
    },
    {
      label: "Jumlah Bed Utama Kosong",
      children: extraFalseEmptyRegistrasi,
    },
    {
      label: "Jumlah Bed Extra Kosong",
      children: extraTrueEmptyRegistrasi,
    },
  ];

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Card: { fontWeightStrong: "bolder", headerBg: "beige" },
            Form: { itemMarginBottom: 0 },
          },
        }}
      >
        <Card
          title="List Antal"
          size="small"
          style={{
            borderWidth: "2px",
            borderColor: "darkgray",
            borderRadius: "4px",
          }}
          extra={
            <Space>
              <Button
                icon={<PlusOutlined />}
                size="small"
                type="primary"
                disabled={
                  namauser === "DIDIK U" ? false : menuOrderTT ? false : true
                }
                onClick={() => {
                  setmodalBed(true);
                  getlistApprove();
                }}
              >
                Order Bed
              </Button>
            </Space>
          }
        >
          <Row gutter={[8, 8]}>
            <Col span={8}>
              <Form {...formItemLayout} labelWrap labelAlign="left">
                <Form.Item label="Ruang">
                  <Select
                    value={ruangp}
                    dataSource={ruang}
                    showSearch
                    style={{ width: "200px" }}
                    placeholder="Pilih Ruang"
                    optionFilterProp="children"
                    onChange={(e) => {
                      // lookupRegByRuang(e);
                      setKamar([]);
                      setRuang(e);
                      ambilKelas(e);
                      setKelas(null);
                    }}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {ruang.map((d) => (
                      <Option key={d.ruangId}>
                        {d.ruangId + " - " + d.deskripsi}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="Kelas">
                  <Select
                    value={kelas}
                    dataSource={kelaslist}
                    showSearch
                    style={{ width: "200px" }}
                    placeholder="Pilih Kelas"
                    optionFilterProp="children"
                    onSelect={(e) => {
                      setKelas(e);
                      setKamar([]);
                      lookupRegByRuang(ruangp, e, extra);
                    }}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {kelaslist.map((d) => (
                      <Option key={d.kelasRawatId}>
                        {d.kelasRawatId + " - " + d.kelasRawatDesk}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="Extra">
                  <Radio.Group
                    defaultValue="-"
                    buttonStyle="solid"
                    onChange={(e) => {
                      setKamar([]);
                      setExtra(e.target.value);
                      lookupRegByRuang(ruangp, kelas, e.target.value);
                    }}
                  >
                    <Radio.Button value="-">Semua</Radio.Button>
                    <Radio.Button value="0">Utama</Radio.Button>
                    <Radio.Button value="1">Extra</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Form>
              <Button
                type="primary"
                onClick={() => lookupRegByRuang(ruangp, kelas, extra)}
                block
                size="large"
              >
                Tampil
              </Button>
            </Col>
            <Col span={16}>
              <Descriptions bordered column={2} size="small" items={items} />
              <Button
                type="primary"
                style={{ backgroundColor: "#73d13d", borderColor: "#73d13d" }}
                onClick={() => UpdateAntal(kamar)}
                block
                size="large"
              >
                Update Kamar
              </Button>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Card>
                <Table
                  size="small"
                  bordered
                  dataSource={kamar}
                  columns={columns}
                  rowClassName="editable-row"
                  pagination={false}
                  scroll={{
                    y: 500,
                  }}
                  rowKey={(record) => record.bedId + record.noBed}
                  onRow={(record, rowIndex) => {
                    return {
                      onContextMenu: (event) => {
                        event.preventDefault();
                        if (!visible) {
                          document.addEventListener(
                            `click`,
                            function onClickOutside() {
                              setVisible(false);
                              document.removeEventListener(
                                `click`,
                                onClickOutside
                              );
                            }
                          );
                        }
                        setVisible(true);
                        setX(event.clientX);
                        setY(event.clientY);
                      },
                      onClick: (event) => {
                        console.log(record);
                        if (
                          record.registrasiId === "" ||
                          record.registrasiId === null
                        ) {
                          message.warning(
                            "Harap pilih registrasi yang terisi."
                          );
                        } else {
                          setModal(true);
                          setRegistrasiIdToMove(record.registrasiId);
                        }
                      },
                    };
                  }}
                />
              </Card>
            </Col>
          </Row>
        </Card>
        <Popup />
        <Modal
          open={modal}
          title="Pindahkan ke"
          onCancel={() => setModal(false)}
          onOk={() => {
            moveRegistrasiId();
            setModal(false);
            setBed(null);
          }}
        >
          Registrasi Id :{" "}
          <Input
            value={registrasiIdToMove}
            onChange={(e) => setRegistrasiIdToMove(e.target.value)}
            placeholder="Masukkan registrasiId yang akan dipindahkan"
          />
          <br />
          No. Bed :{" "}
          <Select
            dataSource={kamar}
            showSearch
            style={{ width: "100%" }}
            placeholder="Pilih Bed"
            optionFilterProp="children"
            // onFocus={() => ambilKelasRawat()}
            value={bed}
            onSelect={(e) => {
              setSelectedbedId(e.split("-").shift());
              setSelectedNoBed(e.split("-").pop());
              setBed(e);
            }}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {kamar.map((d) => (
              <Option key={d.bedId + "-" + d.noBed}>
                {
                  <div>
                    <Row>
                      <Col span={12} style={{ textAlign: "left" }}>
                        {d.bedId + " - " + d.noBed}
                      </Col>
                      <Col span={12} style={{ textAlign: "right" }}>
                        <Row>
                          <Col span={12}>
                            <Tag color={d.namaPasien === null ? "cyan" : ""}>
                              {d.namaPasien === null
                                ? "[KOSONG]"
                                : d.namaPasien}
                            </Tag>
                          </Col>
                          <Col span={12}>
                            <Tag color={d.extra ? "volcano" : "cyan"}>
                              {d.extra ? "Extra" : "Utama"}
                            </Tag>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                }
              </Option>
            ))}
          </Select>
          <br />
          Keterangan :{" "}
          <Input
            value={selectedKet}
            onChange={(e) => setselectedKet(e.target.value)}
            placeholder="..."
          />
        </Modal>

        <Modal
          width="50%"
          footer={null}
          open={modalBed}
          onCancel={() => {
            setmodalBed(false);
          }}
          style={{ top: 150 }}
          // centered={true}
          closable={true}
        >
          <Card>
            {namauser === "DIDIK U" ? (
              <Row gutter={[20, 20]}>
                <Col span={24}>
                  <Divider orientation="left">
                    List Permintaan Penambahan TT Ruang Rawat Inap
                  </Divider>
                  <Table
                    bordered
                    dataSource={listApprov}
                    size="small"
                    rowKey="ruangId"
                    pagination={{
                      position: ["topRight"],
                      pageSize: 5,
                    }}
                  >
                    <Column
                      title="Ruang"
                      key="namaRuang"
                      render={(text) => <span>{text.namaRuang}</span>}
                    />
                    <Column
                      title="Kelas"
                      key="kelasRawat"
                      render={(text) => <span>{text.kelasRawat}</span>}
                    />
                    <Column
                      title="User"
                      key="kelasRawat"
                      render={(text) => <span>{text.userRequest}</span>}
                    />
                    <Column
                      title="Keterangan"
                      key="kelasRawat"
                      render={(text) => <span>{text.keterangan}</span>}
                    />
                    <Column
                      title="Jumlah"
                      key="jmlRequest"
                      render={(text) => <span>{text.jmlRequest}</span>}
                    />
                    <Column
                      title="Jumlah ACC"
                      key="jmlApprove"
                      render={(item) => (
                        <Space.Compact>
                          <InputNumber
                            min={1}
                            value={item.jmlApprove || item.jmlRequest} // Use value instead of defaultValue
                            max={item.jmlRequest}
                            onChange={(value) => {
                              const updatedList = listApprov.map(
                                (currentItem) => {
                                  if (currentItem.ruangId === item.ruangId) {
                                    return {
                                      ...currentItem,
                                      jmlApprove: value,
                                    };
                                  }
                                  return currentItem;
                                }
                              );
                              setlistApprov(updatedList);
                            }}
                          />
                        </Space.Compact>
                      )}
                    />
                    <Column
                      title="NO SK ex.(809/20245)"
                      key="ketSK"
                      render={(row) => (
                        <Input
                          style={{ width: "100%" }}
                          value={row.ketSK || ""}
                          onChange={(e) => {
                            const updatedList = listApprov.map((item) => {
                              if (item.ruangId === row.ruangId) {
                                return { ...item, ketSK: e.target.value };
                              }
                              return item;
                            });
                            setlistApprov(updatedList);
                          }}
                        />
                      )}
                    />
                    <Column
                      title="DiSetujui"
                      key="approve"
                      render={(item) => (
                        <Button
                          size="small"
                          style={{ backgroundColor: "green", color: "white" }}
                          onClick={() => {
                            axios
                              .post(
                                `${apiku}/MstKamar/ApprovalKamar`,
                                {
                                  ruangId: item.ruangId,
                                  kelasRawatId: item.kelasRawatId,
                                  jmlApprove:
                                    item.jmlApprove || item.jmlRequest,
                                  userApprove: namauser,
                                  appName: "SMARTMEDIKA",
                                  skttNo: item.ketSK || "", // Nilai default jika undefined
                                  jmlRequest: item.jmlRequest,
                                  userRequest: item.userRequest,
                                },
                                {
                                  headers: options.headers,
                                }
                              )
                              .then((res) => {
                                if (res.data.statusCode === 200) {
                                  Modal.success({
                                    content: "Berhasil Approv Permintaan!",
                                  });
                                  // lookupRegByRuang(orderRuang, orderKelas, "-");
                                  getlistApprove("");
                                } else {
                                  message.warning(res.data.message);
                                }
                              })
                              .catch((err) => {
                                console.log(err.response);
                                message.error("Gagal Simpan!");
                              });
                            console.log({
                              ruangId: item.ruangId,
                              kelasRawatId: item.kelasRawatId,
                              jmlApprove: item.jmlApprove || item.jmlRequest,
                              userApprove: namauser,
                              appName: "SMARTMEDIKA",
                              ketSK: item.ketSK || "", // Nilai default jika undefined
                            });
                          }}
                        >
                          Approve
                        </Button>
                      )}
                    />
                  </Table>
                </Col>
                <Col span={24}>
                  <Divider orientation="left">
                    List Permintaan TT Ruang Rawat Inap Disetujui
                  </Divider>
                  <Table
                    bordered
                    dataSource={listApprovACC}
                    size="small"
                    rowKey="ruangId"
                    pagination={{
                      position: ["topRight"],
                      pageSize: 5,
                    }}
                  >
                    <Column
                      title="Ruang"
                      key="namaRuang"
                      render={(text) => <span>{text.namaRuang}</span>}
                    />
                    <Column
                      title="Kelas"
                      key="kelasRawat"
                      render={(text) => <span>{text.kelasRawat}</span>}
                    />
                    <Column
                      title="User"
                      key="kelasRawat"
                      render={(text) => <span>{text.userRequest}</span>}
                    />
                    <Column
                      title="Keterangan"
                      key="kelasRawat"
                      render={(text) => <span>{text.keterangan}</span>}
                    />
                    <Column
                      title="Jumlah"
                      key="jmlRequest"
                      render={(text) => <span>{text.jmlRequest}</span>}
                    />
                    <Column
                      title="SKNOTT"
                      key="jmlRequest"
                      render={(text) => <span>{text.SKTTNo}</span>}
                    />
                    <Column
                      title="TGL APPROV"
                      key="jmlRequest"
                      render={(text) => (
                        <span>
                          {dayjs(text.dateApprove).format("DD-MM-YYYY HH:mm")}
                        </span>
                      )}
                    />
                  </Table>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col span={24}>
                  <Form.Item
                    {...formItemLayoutdpjp}
                    label="Ruang"
                    style={{ marginBottom: 5 }}
                  >
                    <Select
                      value={orderRuang}
                      dataSource={ruang}
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="..."
                      optionFilterProp="children"
                      onChange={(e) => {
                        setorderRuang(e);
                        ambilKelas(e);
                        setorderKelas("");
                        setorderKamarId("");
                        setorderBedIdd("");
                      }}
                    >
                      {ruang.map((d) => (
                        <Option key={d.ruangId}>
                          {d.ruangId + " - " + d.deskripsi}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...formItemLayoutdpjp}
                    label="Keterangan"
                    style={{ marginBottom: 5 }}
                  >
                    <Input
                      value={orderKet}
                      onChange={(e) => setorderKet(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayoutdpjp}
                    label="Kelas Rawat"
                    style={{ marginBottom: 5 }}
                  >
                    <Select
                      value={orderKelas}
                      dataSource={kelaslist}
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="..."
                      optionFilterProp="children"
                      onChange={(e) => {
                        const value = e.split("-").shift();
                        setorderKelas(e);
                        setorderKelasDesk(e.split("-").pop());
                        ambilKamarByruang(orderRuang, value);
                        lookupRegByRuang(orderRuang, value, "-");
                        ambilListOrder(orderRuang, value);
                        setorderKamarId("");
                        setorderBedIdd("");
                      }}
                    >
                      {kelaslist.map((d) => (
                        <Option key={d.kelasRawatId + " - " + d.kelasRawatDesk}>
                          {d.kelasRawatId + " - " + d.kelasRawatDesk}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...formItemLayoutdpjp}
                    label="No Kamar"
                    style={{ marginBottom: 5 }}
                  >
                    <Select
                      value={orderKamarId}
                      dataSource={listKamar}
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="..."
                      optionFilterProp="children"
                      onChange={(e) => {
                        setorderKamarId(e);
                        setorderKamarAda(
                          kamar
                            .filter((item) => item.bedId === e)
                            .map((item) => item.noBed)
                        );
                        console.log(
                          kamar
                            .filter((item) => item.bedId === e)
                            .map((item) => item.noBed)
                        );
                        console.log(
                          listOrderKamar
                            .filter(
                              (item) =>
                                item.BedId === e && item.Approve === false
                            )
                            .map((item) => item.NoBed)
                        );
                        console.log(
                          listOrderKamar.filter(
                            (item) => item.BedId === e && item.Approve === false
                          )
                        );
                        setlistOrderBlm(
                          listOrderKamar
                            .filter(
                              (item) =>
                                item.BedId === e && item.Approve === false
                            )
                            .map((item) => item.NoBed)
                        );
                      }}
                    >
                      {listKamar.map((d) => (
                        <Option key={d.BedId}>
                          {d.NamaRuang + " - " + d.BedId.split(".").pop()}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    {...formItemLayoutdpjp}
                    label="TT Terpakai"
                    style={{ marginBottom: 5 }}
                  >
                    {orderKamarAda.length === 0 ? (
                      <></>
                    ) : (
                      orderKamarAda
                        .sort((a, b) => a - b) // Mengurutkan dari nomor terkecil
                        .map((d) => <Tag color="cyan">{d}</Tag>)
                    )}
                    {listOrderBlm.length === 0 ? (
                      <></>
                    ) : (
                      listOrderBlm
                        .sort((a, b) => a - b) // Mengurutkan dari nomor terkecil
                        .map((d) => <Tag color="gold">{d}</Tag>)
                    )}
                  </Form.Item>

                  <Form.Item
                    {...formItemLayoutdpjp}
                    label="No Bed / No TT"
                    style={{ marginBottom: 5 }}
                  >
                    <Space.Compact style={{ width: "100%" }}>
                      <Input
                        // style={{ width: "80%" }}
                        value={orderBedId}
                        onChange={(e) => setorderBedIdd(e.target.value)}
                      />
                      <Button
                        type="primary"
                        // style={{ width: "20%" }}
                        onClick={() => {
                          tambahData();
                        }}
                      >
                        Tambah
                      </Button>
                    </Space.Compact>
                  </Form.Item>
                  <Form.Item
                    {...formItemLayoutdpjp}
                    label="TT Order"
                    style={{ marginBottom: 5 }}
                  >
                    <Table
                      bordered
                      dataSource={listorderbed}
                      size="small"
                      rowKey="ruangId"
                      pagination={false}
                    >
                      <Column
                        title="Kelas"
                        key="namaRuang"
                        render={(text) => <span>{text.kelasRawatDesk}</span>}
                      />
                      <Column
                        title="Kamar"
                        key="kelasRawat"
                        render={(text) => <span>{text.bedId}</span>}
                      />
                      <Column
                        title="NO TT"
                        key="kelasRawat"
                        render={(text) => <span>{text.noBed}</span>}
                      />
                    </Table>
                  </Form.Item>
                </Col>
                <Col span={24} style={{ textAlign: "right" }}>
                  <Space>
                    <Button
                      onClick={() => {
                        setmodalBed(false);
                        setorderKamarId(""); // Kosongkan Kamar ID
                        setlistKamar([]); // Kosongkan list kamar
                        setorderRuang(""); // Kosongkan ruang
                        setorderKelas(""); // Kosongkan kelas
                        setorderKelasDesk(""); // Kosongkan deskripsi kelas
                        setorderBedIdd(""); // Kosongkan No Bed
                        setorderKet(""); // Kosongkan keterangan
                        setlistOrderBlm([]); // Kosongkan list order belum approve
                        setlistorderbed([]); // Kosongkan list order bed
                        setKelasList([]); // Kosongkan list kelas
                        setKamar([]); // Kosongkan list kamar terkait
                        setorderKamarAda([]); // Kosongkan TT Terpakai
                      }}
                    >
                      Batal
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => {
                        insertorderbed();
                      }}
                    >
                      Simpan
                    </Button>
                  </Space>
                </Col>
              </Row>
            )}
          </Card>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default ListAntal;
