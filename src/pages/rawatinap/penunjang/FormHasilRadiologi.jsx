import React, { useContext, useState } from 'react'
import Iframe from 'react-iframe'
import { HasilRadiologiContext } from '../context/HasilRadiologiContext';
import { Select } from 'antd';
const { Option } = Select;

const Formhasilradiologi = () => {
    const { hasilradiologi } = useContext(HasilRadiologiContext);
    const [URL, setURL] = useState('');

    const handleCariSelect = (e) => {
        setURL(e)
    }
    return (
        <div>
            <Select
                dataSource={hasilradiologi}
                showSearch
                style={{ width: 250, marginTop: 12 }}
                placeholder="Pilih layanan..."
                optionFilterProp="children"
                onChange={handleCariSelect}
                filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {hasilradiologi.map(d => (
                    <Option key={d.fotoUrl}>{d.layanan}</Option>
                ))}
            </Select>
            <Iframe url={URL}
                width="100%"
                height="750px"
                id="myId"
                className="myClassname"
                display="initial"
                position="relative" />
        </div>
    )
}

export default Formhasilradiologi
