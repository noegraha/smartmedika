import React, { useEffect, useState } from "react";
import { Table, Empty, Alert, Card } from "antd";
import Column from "antd/lib/table/Column";

import dayjs from "dayjs";
import { useContext } from "react";
import { LaporanAskepContext } from "../Context/LaporanAskepContext";

const DetailPasienAsuhan = () => {
  const { detailjmlPasienMutasi } = useContext(LaporanAskepContext);
  const [page, setPage] = useState(1);
  return (
    <div>
      <Card size="small" title="Detail Pasien Asuhan">
        <Table
          locale={{ emptyText: <Empty description="Data Pasien Kosong" /> }}
          pagination={false}
          dataSource={detailjmlPasienMutasi}
          size="small"
          rowKey="reg"
        >
          <Column
            title="No"
            key="reg"
            width="1px"
            render={(text, record, index) => (
              <span>{(page - 1) * 10 + index + 1}</span>
            )}
          />
          <Column
            title="Tgl Masuk"
            key="reg"
            render={(detailjmlPasienMutasi) => (
              <span>
                {dayjs(detailjmlPasienMutasi.TanggalMasukRI).format(
                  "DD-MM-YYYY HH:mm"
                )}
              </span>
            )}
          />
          <Column
            title="Noreg"
            key="reg"
            render={(detailjmlPasienMutasi) => (
              <span>{detailjmlPasienMutasi.RegistrasiId}</span>
            )}
          />
          <Column
            title="No Pasien"
            key="reg"
            render={(detailjmlPasienMutasi) => (
              <span>{detailjmlPasienMutasi.PasienId}</span>
            )}
          />
          <Column
            title="Nama Pasien"
            key="reg"
            render={(detailjmlPasienMutasi) => (
              <span>{detailjmlPasienMutasi.Nama}</span>
            )}
          />
          <Column
            title="Tgl Asuhan"
            key="reg"
            render={(detailjmlPasienMutasi) => (
              <span>
                {dayjs(detailjmlPasienMutasi.TanggalAsuhan).format(
                  "DD-MM-YYYY HH:mm"
                )}
              </span>
            )}
          />
        </Table>
      </Card>
    </div>
  );
};

export default DetailPasienAsuhan;
