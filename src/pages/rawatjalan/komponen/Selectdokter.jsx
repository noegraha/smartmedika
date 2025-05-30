import React, { useContext, Fragment } from 'react';
import { PelayananContext } from '../../context/Pelayanancontext';
import { Select } from 'antd';
const { Option } = Select;

const Selectdokter = () => {
    const { dokter, cariDokter } = useContext(PelayananContext);
    const handleCari = (e) => {
        cariDokter(e);
      }
    return (
        <Fragment>
            {/* <p onClick={cariPelayanan}>COBA</p> */}
        <Select
            dataSource={dokter}
            showSearch
            size="small"
            style={{ width: 250 }}
            placeholder="Pilih Pelaksana"
            optionFilterProp="children"
            // onChange={handleCari}
            onClick={handleCari}
            filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {dokter.map(p => (
                <Option key={p.dokterId}>{p.namaDokter}</Option>
            ))}
        </Select>
        </Fragment>
    );
}
export default Selectdokter;