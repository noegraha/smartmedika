import React, { useContext } from "react";
import { Table } from "antd";
import { ResepRIContext } from "../../context/ResepRIContext";

const RiwayatOrderRI = () => {
  const { riwayatobat } = useContext(ResepRIContext);

  const columns = [
    { title: "No. Reg", dataIndex: "registrasiId", key: "reg" },
    { title: "No. Resep", dataIndex: "noResep", key: "resep" },
    { title: "Tgl. Resep", dataIndex: "tglResep", key: "tgl" },
  ];

  return (
    <Table
      scroll={{ y: 700 }}
      size="small"
      pagination={false}
      className="components-table-demo-nested"
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <div>
            <table
              style={{
                borderCollapse: "collapse",
                borderColor: "#aaa",
                borderSpacing: 0,
              }}
              className="tg"
            >
              <thead>
                <tr>
                  <th
                    style={{
                      backgroundColor: "#f38630",
                      borderColor: "#aaa",
                      borderStyle: "solid",
                      borderWidth: 1,
                      color: "#fff",
                      fontWeight: "normal",
                      overflow: "hidden",
                      padding: "5px 5px",
                      textAlign: "left",
                      verticalAlign: "top",
                      wordBreak: "normal",
                    }}
                  >
                    Nama Barang / Obat
                  </th>
                  <th
                    style={{
                      backgroundColor: "#f38630",
                      borderColor: "#aaa",
                      borderStyle: "solid",
                      borderWidth: 1,
                      color: "#fff",
                      fontWeight: "normal",
                      overflow: "hidden",
                      padding: "5px 5px",
                      textAlign: "left",
                      verticalAlign: "top",
                      wordBreak: "normal",
                    }}
                  >
                    Dosis
                  </th>
                  <th
                    style={{
                      backgroundColor: "#f38630",
                      borderColor: "#aaa",
                      borderStyle: "solid",
                      borderWidth: 1,
                      color: "#fff",
                      fontWeight: "normal",
                      overflow: "hidden",
                      padding: "5px 5px",
                      textAlign: "left",
                      verticalAlign: "top",
                      wordBreak: "normal",
                    }}
                  >
                    Jumlah
                  </th>
                  <th
                    style={{
                      backgroundColor: "#f38630",
                      borderColor: "#aaa",
                      borderStyle: "solid",
                      borderWidth: 1,
                      color: "#fff",
                      fontWeight: "normal",
                      overflow: "hidden",
                      padding: "5px 5px",
                      textAlign: "left",
                      verticalAlign: "top",
                      wordBreak: "normal",
                    }}
                  >
                    Satuan
                  </th>
                  <th
                    style={{
                      backgroundColor: "#f38630",
                      borderColor: "#aaa",
                      borderStyle: "solid",
                      borderWidth: 1,
                      color: "#fff",
                      fontWeight: "normal",
                      overflow: "hidden",
                      padding: "5px 5px",
                      textAlign: "left",
                      verticalAlign: "top",
                      wordBreak: "normal",
                    }}
                  >
                    Aturan Pakai
                  </th>
                </tr>
              </thead>
              <tbody>
                {record.resep.map((d) => (
                  <tr>
                    <td
                      style={{
                        backgroundColor: "#fff",
                        borderColor: "#aaa",
                        borderStyle: "solid",
                        borderWidth: 1,
                        color: "#333",
                        overflow: "hidden",
                        padding: "5px 5px",
                        textAlign: "left",
                        verticalAlign: "top",
                        wordBreak: "normal",
                      }}
                    >
                      {d.namaBarang}
                    </td>
                    <td
                      style={{
                        backgroundColor: "#fff",
                        borderColor: "#aaa",
                        borderStyle: "solid",
                        borderWidth: 1,
                        color: "#333",
                        overflow: "hidden",
                        padding: "5px 5px",
                        textAlign: "left",
                        verticalAlign: "top",
                        wordBreak: "normal",
                      }}
                    >
                      -
                    </td>
                    <td
                      style={{
                        backgroundColor: "#fff",
                        borderColor: "#aaa",
                        borderStyle: "solid",
                        borderWidth: 1,
                        color: "#333",
                        overflow: "hidden",
                        padding: "5px 5px",
                        textAlign: "left",
                        verticalAlign: "top",
                        wordBreak: "normal",
                      }}
                    >
                      {d.QtyBarang}
                    </td>
                    <td
                      style={{
                        backgroundColor: "#fff",
                        borderColor: "#aaa",
                        borderStyle: "solid",
                        borderWidth: 1,
                        color: "#333",
                        overflow: "hidden",
                        padding: "5px 5px",
                        textAlign: "left",
                        verticalAlign: "top",
                        wordBreak: "normal",
                      }}
                    >
                      {d.namaSM}
                    </td>
                    <td
                      style={{
                        backgroundColor: "#fff",
                        borderColor: "#aaa",
                        borderStyle: "solid",
                        borderWidth: 1,
                        color: "#333",
                        overflow: "hidden",
                        padding: "5px 5px",
                        textAlign: "left",
                        verticalAlign: "top",
                        wordBreak: "normal",
                      }}
                    >
                      {d.kodeAturan}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
      }}
      dataSource={riwayatobat}
    />
  );
};

export default RiwayatOrderRI;
