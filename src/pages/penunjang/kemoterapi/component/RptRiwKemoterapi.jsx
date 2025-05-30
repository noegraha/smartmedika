import { CloudDownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Divider, Empty, Input, Modal, Row, Select, Spin, Table } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useContext } from 'react';
import { KemoterapiContext } from '../context/KemoterapiContext';
import dayjs from 'dayjs';
import ReactHtmlParser from 'react-html-parser';

const RptRiwKemoterapi = () => {
    const {
        rptKemo,
        rptProtKemo,
        spDtLaporanKemo,
        mdDtKemoterapi, setmdDtKemoterapi,
    } = useContext(KemoterapiContext);

    const columns = [
        {
            title: 'Waktu',
            dataIndex: 'Waktu',
            key: 'Waktu',
            align: 'center',
            width: 50,
            render: (text) => <span>{dayjs(text).format("DD-MM-YYYY HH:mm")}</span>,
        },
        {
            title: 'Implementasi',
            dataIndex: 'Implementasi',
            key: 'Implementasi',
        },
    ]

    return (
        <div>
            <Modal
                title="Data Implementasi"
                open={mdDtKemoterapi}
                onCancel={() => setmdDtKemoterapi(false)}
                closable={false}
                footer={null}
                width="75%"
                style={{ top: 100 }}
            >
                <Card
                    loading={spDtLaporanKemo}
                >
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            Tanggal :
                        </Col>
                        <Col span={9} style={{ paddingRight: '10px' }}>
                            <Input
                                value={rptKemo ? rptKemo.TglPemeriksaan : null}
                                readOnly
                                size='small'
                                style={{ width: '100%' }} />
                        </Col>
                        <Col span={3}>
                            <span style={{ marginLeft: '4px' }}>Diagnosa :</span>
                        </Col>
                        <Col span={9}>
                            <Input
                                value={rptKemo ? rptKemo.DIAGNOSA : null}
                                readOnly
                                size='small'
                                style={{ width: '100%' }} />
                        </Col>
                    </Row>

                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            Siklus Utama :
                        </Col>
                        <Col span={3} style={{ paddingRight: '10px' }}>
                            <Input
                                type='number'
                                value={rptKemo ? rptKemo.SiklusUtama : null}
                                // onChange={(e) => setsiklusUtama(e.target.value)}
                                readOnly
                                min={0}
                                size='small'
                            />
                        </Col>
                        <Col span={3}>
                            <span style={{ marginLeft: '4px' }}>Total Siklus :</span>
                        </Col>
                        <Col span={3} style={{ paddingRight: '10px' }}>
                            <Input
                                type='number'
                                value={rptKemo ? rptKemo.TotalSiklus : null}
                                // onChange={(e) => setsiklusUtama(e.target.value)}
                                readOnly
                                min={0}
                                size='small'
                            />
                        </Col>
                        <Col span={3}>
                            <span style={{ marginLeft: '4px' }}>Second Line :</span>
                        </Col>
                        <Col span={9}>
                            <Input
                                type='number'
                                value={rptKemo ? rptKemo.SecondLine : null}
                                // onChange={(e) => setsecondLine(e.target.value)}
                                readOnly
                                min={0}
                                size='small'
                                onInput={(e) => e.target.value = e.target.value.slice(0, 2)}
                            />
                        </Col>
                    </Row>

                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            Konsolidasi :
                        </Col>
                        <Col span={9} style={{ paddingRight: '10px' }}>
                            <Input
                                type='number'
                                value={rptKemo ? rptKemo.Konsolidasi : null}
                                // onChange={(e) => setkonsolidasi(e.target.value)}
                                readOnly
                                min={0}
                                size='small'
                                onInput={(e) => e.target.value = e.target.value.slice(0, 1)}
                            />
                        </Col>
                        <Col span={3}>
                            <span style={{ marginLeft: '4px' }}>Weekly :</span>
                        </Col>
                        <Col span={9}>
                            <Input
                                type='number'
                                value={rptKemo ? rptKemo.Weekly : null}
                                // onChange={(e) => setweekly(e.target.value)}
                                readOnly
                                min={0}
                                size='small'
                                onInput={(e) => e.target.value = e.target.value.slice(0, 3)}
                            />
                        </Col>
                    </Row>

                    <Row style={{ marginBottom: '5px' }}>
                        <Col span={3}>
                            Perawat :
                        </Col>
                        <Col span={21}>
                            <Input
                                value={rptKemo ? rptKemo.KodePerawat : null}
                                readOnly
                                size='small'
                                style={{ width: '100%' }} />
                        </Col>
                    </Row>

                    <Divider
                        orientation='left'
                        style={{ backgroundColor: '#d9f7be', margin: '0px' }}>
                        Data Fokus
                    </Divider>

                    <Row>
                        <Col span={24}>
                            <span>Anamnesa :</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <TextArea
                                value={rptKemo ? rptKemo.Anamnesa : null}
                                // onChange={(e) => setanamnesa(e.target.value)}
                                readOnly
                                rows={4}
                                showCount
                                placeholder="Anamnesa"
                                maxLength={4000}
                            />
                        </Col>
                    </Row>

                    <hr />

                    <Row>
                        <Col span={24}>
                            <span>Pemeriksaan Fisik :</span>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '5px' }}>
                        <Col span={24}>
                            <TextArea
                                value={rptKemo ? rptKemo.PmrFisik : null}
                                // onChange={(e) => setpmrFisik(e.target.value)}
                                rows={4}
                                showCount
                                // disabled
                                readOnly
                                placeholder="Pemeriksaan Fisik"
                                maxLength={4000}
                            />
                        </Col>
                    </Row>
                    {/* <span style={{ fontStyle: 'italic', fontSize: 'x-small', textDecoration: 'line-through' }}>{"*) Inputan diatas akan mulai TIDAK AKTIF per 1 Januari 2024"}</span> */}

                    <Divider
                        orientation='left'
                        style={{ backgroundColor: '#d9f7be', margin: '0px' }}>
                        Data Penunjang
                    </Divider>

                    <Row style={{ marginTop: '5px', marginBottom: '2px' }}>
                        <Col span={6}>
                            <span>Therapi :</span>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '5px' }}>
                        <Col span={24}>
                            <TextArea
                                value={rptKemo ? rptKemo.Terapi : null}
                                // onChange={(e) => setterapi(e.target.value)}
                                rows={4}
                                readOnly
                                showCount
                                placeholder="Therapi"
                                style={{ width: '100%' }}
                                maxLength={4000}
                            />
                        </Col>
                    </Row>

                    <Divider
                        orientation='left'
                        style={{ backgroundColor: '#d9f7be', margin: '0px' }}>
                        Masalah Keperawatan
                    </Divider>

                    <Row style={{ marginTop: '2px', marginBottom: '5px' }}>
                        <Col span={24}>
                            <TextArea
                                value={rptKemo ? rptKemo.MasalahKeperawatan : null}
                                // onChange={(e) => setmslkeperawatan(e.target.value)}
                                rows={4}
                                showCount
                                readOnly
                                placeholder="Masalah Keperawatan"
                                maxLength={4000}
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12} style={{ paddingRight: '2px' }}>
                            <Divider
                                orientation='left'
                                style={{ backgroundColor: '#d9f7be', margin: '0px' }}>
                                Implementasi
                            </Divider>
                        </Col>
                        <Col span={12} style={{ paddingLeft: '2px', paddingRight: '2px' }}>
                            <Divider
                                orientation='left'
                                style={{ backgroundColor: '#d9f7be', margin: '0px', borderColor: 'white', }}>
                                Protokol Kemoterapi
                            </Divider>
                        </Col>
                    </Row>

                    <Row style={{ display: 'flex', marginTop: '2px', marginBottom: '5px', height: '100%' }}>
                        {/* Kolom untuk Tabel */}
                        <Col span={12} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <Table
                                columns={columns}
                                dataSource={rptKemo ? rptKemo.ListImplementasi : null}
                                size='small'
                                // scroll={{
                                //     y: 310,  // Sesuaikan ini jika diperlukan, atau hilangkan jika ingin otomatis
                                // }}
                                bordered
                                pagination={false}
                                style={{ width: '100%' }}
                            />
                        </Col>

                        {/* Kolom untuk Protokol */}
                        <Col span={12} style={{ padding: '5px', backgroundColor: '#f6ffed', display: 'flex', flexDirection: 'column', flex: 1 }}>
                            {rptProtKemo && Object.keys(rptProtKemo).length > 0 ? (
                                <div style={{ flex: 1 }}>
                                    <Row>
                                        <Col span={6}>DPJP</Col>
                                        <Col span={18}>: <b>{rptProtKemo.NAMADOKTER}</b></Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>Nama Protokol</Col>
                                        <Col span={18}>: <b>{rptProtKemo.NamaProtokol}</b></Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>{ReactHtmlParser(rptProtKemo.ObatProtokol)}</Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>{ReactHtmlParser(rptProtKemo.ProsedurProtokol)}</Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>Ruang Input</Col>
                                        <Col span={18}>: {rptProtKemo.Deskripsi}</Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>User Input</Col>
                                        <Col span={18}>: {rptProtKemo.UserId}</Col>
                                    </Row>
                                </div>
                            ) : (
                                <Empty description={<span>Belum ada Protokol Kemoterapi.<br />Pemilihan Protokol Kemoterapi di inputkan melalui Poliklinik.</span>} />
                            )}
                        </Col>
                    </Row>

                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={24}>
                            <Divider
                                orientation='left'
                                style={{ backgroundColor: '#d9f7be', margin: '0px' }}>
                                Evaluasi
                            </Divider>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={1}>
                            <span>S :</span>
                        </Col>
                        <Col span={23}>
                            <TextArea
                                value={rptKemo ? rptKemo.Subjek : null}
                                // onChange={(e) => setsbj(e.target.value)}
                                readOnly
                                rows={4}
                                showCount
                                placeholder="..."
                                maxLength={4000}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={1}>
                            <span>O :</span>
                        </Col>
                        <Col span={23}>
                            <TextArea
                                value={rptKemo ? rptKemo.Objek : null}
                                // onChange={(e) => setobj(e.target.value)}
                                readOnly
                                rows={4}
                                showCount
                                placeholder="..."
                                maxLength={4000}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={1}>
                            <span>A :</span>
                        </Col>
                        <Col span={23}>
                            <TextArea
                                value={rptKemo ? rptKemo.Analisis : null}
                                // onChange={(e) => setanalysis(e.target.value)}
                                readOnly
                                rows={4}
                                showCount
                                placeholder="..."
                                maxLength={4000}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '5px' }}>
                        <Col span={1}>
                            <span>P :</span>
                        </Col>
                        <Col span={23}>
                            <TextArea
                                value={rptKemo ? rptKemo.Planning : null}
                                // onChange={(e) => setplan(e.target.value)}
                                readOnly
                                rows={4}
                                showCount
                                placeholder="..."
                                maxLength={4000}
                            />
                        </Col>
                    </Row>

                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={24}>
                            <Divider
                                orientation='left'
                                style={{ backgroundColor: '#d9f7be', margin: '0px' }}>
                                Discharge Planning
                            </Divider>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '5px' }}>
                        <Col span={24}>
                            <TextArea
                                value={rptKemo ? rptKemo.DischargePlanning : null}
                                // onChange={(e) => setdischargeplan(e.target.value)}
                                readOnly
                                rows={2}
                                showCount
                                placeholder="..."
                                maxLength={4000}
                            />
                        </Col>
                    </Row>
                </Card>
            </Modal>
        </div >
    )
}

export default RptRiwKemoterapi