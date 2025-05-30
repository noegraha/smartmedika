import React, { useState, Fragment, useContext } from "react";
import { PasienRIContext } from '../../rawatinap/context/PasienRIContext';
import FormScreeningGiziAnak from './FormScreeningGiziAnak';
import FormScreeningGiziDewasa from './FormScreeningGiziDewasa'

const ScreeningGizi = () => {
    const { ruang, curpasRI } = useContext(PasienRIContext);

    return (
        <div>
            {
                curpasRI.umur < 14 ?
                    <FormScreeningGiziAnak /> :
                    <FormScreeningGiziDewasa />
            }


        </div>
    );
};

export default ScreeningGizi;
