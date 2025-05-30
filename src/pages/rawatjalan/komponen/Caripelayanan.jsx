import React, { Fragment, useContext, useState } from 'react';
import { Table, Input, Button } from 'antd';
import { PelayananContext } from '../../context/Pelayanancontext';
const { Column } = Table;
const { Search } = Input;

const Caripelayanan = () => {
    const { pelayanan, cariPelayanan } = useContext(PelayananContext);
    const [selectedPelayanan, setSelectedPelayanan] = useState([]);
    const handleCari = (e) => {
        cariPelayanan(e);
    }
    const pilihPelayanan = (e) => {
        setSelectedPelayanan([...selectedPelayanan]);
    }
    return (
        <div>
            <Fragment>
                <Search placeholder="Cari pelayanan..." onChange={(e) => handleCari(e.target.value)} />
                <Table dataSource={pelayanan} 
                    size="small" rowKey="reg" scroll={{ y: 240 }} >
                    <Column title="Kode Pelayanan" key="reg" className="bgcolortunggu" width="90px"
                        render={(pelayanan) => (
                            <span>
                                {pelayanan.pelayananId}
                            </span>
                        )} />
                    <Column
                        title="Nama Pelayanan"
                        key="nama"
                        className="bgcolordanger1"
                        render={(pelayanan) => (
                            <span>
                                <Button size="small" type="link" onClick={(e) => pilihPelayanan(e.target.value)}>{pelayanan.deskripsi}</Button>
                            </span>
                        )} />
                </Table>
            </Fragment>
        </div>
    );
}

export default Caripelayanan;