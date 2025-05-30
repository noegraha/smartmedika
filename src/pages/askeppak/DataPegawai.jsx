import React, { useContext, useState } from "react";
import { Card, Form, Input } from "antd";
import { MasterPegawaiContext } from "../master/context/masterpegawai/MasterPegawaiContext";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const DataPegawai = () => {
  const {
    pegawailist,
    getListPegawaisSkey,
    pegawaidetail,
    getPegawaiById,
    warnaPilih,
    setwarnaPilih,
  } = useContext(MasterPegawaiContext);
  return (
    <div>
      <Card size="small">
        <Form.Item {...formItemLayout} label="NIP">
          <Input value={pegawaidetail.NIP} disabled />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Pegawai ID">
          <Input value={pegawaidetail.PegawaiId} disabled />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Nama">
          <Input value={pegawaidetail.Nama} disabled />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Tempat Lahir">
          <Input value={pegawaidetail.TempatLahir} disabled />
        </Form.Item>
        <Form.Item {...formItemLayout} label="NIK">
          <Input value={pegawaidetail.NIK} disabled />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Tanggal Lahir">
          <Input value={pegawaidetail.TglLahir} disabled />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Jenis Kelamin">
          <Input value={pegawaidetail.JenisKelamin} disabled />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Alamat">
          <Input value={pegawaidetail.Alamat} disabled />
        </Form.Item>
        <Form.Item {...formItemLayout} label="User ID">
          <Input value={pegawaidetail.UserId} disabled />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Pangkat Golongan">
          <Input value={pegawaidetail.PangkatGolongan} disabled />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Deskripsi Jabatan">
          <Input value={pegawaidetail.Deskripsi} disabled />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Jenjang">
          <Input value={pegawaidetail.Jenjang} disabled />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Kategori Golongan">
          <Input value={pegawaidetail.KategoriGolongan} disabled />
        </Form.Item>
      </Card>
    </div>
  );
};

export default DataPegawai;
