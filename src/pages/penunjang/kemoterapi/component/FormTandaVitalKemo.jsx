import { Button, Col, DatePicker, Form, Input, Modal, Row, Select, Slider, Space, Tooltip } from 'antd';
import React, { useContext, useState } from 'react'
import { KemoterapiContext } from '../context/KemoterapiContext';
import { PasienRIContext } from '../../../rawatinap/context/PasienRIContext';

import { AssesmentRIContext } from '../../../rawatinap/context/AssesmentRIContext';
import dayjs from 'dayjs';

const { Option } = Select;

const FormTandaVitalKemo = () => {
    const {
        jnsRawat,
        noReg,
        unitId,
        perawat,
        tglOrder,
        ipKomp,
        hostKomp,
        user,
    } = useContext(KemoterapiContext)





    const {
        userAssesment,

        visibleNyeri,
        setvisibleNyeri,
        visibleJatuh,
        setvisibleJatuh,
        setvisibleNutrisi,
        setvisibleEws,
        setvisibleMeows,
        setvisibleSkorDown,
        setvisibleLatch,
        setvisibleBartelIndex,
        setvisibleAktivitasLatihan,

        gcsMata,
        setgcsMata,
        gcsSuara,
        setgcsSuara,
        gcsGerakan,
        setgcsGerakan,
        tekananDarahSistolik,
        settekananDarahSistolik,
        tekananDarahDiastolik,
        settekananDarahDiastolik,
        suhuTubuh,
        setsuhuTubuh,
        frekuensiNadi,
        setfrekuensiNadi,
        frekuensiNafas,
        setfrekuensiNafas,
        iramaNadi,
        setiramaNadi,
        saturasiOksigen,
        setsaturasiOksigen,
        tinggiBadan,
        settinggiBadan,
        beratBadan,
        setberatBadan,

        scalaNyeri,
        setscalaNyeri,
        skalaNyeri1,
        setskalaNyeri1,
        skalaNyeri2,
        setskalaNyeri2,
        skalaNyeri3,
        setskalaNyeri3,
        skalaNyeri4,
        setskalaNyeri4,
        skalaNyeri5,
        setskalaNyeri5,
        skalaNyeri6,
        setskalaNyeri6,

        metodeResikoJatuh,
        setmetodeResikoJatuh,
        rJatuh1,
        setrJatuh1,
        rJatuh2,
        setrJatuh2,
        sMental1,
        setsMental1,
        sMental2,
        setsMental2,
        sMental3,
        setsMental3,
        sMata1,
        setsMata1,
        sMata2,
        setsMata2,
        sMata3,
        setsMata3,
        kebiasaanBerkemih,
        setkebiasaanBerkemih,
        transferTT,
        settransferTT,
        mobilitas,
        setmobilitas,
        humDumUsia,
        sethumDumUsia,
        humDumKel,
        sethumDumKel,
        humDumDiagnosa,
        sethumDumDiagnosa,
        humDumGangguanKognitif,
        sethumDumGangguanKognitif,
        humDumLingkungan,
        sethumDumLingkungan,
        humDumRespon,
        sethumDumRespon,
        humDumPemObat,
        sethumDumPemObat,
        morseRiwJatuh,
        setmorseRiwJatuh,
        morseDiagnosa,
        setmorseDiagnosa,
        morseKondisiJalan,
        setmorseKondisiJalan,
        morseInfus,
        setmorseInfus,
        morseKondisiBadan,
        setmorseKondisiBadan,
        morseGangKognitif,
        setmorseGangKognitif,

        setewsRespirasi,
        setewsSatursiOksigen,
        setewsSuhu,
        setewsSistolik,
        setewsJantung,

        tandaVitalId,
    } = useContext(AssesmentRIContext);















    return (
        <>



        </>
    )
}

export default FormTandaVitalKemo