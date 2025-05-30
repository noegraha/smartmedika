import {
  Button,
  Card,
  Checkbox,
  Col,
  ConfigProvider,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Table,
  Typography,
} from "antd";
import React, { useContext, useState } from "react";
import { PelayananContext } from "../../rawatjalan/context/Pelayanancontext";
import { PenunjangContext } from "../../rawatjalan/orderpenunjang/OrderPenunjangContext";
const { Option } = Select;
const { Column } = Table;
const { Text } = Typography;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const OrderPenunjang = () => {
  const { pelayanankelas, loadPelayananRuangKelas } =
    useContext(PelayananContext);
  const { tabelorder, setTabelOrder, tindakanAmbil, setTindakanAmbil } =
    useContext(PenunjangContext);

  const onDelete = (e) => {
    setTabelOrder(tabelorder.filter((item) => item.pelayananId !== e));
    setTindakanAmbil(
      tindakanAmbil.filter((item) => item.split("-").shift() !== e)
    );
  };

  const onInsert = () => {
    const gjlbaruFungsiEndokrin = [];

    for (var i = 0; i < tindakanAmbil.length; i++) {
      const elementsIndex = tabelorder.findIndex(
        (element) => element.pelayananId === tindakanAmbil[i].split("-").shift()
      );

      if (elementsIndex === -1) {
        console.log("ora");
        gjlbaruFungsiEndokrin.push({
          deskripsi: tindakanAmbil[i].split("-").pop().split("_").shift(),
          pelayananId: tindakanAmbil[i].split("-").shift(),
          harga: tindakanAmbil[i].split("-").pop().split("_").pop(),
          jumlah: 1,
        });
      } else {
        console.log("ana", tabelorder);
        gjlbaruFungsiEndokrin.push({
          deskripsi: tabelorder[i].deskripsi,
          pelayananId: tabelorder[i].pelayananId,
          harga: tabelorder[i].harga,
          jumlah: tabelorder[i].jumlah,
        });
      }
    }
    setTabelOrder(gjlbaruFungsiEndokrin);
  };
  const handleCari = (e) => {
    setMenu(e);
    setRuangTujuan(e);
    loadPelayananRuangKelas(e, "3");
    setTabelOrder([]);
    setTindakanAmbil([]);
  };
  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
    if (checkedValues.includes("1")) {
      setTabelOrder([
        {
          deskripsi: "DARAH LENGKAP (HEMATOLOGI 5 DIFF)",
          pelayananId: "LPK076",
          harga: "50000",
          jumlah: 1,
        },
      ]);
      setTindakanAmbil(["LPK076-DARAH LENGKAP (HEMATOLOGI 5 DIFF)_50000"]);
    } else if (checkedValues.includes("2")) {
      setTabelOrder([
        {
          deskripsi: "GULA DARAH SEWAKTU",
          pelayananId: "LPK017",
          harga: "20000",
          jumlah: 1,
        },
        {
          deskripsi: "DARAH LENGKAP (HEMATOLOGI 5 DIFF)",
          pelayananId: "LPK076",
          harga: "50000",
          jumlah: 1,
        },
        {
          deskripsi: "UREUM",
          pelayananId: "LPK010",
          harga: "20000",
          jumlah: 1,
        },
        {
          deskripsi: "KREATININ",
          pelayananId: "LPK011",
          harga: "20000",
          jumlah: 1,
        },
      ]);
      setTindakanAmbil([
        "LPK017-GULA DARAH SEWAKTU_20000",
        "LPK011-KREATININ_20000",
        "LPK010-UREUM_20000",
        "LPK076-DARAH LENGKAP (HEMATOLOGI 5 DIFF)_50000",
      ]);
    }
  };
  const [total, setTotal] = useState(0);
  const [ruangtujuan, setRuangTujuan] = useState([]);

  const [menu, setMenu] = React.useState(null);
  const options = [
    { label: "Di Bawah 14 Tahun", value: "1" },
    { label: "Di Atas 14 Tahun", value: "2" },
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
          title="Order Penunjang"
          size="small"
          style={{
            borderWidth: "2px",
            borderColor: "darkgray",
            borderRadius: "4px",
          }}
        >
          Jenis Pemeriksaan :{" "}
          <Select
            onChange={(value) => handleCari(value)}
            style={{ width: "25%" }}
          >
            <Option key="9402">Laboratorium PK</Option>
            <Option key="9403">Laboratorium PA</Option>
            <Option key="9401">Radiologi</Option>
          </Select>
          <br />
          {menu === "9402" ? (
            <>
              Umur : <Checkbox.Group onChange={onChange} options={options} />
            </>
          ) : null}
          <Row gutter={[8, 2]}>
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
              <Form.Item
                {...formItemLayout}
                label="Pemeriksaan / Tindakan"
                rules={[{ required: true }]}
                style={{ marginBottom: 5 }}
              >
                <Select
                  // onKeyDown={handleKeyDown}
                  dataSource={pelayanankelas}
                  value={tindakanAmbil}
                  showSearch
                  mode="multiple"
                  // allowClear
                  style={{ width: "100%" }}
                  placeholder="Pilih Pemeriksaan/Tindakan..."
                  onChange={(e) => {
                    setTindakanAmbil(e);
                    console.log(e);
                  }}
                >
                  {pelayanankelas.map((d) => (
                    <Option
                      value={d.pelayananId + "-" + d.deskripsi + "_" + d.total}
                    >
                      {d.pelayananId} - {d.deskripsi}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col
              span={4}
              xs={12}
              sm={12}
              md={2}
              lg={2}
              xl={2}
              style={{ textAlign: "right" }}
            >
              <Form.Item style={{ marginBottom: 0 }}>
                <Button type="primary" onClick={onInsert}>
                  Ambil
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Table
            rowKey="pelayananId"
            dataSource={tabelorder}
            bordered
            pagination={false}
            size="small"
            summary={(pageData) => {
              let total = 0;
              pageData.forEach(({ harga, jumlah }) => {
                total += harga * jumlah;
                setTotal(total);
              });
              return (
                <>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>Total</th>
                    <td className="column-money, tabeltabel">
                      <Text type="danger">
                        Rp.{" "}
                        {total.toLocaleString("id-id", {
                          minimumFractionDigits: 2,
                        })}
                      </Text>
                    </td>
                  </tr>
                </>
              );
            }}
          >
            <Column
              title="No."
              className="bgcolortunggu"
              width="40px"
              render={(text, record, index) => <span>{index + 1}</span>}
            />
            <Column
              className="bgcolortunggu"
              dataIndex="pelayananId"
              title="Order"
              width="10%"
            />
            <Column dataIndex="deskripsi" title="Deskripsi" width="30%" />
            <Column
              dataIndex="jumlah"
              title="Jumlah"
              width="10%"
              render={(text, record, index) => (
                <Input
                  size="small"
                  value={text}
                  // onChange={onInputChange("jumlah", index)}
                />
              )}
            />

            <Column
              width="20%"
              title="Biaya"
              key="biaya"
              render={(tabelorder) => (
                <span>
                  Rp.{" "}
                  {parseInt(tabelorder.harga).toLocaleString("id-id", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              )}
            />
            <Column
              width="20%"
              title="Total"
              key="total"
              render={(tabelorder) => (
                <span>
                  Rp.{" "}
                  {(
                    parseInt(tabelorder.harga) * parseInt(tabelorder.jumlah)
                  ).toLocaleString("id-id", { minimumFractionDigits: 2 })}
                </span>
              )}
            />
            <Column
              width="10%"
              title="Action"
              render={(tabelorder) => (
                <span>
                  <Button
                    danger
                    size="small"
                    onClick={(e) => onDelete(tabelorder.pelayananId)}
                  >
                    Hapus
                  </Button>
                </span>
              )}
            />
          </Table>
        </Card>
      </ConfigProvider>
    </div>
  );
};

export default OrderPenunjang;
