import { CloudDownloadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Input, Modal, Row, Select, Space, Spin } from 'antd';
import React, { useContext, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ProtokolKemoContext } from '../context/ProtokolKemoContext';

const { Option } = Select;

const FormCreateProtokol = () => {
    const {
        listDokter,
        tempFormat, settempFormat,
        idPrtkl,
        value, setValue,
        codeDokterId, setcodeDokterId,
        namaProtokol, setnamaProtokol,
        prosedur, setprosedur,
        ipKomp,
        hostKomp,
        user,
        getListDokter,
        createProtokol,
        updateProtokol,
        setmdCreateProtokol,
        spMdCreateProtokol,
    } = useContext(ProtokolKemoContext);


    const draftChange = (e) => {
        console.log('draftChange ; ', e);
        setValue(e);
    };

    const draftChangeProsedur = (e) => {
        console.log('draftChangeProsedur ; ', e);
        setprosedur(e);
    };

    const modules = {
        toolbar: [
            ['bold'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            // ['link', 'image'],
            // ['clean']
        ],
    };

    const modulesa = {
        toolbar: false,
    };

    const klikSimpan = () => {
        if (!codeDokterId) {
            Modal.warning({ title: 'Peringatan!', content: 'Nama Dokter masih kosong!' });
        }
        else if (!namaProtokol) {
            Modal.warning({ title: 'Peringatan!', content: 'Nama Protokol Kemoterapi masih kosong!' });
        }
        else if (!value) {
            Modal.warning({ title: 'Peringatan!', content: 'Obat Protokol Kemoterapi masih kosong!' });
        }
        else if (!prosedur) {
            Modal.warning({ title: 'Peringatan!', content: 'Prosedur Protokol Kemoterapi masih kosong!' });
        }
        else {
            let data = {};
            data.dokterId = codeDokterId;
            data.namaProtokol = namaProtokol.toUpperCase();
            data.obat = value;
            data.prosedurPelaksanaan = prosedur;
            data.clientHost = ipKomp;
            data.clientIP = hostKomp;
            data.userId = user;

            if (idPrtkl && idPrtkl !== null) {
                data.id = idPrtkl;
                console.log('klikSimpan : ', data);
                updateProtokol(data);
            }
            else {
                console.log('klikSimpan : ', data);
                createProtokol(data);
            }

        }
    };

    return (
        <div>
            <Divider
                orientation='left'
                style={{ backgroundColor: '#9DDE8B', margin: '0px', borderTop: '1px solid white' }}>
                Tambah Protokol Kemoterapi
            </Divider>

            <Spin spinning={spMdCreateProtokol}>
                <Row style={{ marginBottom: '2px', marginTop: '5px' }}>
                    <Col span={4}>
                        <span>Nama Dokter :</span>
                    </Col>
                    <Col span={20}>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="..."
                            value={codeDokterId}
                            onChange={(e) => setcodeDokterId(e)}
                            disabled
                            // size='small'
                            showSearch={true}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {listDokter.map((opt, index) => (
                                <Option key={index} value={opt.dokterId}>{opt.namaDokter}</Option>
                            ))}
                        </Select>
                        {/* <Input.Group compact>
                        </Input.Group> */}
                        {/* <Button
                                type="primary"
                                onClick={() => getListDokter()}
                                style={{ width: "5%" }}
                                icon={<CloudDownloadOutlined />}
                            /> */}
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        <span>Nama Protokol Kemoterapi :</span>
                    </Col>
                    <Col span={20}>
                        <Input
                            value={namaProtokol}
                            onChange={(e) => setnamaProtokol(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col>
                        <span>Obat :</span>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={24}>
                        <ReactQuill
                            theme="snow"
                            value={value}
                            onChange={(e) => draftChange(e)}
                            modules={modules}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col style={{ marginBottom: '2px' }}>
                        <span>Prosedur Pelaksanaan :</span>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '5px' }}>
                    <Col span={24}>
                        <ReactQuill
                            theme="snow"
                            value={prosedur}
                            onChange={(e) => draftChangeProsedur(e)}
                            modules={modules}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <Space style={{ float: 'right' }}>
                            <Button
                                // type='primary'
                                onClick={() => {
                                    setmdCreateProtokol(false);
                                    if (tempFormat === 0) {
                                        settempFormat(1);
                                    }
                                }}
                                style={{ width: '100px' }}>
                                Batal
                            </Button>
                            <Button
                                type='primary'
                                onClick={() => klikSimpan()}
                                // disabled={tempFormat === 0 ? true : false}
                                style={{ width: '150px' }}>
                                Simpan
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Spin>

        </div>
    )
}

export default FormCreateProtokol