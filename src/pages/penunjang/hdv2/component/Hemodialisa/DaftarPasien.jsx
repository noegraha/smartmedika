import React, { useContext } from 'react';
import {
    Spin,
    Card,
    Space,
    Table,
    DatePicker,
    Row,
    Col,
    Input,
    Tag,
} from 'antd';
import HdContext from '../../HdContext';
import { AskepContext } from '../../../../rawatinap/context/AskepContext';
import { AssesmentRIContext } from '../../../../rawatinap/context/AssesmentRIContext';
import { PemeriksaanFisikContext } from '../../../../rawatjalan/context/PemeriksaanFisikContext';

const { Search } = Input;

const {
    PasiensContext,
} = HdContext;

function DaftarPasien() {
    const props = useContext(PasiensContext)
    const { detailPemfisik } = useContext(PemeriksaanFisikContext);
    const { getListAskepById,
        getHistoryKesimpulan,
        getCatatanPasien,
        cekAssementTombol } = useContext(AskepContext);
    const {
        getAssesmentById,
        getAssesmentResikoJatuh,
        getAssesmentDetailTG } = useContext(AssesmentRIContext);

    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            width: 40,
        },
        {
            title: 'No Reg',
            key: 'registrasiId',
            ellipsis: true,
            render: (record) => (
                <div>
                    {record.ruangOrder === "91" ? record.registrasiId : <Tag color="magenta">{record.registrasiId}</Tag>}
                </div>)
        },
        {
            title: 'Nama',
            dataIndex: 'namaPasien',
            key: 'namaPasien',
            ellipsis: true,
            render: text => <a style={{ color: 'blue' }}>{text}</a>,
        },
        {
            title: 'No Pasien',
            dataIndex: 'pasienId',
            key: 'pasienId',
        },
        {
            title: 'Dokter Penanggung Jawab',
            dataIndex: 'namaDPJP',
            key: 'namaDPJP',
            ellipsis: true,
        }
    ];

    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            orderId: i + 1,
            registrasiId: `registrasiId ${i}`,
            namaPasien: `namaPasien ${i}`,
            pasienId: `pasienId ${i}`,
            namaDPJP: `namaDPJP ${i}`,
        });
    }

    return (
        <>
            <Card
                size="small"
                style={{ width: "99%", height: "429px", backgroundColor: "#fff1f0" }}
            >
                <Space direction="vertical" style={{ width: "100%" }}>
                    <Row>
                        <Col span={12}>
                            <Space>Tanggal :
                                <DatePicker
                                    defaultValue={props.tglList}
                                    format={"DD-MM-YYYY"}
                                    onChange={props.changeDate}
                                />
                            </Space>
                        </Col>
                        <Col span={12}>
                            <Space style={{ float: 'right' }}>
                                Cari :
                                <Search
                                    onSearch={(e) => props.onSearch(e)}
                                    placeholder="No.Registrasi / No.RM"
                                    style={{ width: 200 }} />
                            </Space>
                        </Col>
                    </Row>
                    <Spin
                        tip="Mohon tunggu"
                        spinning={props.isLoading}
                    >
                        <Table
                            columns={columns}
                            dataSource={props.pasiens.result ? props.pasiens.result : []}
                            size="small"
                            rowKey={record => record.noOrder}
                            onRow={(record, rowIndex) => {
                                return {
                                    onClick: () => {
                                        props.setdpjpRuangOrder(record.dPJP)
                                        // if (record.ruangOrder === '93') {
                                        props.getDataPasien(record.noOrder)
                                        detailPemfisik(record.registrasiId)
                                        // getListAskepById(record.registrasiId)
                                        // getCatatanPasien(record.registrasiId)
                                        // cekAssementTombol(record.registrasiId)
                                        // getAssesmentById(record.registrasiId);
                                        // getAssesmentResikoJatuh(record.registrasiId);
                                        // getAssesmentDetailTG(record.registrasiId);
                                        // props.sethanyaBaca(true);
                                        // console.log('ini pasien rawat inap');
                                        // } else {
                                        // console.log('ini pasien selain rawat inap');
                                        // props.getDataPasien(record.noOrder)
                                        // detailPemfisik(record.registrasiId)
                                        // }
                                    }
                                }
                            }}
                            rowClassName={(record, index) => (
                                record.dialisisHeaderId !== null && record.aksesVaskulerId === null ? "greena" :
                                    record.aksesVaskulerId !== null && record.durasi === null ? "greenb" :
                                        record.durasi !== null && record.heparinasi !== null && record.waktuMulai === null ? "greenc" :
                                            record.waktuMulai !== null && record.waktuSelesai !== null && record.volumeSisaPriming === null ? "greend" :
                                                record.volumeSisaPriming !== null ? "greene" :
                                                    "white"
                            )}
                            // pagination={{ pageSize: 20 }}
                            scroll={{ y: 320 }}
                            style={{ width: "100%" }}
                        />
                    </Spin>
                </Space>
            </Card>
        </>
    )
}

export default DaftarPasien
