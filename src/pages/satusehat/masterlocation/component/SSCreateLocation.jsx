import { CloudDownloadOutlined } from '@ant-design/icons';
import { Button, Card, Col, Input, Modal, Row, Select, Space } from 'antd'
import React, { useContext, useState } from 'react'
import { SatuSehatLocationContext } from '../context/SatuSehatLocationContext';

const { Option } = Select;

const SSCreateLocation = () => {
    const {
        // state
        listGrpLayanan,
        OrgIhsNum,
        groupLayanan, setgroupLayanan,
        listRuang,
        ruangId, setruangId,
        namaRuang, setnamaRuang,
        stsActive, setstsActive,
        deskGedung, setdeskGedung,
        mode, setmode,
        telp, settelp,
        email, setemail,
        url, seturl,
        addr, setaddr,
        city, setcity,
        kodePos, setkodePos,
        kodeProv, setkodeProv,
        kodeCity, setkodeCity,
        kodeDistrict, setkodeDistrict,
        kodeVillage, setkodeVillage,
        gedung, setgedung,
        listOrg,
        org, setorg,
        sstoken, setsstoken,
        // func
        getGroupLayanan,
        getRuang,
        getOrg,
        createLocation,
        // spin
        spbtn,
        spCardCreateLocation,
        // md
        mdCreate, setmdCreate,
    } = useContext(SatuSehatLocationContext)


    const [longitude, setlongitude] = useState(null)
    const [latitude, setlatitude] = useState(null)

    const getGrp = () => {
        getGroupLayanan()
    }

    const changeRuangId = (data) => {
        setruangId(data)

        let filterData = listRuang.find(item => item.RuangId === data)
        console.log('data kirim : ', data);
        console.log('data : ', filterData.Deskripsi);
        setnamaRuang(filterData.Deskripsi)
    }

    const changeGedung = (data) => {
        setgedung(data)

        if (data === 1) {
            setlongitude(-7.436459859296172)
            setlatitude(109.26736648118339)
        }
        else {
            setlongitude(-7.4167878112018855)
            setlatitude(109.23155592536274)
        }
    }

    const klikCreate = () => {
        if (!ruangId) {
            Modal.warn({
                title: 'Peringatan!',
                content: `Ruang Id masih kosong!`,
            })
        }
        else if (!namaRuang) {
            Modal.warn({
                title: 'Peringatan!',
                content: `Nama Ruang masih kosong!`,
            })
        }
        else if (!stsActive) {
            Modal.warn({
                title: 'Peringatan!',
                content: `Status Active kosong!`,
            })
        }
        else if (!deskGedung) {
            Modal.warn({
                title: 'Peringatan!',
                content: `Deskripsi Gedung masih kosong!`,
            })
        }
        else if (!gedung) {
            Modal.warn({
                title: 'Peringatan!',
                content: `Gedung masih kosong!`,
            })
        }
        else if (!org) {
            Modal.warn({
                title: 'Peringatan!',
                content: `Managing Organization masih kosong!`,
            })
        }
        else {
            let data = {}

            data.resourceType = "Location";

            let identifier = [
                {
                    system: `http://sys-ids.kemkes.go.id/location/${OrgIhsNum}`,
                    value: ruangId
                }
            ]
            data.identifier = identifier;
            data.status = stsActive;
            data.name = namaRuang;
            data.description = deskGedung;
            data.mode = mode;

            let telecom = [
                {
                    system: "phone",
                    value: telp,
                    use: "work"
                },
                {
                    system: "email",
                    value: email,
                    use: "work"
                },
                {
                    system: "url",
                    value: url,
                    use: "work"
                }
            ]
            data.telecom = telecom;

            let address = {
                use: "work",
                line: [
                    addr
                ],
                city: city,
                postalCode: kodePos,
                country: "ID",
                extension: [
                    {
                        url: "https://fhir.kemkes.go.id/r4/StructureDefinition/administrativeCode",
                        extension: [
                            {
                                url: "province",
                                valueCode: kodeProv
                            },
                            {
                                url: "city",
                                valueCode: kodeCity
                            },
                            {
                                url: "district",
                                valueCode: kodeDistrict
                            },
                            {
                                url: "village",
                                valueCode: kodeVillage
                            },
                        ]
                    }
                ]
            }
            data.address = address;

            let physicalType = {
                coding: [
                    {
                        system: "http://terminology.hl7.org/CodeSystem/location-physical-type",
                        code: "ro",
                        display: "Room"
                    }
                ]
            }
            data.physicalType = physicalType;

            let position = {
                longitude: longitude,
                latitude: latitude,
                altitude: 0
            }
            data.position = position;

            let managingOrganization = {
                reference: `Organization/${org}`
            }
            data.managingOrganization = managingOrganization;

            console.log('data : ', data);
            createLocation(data)
        }
    }

    const clearToken = () => {
        setsstoken('xxx')
    }

    const onChangeGrp = (data) => {
        getRuang(data)
        setgroupLayanan(data)
    }

    return (
        <div>
            <Card
                title='Create Location Satu Sehat'
                size='small'
                headStyle={{ backgroundColor: '#36cfc9' }}
                loading={spCardCreateLocation}>
                <Row>
                    <Col span={4}>
                        Group Layanan :
                    </Col>
                    <Col span={20}>
                        <Input.Group compact>
                            <Select
                                value={groupLayanan}
                                onChange={(e) => onChangeGrp(e)}
                                size='small'
                                style={{ width: '30%' }}
                            >
                                {listGrpLayanan.map((item, index) => (
                                    <Option key={index} value={item.Id}>{item.Deskripsi}</Option>
                                ))}
                            </Select>
                            <Button
                                onClick={() => getGrp()}
                                type="primary"
                                htmlType="submit"
                                size="small"
                                loading={spbtn}
                                icon={<CloudDownloadOutlined />}
                            />
                        </Input.Group>
                    </Col>
                </Row>

                <Row style={{ marginTop: '2px' }}>
                    <Col span={4}>
                        Ruang Id :
                    </Col>
                    <Col span={20}>
                        <Input.Group compact>
                            <Select
                                value={ruangId}
                                onChange={(e) => changeRuangId(e)}
                                size='small'
                                style={{ width: '60%' }}
                            >
                                {listRuang.map((item, index) => (
                                    <Option key={index} value={item.RuangId}>{item.RuangId + ' - ' + item.Deskripsi}</Option>
                                ))}
                            </Select>
                            <Button
                                onClick={() => getRuang(groupLayanan)}
                                type="primary"
                                htmlType="submit"
                                size="small"
                                loading={spbtn}
                                icon={<CloudDownloadOutlined />}
                            />
                        </Input.Group>
                    </Col>
                </Row>

                <Row style={{ marginTop: '2px' }}>
                    <Col span={4}>
                        Nama Ruang :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={namaRuang}
                            onChange={(e) => setnamaRuang(e.target.value)}
                            size='small' />
                    </Col>
                </Row>

                <Row style={{ marginTop: '2px' }}>
                    <Col span={4}>
                        Status Aktif :
                    </Col>
                    <Col span={20}>
                        <Select
                            value={stsActive}
                            onChange={(e) => setstsActive(e)}
                            size='small'
                            style={{ width: '100%' }}
                        >
                            <Option key={1} value={'active'}>Active</Option>
                            <Option key={2} value={'inactive'}>Inactive</Option>
                        </Select>
                    </Col>
                </Row>

                <Row style={{ marginTop: '2px' }}>
                    <Col span={4}>
                        Deskripsi Gedung/ Ruang :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={deskGedung}
                            onChange={(e) => setdeskGedung(e.target.value)}
                            size='small' />
                    </Col>
                </Row>

                <Row style={{ marginTop: '2px' }}>
                    <Col span={4}>
                        Mode :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={mode}
                            readOnly
                            size='small' />
                    </Col>
                </Row>

                <Row style={{ marginTop: '2px' }}>
                    <Col span={4}>
                        Telepon :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={telp}
                            readOnly
                            maxLength={50}
                            size='small' />
                    </Col>
                </Row>

                <Row style={{ marginTop: '2px' }}>
                    <Col span={4}>
                        Email :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={email}
                            readOnly
                            maxLength={50}
                            size='small' />
                    </Col>
                </Row>

                <Row style={{ marginTop: '2px' }}>
                    <Col span={4}>
                        Website :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={url}
                            readOnly
                            maxLength={50}
                            size='small' />
                    </Col>
                </Row>

                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Alamat :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={addr}
                            onChange={(e) => setaddr(e.target.value)}
                            size='small' />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Kota :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={city}
                            onChange={(e) => setcity(e.target.value)}
                            size='small' />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Kode Pos :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={kodePos}
                            onChange={(e) => setkodePos(e.target.value)}
                            size='small' />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Kode Provinsi :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={kodeProv}
                            onChange={(e) => setkodeProv(e.target.value)}
                            size='small' />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Kode Kota :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={kodeCity}
                            onChange={(e) => setkodeCity(e.target.value)}
                            size='small' />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Kode Kelurahan :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={kodeDistrict}
                            onChange={(e) => setkodeDistrict(e.target.value)}
                            size='small' />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Kode Desa :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={kodeVillage}
                            onChange={(e) => setkodeVillage(e.target.value)}
                            size='small' />
                    </Col>
                </Row>

                <Row style={{ marginTop: '2px' }}>
                    <Col span={4}>
                        Posisi Gedung :
                    </Col>
                    <Col span={20}>
                        <Select
                            value={gedung}
                            onChange={(e) => changeGedung(e)}
                            size='small'
                            style={{ width: '100%' }}
                        >
                            <Option key={1} value={1}>RSUD Prof. Dr. Margono Soekarjo Purwokerto</Option>
                            <Option key={2} value={2}>Unit Geriatri dan Paviliun Abiyasa</Option>
                        </Select>
                    </Col>
                </Row>

                <Row style={{ marginTop: '2px' }}>
                    <Col span={4}>
                        Longitude :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={longitude}
                            readOnly
                            maxLength={50}
                            size='small' />
                    </Col>
                </Row>

                <Row style={{ marginTop: '2px' }}>
                    <Col span={4}>
                        Latitude :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={latitude}
                            readOnly
                            maxLength={50}
                            size='small' />
                    </Col>
                </Row>

                <Row style={{ marginTop: '2px' }}>
                    <Col span={4}>
                        Managing Organization :
                    </Col>
                    <Col span={20}>
                        <Input.Group compact>
                            <Select
                                value={org}
                                onChange={(e) => setorg(e)}
                                size='small'
                                style={{ width: '60%' }}
                            >
                                {listOrg.map((item, index) => (
                                    <Option key={index} value={item.id}>{item.name}</Option>
                                ))}
                            </Select>
                            <Button
                                onClick={() => getOrg()}
                                type="primary"
                                htmlType="submit"
                                size="small"
                                loading={spbtn}
                                icon={<CloudDownloadOutlined />}
                            />
                        </Input.Group>
                    </Col>
                </Row>

                <hr />

                <Row>
                    <Col span={24}>
                        <Space style={{ float: 'right' }}>
                            {/* <Button
                                onClick={() => clearToken()}
                                type='primary'
                                style={{ width: '100px' }}
                            >
                                Clear TOKEN
                            </Button>
                            <Button
                                onClick={() => SatuSehatGetToken()}
                                type='primary'
                                style={{ width: '100px' }}
                            >
                                Get TOKEN
                            </Button> */}
                            <Button
                                disabled={!sstoken ? true : false}
                                onClick={() => klikCreate()}
                                type='primary'
                                style={{ width: '100px', float: 'right' }}
                            >
                                Create
                            </Button>
                            <Button
                                onClick={() => setmdCreate(false)}
                                type='primary'
                                danger
                                style={{ width: '100px', float: 'right' }}
                            >
                                Batal
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default SSCreateLocation