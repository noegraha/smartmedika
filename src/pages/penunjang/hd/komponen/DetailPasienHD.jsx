import React, { useContext, useState } from "react";
import { Button, Card, Descriptions, Divider, Drawer, Empty, Table, Tabs } from "antd";
import { PasienHDContext } from "../context/PasienHDContext";
const { TabPane } = Tabs;
const { Column } = Table;

const DetailPasienHD = () => {
    const {
        curpas,
        riwayatpenyakit,
        riwayatpemeriksaan,
        riwayatpasien,
        detailRiwayatPenyakit,
        detailRiwayatPemeriksaan,
        detailRiwayatPasien,
    } = useContext(PasienHDContext);
    const [visible, setVisible] = useState(false);
    const norm = sessionStorage.getItem("norm");
    const [tampil, setTampil] = useState(false);
    const [riwayat, setRiwayat] = useState(true);
    const showDrawer = () => {
        setVisible(true);
        detailRiwayatPasien(norm);
        // detailRiwayatPenyakit(norm);
        // detailRiwayatPemeriksaan(norm);
    };
    const onClose = () => {
        setVisible(false);
        setTampil(false);
    };
    const onKembali = () => {
        setRiwayat(true);
        setTampil(false);
    };
    const onAmbilRiwayat = (e) => {
        detailRiwayatPenyakit(e);
        detailRiwayatPemeriksaan(e);
        setTampil(true);
        setRiwayat(false);
    };
    return (
        <div>
            <Button size="small" onClick={showDrawer} type="primary">
                Detail Pasien
            </Button>
            <Drawer
                headerStyle={{
                    fontWeight: "bold",
                    paddingLeft: 12,
                    paddingBottom: 6,
                    paddingRight: 12,
                    paddingTop: 6,
                }}
                bodyStyle={{
                    paddingLeft: 12,
                    paddingBottom: 6,
                    paddingRight: 12,
                    paddingTop: 6,
                }}
                title="Detail Pasien"
                width={675}
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <Descriptions size="small" column={{ xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}>
                    <Descriptions.Item label="No Registrasi" >{curpas.registrasiId}</Descriptions.Item>
                    <Descriptions.Item label="No Pasien">{curpas.pasienId}</Descriptions.Item>
                    <Descriptions.Item label="Nama Pasien" span={2}>{curpas.namaPasien}</Descriptions.Item>
                    <Descriptions.Item label="Jenis Kelamin">{curpas.jenisKelamin}</Descriptions.Item>
                    <Descriptions.Item label="Nama Ibu">{curpas.namaIbu}</Descriptions.Item>
                    <Descriptions.Item label="Tanggal Lahir">{curpas.tanggalLahir}</Descriptions.Item>
                    <Descriptions.Item label="Umur">{curpas.umur}</Descriptions.Item>
                    <Descriptions.Item label="Alamat" span={2}>{curpas.alamat}</Descriptions.Item>
                    <Descriptions.Item label="No Telpon">{curpas.noTelephone}</Descriptions.Item>
                    <Descriptions.Item label="Tanggal Registrasi">{curpas.tanggalMasuk}</Descriptions.Item>
                    <Descriptions.Item label="Kelas Rawat">{curpas.kelasRawat}</Descriptions.Item>
                    <Descriptions.Item label="Pembayaran">{curpas.namaPembayaran}</Descriptions.Item>
                    <Descriptions.Item label="Nomor Penjamin">{curpas.noPolish}</Descriptions.Item>
                    <Descriptions.Item label="DPJP">{curpas.namaDpjp}</Descriptions.Item>
                    {/* <Descriptions.Item label="No Order">{curpas.noOrder}</Descriptions.Item> */}
                </Descriptions>
                <br />
                <Divider style={{ marginBottom: 15, marginTop: 6 }} />
                <Card size="small" title="Riwayat HD">
                    {riwayat ? (
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
                            {/* <Column
                                title="Action"
                                width="60px"
                                className="fontkecil"
                                render={(riwayatpasien) => (
                                    <span>
                                        <Button
                                            size="small"
                                            type="primary"
                                            onClick={(e) =>
                                                onAmbilRiwayat(riwayatpasien.RegistrasiId)
                                            }
                                        >
                                            Detail
                                        </Button>
                                    </span>
                                )}
                            /> */}
                        </Table>
                    ) : null}
                    {tampil === true ? (
                        <Tabs
                            size="small"
                            type="card"
                            defaultActiveKey="1"
                            tabBarExtraContent={
                                <Button size="small" type="primary" danger onClick={onKembali}>
                                    Kembali
                </Button>
                            }
                        >
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
                                        width="50px"
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
                                        title="Tanggal"
                                        dataIndex="tanggalPemeriksaan"
                                        width="80px"
                                        key="pasienId"
                                        className="fontkecil"
                                    />
                                    <Column
                                        title="Bagian"
                                        dataIndex="ruangDesk"
                                        key="pasienId"
                                        className="fontkecil"
                                    />
                                    <Column
                                        title="Jenis Pemeriksaan"
                                        dataIndex="pelayananDesk"
                                        width="300px"
                                        key="pasienId"
                                        className="fontkecil"
                                    />
                                </Table>
                            </TabPane>
                        </Tabs>
                    ) : null}
                </Card>
            </Drawer>
        </div>
    );
};

export default DetailPasienHD;