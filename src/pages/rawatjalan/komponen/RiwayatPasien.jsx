import { Button, Empty, Table, Tabs } from "antd";
import React, { useContext, useState } from "react";
import { PasienContext } from "../context/PasienContext";
const { TabPane } = Tabs;
const { Column } = Table;

const RiwayatPasien = () => {
  const {
    riwayatpenyakit,
    riwayatpemeriksaan,
    riwayatpasien,
    detailRiwayatPenyakit,
  } = useContext(PasienContext);
  const [tampil, setTampil] = useState(false);
  const onAmbilRiwayat = (e) => {
    detailRiwayatPenyakit(e);
    setTampil(true);
  };
  return (
    <div>
      <Table
        dataSource={riwayatpasien}
        size="small"
        bordered
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={"Silahkan Pilih Pasien Terlebih Dahulu"}
            />
          ),
        }}
      >
        <Column
          title="Reg"
          key="reg"
          dataIndex="RegistrasiId"
          width="90px"
          className="bgcolor fontkecil"
        />
        <Column
          title="Tanggal"
          dataIndex="TanggalMasuk"
          width="80px"
          key="pasienId"
          className="fontkecil"
        />
        <Column
          title="Ruang"
          dataIndex="RuangDeskripsi"
          width="80px"
          key="pasienId"
          className="fontkecil"
        />
        <Column
          title="Kode ICD"
          dataIndex="DiagnosisId"
          width="80px"
          key="pasienId"
          className="fontkecil"
        />
        <Column
          title="Penyakit"
          dataIndex="Deskripsi"
          width="200px"
          key="pasienId"
          className="fontkecil"
        />
        <Column
          title="Action"
          width="60px"
          className="fontkecil"
          render={(riwayatpasien) => (
            <span>
              <Button
                size="small"
                type="primary"
                onClick={(e) => onAmbilRiwayat(riwayatpasien.RegistrasiId)}
              >
                Detail
              </Button>
            </span>
          )}
        />
      </Table>

      {tampil === true ? (
        <Tabs size="small" type="card" defaultActiveKey="1">
          <TabPane tab="Penyakit" key="1">
            <Table
              dataSource={riwayatpenyakit}
              size="small"
              rowKey="reg"
              scroll={{ y: 470 }}
              bordered
              locale={{
                emptyText: (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={"Silahkan Pilih Pasien Terlebih Dahulu"}
                  />
                ),
              }}
            >
              <Column
                title="Reg"
                key="reg"
                dataIndex="registrasiId"
                width="90px"
                className="bgcolor fontkecil"
              />
              <Column
                title="Tanggal"
                dataIndex="tanggalMasuk"
                width="80px"
                key="pasienId"
                className="fontkecil"
              />
              <Column
                title="Kode ICD"
                dataIndex="diagnosaId"
                width="80px"
                key="pasienId"
                className="fontkecil"
              />
              <Column
                title="Penyakit"
                dataIndex="diagnosaDesk"
                width="300px"
                key="pasienId"
                className="fontkecil"
              />
              <Column
                title="Kasus"
                dataIndex="kasusIcd"
                width="60px"
                key="pasienId"
                className="fontkecil"
              />
            </Table>
          </TabPane>
          <TabPane tab="Resep Pasien" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Hasil Lab" key="3">
            Content of Tab Pane 3
          </TabPane>
          <TabPane tab="Rawat Inap" key="4">
            Content of Tab Pane 4
          </TabPane>
          <TabPane tab="Hasil Radiologi" key="5">
            Content of Tab Pane 5
          </TabPane>
          <TabPane tab="Pemeriksaan" key="6">
            <Table
              dataSource={riwayatpemeriksaan}
              size="small"
              rowKey="reg"
              scroll={{ y: 470 }}
              bordered
              locale={{
                emptyText: (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={"Silahkan Pilih Pasien Terlebih Dahulu"}
                  />
                ),
              }}
            >
              <Column
                title="Reg"
                key="reg"
                dataIndex="registrasiId"
                width="90px"
                className="bgcolor fontkecil"
              />
              <Column
                title="Tanggal"
                dataIndex="tanggalPemeriksaan"
                width="80px"
                key="pasienId"
                className="fontkecil"
              />
              <Column
                title="Bagian"
                dataIndex="ruangKlinikDeskripsi"
                key="pasienId"
                className="fontkecil"
              />
              <Column
                title="Jenis Pemeriksaan"
                dataIndex="jenisPemeriksaanDesk"
                width="300px"
                key="pasienId"
                className="fontkecil"
              />
            </Table>
          </TabPane>
        </Tabs>
      ) : null}
    </div>
  );
};

export default RiwayatPasien;
