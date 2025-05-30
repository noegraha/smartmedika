import React, { useContext, Fragment } from "react";
import { Table, Typography, Empty, Card } from "antd";
import { BillingContext } from "../context/BillingContext";
const { Text } = Typography;
const { Column } = Table;

const FormBillingView = () => {
  const { billing, loadingBilling } = useContext(BillingContext);
  return (
    <Fragment>
      <Card
        title="Billing"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        size="small"
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
        loading={loadingBilling}
      >
        <Table
          // style={{ verticalAlign: "top" }}
          locale={{ emptyText: <Empty description={false} /> }}
          bordered
          pagination={false}
          dataSource={billing}
          size="small"
          rowKey="reg"
          scroll={{ x: 1000, y: 147 }}
          summary={(pageData) => {
            let total = 0;
            pageData.forEach(({ biayaPelayanan, jumlah }) => {
              total += biayaPelayanan === null ? 0 : biayaPelayanan * jumlah;
            });
            return (
              <>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>Total</th>
                  <td className="column-money, tabeltabel" align="right">
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
            style={{ verticalAlign: "top" }}
            title="No."
            key="reg"
            className="tabeltabel"
            width="30px"
            render={(text, record, index) => <span>{index + 1}</span>}
            fixed="left"
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Kode"
            className="bgcolortunggu, tabeltabel2"
            width="55px"
            render={(billing) => <span>{billing.pelayananId}</span>}
            fixed="left"
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Pelayanan"
            className="tabeltabel"
            width="400px"
            render={(billing) => <span>{billing.pelayananDesk}</span>}
          />

          <Column
            style={{ verticalAlign: "top" }}
            title="Jumlah"
            width="50px"
            className="column-money, tabeltabel"
            render={(billing) => <span>{billing.jumlah}</span>}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Biaya Pelayanan"
            width="100px"
            className="column-money, tabeltabel"
            align="right"
            render={(billing) => (
              <span>
                Rp.{" "}
                {billing.biayaPelayanan.toLocaleString("id-id", {
                  minimumFractionDigits: 2,
                })}
              </span>
            )}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Total Biaya"
            width="100px"
            className="column-money, tabeltabel"
            align="right"
            render={(billing) => (
              <span>
                Rp.{" "}
                {(+billing.biayaPelayanan * +billing.jumlah).toLocaleString(
                  "id-id",
                  { minimumFractionDigits: 2 }
                )}
              </span>
            )}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Nama Penjamin"
            className="tabeltabel"
            width="150px"
            render={(billing) => <span>{billing.pembayaranDesk}</span>}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Pemeriksa"
            className="tabeltabel"
            width="250px"
            render={(billing) => <span>{billing.pemeriksaDesk}</span>}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Unit"
            className="tabeltabel"
            width="280px"
            render={(billing) => <span>{billing.ruangDesk}</span>}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Tanggal"
            className="tabeltabel"
            width="80px"
            render={(billing) => <span>{billing.tanggal}</span>}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="User"
            width="140px"
            className="tabeltabel"
            render={(billing) => <span>{billing.userId}</span>}
          />
        </Table>
      </Card>
    </Fragment>
  );
};

export default FormBillingView;
