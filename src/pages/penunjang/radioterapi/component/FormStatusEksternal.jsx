import React from 'react'
import { Button, Card, Col, DatePicker, Input, Row, Select, Table, Form, Space, Checkbox, Modal, Popconfirm, Tooltip, Divider, Empty, Spin } from 'antd'
import { PlusOutlined, CloudDownloadOutlined, DeleteOutlined, FileSearchOutlined, CheckSquareTwoTone } from "@ant-design/icons";
import { useContext, useState } from 'react';
import { RadioterapiContext } from '../context/RadioterapiContext';
import PrintRptStsEksterna from './report/PrintRptStsEksterna';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

const FormStatusEksternal = () => {
  const {
    //state
    noReg, setnoReg,
    pasienId,
    diagnosa, setdiagnosa,
    hasilPa, sethasilPa,
    lokasiTumor, setlokasiTumor,
    stadium, setstadium,
    dataKlinis, setdataKlinis,
    tindakan, settindakan,
    penyinaran, setpenyinaran,
    listVolume, setlistVolume,
    tglSimulator, settglSimulator,
    teknis, setteknis,
    radiografer, setradiografer,
    dokter, setdokter,
    tglCt, settglCt,
    radiografer2, setradiografer2,
    clKepala, setclKepala,
    clThorax, setclThorax,
    clPelvis, setclPelvis,
    clCranio, setclCranio,
    clabdomen, setclabdomen,
    smlKepala, setsmlKepala,
    smlThorax, setsmlThorax,
    smlPelvis, setsmlPelvis,
    smlBrain, setsmlBrain,
    smlAbdomen, setsmlAbdomen,
    smlEktrimitas, setsmlEktrimitas,
    Ektrimitas, setEktrimitas,
    linac, setlinac,
    cblt1, setcblt1,
    cblt2, setcblt2,
    brakhi, setbrakhi,
    catatan, setcatatan,
    totalPenyinaran, settotalPenyinaran,
    listRiwayat, setlistRiwayat,
    listDiagnosa,
    userEntry,
    //func
    getLoadDokter,
    getLoadRadiografer,
    getRiwayatRd,
    getDiagnosaPx,
    simpanStatusEksterna,
    ReportStsEksterna,
    //mst
    listRd,
    listDokter,
    //spin
    spDataPasien,
    spTbDiagnosa,
    //modal
    mdTambahVolume, setmdTambahVolume,
  } = useContext(RadioterapiContext)

  const [inputVolume, setinputVolume] = useState('');
  const [inputDosisTotal, setinputDosisTotal] = useState('');
  const [inputDosisMingguan, setinputDosisMingguan] = useState('');
  const [inputJumlahFraksi, setinputJumlahFraksi] = useState('');
  const [inputNomorPenyinaran, setinputNomorPenyinaran] = useState('');


  const [mdDiagnosis, setmdDiagnosis] = useState(false)

  const columns = [
    {
      title: 'Volume Target',
      dataIndex: 'VOLUME',
      key: 'VOLUME',
      align: 'center',
      width: '90px',
      ellipsis: true,
    },
    {
      title: 'Dosis Total',
      dataIndex: 'DOSIS_TOTAL',
      key: 'DOSIS_TOTAL',
      align: 'center',
      width: '70px',
      ellipsis: true,
    },
    {
      title: 'Dosis / Mingguan',
      dataIndex: 'DOSIS_MINGGUAN',
      key: 'DOSIS_MINGGUAN',
      align: 'center',
      width: '70px',
      ellipsis: true,
    },
    {
      title: 'Jumlah Fraksi / Minggu',
      dataIndex: 'JUMLAH_FRAKSI',
      key: 'JUMLAH_FRAKSI',
      align: 'center',
      width: '90px',
      ellipsis: true,
    },
    {
      title: 'Nomor Lapangan Penyinaran',
      dataIndex: 'NOMOR_PENYINARAN',
      key: 'NOMOR_PENYINARAN',
      align: 'center',
      width: '90px',
      ellipsis: true,
    },
    {
      title: 'Aksi',
      align: 'center',
      width: '30px',
      render: (index) => (
        <Popconfirm
          title="Yakin hapus?"
          onConfirm={() => klikHapus(index)}
          okText='Ya'
          cancelText='Tidak'>
          <a><DeleteOutlined /></a>
        </Popconfirm>
      )
    },
  ];

  const colTbDiagnosis = [
    {
      title: 'No. Registrasi',
      dataIndex: 'RegistrasiId',
      key: 'RegistrasiId',
      align: 'center',
    },
    {
      title: 'No. Urut',
      dataIndex: 'NoUrut',
      key: 'NoUrut',
      align: 'center',
    },
    {
      title: 'Diagnosis',
      dataIndex: 'Diagnosis',
      key: 'Diagnosis',
      align: 'center',
    },
    {
      title: 'Aksi',
      align: 'center',
      width: 50,
      render: (text, record, index) => (
        <Space>
          <Button
            onClick={() => {
              if (diagnosa) {
                if (diagnosa.length + record.Diagnosis.length < 100) {
                  let data = diagnosa + ", " + record.Diagnosis
                  setdiagnosa(data)
                }
                else {
                  Modal.warning({
                    title: 'Peringatan!',
                    content: 'Diagnosa tidak boleh lebih dari 100 karakter!',
                  });
                }
              }
              else {
                let data = record.Diagnosis
                setdiagnosa(data)
              }
            }
            }
            // type="primary"
            icon={<CheckSquareTwoTone twoToneColor="#52c41a" />}
            // disabled={record.StsDatang}
            size='small'
            style={{ width: '30px' }}
          />
        </Space>
      ),
    },
  ];

  const locale = {
    emptyText: <Empty description="Tidak ada data" />,
  };

  const rstInputVolume = () => {
    setinputVolume('')
    setinputDosisTotal('')
    setinputDosisMingguan('')
    setinputJumlahFraksi('')
    setinputNomorPenyinaran('')
  }

  const klikTambah = () => {
    rstInputVolume()
    setmdTambahVolume(true)
  }

  const klikTambah2 = () => {
    setlistVolume(current => [
      ...current,
      {
        VOLUME: inputVolume,
        DOSIS_TOTAL: inputDosisTotal,
        DOSIS_MINGGUAN: inputDosisMingguan,
        JUMLAH_FRAKSI: inputJumlahFraksi,
        NOMOR_PENYINARAN: inputNomorPenyinaran,
        NOREG: noReg,
        USERENTRY: userEntry,
      }
    ])
    setmdTambahVolume(false)
  }

  const klikHapus = (index) => {
    setlistVolume(prevAction => (
      prevAction.filter((i) => i !== index)
    ));
  }

  const klikLoadRd = () => {
    getLoadRadiografer("7", "9404");
  }

  const klikLoadDokter = () => {
    getLoadDokter("1, 2", "9404");
  }

  const klikLihatRiwayat = () => {
    getRiwayatRd(pasienId)
  }

  const klikKosongkanForm = () => {
    setdiagnosa('')
    sethasilPa('')
    setlokasiTumor('')
    setstadium('')
    setdataKlinis('')
    setlistVolume([])
    settglSimulator(dayjs())
    setradiografer('')
    setteknis('')
    setdokter('')
    settglCt(dayjs())
    setradiografer2('')
    setclKepala(false)
    setclThorax(false)
    setclPelvis(false)
    setclCranio(false)
    setclabdomen(false)
    setcatatan('')
    setlistRiwayat([])
  }

  const onChangeClKepala = (e) => {
    console.log(e);
  }

  const klikSimpan = () => {
    if (!noReg) {
      Modal.warning({ title: 'Peringatan!', content: 'Pasien masih kosong!' })
    }
    else if (!tindakan) {
      Modal.warning({ title: 'Peringatan!', content: 'Tindakan masih kosong!' })
    }
    else if (!penyinaran) {
      Modal.warning({ title: 'Peringatan!', content: 'Penyinaran masih kosong!' })
    }
    else if (!totalPenyinaran) {
      Modal.warning({ title: 'Peringatan!', content: 'Total penyinaran masih kosong!' })
    }
    else {
      let data = {
        noreg: noReg,
        nopasien: pasienId,
        diagnosa: diagnosa,
        lokasI_TUMOR: lokasiTumor,
        stadium: stadium,
        hasiL_PA: hasilPa,
        datA_KLINIS: dataKlinis,
        tindakan: tindakan,
        penyinaran: penyinaran,
        tglsimulator: dayjs(tglSimulator).format(),
        radiografeR1: radiografer,
        teknis: teknis,
        kodedokter: dokter,
        smlkepala: smlKepala ? 1 : 0,
        smlthorax: smlThorax ? 1 : 0,
        smlpelvis: smlPelvis ? 1 : 0,
        smlbrain: smlBrain ? 1 : 0,
        smlabdomen: smlAbdomen ? 1 : 0,
        smlekstrimitas: smlEktrimitas ? 1 : 0,
        tgldosimetri: dayjs(tglCt).format(),
        radiografeR2: radiografer2,
        kepala: clKepala ? 1 : 0,
        cranio: clCranio ? 1 : 0,
        thorax: clThorax ? 1 : 0,
        abdomen: clabdomen ? 1 : 0,
        pelvis: clPelvis ? 1 : 0,
        ekstrimitas: Ektrimitas ? 1 : 0,
        linac: linac ? 1 : 0,
        cobalT1: cblt1 ? 1 : 0,
        cobalT2: cblt2 ? 1 : 0,
        brakhiterapi: brakhi ? 1 : 0,
        catatan: catatan,
        totalpenyinaran: totalPenyinaran,
        userentry: userEntry,
        emrRadioterapiList: listVolume,
      }
      console.log('klikSimpan : ', data);

      simpanStatusEksterna(data);
    }
  }

  const klikDiagnosis = (sNoreg) => {
    setmdDiagnosis(true)
    getDiagnosaPx(sNoreg)
  }

  // const klikCetak = () => {
  //   if (noReg.length === 0) {
  //     Modal.warning({
  //       title: 'Peringatan!',
  //       content: 'Pasien belum dipilih',
  //     });
  //   }
  //   else {
  //     setmdCetakStatusEksterna(true)
  //     ReportStsEksterna(noReg)
  //   }
  // }

  // untuk menghandle inputan hanya angka
  const handleChange = (e) => {
    const newValue = e.target.value;
    // Menghapus karakter non-angka
    const filteredValue = newValue.replace(/[^0-9]/g, '');
    return filteredValue; // Memperbarui state dengan nilai yang sudah difilter
  };

  return (
    <div style={{ padding: '10px' }}>
      {/* <Card loading={spDataPasien}>
      </Card> */}
      <Spin spinning={spDataPasien}>
        <Row style={{ marginBottom: '2px' }}>
          <Col span={3}>
            <span>
              Diagnosa :
            </span>
          </Col>
          <Col span={21}>
            <Input.Group compact>
              <Input placeholder="..."
                value={diagnosa}
                onChange={(e) => setdiagnosa(e.target.value)}
                maxLength={100}
                // size='small' 
                style={{ width: '94%' }} />
              <Button
                type="primary"
                disabled={!noReg}
                onClick={() => klikDiagnosis(noReg)}
                style={{ width: "6%" }}
                icon={<FileSearchOutlined />}
              />
            </Input.Group>
          </Col>
        </Row>
        <Row style={{ marginBottom: '2px' }}>
          <Col span={3}>
            <span>
              Hasil PA :
            </span>
          </Col>
          <Col span={21}>
            <TextArea
              onChange={(e) => sethasilPa(e.target.value)}
              placeholder='Hasil PA'
              rows={2}
              value={hasilPa} />
          </Col>
        </Row>
        <Row style={{ marginBottom: '2px' }}>
          <Col span={3}>
            <span>
              Lokasi Tumor Primer :
            </span>
          </Col>
          <Col span={21}>
            <Input
              value={lokasiTumor}
              onChange={(e) => setlokasiTumor(e.target.value)}
              placeholder='Lokasi Tumor Primer' />
          </Col>
        </Row>
        <Row style={{ marginBottom: '2px' }}>
          <Col span={3}>
            <span>
              Stadium :
            </span>
          </Col>
          <Col span={21}>
            <Input
              value={stadium}
              onChange={(e) => setstadium(e.target.value)}
              placeholder='Stadium' />
          </Col>
        </Row>
        <Row style={{ marginBottom: '2px' }}>
          <Col span={3}>
            <span>
              Data Klinis :
            </span>
          </Col>
          <Col span={21}>
            <TextArea
              onChange={(e) => setdataKlinis(e.target.value)}
              rows={4}
              placeholder='Data Klinis'
              value={dataKlinis} />
          </Col>
        </Row>

        <Row>
          <Col span={3}>
          </Col>
          <Col span={21}>
            <Button
              type='text'
              onClick={() => klikTambah()}
              disabled={!noReg}
              size='small'
              style={{ marginBottom: '2px', backgroundColor: '#52c41a', color: 'white', width: '150px' }}>
              <PlusOutlined /> Tambah
            </Button>
          </Col>
        </Row>

        <Row style={{ marginBottom: '2px' }}>
          <Col span={3}>
          </Col>
          <Col span={21}>
            <Table
              dataSource={listVolume}
              columns={columns}
              size='small'
              bordered
              pagination={false} />
          </Col>
        </Row>

        <Row style={{ marginBottom: '2px' }}>
          <Col span={3}>
            <span>
              Total Penyinaran :
            </span>
          </Col>
          <Col span={10}>
            <Tooltip title="Inputkan data total jumlah penyinaran yang akan dilakukan.">
              <Input
                placeholder="..."
                maxLength={3}
                value={totalPenyinaran}
                onChange={(e) => {
                  let data = handleChange(e);
                  settotalPenyinaran(data);
                }}
              />
            </Tooltip>
          </Col>
        </Row>

        <Row style={{ marginBottom: '2px' }}>
          <Col span={3}>
            <span>Tindakan :</span>
          </Col>
          <Col span={10}>
            <Select
              style={{ width: '100%' }}
              placeholder="..."
              value={tindakan}
              onChange={(e) => settindakan(e)}
            >
              <Option key="A" value="Simulator">Simulator</Option>
              <Option key="B" value="CT-Simulator">CT-Simulator</Option>
            </Select>
          </Col>
        </Row>

        <Row style={{ marginBottom: '2px' }}>
          <Col span={3}>
          </Col>
          <Col span={21}>
            {
              tindakan === 'Simulator' ?
                <Card
                  title='Simulator'
                  size='small'
                  headStyle={{ backgroundColor: '#FC819E' }}
                // style={{ marginTop: '5px' }}
                >
                  <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    labelAlign="left"
                  >
                    <Row>
                      <Col span={12}>
                        <Form.Item
                          label="Tanggal Simulator"
                          style={{ marginBottom: "0px" }}
                        >
                          <DatePicker
                            value={tglSimulator}
                            onChange={(e) => settglSimulator(dayjs(e))}
                            format={'DD-MM-YYYY'}
                            allowClear={false}
                            inputReadOnly={true}
                            size='small'
                            style={{ width: '95%' }} />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Checkbox
                          checked={smlKepala}
                          onChange={(e) => setsmlKepala(e.target.checked)}
                        >
                          Kepala Leher
                        </Checkbox>
                      </Col>
                      <Col span={4}>
                        <Checkbox
                          checked={smlThorax}
                          onChange={(e) => setsmlThorax(e.target.checked)}
                        >
                          Thorax
                        </Checkbox>
                      </Col>
                      <Col span={4}>
                        <Checkbox
                          checked={smlPelvis}
                          onChange={(e) => setsmlPelvis(e.target.checked)}
                        >
                          Pelvis
                        </Checkbox>
                      </Col>
                    </Row>

                    <Row>
                      <Col span={12}>
                        <Form.Item
                          label="Radiografer"
                          style={{ marginBottom: "0px" }}
                        >
                          <Input.Group compact>
                            <Select
                              value={radiografer}
                              onChange={(e) => setradiografer(e)}
                              // onFocus={() => getLoadDokter('1,2', '9404')}
                              size='small'
                              style={{ width: '85%' }}>
                              {listRd.map((optListRd, index) => (
                                <Option key={index} value={optListRd.KODEDOKTER}>{optListRd.NAMADOKTER}</Option>
                              ))}
                            </Select>
                            <Tooltip title='klik disini jika option Radiografer tidak muncul'>
                              <Button
                                onClick={() => klikLoadRd()}
                                type="primary"
                                size="small"
                                style={{ width: '10%' }}>
                                <CloudDownloadOutlined />
                              </Button>
                            </Tooltip>
                          </Input.Group>
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        {/* <Checkbox
                  checked={clCranio}
                  onChange={(e) => setclCranio(e.target.checked)} >
                  Cranio Cacial
                </Checkbox> */}
                        <Checkbox
                          checked={smlBrain}
                          onChange={(e) => setsmlBrain(e.target.checked)} >
                          Brain
                        </Checkbox>
                      </Col>
                      <Col span={4}>
                        <Checkbox
                          checked={smlAbdomen}
                          onChange={(e) => setsmlAbdomen(e.target.checked)} >
                          Abdomen
                        </Checkbox>
                      </Col>
                      <Col span={4}>
                        <Checkbox
                          checked={smlEktrimitas}
                          onChange={(e) => setsmlEktrimitas(e.target.checked)} >
                          Ektrimitas
                        </Checkbox>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={12}>
                        <Form.Item
                          label="Teknis"
                          style={{ marginBottom: "0px" }}
                        >
                          <Select
                            value={teknis}
                            onChange={(e) => setteknis(e)}
                            size='small'
                            style={{ width: '95%' }}>
                            <Option key='1' value='SAD'>SAD</Option>
                            <Option key='2' value='SD'>SD</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Dokter"
                          style={{ marginBottom: "0px" }}
                        >
                          <Input.Group compact>
                            <Select
                              value={dokter}
                              onChange={(e) => setdokter(e)}
                              size='small'
                              style={{ width: '90%' }}>
                              {listDokter.map((optListDokter, index) => (
                                <Option key={index} value={optListDokter.KODEDOKTER}>{optListDokter.NAMADOKTER}</Option>
                              ))}
                            </Select>
                            <Tooltip title='klik disini jika option Dokter tidak muncul'>
                              <Button
                                onClick={() => klikLoadDokter()}
                                type="primary"
                                size="small"
                                style={{ width: '10%' }}>
                                <CloudDownloadOutlined />
                              </Button>
                            </Tooltip>
                          </Input.Group>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form>
                </Card>
                : tindakan === 'CT-Simulator' ?
                  <Card
                    title='CT-Simulator'
                    size='small'
                    headStyle={{ backgroundColor: '#FC819E' }}
                    style={{ marginTop: '5px' }} >
                    <Form
                      name="basic"
                      labelCol={{ span: 6 }}
                      wrapperCol={{ span: 18 }}
                      labelAlign="left"
                    >
                      <Row>
                        <Col span={12}>
                          <Form.Item
                            label="Tgl CT-Simulator"
                            style={{ marginBottom: "0px" }}
                          >
                            <DatePicker
                              value={tglCt}
                              onChange={(e) => settglCt(dayjs(e))}
                              format={'DD-MM-YYYY'}
                              allowClear={false}
                              inputReadOnly={true}
                              size='small'
                              style={{ width: '95%' }} />
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Checkbox
                            checked={clKepala}
                            // onChange={(e) => onChangeClKepala(e.target.checked)}
                            onChange={(e) => setclKepala(e.target.checked)}
                          >
                            Kepala Leher
                          </Checkbox>
                        </Col>
                        <Col span={4}>
                          <Checkbox
                            checked={clThorax}
                            onChange={(e) => setclThorax(e.target.checked)} >
                            Thorax
                          </Checkbox>
                        </Col>
                        <Col span={4}>
                          <Checkbox
                            checked={clPelvis}
                            onChange={(e) => setclPelvis(e.target.checked)} >
                            Pelvis
                          </Checkbox>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={12}>
                          <Form.Item
                            label="Radiografer"
                            style={{ marginBottom: "0px" }}
                          >
                            <Input.Group compact>
                              <Select
                                value={radiografer2}
                                onChange={(e) => setradiografer2(e)}
                                size='small'
                                style={{ width: '85%' }}>
                                {listRd.map((optListRd, index) => (
                                  <Option key={index} value={optListRd.KODEDOKTER}>{optListRd.NAMADOKTER}</Option>
                                ))}
                              </Select>
                              <Tooltip title='klik disini jika option Radiografer tidak muncul'>
                                <Button
                                  onClick={() => klikLoadRd()}
                                  type="primary"
                                  size="small"
                                  style={{ width: '10%' }}>
                                  <CloudDownloadOutlined />
                                </Button>
                              </Tooltip>
                            </Input.Group>
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          {/* <Checkbox
                          checked={clCranio}
                          onChange={(e) => setclCranio(e.target.checked)} >
                          Cranio Cacial
                        </Checkbox> */}
                          <Checkbox
                            checked={clCranio}
                            onChange={(e) => setclCranio(e.target.checked)} >
                            Brain
                          </Checkbox>
                        </Col>
                        <Col span={4}>
                          <Checkbox
                            checked={clabdomen}
                            onChange={(e) => setclabdomen(e.target.checked)} >
                            Abdomen
                          </Checkbox>
                        </Col>
                        <Col span={4}>
                          <Checkbox
                            checked={Ektrimitas}
                            onChange={(e) => setEktrimitas(e.target.checked)} >
                            Ektrimitas
                          </Checkbox>
                        </Col>
                      </Row>
                    </Form>
                  </Card>
                  : null
            }
          </Col>
        </Row>

        <Row style={{ marginBottom: '2px' }}>
          <Col span={3}>
            <span>Penyinaran :</span>
          </Col>
          <Col span={10}>
            <Select
              style={{ width: '100%' }}
              placeholder="..."
              value={penyinaran}
              onChange={(e) => setpenyinaran(e)}
            >
              <Option key="C" value="Linac">Linac</Option>
              <Option key="D" value="Cobalt 1">Cobalt 1</Option>
              <Option key="E" value="Cobalt 2">Cobalt 2</Option>
              <Option key="F" value="Brakhiterapi">Brakhiterapi</Option>
            </Select>
          </Col>
        </Row>

        {/* <Card
        title='Penyinaran'
        size='small'
        headStyle={{ backgroundColor: '#FC819E' }}
        style={{ marginTop: '5px' }} >
        <Row>
          <Col span={6}>
            <Checkbox
              checked={linac}
              onChange={(e) => setlinac(e.target.checked)}
            >
              Linac
            </Checkbox>
          </Col>
          <Col span={6}>
            <Checkbox
              checked={cblt1}
              onChange={(e) => setcblt1(e.target.checked)}
            >
              Cobalt 1
            </Checkbox>
          </Col>
          <Col span={6}>
            <Checkbox
              checked={cblt2}
              onChange={(e) => setcblt2(e.target.checked)}
            >
              Cobalt 2
            </Checkbox>
          </Col>
          <Col span={6}>
            <Checkbox
              checked={brakhi}
              onChange={(e) => setbrakhi(e.target.checked)}
            >
              Brakhiterapi
            </Checkbox>
          </Col>
        </Row>
      </Card> */}

        <Row style={{ marginBottom: '5px' }}>
          <Col span={3}>
            <span>
              Catatan :
            </span>
          </Col>
          <Col span={21}>
            <TextArea
              value={catatan}
              onChange={(e) => setcatatan(e.target.value)}
              placeholder='Catatan'
              rows={7} />
          </Col>
        </Row>
      </Spin>

      <Row>
        <Col span={24}>
          <Space style={{ float: 'right' }}>
            {/* <Button
            onClick={() => klikCetak()}
            // type='primary'
            style={{ width: '75px' }}>
            Cetak
          </Button> */}
            <Button
              onClick={() => klikSimpan()}
              type='primary'
              disabled={!noReg}
              style={{ width: '150px' }}>
              Simpan
            </Button>
          </Space>
        </Col>
      </Row>

      <Modal
        // title="Tambah Data"
        centered
        visible={mdTambahVolume}
        cancelText='Batal'
        onCancel={() => setmdTambahVolume(false)}
        okText='Tambah'
        onOk={() => klikTambah2()}
        closable={false}
        width={500}>
        <div>
          <Card
            size='small'
            title='Tambah Data'
            headStyle={{ backgroundColor: '#ffa39e' }}
          >
            <Row style={{ marginBottom: '2px' }}>
              <Col span={10}>
                <span>Volume Target :</span>
              </Col>
              <Col span={14}>
                <Input
                  value={inputVolume}
                  onChange={(e) => setinputVolume(e.target.value)}
                  maxLength={50}
                  type='text'
                  placeholder='Volume Target'
                  // size='small'
                  style={{ width: '100%' }} />
              </Col>
            </Row>
            <Row style={{ marginBottom: '2px' }}>
              <Col span={10}>
                <span>Dosis Total :</span>
              </Col>
              <Col span={14}>
                <Input
                  value={inputDosisTotal}
                  onChange={(e) => setinputDosisTotal(e.target.value)}
                  maxLength={50}
                  type='text'
                  placeholder='Dosis Total'
                  // size='small'
                  style={{ width: '100%' }} />
              </Col>
            </Row>
            <Row style={{ marginBottom: '2px' }}>
              <Col span={10}>
                <span>Dosis / Mingguan :</span>
              </Col>
              <Col span={14}>
                <Input
                  value={inputDosisMingguan}
                  onChange={(e) => setinputDosisMingguan(e.target.value)}
                  maxLength={50}
                  placeholder='Dosis / Mingguan'
                // size='small' 
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: '2px' }}>
              <Col span={10}>
                <span>Jumlah Fraksi / Minggu :</span>
              </Col>
              <Col span={14}>
                <Input
                  value={inputJumlahFraksi}
                  onChange={(e) => setinputJumlahFraksi(e.target.value)}
                  maxLength={50}
                  placeholder='Jumlah Fraksi / Minggu'
                // size='small' 
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: '2px' }}>
              <Col span={10}>
                <span>Nomor Lapangan Penyinaran :</span>
              </Col>
              <Col span={14}>
                <Input
                  value={inputNomorPenyinaran}
                  onChange={(e) => setinputNomorPenyinaran(e.target.value)}
                  maxLength={50}
                  placeholder='Nomor Lapangan Penyinaran'
                // size='small' 
                />
              </Col>
            </Row>
          </Card>
        </div>
      </Modal >

      {/* MD DIAGNOSA PASIEN */}
      < Modal
        centered
        open={mdDiagnosis}
        onCancel={() => setmdDiagnosis(false)}
        closable={false}
        footer={null}
        width={500}
      >
        <Divider
          orientation='left'
          style={{ backgroundColor: '#ffa39e', margin: '0px' }}>
          Diagnosis Pasien
        </Divider>

        <Table
          bordered
          loading={spTbDiagnosa}
          columns={colTbDiagnosis}
          dataSource={listDiagnosa}
          pagination={false}
          locale={locale}
        />
      </Modal >

    </div >
  )
}

export default FormStatusEksternal