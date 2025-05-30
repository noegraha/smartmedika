import React, { useContext, Fragment } from "react";
import {
  Table,
  Button,
  Select,
  Form,
  Popconfirm,
  message,
  Row,
  Col,
  Modal,
} from "antd";
import { ProsedurContext } from "../context/ProsedurContext";
import { PelayananContext } from "../context/Pelayanancontext";
import { PasienContext } from "../context/PasienContext";
import { LoginContext } from "../context";
const { Column } = Table;
const { Option } = Select;
const FormProsedur = () => {
  const {
    prosedur,
    detprosedur,
    deleteProsedur,
    insertProsedur,
    pros,
    setProsedurKode,
    pemeriksa,
    setPemeriksa,
    loadingProsedur,
    getMstProsedur,
  } = useContext(ProsedurContext);
  const {
    // dokter,
    dokterall,
  } = useContext(PelayananContext);
  const { curpas, noreg } = useContext(PasienContext);
  const { namauser } = useContext(LoginContext);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  // const dataprosedur = [
  //   {
  //     registrasiId: curpas.registrasiId,
  //     prosedurId: pros,
  //     ruangId: curpas.ruangId,
  //     // pemeriksaId: pemeriksa,
  //     pegawaiId: pemeriksa === null ? curpas.dokterId : pemeriksa,
  //     userId: namauser,
  //     clientHost: host,
  //     clientIp: ip,
  //   },
  // ];

  const simpanProsedur = () => {
    if (noreg === null) {
      Modal.warning({
        content:
          "Maaf pasien belum di klik. Silahkan klik Pasien terlebih dahulu",
      });
    } else {
      onInsert();
    }
  };
  const onDelete = (noreg, d) => {
    deleteProsedur(noreg, d);
  };
  const cancel = () => {
    message.error("Batal dihapus");
  };
  const [form] = Form.useForm();

  const onInsert = () => {
    const prosedurBaru = [];

    for (var i = 0; i < pros.length; i++) {
      const elementsIndex = detprosedur.findIndex(
        (element) => element.prosedurId === pros[i]
      );
      if (elementsIndex === -1) {
        prosedurBaru.push({
          registrasiId: curpas.registrasiId,
          prosedurId: pros[i],
          ruangId: curpas.ruangId,
          // pemeriksaId: pemeriksa,
          pegawaiId:
            pemeriksa === null
              ? curpas.ruangKonsul !== null
                ? null
                : curpas.dokterId
              : pemeriksa,
          userId: namauser,
          clientHost: host,
          clientIp: ip,
        });
      } else {
        console.log("ada", detprosedur);
        prosedurBaru.push({
          registrasiId: detprosedur[i].registrasiId,
          prosedurId: detprosedur[i].prosedurId,
          ruangId: detprosedur[i].ruangId,
          pegawaiId: pemeriksa,
          userId: namauser,
          clientHost: host,
          clientIp: ip,
        });
      }
    }
    insertProsedur(prosedurBaru);
    // console.log(prosedurBaru);
  };
  return (
    <Fragment>
      <Form
        form={form}
        name="prosedur"
        initialValues={{ remember: true }}
        onFinish={simpanProsedur}
      >
        <Row gutter={[8, 2]} align="middle">
          <Col span={4} xs={24} sm={24} md={14} lg={14} xl={14}>
            Prosedur :{" "}
            <Form.Item rules={[{ required: true }]}>
              <Select
                onFocus={() => getMstProsedur()}
                dataSource={prosedur}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Prosedur"
                optionFilterProp="children"
                onChange={(e) => setProsedurKode(e)}
                value={pros}
                mode="multiple"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {prosedur.map((d) => (
                  <Option key={d.prosedurId}>
                    {d.prosedurId + " - " + d.deskripsi}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={4} xs={24} sm={24} md={8} lg={8} xl={8}>
            Pelaksana :{" "}
            <Form.Item rules={[{ required: true }]}>
              <Select
                dataSource={dokterall}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Pelaksana"
                optionFilterProp="children"
                onChange={(e) => setPemeriksa(e)}
                value={
                  pemeriksa === null
                    ? curpas.ruangKonsul !== null
                      ? null
                      : curpas.dokterId
                    : pemeriksa
                }
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {dokterall.map((p) => (
                  <Option key={p.dokterId}>
                    {p.dokterId + " - " + p.namaDokter}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col
            span={24}
            xs={24}
            sm={2}
            md={2}
            lg={2}
            xl={2}
            style={{ display: "flex", alignItems: "end", marginTop: "auto" }}
          >
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loadingProsedur}
              >
                Ambil
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Table
        bordered
        pagination={false}
        dataSource={detprosedur}
        size="small"
        rowKey="reg"
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setProsedurKode([record.prosedurId]);
              setPemeriksa(record.pelaksanaId);
              console.log(record.pelaksanaId);
            },
          };
        }}
        // scroll={{ y: 390, x: 1000 }}
      >
        <Column
          title="No."
          key="reg"
          className="tabeltabel"
          render={(text, record, index) => <span>{index + 1}</span>}
        />
        <Column
          title="Kode"
          key="reg"
          className="bgcolortunggu"
          render={(detprosedur) => <span>{detprosedur.prosedurId}</span>}
        />
        <Column
          title="Deskripsi"
          key="reg"
          className="tabeltabel"
          render={(detprosedur) => <span>{detprosedur.prosedurDesk}</span>}
        />
        <Column
          title="Pelaksana"
          className="tabeltabel"
          key="nama"
          render={(detprosedur) => <span>{detprosedur.pelaksanaDesk}</span>}
        />
        <Column
          title="Action"
          key="reg"
          render={(detprosedur) => (
            <span>
              <Popconfirm
                title="Anda Yakin Dihapus ?"
                onConfirm={(e) =>
                  onDelete(detprosedur.registrasiId, detprosedur.prosedurId)
                }
                onCancel={(e) => cancel(e)}
                okText="Ya"
                cancelText="Tidak"
                // disabled={namauser === detprosedur.userId ? false : true}
              >
                <Button
                  danger
                  size="small"
                  type="primary"
                  // disabled={namauser === detprosedur.userId ? false : true}
                >
                  Hapus
                </Button>
              </Popconfirm>
            </span>
          )}
        />
      </Table>
    </Fragment>
  );
};

export default FormProsedur;
