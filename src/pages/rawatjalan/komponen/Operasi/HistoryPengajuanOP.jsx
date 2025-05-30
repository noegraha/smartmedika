import { Button, Modal, Table, Tag, Tooltip } from "antd";
import React, { useContext, useState } from "react";
import { BookingOpContext } from "../../context/BookingOpContext";
import { PasienContext } from "../../context/PasienContext";
const { Column } = Table;

const HistoryPengajuanOP = () => {
  const { historybookingop, getHistoryBookingOp } =
    useContext(BookingOpContext);
  const { poli1 } = useContext(PasienContext);
  const [modaloperasi, setModaloperasi] = useState(false);
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setModaloperasi(true);
          getHistoryBookingOp(poli1);
        }}
      >
        Riwayat Booking Operasi
      </Button>
      <Modal
        title="Riwayat Booking operasi"
        visible={modaloperasi}
        onCancel={() => setModaloperasi(false)}
        width="70%"
      >
        <Table dataSource={historybookingop} size="small" bordered>
          <Column
            width="80px"
            title="Tgl. Operasi"
            render={(text, record) => (
              <span>{record.tglOperasi.substring(0, 10)}</span>
            )}
          />
          <Column
            dataIndex="pasienId"
            title="No. Pasien"
            render={(text, record) =>
              record.statusPublish === 1 ? (
                <Tooltip title="Sudah Dikirim Reminder">
                  <Tag color="processing">{record.pasienId}</Tag>
                </Tooltip>
              ) : record.statusBatal === "1" ? (
                <Tooltip title="Booking Batal">
                  <Tag color="volcano">{record.pasienId}</Tag>
                </Tooltip>
              ) : (
                <span>{record.pasienId}</span>
              )
            }
          />
          <Column dataIndex="namaPasien" title="Nama Pasien" />
          <Column
            className="bgcolortunggu"
            dataIndex="noTelp"
            title="No. Telp"
          />
          <Column dataIndex="tindakan" title="Tindakan" />
          <Column dataIndex="pemeriksaanId" title="ID" />
          <Column dataIndex="pemeriksaanDesk" title="Pemeriksaan" />
        </Table>
      </Modal>
    </div>
  );
};

export default HistoryPengajuanOP;
