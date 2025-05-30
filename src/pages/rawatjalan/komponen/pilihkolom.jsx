import React, { Fragment, useContext } from 'react'
import { KolomContext } from '../context/kolomcontext';
const PilihKolom = () => {
    const { pilihKolom } = useContext(KolomContext);

    return (
        <Fragment>
            <select defaultValue="-" onChange={(e) => pilihKolom(e.target.value)}>
                <option value=""> - </option>
                <option value="satu">Satu</option>
                <option value="dua">Dua</option>
            </select>
        </Fragment>
    );
}

export default PilihKolom;