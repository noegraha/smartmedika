import React, { createContext, useState } from "react";
import { message } from "antd";
import axios from "axios";
import dayjs from "dayjs";

export const ImplementasiAskepContext = createContext();

const ImplementasiAskepContextProvider = (props) => {
  const [registrasiId, setregistrasiId] = useState([]);
  const [tanggal, settanggal] = useState(dayjs());
  const [diagnosaId, setdiagnosaId] = useState([]);
  const [ImplementasiId, setImplementasiId] = useState([]);
  const [ImplementasiByIdByDx, setImplementasiByIdByDx] = useState([]);
  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const getImplementasiByIdByDx = (id, dx) => {
    axios
      .get(
        `${apiku}/Askep/Asuhan/Implementasi/GetByIntervensi/${id}/${dx}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setImplementasiByIdByDx(res.data.result);
        } else {
          console.log("data anamnesa kosong");
          setImplementasiByIdByDx([]);
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  // const insertEmrAskep = (dataaskep) => {
  //     axios.post(`http://localhost:5577/Askep/Asuhan/Create`, dataaskep)
  //         .then(res => {
  //             if (res.data.statusCode === 200) {
  //                 console.log(res.data.result);
  //                 getListAskepById(dataaskep.registrasiId);
  //                 console.log(dataaskep.registrasiId);
  //                 // setListAskepById([...ListAskepById.filter(item => item.registrasiId !== res.data.result.registrasiId), res.data.result
  //                 // ]);
  //                 message.success('Berhasil Disimpan!');
  //             } else {
  //                 console.log('tidak dapat menyimpan');
  //                 message.error('Gagal Disimpan!');
  //                 //setAnamnesa([]);
  //             }
  //             //console.log(res.data.result);
  //             // message.success('Berhasil Disimpan!');
  //         })
  //         .catch((errors) => {
  //             console.log(errors);
  //             //message.error('Gagal Disimpan!');
  //             message.error('Gagal Disimpan!');
  //         });
  // }

  // const deleteAskpeByIdByDx = (id, dx) => {
  //     axios.delete(`http://localhost:5577/Askep/Asuhan/Delete/${id}/${dx}`, options)
  //         .then((res) => {
  //             getListAskepById(id);
  //             kosongkanformaskep();
  //             //console.log(res);
  //             // setListAskepById(
  //             //     ListAskepById.filter(item => item.registrasiId === id),
  //             // );
  //             message.success('Berhasil Dihapus!')
  //         })
  //         .catch((err) => {
  //             message.error('Gagal Dihapus!')
  //         });
  // }

  // const kosongkanformaskep = () => {
  //     setAskepByIdByDx('');
  //     setregistrasiId('');
  //     settanggal(dayjs());
  //     setdiagnosaId('');
  //     settargetWaktu('');
  //     setluaranId('');
  //     setnTandaGejala([]);
  //     setnIntervensi([]);
  //     setnKriteria([]);
  //     console.log('kosongkan form askep');
  // }

  return (
    <ImplementasiAskepContext.Provider
      value={{
        tanggal,
        settanggal,
        diagnosaId,
        setdiagnosaId,
        ImplementasiId,
        setImplementasiId,
        getImplementasiByIdByDx,
        ImplementasiByIdByDx,
      }}
    >
      {props.children}
    </ImplementasiAskepContext.Provider>
  );
};

export default ImplementasiAskepContextProvider;
