import React, { useContext, Fragment, useState } from "react";
import {
    Table,
    Button,
    Select,
    Form,
    Popconfirm,
    message,
    Row,
    Col, Modal, Card, DatePicker, Spin, Divider, Radio
} from "antd";
import { PasienContext } from "../../rawatjalan/context/PasienContext";
import { LoginContext } from "../../rawatjalan/context";
import dayjs from "dayjs";
import PageheadRI from "../PageheadRI";
import TextArea from "antd/es/input/TextArea";
import { PelayananContext } from "../../rawatjalan/context/Pelayanancontext";
import { PantuanInfeksiContext } from "../context/PantuanInfeksiContext";
const { Column } = Table;
const { Option } = Select;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

const formItemLayout1 = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const FormPantuanInfeksi = () => {
    const { curpasRI, noreg } = useContext(PasienContext);
    const { dokterall, getDokterShift, dokterpoli } = useContext(PelayananContext);
    const { getMstTindakanPPI, getMstIndikatorInfeksi, mstTindakanPPI, setmstTindakanPPI,
        mstIndikatorInfeksi, setmstIndikatorInfeksi } = useContext(PantuanInfeksiContext);
    const { namauser } = useContext(LoginContext);
    const [modal, setmodal] = useState(false);
    const ip = sessionStorage.getItem("IP");
    const host = sessionStorage.getItem("Host");
    const [form] = Form.useForm();


    return (
        <Fragment>
            <Card
                size="small"
                title="Daftar Pasien Terindikasi Infeksi">
                <Row gutter={[8, 2]}>
                    <Col span={20}>
                        <Form.Item {...formItemLayout}
                            label="Pilih Tanggal"
                            style={{ marginBottom: 0 }}>
                            <DatePicker
                                // disabledDate={(current) => {
                                //     return current > dayjs().endOf('day')
                                // }}
                                format="DD-MM-YYYY"
                                // showTime
                                // value={tglPulang}
                                // onChange={(date) => {
                                //     settglPulang(date);
                                //     console.log(date);
                                //     console.log(dayjs(date).format('YYYY-MM-DDTHH:mm:ss'));
                                //     console.log(dayjs(date).format('HH:mm:ss'));

                                //     // getDokterShift(klinik.split('=').shift(), (new Date(date).getDay() + 1))
                                // }}
                                style={{ width: "50%" }}
                                placeholder="..."
                            />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Button
                            onClick={() => {
                                setmodal(true)
                            }}
                        >
                            cek
                        </Button>
                    </Col>
                </Row>
            </Card>
            <Card
                size="small">
                <Table
                    bordered
                    pagination={false}
                    // dataSource={detdiagnosa}
                    size="small"
                    rowKey="reg"
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {

                            },
                        };
                    }}
                // scroll={{ y: 790, x: 1000 }}
                >
                    <Column
                        title="No."
                        key="reg"
                        className="tabeltabel"
                        width="1px"
                        render={(text, record, index) => <span>{index + 1}</span>}
                    />
                    <Column
                        title="Tanggal"
                        key="reg"
                        // className="bgcolortunggu"
                        width="8px"
                    // render={(detdiagnosa) => <span>{detdiagnosa.diagnosisId}</span>}
                    />
                    <Column
                        title="Noreg"
                        key="reg"
                        // className="bgcolortunggu"
                        width="5px"
                    // render={(detdiagnosa) => <span>{detdiagnosa.diagnosisId}</span>}
                    />
                    <Column
                        title="No Pasien"
                        key="reg"
                        width="5px"
                    // render={(detdiagnosa) => <span>{detdiagnosa.diagnosisDesk}</span>}
                    />
                    <Column
                        title="Nama Pasien"
                        key="reg"
                        width="22px"
                        className="tabeltabel"
                    // render={(detdiagnosa) => (
                    //     <span>{detdiagnosa.jenisDiagnosisDesk}</span>
                    // )}
                    />
                    <Column
                        title="Ruang"
                        className="tabeltabel"
                        key="nama"
                        width="15px"
                    // render={(detdiagnosa) => (
                    //     <span>{detdiagnosa.kasusBl === "B" ? "Baru" : "Lama"}</span>
                    // )}
                    />
                    <Column
                        title="Tindakan"
                        key="reg"
                        width="20px"
                    // render={(detdiagnosa) => <span>{detdiagnosa.pelaksana}</span>}
                    />
                    <Column
                        title="Keterangan"
                        key="reg"
                        width="20px"
                    // render={(detdiagnosa) => <span>{detdiagnosa.pelaksana}</span>}
                    />
                    <Column
                        title="Status"
                        key="reg"
                        width="5px"
                        className="tabeltabel"
                    />
                </Table>
            </Card>
            <Modal
                // title="Daftar Obat"
                open={modal}
                onCancel={() => setmodal(false)}
                closable={false}
                footer={null}
                width={800}
                style={{ top: 10 }}
            >
                {/* <Spin tip="Mengambil Data Obat"> */}
                <Divider
                    size='small'
                    orientation="left"
                    style={{ backgroundColor: "#d9f7be", margin: "0px" }}
                >
                    Pantauan Infeksi Pasien
                </Divider>
                <PageheadRI />
                <Card
                    size="small"
                >
                    <Row>
                        <Col span={12}>
                            <Form.Item {...formItemLayout1} label="Tanggal" style={{ marginBottom: 5 }}>
                                <DatePicker showTime format="DD-MM-YYYY HH:mm" style={{ width: '100%' }} placeholder="..." />
                            </Form.Item>
                            <Form.Item {...formItemLayout1} label="Status Infeksi" style={{ marginBottom: 5 }}>
                                <Radio.Group
                                // onChange={(e) => {
                                //     setjenisKontrol(e);
                                // }}
                                // value={jenisKontrol}
                                >
                                    <Radio value={1}>Ya</Radio>
                                    <Radio value={0}>Tidak</Radio>
                                </Radio.Group>
                                {

                                }
                            </Form.Item>
                            <Form.Item {...formItemLayout1} label="Keterangan" style={{ marginBottom: 5 }}>
                                <TextArea
                                    rows={2}
                                    placeholder="..."
                                // onChange={(e) => setpemeriksaanFisik(e.target.value)}
                                // value={pemeriksaanFisik}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item {...formItemLayout1} label="Tindakan" style={{ marginBottom: 5 }}>
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="..."
                                    optionFilterProp="children"
                                    datasource={mstTindakanPPI}
                                    // onChange={onChange}
                                    // onFocus={onFocus}
                                    // onBlur={onBlur}
                                    // onSearch={onSearch}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {mstTindakanPPI.map((d) => (
                                        <Option key={d.tindakanId}>{d.tindakanDeskripsi}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item {...formItemLayout1} label="Jenis" style={{ marginBottom: 5 }}>
                                <Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="..."
                                    optionFilterProp="children"
                                    // onChange={onChange}
                                    // onFocus={onFocus}
                                    // onBlur={onBlur}
                                    // onSearch={onSearch}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    <Option value="Pemasangan">Pemasangan</Option>
                                    <Option value="Pelepasan">Pelepasan</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item {...formItemLayout1} label="Pelaksana" style={{ marginBottom: 5 }}>
                                <Select
                                    // value={pelaksanaId === "" || pelaksanaId === [] | pelaksanaId === null ? curpasRI.dokterId : pelaksanaId}
                                    dataSource={dokterall}
                                    showSearch
                                    style={{ width: "100%" }}
                                    placeholder="..."
                                    optionFilterProp="children"
                                    // onChange={(e) => setpelaksanaId(e)}
                                    filterOption={(input, option) =>
                                        option.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {dokterall.map((d) => (
                                        <Option key={d.dokterId}>{d.namaDokter}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        {/* <Col span={24}>
                            <Form.Item {...formItemLayout} label="Ciri Infeksi" style={{ marginBottom: 5 }}>
                                <Select
                                    // value={nTandaGejala}
                                    onFocus={() => {
                                        getMstIndikatorInfeksi('INF002');
                                    }}
                                    style={{ width: "100%", maxWidth: "78vw" }}
                                    mode="multiple"
                                    allowClear
                                    showSearch
                                    source={mstIndikatorInfeksi}
                                    onChange={(e) => {
                                        console.log(e)
                                    }}
                                    tokenSeparators={[","]}
                                    placeholder="..."
                                    filterOption={(input, option) =>
                                        option.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {mstIndikatorInfeksi.map((b) => (
                                        <Option key={b.indikatorId}>{b.indikatorDeskripsi}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col> */}
                        <Col span={24}>
                            <Button>
                                Indikator Inveksi
                            </Button>
                            <Table
                                bordered
                                pagination={false}
                                // dataSource={listkonsulri}
                                size="small"
                                rowKey="reg"
                                scroll={{ x: 700 }}
                            >
                                <Column title="kode" key="reg" width="15%"
                                    defaultSortOrder="ascend"
                                // sorter={(a, b) => a.tglkonsul.localeCompare(b.tglkonsul)}
                                //   render={(listkonsulri) => (
                                //     <span>
                                //       {listkonsulri.dokterTujuan}
                                //     </span>
                                //   )}
                                />
                                <Column title="Ciri Infeksi" key="reg" width="70%"
                                    defaultSortOrder="ascend"
                                // sorter={(a, b) => a.tglkonsul.localeCompare(b.tglkonsul)}
                                //   render={(listkonsulri) => (
                                //     <span>
                                //       {listkonsulri.dokterTujuan}
                                //     </span>
                                //   )}
                                />
                                <Column title="Jenis" key="reg" width="15%"
                                    defaultSortOrder="ascend"
                                // sorter={(a, b) => a.tglkonsul.localeCompare(b.tglkonsul)}
                                //   render={(listkonsulri) => (
                                //     <span>
                                //       {listkonsulri.dokterTujuan}
                                //     </span>
                                //   )}
                                />
                            </Table>
                        </Col>
                    </Row>
                </Card>

                <Card
                    size="small">
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            {/* <Button
                                onClick={() => {
                                    // kosongkanFormRM13();
                                }}
                            >
                                Keluar
                            </Button> */}
                            <Button
                                type="primary"
                                onClick={() => {
                                    // insertRM13(datarm13);
                                    console.log("ini data rm 13",);
                                }}
                            >
                                Validasi
                            </Button>
                        </Col>
                    </Row>
                </Card>
                {/* </Spin> */}
            </Modal>
        </Fragment >
    )
}

export default FormPantuanInfeksi
