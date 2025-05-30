import React, { useEffect, useState } from "react";
import { Table, Empty, Alert, Card } from "antd";
import Column from "antd/lib/table/Column";

import dayjs from "dayjs";
import { useContext } from "react";
import { LaporanAskepContext } from "../Context/LaporanAskepContext";

const DetailPasienMutasi = () => {
  const { detailjmlPasienMutasi } = useContext(LaporanAskepContext);
  const [page, setPage] = useState(1);
  return (
    <div>
      <Card size="small" title="Detail Pasien Mutasi">
        <Table
          locale={{ emptyText: <Empty description="Data Konsultasi Kosong" /> }}
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
            title="Noreg"
            key="reg"
            render={(detailjmlPasienMutasi) => (
              <span>{detailjmlPasienMutasi.NO_REGISTRASI}</span>
            )}
          />
          <Column
            title="Nama Pasien"
            key="reg"
            render={(detailjmlPasienMutasi) => (
              <span>{detailjmlPasienMutasi.NAMAPASIEN}</span>
            )}
          />
          <Column
            title="Tgl Masuk"
            key="reg"
            render={(detailjmlPasienMutasi) => (
              <span>
                {detailjmlPasienMutasi.JAM_MASUK_RI === null
                  ? "-"
                  : dayjs(detailjmlPasienMutasi.JAM_MASUK_RI).format(
                      "DD-MM-YYYY HH:mm"
                    )}
              </span>
            )}
          />
          <Column
            title="Tgl Assesment"
            key="reg"
            render={(detailjmlPasienMutasi) => (
              <span>
                {detailjmlPasienMutasi.JAM_ASSESMENT === null
                  ? "-"
                  : dayjs(detailjmlPasienMutasi.JAM_ASSESMENT).format(
                      "DD-MM-YYYY HH:mm"
                    )}
              </span>
            )}
          />
          <Column
            title="Tgl Asuhan"
            key="reg"
            render={(detailjmlPasienMutasi) => (
              <span>
                {detailjmlPasienMutasi.JAM_ASUHAN === null
                  ? "-"
                  : dayjs(detailjmlPasienMutasi.JAM_ASUHAN).format(
                      "DD-MM-YYYY HH:mm"
                    )}
              </span>
            )}
          />
          <Column
            title="Assesment"
            key="reg"
            render={(detailjmlPasienMutasi) => (
              <span>
                <Alert
                  message={detailjmlPasienMutasi.STATUS_ASSESMENT}
                  type={
                    detailjmlPasienMutasi.STATUS_ASSESMENT === "BELUM ASSESMENT"
                      ? "error"
                      : detailjmlPasienMutasi.STATUS_ASSESMENT ===
                        "TELAT ASSESMENT"
                      ? "warning"
                      : "success"
                  }
                />
              </span>
            )}
          />
          <Column
            title="Asuhan"
            key="reg"
            render={(detailjmlPasienMutasi) => (
              <span>
                <Alert
                  message={detailjmlPasienMutasi.STATUS_ASUHAN}
                  type={
                    detailjmlPasienMutasi.STATUS_ASUHAN === "BELUM ASUHAN"
                      ? "error"
                      : detailjmlPasienMutasi.STATUS_ASUHAN === "TELAT ASUHAN"
                      ? "warning"
                      : "success"
                  }
                />
              </span>
            )}
          />
        </Table>
      </Card>
    </div>
  );
};

export default DetailPasienMutasi;
