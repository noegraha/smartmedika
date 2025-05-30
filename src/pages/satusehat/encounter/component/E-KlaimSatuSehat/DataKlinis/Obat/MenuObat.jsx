import { Tabs } from 'antd';
import React from 'react';
import { useState } from 'react';
import MedicationRequest from './MedicationRequest';
import PengkajianResep from './PengkajianResep';
import MedicationDispense from './MedicationDispense';
import MedicationAdministration from './MedicationAdministration';

const MenuObat = () => {
    const [tabObat, settabObat] = useState('1');

    const itemsTatalaksana = [
        {
            label: 'Peresepan Obat',
            key: '1',
            children: <MedicationRequest />,
        },
        {
            label: 'Pengkajian Resep',
            key: '2',
            children: <PengkajianResep />,
        },
        {
            label: 'Pengeluaran Obat',
            key: '3',
            children: <MedicationDispense />,
        },
        {
            label: 'Pemberian Obat',
            key: '4',
            children: <MedicationAdministration />,
        },
    ]

    return (
        <div>
            <Tabs
                onChange={(e) => settabObat(e)}
                type="card"
                items={itemsTatalaksana}
                activeKey={tabObat}
            />
        </div>
    )
}

export default MenuObat