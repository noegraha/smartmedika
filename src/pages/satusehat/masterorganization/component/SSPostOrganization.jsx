import { Button, Card, Col, Divider, Input, Modal, Row, Select, Space, Tooltip } from 'antd'
import React from 'react'
import { useContext } from 'react';
import { SatuSehatOrganizationContext } from '../context/SatuSehatOrganizationContext';

const { Option } = Select;

const SSPostOrganization = () => {
    const {
        // list
        listOrg,
        detailEnv,
        // create
        OrgIdentUse,
        OrgIhsNum,
        OrgIdentValue, setOrgIdentValue,
        OrgIdentActive, setOrgIdentActive,
        OrgType, setOrgType,
        OrgName, setOrgName,
        OrgPartOf, setOrgPartOf,
        OrgTelcPhone,
        OrgTelcEmail,
        OrgTelcUrl,
        OrgAddresse,
        // mst
        OrgListPartOf,
        OrgListGetPartOf,
        // spin
        spCreateOrganization,
        // func
        createOrganization,
    } = useContext(SatuSehatOrganizationContext)

    const klikCreate = () => {
        if (!OrgIdentValue) {
            Modal.warn({
                title: 'Peringatan!',
                content: `Organization Identifier Value masih kosong!`,
            })
        }
        else if (!OrgIdentActive) {
            Modal.warn({
                title: 'Peringatan!',
                content: `Organization Identifier Active masih kosong!`,
            })
        }
        else if (!OrgType) {
            Modal.warn({
                title: 'Peringatan!',
                content: `Organization Type masih kosong!`,
            })
        }
        else if (!OrgName) {
            Modal.warn({
                title: 'Peringatan!',
                content: `Organization Name masih kosong!`,
            })
        }
        else if (!OrgPartOf) {
            Modal.warn({
                title: 'Peringatan!',
                content: `Organization PartOf masih kosong!`,
            })
        }
        else {
            let data = {}

            data.resourceType = 'Organization';
            data.active = OrgIdentActive;

            let identifier = [
                {
                    use: "official",
                    system: `http://sys-ids.kemkes.go.id/organization/${OrgIhsNum}`,
                    value: OrgIdentValue
                }
            ]

            data.identifier = identifier;

            let type = [
                {
                    coding: [
                        {
                            system: "http://terminology.hl7.org/CodeSystem/organization-type",
                            code: "dept",
                            display: "Hospital Department"
                        }
                    ]
                }
            ]

            data.type = type;
            data.name = OrgName;

            let telecom = [
                {
                    system: "phone",
                    value: OrgTelcPhone,
                    use: "work"
                },
                {
                    system: "email",
                    value: OrgTelcEmail,
                    use: "work"
                },
                {
                    system: "url",
                    value: OrgTelcUrl,
                    use: "work"
                }
            ]

            data.telecom = telecom;

            let address = [
                {
                    use: "work",
                    type: "both",
                    line: [
                        OrgAddresse
                    ],
                    city: "Purwokerto",
                    postalCode: "53146",
                    country: "ID",
                    extension: [
                        {
                            url: "https://fhir.kemkes.go.id/r4/StructureDefinition/administrativeCode",
                            extension: [
                                {
                                    url: "province",
                                    valueCode: "33"
                                },
                                {
                                    url: "city",
                                    valueCode: "3302"
                                },
                                {
                                    url: "district",
                                    valueCode: "330224"
                                },
                                {
                                    url: "village",
                                    valueCode: "3302241003"
                                }
                            ]
                        }
                    ]
                }
            ]

            data.address = address;

            let partOf = {
                reference: `Organization/${OrgPartOf}`
            }

            data.partOf = partOf;

            console.log('data : ', data);
            createOrganization(data)
        }
    }

    return (
        <div>
            <Card
                loading={spCreateOrganization}
                title='Create Organization'
                size='small'
                headStyle={{ textAlign: 'center', backgroundColor: '#36cfc9' }}
                style={{ marginTop: '5px' }} >
                <Row>
                    <Col span={4}>
                        Organization.identifier.use :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={OrgIdentUse}
                            readOnly
                            size='small' />
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={4}>
                        Organization.identifier.system :
                    </Col>
                    <Col span={20}>
                        <Tooltip title="Organization-ihs-number adalah nomor IHS organisasi induk yang didapatkan dari master sarana index">
                            <Input
                                addonBefore='IHS Number'
                                value={OrgIhsNum}
                                readOnly
                                maxLength={8}
                                size='small' />
                        </Tooltip>
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={4}>
                        Organization.identifier.value :
                    </Col>
                    <Col span={20}>
                        <Tooltip title="kode/nomor internal suborganisasi">
                            <Input
                                value={OrgIdentValue}
                                onChange={(e) => setOrgIdentValue(e.target.value)}
                                maxLength={10}
                                size='small' />
                        </Tooltip>
                    </Col>
                </Row>

                <hr />

                <Row style={{ marginTop: '2px' }}>
                    <Col span={4}>
                        Organization.identifier.active :
                    </Col>
                    <Col span={20}>
                        <Select
                            value={OrgIdentActive}
                            onChange={(e) => setOrgIdentActive(e)}
                            size='small'
                            style={{ width: '100%' }}
                        >
                            <Option key={1} value={true}>Ya</Option>
                            <Option key={2} value={false}>Tidak</Option>
                        </Select>
                    </Col>
                </Row>

                {/* <hr /> */}

                <Row style={{ marginTop: '2px' }}>
                    <Col span={4}>
                        Organization.type :
                    </Col>
                    <Col span={20}>
                        <Select
                            value={OrgType}
                            onChange={(e) => setOrgType(e)}
                            size='small'
                            style={{ width: '100%' }}
                        >
                            <Option key={1} value='prov'>Fasilitas Pelayanan Kesehatan</Option>
                            <Option key={2} value='dept'>Departemen dalam Rumah Sakit</Option>
                        </Select>
                    </Col>
                </Row>

                <Row style={{ marginTop: '2px' }}>
                    <Col span={4}>
                        Organization.name :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={OrgName}
                            onChange={(e) => setOrgName(e.target.value)}
                            maxLength={50}
                            size='small' />
                    </Col>
                </Row>

                <Row style={{ marginTop: '2px' }}>
                    <Col span={4}>
                        Organization.partof :
                    </Col>
                    <Col span={20}>
                        <Select
                            value={OrgPartOf}
                            onChange={(e) => setOrgPartOf(e)}
                            // onFocus={() => getLoadDokter('1,2', '9404')}
                            size='small'
                            style={{ width: '100%' }}>
                            {listOrg.map((item, index) => (
                                <Option key={index} value={item.id}>{item.name}</Option>
                            ))}
                        </Select>
                    </Col>
                </Row>

                <Row style={{ marginTop: '2px' }}>
                    <Col span={4}>
                        Organization.telecom.phone :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={OrgTelcPhone}
                            readOnly
                            maxLength={50}
                            size='small' />
                    </Col>
                </Row>

                <Row style={{ marginTop: '2px' }}>
                    <Col span={4}>
                        Organization.telecom.email :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={OrgTelcEmail}
                            readOnly
                            maxLength={50}
                            size='small' />
                    </Col>
                </Row>

                <Row style={{ marginTop: '2px' }}>
                    <Col span={4}>
                        Organization.telecom.url :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={OrgTelcUrl}
                            readOnly
                            maxLength={50}
                            size='small' />
                    </Col>
                </Row>

                <Row style={{ marginTop: '2px' }}>
                    <Col span={4}>
                        Organization.address :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={OrgAddresse}
                            readOnly
                            maxLength={50}
                            size='small' />
                    </Col>
                </Row>

                <hr />

                <Row>
                    <Col span={24}>
                        <Space style={{ float: 'right' }}>
                            <Button
                                onClick={() => klikCreate()}
                                type='primary'
                                style={{ width: '75px' }}
                            >
                                Simpan
                            </Button>
                        </Space>
                    </Col>
                </Row>

            </Card>
        </div>
    )
}

export default SSPostOrganization