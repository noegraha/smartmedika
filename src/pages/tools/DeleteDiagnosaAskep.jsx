import React, { useContext, useState } from "react";
import { Popconfirm, Input, Card, Button, Table, Empty } from "antd";
import dayjs from "dayjs";
import Column from "antd/lib/table/Column";
import { AskepContext } from "../rawatinap/context/AskepContext";

const DeleteDiagnosaAskep = () => {
  const [noreg, setnoreg] = useState("");
  const { ListAskepById, deleteAskpeByIdByDx, warnaRow, getListAskepById } =
    useContext(AskepContext);

  const confirm = (id, dx) => {
    deleteAskpeByIdByDx(id, dx.split(" -").shift());
    // console.log(id, dx.split(' -').shift());
  };

  const cancel = (e) => {
    console.log(e);
  };

  return (
    <div>
      <Card
        title="Diagnosa Pasien"
        headStyle={{ fontWeight: "bolder", backgroundColor: "whitesmoke" }}
        size="small"
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Input.Group compact>
          <Input
            style={{ width: "90%" }}
            onChange={(e) => setnoreg(e.target.value)}
            onPressEnter={() => getListAskepById(noreg)}
            placeholder="Masukkan nomor registrasi pasien..."
          />
          <Button
            style={{ width: "10%" }}
            type="primary"
            onClick={() => getListAskepById(noreg)}
          >
            Cari
          </Button>
        </Input.Group>

        <Table
          bordered
          locale={{ emptyText: <Empty description="Data Asuhan Kosong" /> }}
          pagination={{ pageSize: 5 }}
          dataSource={ListAskepById}
          size="small"
          // rowKey="reg"
          rowClassName={(record, rowIndex) =>
            rowIndex === warnaRow ? "warnacolompilih" : null
          }
        >
          <Column
            title="Tanggal"
            width="20%"
            // defaultSortOrder="descend"
            // sorter={(a, b) => a.tanggal.localeCompare(b.tanggal)}
            render={(ListAskepById) => (
              // <Button style={{ width: '2%' }} type="link" size="small"
              // onClick={() => onAmbilAskepByIdByDx(ListAskepById.registrasiId, ListAskepById.diagnosaId, ListAskepById.luaranId)}
              <span>
                {dayjs(ListAskepById.tanggal).format("DD-MM-YYYY HH:mm")}
                <br></br>
                <br></br>
                {ListAskepById.ruangId}
              </span>
              // </Button>
            )}
          />
          <Column
            title="Diagnosa"
            width="30%"
            render={(ListAskepById) => (
              <span>{ListAskepById.diagnosaId.split("- ").pop()}</span>
            )}
          />
          {/* <Column title="Luaran" width="30%"
                          render={(ListAskepById) => (
                              <span>
                                  {ListAskepById.nTandaGejala.map(c => (
                                      c.tandaGejalaId
                                  ))}
                              </span>
                          )} /> */}
          <Column
            title="Lama Intervensi"
            width="10%"
            render={(ListAskepById) => <span>{ListAskepById.targetWaktu}</span>}
          />
          <Column
            title="User"
            width="20%"
            render={(ListAskepById) => <span>{ListAskepById.userId}</span>}
          />
          <Column
            title="Aksi"
            width="10%"
            render={(ListAskepById) => (
              <Popconfirm
                title="Anda Yakin Akan Dihapus?"
                onConfirm={() =>
                  confirm(ListAskepById.registrasiId, ListAskepById.diagnosaId)
                }
                onCancel={cancel}
                okText="Ya"
                cancelText="Tidak"
              >
                <Button type="primary" danger>
                  Hapus
                </Button>
              </Popconfirm>
            )}
          />
        </Table>
      </Card>
    </div>
  );
};

export default DeleteDiagnosaAskep;
