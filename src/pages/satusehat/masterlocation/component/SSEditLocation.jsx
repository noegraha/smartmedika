import React, { useState } from 'react'
import { useContext } from 'react'
import { SatuSehatLocationContext } from '../context/SatuSehatLocationContext'
import { Button, Card, Col, Input, Row, Select, Space } from 'antd'
import { CloseOutlined, CloudDownloadOutlined, EditOutlined } from '@ant-design/icons';

const { Option } = Select;

const SSEditLocation = () => {
    const {
        listOrg,
        editId, seteditId,
        editidentSys, seteditidentSys,
        editidentVal, seteditidentVal,
        editstatus, seteditstatus,
        editName, seteditName,
        editDesk, seteditDesk,
        editMode, seteditMode,
        editPhone, seteditPhone,
        editEmail, seteditEmail,
        editUrl, seteditUrl,
        editAdd, seteditAdd,
        editCity, seteditCity,
        editKodePos, seteditKodePos,
        editKodeProv, seteditKodeProv,
        editKodeCity, seteditKodeCity,
        editKodeDistrict, seteditKodeDistrict,
        editKodeVillage, seteditKodeVillage,
        editPhysicalType, seteditPhysicalType,
        editGedung, seteditGedung,
        editLong, seteditLong,
        editLat, seteditLat,
        editPosisi, setEditPosisi,
        editManaging, seteditManaging,
        // func
        getOrg,
        editLocation,
        // md
        setmdEdit,
        // sp
        spbtn,
        spCardCreateLocation,
    } = useContext(SatuSehatLocationContext)

    const changeGedung = (data) => {
        seteditGedung(data)

        if (data === 1) {
            seteditLong(-7.436459859296172)
            seteditLat(109.26736648118339)
        }
        else {
            seteditLong(-7.4167878112018855)
            seteditLat(109.23155592536274)
        }
    }

    const klikEdit = () => {
        let data = {}

        data.resourceType = "Location";
        data.id = editId;
        // data.id = "dc01c797-547a-4e4d-97cd-4ece0630e380";

        let identifier = [
            {
                system: editidentSys,
                value: editidentVal
            }
        ]
        data.identifier = identifier;

        data.status = editstatus;
        data.name = editName;
        data.description = editDesk;
        data.mode = editMode;
        let telecom = [
            {
                system: "phone",
                value: editPhone,
                use: "work"
            },
            {
                system: "email",
                value: editEmail,
                use: "work"
            },
            {
                system: "url",
                value: editUrl,
                use: "work"
            }
        ]
        data.telecom = telecom;
        let address = {
            use: "work",
            line: [
                editAdd
            ],
            city: editCity,
            postalCode: editKodePos,
            country: "ID",
            extension: [
                {
                    url: "https://fhir.kemkes.go.id/r4/StructureDefinition/administrativeCode",
                    extension: [
                        {
                            url: "province",
                            valueCode: editKodeProv
                        },
                        {
                            url: "city",
                            valueCode: editKodeCity
                        },
                        {
                            url: "district",
                            valueCode: editKodeDistrict
                        },
                        {
                            url: "village",
                            valueCode: editKodeVillage
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
                    code: editPhysicalType,
                    display: "Room"
                }
            ]
        }
        data.physicalType = physicalType;
        let position = {
            longitude: editLong,
            latitude: editLat,
            altitude: 0
        }
        data.position = position;
        let managingOrganization = {
            reference: `Organization/${editManaging}`
        }
        data.managingOrganization = managingOrganization;

        console.log('klikedit : ', data);
        editLocation(data, editId)
    }

    return (
        <div>
            <Card
                title='Edit Location Satu Sehat'
                loading={spCardCreateLocation}
                size='small'
                headStyle={{ backgroundColor: '#36cfc9' }}>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        resourceType :
                    </Col>
                    <Col span={20}>
                        <Input
                            value='Location'
                            readOnly
                            size='small' />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        id :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={editId}
                            readOnly
                            size='small' />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        identifier :
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={1} />
                    <Col span={3}>
                        system :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={editidentSys}
                            onChange={(e) => seteditidentSys(e.target.value)}
                            size='small' />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={1} />
                    <Col span={3}>
                        value :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={editidentVal}
                            onChange={(e) => seteditidentVal(e.target.value)}
                            size='small' />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        status :
                    </Col>
                    <Col span={20}>
                        <Select
                            value={editstatus}
                            onChange={(e) => seteditstatus(e)}
                            size='small'
                            style={{ width: '100%' }}
                        >
                            <Option key={1} value={'active'}>Active</Option>
                            <Option key={2} value={'inactive'}>Inactive</Option>
                        </Select>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        name :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={editName}
                            onChange={(e) => seteditName(e.target.value)}
                            size='small' />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        description :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={editDesk}
                            onChange={(e) => seteditDesk(e.target.value)}
                            size='small' />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        mode :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={editMode}
                            size='small' />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Telp :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={editPhone}
                            onChange={(e) => seteditPhone(e.target.value)}
                            size='small' />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Email :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={editEmail}
                            onChange={(e) => seteditEmail(e.target.value)}
                            size='small' />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Url :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={editUrl}
                            onChange={(e) => seteditUrl(e.target.value)}
                            size='small' />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Alamat :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={editAdd}
                            onChange={(e) => seteditAdd(e.target.value)}
                            size='small' />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Kota :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={editCity}
                            onChange={(e) => seteditCity(e.target.value)}
                            size='small' />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Kode Pos :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={editKodePos}
                            onChange={(e) => seteditKodePos(e.target.value)}
                            size='small' />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Kode Provinsi :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={editKodeProv}
                            onChange={(e) => seteditKodeProv(e.target.value)}
                            size='small' />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Kode Kota :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={editKodeCity}
                            onChange={(e) => seteditKodeCity(e.target.value)}
                            size='small' />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Kode Kelurahan :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={editKodeDistrict}
                            onChange={(e) => seteditKodeDistrict(e.target.value)}
                            size='small' />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Kode Desa :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={editKodeVillage}
                            onChange={(e) => seteditKodeVillage(e.target.value)}
                            size='small' />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Tipe Fisik :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={editPhysicalType}
                            readOnly
                            size='small' />
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={4}>
                        Posisi Gedung :
                    </Col>
                    <Col span={20}>
                        <Select
                            value={editGedung}
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
                            value={editLong}
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
                            value={editLat}
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
                                value={editManaging}
                                onChange={(e) => seteditManaging(e)}
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

                <Space size='small' style={{ float: 'right' }}>
                    <Button
                        type='primary'
                        onClick={() => klikEdit()}
                        icon={<EditOutlined />}
                        style={{ width: '75px' }}
                    >
                        Edit
                    </Button>
                    <Button
                        onClick={() => setmdEdit(false)}
                        icon={<CloseOutlined />}
                        style={{ width: '75px' }}
                    >
                        Batal
                    </Button>
                </Space>

            </Card>
        </div>
    )
}

export default SSEditLocation