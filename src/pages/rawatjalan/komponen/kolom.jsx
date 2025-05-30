import React, { Fragment, useContext } from 'react';
import { KolomContext } from '../context/kolomcontext';
import Scaleslider from './scaleslider';
import Painscale from './painscale';

const Kolom = () => {
    const { kolom } = useContext(KolomContext);
    let k;
    if(kolom === "satu") {
        k =  <Scaleslider />;
    } else if(kolom === "dua") {
        k = <Painscale />
    } else {
        k = <p>Silahkan pilih kolom</p>;
    }
    console.log(kolom);
    return (
        <Fragment>
            {k}
        </Fragment>
    );
}
 
export default Kolom;