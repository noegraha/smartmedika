import {
  DeleteTwoTone,
  EditTwoTone,
  QuestionCircleTwoTone,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Empty,
  Input,
  message,
  Popconfirm,
  Popover,
  Space,
  Table,
  Tooltip,
  Typography,
} from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { BillingContext } from "../rawatjalan/context/BillingContext";
const { Column } = Table;
const { Text } = Typography;

const DeleteBilling = () => {
  const { deleteBillingById } = useContext(BillingContext);
  const [billing, setBilling] = useState([]);
  const [noreg, setNoreg] = useState(null);
  const [user, setUser] = useState(null);
  const [ip, setIP] = useState(null);
  const [load, setLoad] = useState(false);

  const apiku = sessionStorage.getItem("api");
  const tok = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };

  const detailBilling = (id) => {
    setLoad(true);
    axios
      .get(`${apiku}/BillPemeriksaan/Read/${id}/1/10`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setBilling(res.data.result);
        } else {
          message.warning(res.data.message);
          setBilling([]);
        }
      })
      .catch((err) => {
        setBilling([]);
      })
      .finally(() => setLoad(false));
  };
  const onDelete = (noreg, pelayanan, dokter, ruang, id) => {
    deleteBillingById(noreg, id, user, ip);
  };
  const cancel = () => {
    message.warning("Batal Dihapus");
  };
  return (
    <div>
      <Card
        loading={load}
        size="small"
        title="Hapus Billing"
        headStyle={{ fontWeight: "bolder", backgroundColor: "lavender" }}
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Input
          placeholder="No Registrasi"
          onChange={(e) => setNoreg(e.target.value)}
          onPressEnter={(e) => detailBilling(e.target.value)}
          value={noreg}
        />
        <Input
          placeholder="User"
          onChange={(e) => setUser(e.target.value)}
          value={user}
        />
        <Input
          placeholder="IP"
          onChange={(e) => setIP(e.target.value)}
          value={ip}
        />
        <Table
          // style={{ verticalAlign: "top" }}
          locale={{ emptyText: <Empty description={false} /> }}
          bordered
          pagination={false}
          dataSource={billing}
          size="small"
          rowKey="reg"
          scroll={{ x: 1000 }}
          summary={(pageData) => {
            let total = 0;
            pageData.forEach(({ biayaPelayanan }) => {
              total += biayaPelayanan;
            });
            return (
              <>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>Total</th>
                  <td className="column-money, tabeltabel" align="right">
                    <Text type="danger">
                      <div className="salary-cell">
                        <span className="currency">Rp.</span>
                        <span className="amount">
                          {Intl.NumberFormat("id", {
                            style: "currency",
                            currency: "IDR",
                            maximumFractionDigits: 2,
                          })
                            .format(total)
                            .replace("Rp", "")}
                        </span>
                      </div>
                    </Text>
                  </td>
                </tr>
              </>
            );
          }}
        >
          <Column
            style={{ verticalAlign: "top" }}
            title="No."
            key="reg"
            className="tabeltabel"
            // width="10px"
            render={(text, record, index) => <span>{index + 1}</span>}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Kode"
            className="bgcolortunggu, tabeltabel2"
            // width="40px"
            render={(billing) => <span>{billing.pelayananId}</span>}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Unit"
            className="tabeltabel"
            // width="180px"
            render={(billing) => <span>{billing.ruangDesk}</span>}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Tanggal"
            className="tabeltabel"
            // width="75px"
            render={(billing) => <span>{billing.tanggal}</span>}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Pelayanan"
            className="tabeltabel"
            // width="400px"
            render={(billing) => <span>{billing.pelayananDesk}</span>}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Jumlah"
            // width="40px"
            className="column-money, tabeltabel"
            render={(billing) => <span>{billing.jumlah}</span>}
            align="right"
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Biaya Pelayanan"
            className="auto-width"
            render={(billing) => (
              <div className="salary-cell">
                <span className="currency">Rp.</span>
                <span className="amount">
                  {Intl.NumberFormat("id", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 2,
                  })
                    .format(billing.harga)
                    .replace("Rp", "")}
                </span>
              </div>
            )}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Total Biaya"
            className="auto-width"
            render={(billing) => (
              <div className="salary-cell">
                <span className="currency">Rp.</span>
                <span className="amount">
                  {Intl.NumberFormat("id", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 2,
                  })
                    .format(billing.biayaPelayanan)
                    .replace("Rp", "")}
                </span>
              </div>
            )}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Penjamin"
            className="tabeltabel"
            // width="150px"
            render={(billing) => <span>{billing.pembayaranDesk}</span>}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Pemeriksa"
            className="tabeltabel"
            // width="250px"
            render={(billing) => <span>{billing.pemeriksaDesk}</span>}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="No Bayar"
            className="tabeltabel"
            render={(billing) => <span>{billing.noPembayaran}</span>}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="User"
            className="tabeltabel"
            render={(billing) => <span>{billing.userId}</span>}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Action"
            className="tabeltabel"
            render={(billing) => (
              <Space>
                <Tooltip title="Hapus">
                  <Popconfirm
                    title="Anda Yakin Dihapus ?"
                    onConfirm={(e) =>
                      onDelete(
                        billing.registrasiId,
                        billing.pelayananId,
                        billing.pemeriksaId,
                        billing.ruangId,
                        billing.billPelayananId
                      )
                    }
                    onCancel={(e) => cancel(e)}
                    okText="Ya"
                    cancelText="Tidak"
                  >
                    <Button
                      size="small"
                      type="text"
                      shape="circle"
                      icon={<DeleteTwoTone twoToneColor="#f5222d" />}
                    />
                  </Popconfirm>
                </Tooltip>
                <Tooltip title="Edit">
                  <Button
                    size="small"
                    type="text"
                    shape="circle"
                    // onClick={() => {
                    //   setModalEdit(true);
                    //   onPelayanan(billing.pelayananId);
                    //   setJumlah(billing.jumlah);
                    //   setPemeriksa(billing.pemeriksaId);
                    //   setRuang(billing.ruangDesk);
                    // }}
                    icon={<EditTwoTone twoToneColor="#52c41a" />}
                  />
                </Tooltip>
              </Space>
            )}
          />

          <Column
            style={{ verticalAlign: "top" }}
            title={
              <>
                Sinkron KHS{" "}
                <Popover
                  placement="topLeft"
                  title="Status Sinkron"
                  content={
                    <div>
                      <Checkbox checked={false} /> = Jika Transaksi Belum ada di
                      Data KHS, silahkan klik tombol uncheck.
                      <br />
                      <Checkbox checked={true} /> = Jika Transaksi Sudah ada di
                      Data KHS dan tidak dihapus dari KHS.
                    </div>
                  }
                  // arrow="center"
                >
                  <QuestionCircleTwoTone />
                </Popover>
              </>
            }
            className="tabeltabel"
            render={(billing) => (
              <span>
                {billing.IsSync !== null ? (
                  <Checkbox
                    checked={true}
                    onClick={() => message.info("Sudah sinkron!")}
                  />
                ) : (
                  <Checkbox
                    checked={false}
                    // onClick={() =>
                    //   syncBillingByIdPoli(
                    //     curpas.registrasiId,
                    //     billing.pelayananId,
                    //     billing.ruangId
                    //   )
                    // }
                  />
                )}
              </span>
            )}
          />
        </Table>
      </Card>
    </div>
  );
};

export default DeleteBilling;
