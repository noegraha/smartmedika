import { Button, Card, Form, Input, Radio, Select, message } from "antd";
import React, { useContext, useState } from "react";
import { PasienContext } from "../rawatjalan/context/PasienContext";
import axios from "axios";
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};
const BalikRuang = () => {
  const { ruangpoli, ruanginap } = useContext(PasienContext);
  const [registrasi, setRegistrasi] = useState(null);
  const [ruang, setRuang] = useState(null);
  const [param, setParam] = useState(null);
  const [pilih, setPilih] = useState(1);
  const apiku = sessionStorage.getItem("api");
  const tok = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };
  const pindahRuang = (noreg, rg, para) => {
    axios
      .post(
        `${apiku}/EmrPasienAktif/UpdateRuang/${noreg}/${rg}/${para}`,
        {},
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Bersahil!");
        } else {
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Proses!");
      });
  };
  return (
    <div>
      <Card
        size="small"
        title="Pindah Balik Ruang"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Form>
          <Form.Item
            {...formItemLayout}
            style={{ marginBottom: 0 }}
            labelAlign="left"
            label="Registrasi Id"
          >
            <Input
              width={200}
              onChange={(e) => setRegistrasi(e.target.value)}
            />
          </Form.Item>
          <Radio.Group onChange={(e) => setPilih(e.target.value)} value={pilih}>
            <Radio value={1}>Poli</Radio>
            <Radio value={2}>Ruang</Radio>
          </Radio.Group>
          {pilih === 1 ? (
            <Form.Item
              {...formItemLayout}
              style={{ marginBottom: 0 }}
              labelAlign="left"
              label="Pindah ke Poli"
            >
              <Select
                dataSource={ruangpoli.sort((a, b) =>
                  b.deskripsi
                    .split("- ")
                    .pop()
                    .localeCompare(a.deskripsi.split("- ").pop())
                )}
                showSearch
                placeholder="Pilih Poli..."
                optionFilterProp="children"
                onChange={(e) => setRuang(e)}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {ruangpoli.map((d) => (
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
          ) : (
            <Form.Item
              {...formItemLayout}
              style={{ marginBottom: 0 }}
              labelAlign="left"
              label="Pindah ke Ruang"
            >
              <Select
                dataSource={ruanginap}
                showSearch
                placeholder="Pilih Ruang..."
                optionFilterProp="children"
                onChange={(e) => setRuang(e)}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {ruanginap.map((d) => (
                  <Option key={d.ruangId}>{d.deskripsi}</Option>
                ))}
              </Select>
            </Form.Item>
          )}
          <Form.Item
            {...formItemLayout}
            style={{ marginBottom: 0 }}
            labelAlign="left"
            label="Asal"
          >
            <Select onChange={(e) => setParam(e)}>
              <Option key={"Konsul"}>KONSUL</Option>
              <Option key={"RawatInap"}>RAWAT INAP</Option>
            </Select>
          </Form.Item>
          <Button
            type="primary"
            onClick={() => {
              pindahRuang(registrasi, ruang, param);
              console.log(registrasi, ruang, param);
            }}
          >
            Pindah
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default BalikRuang;
