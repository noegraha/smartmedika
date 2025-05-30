import React, { useContext } from 'react'
import HdContext from '../../HdContext';
import TbRiwLabPK from './TbRiwLabPK';

const { PasiensContext } = HdContext;

const RiwLabPK = () => {
    const props = useContext(PasiensContext)

    return (
        <div>
            <TbRiwLabPK results={props.dataRiwLabPK} isLoading={props.isLoading} />
        </div>
    )
}

export default RiwLabPK