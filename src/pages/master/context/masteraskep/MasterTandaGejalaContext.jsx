import React, { createContext, useState, useEffect } from "react";
import { message } from "antd";
import axios from "axios";

export const MasterTandaGejalaContext = createContext();

const MasterTandaGejalaContextProvider = (props) => {
  // const [tandaGejalaBySubKategori, settandaGejalaBySubKategori] = useState([]);
  const [tandagejala, setTandaGejala] = useState([]);
  const [listmsttandagejala, setListMastertandagejala] = useState([]);
  const [tandaGejalaId, settandaGejalaId] = useState([]);
  const [deskripsi, setdeskripsi] = useState([]);
  const [tandaGejalaSnomedId, settandaGejalaSnomedId] = useState([]);
  const [deskripsiSnomed, setdeskripsiSnomed] = useState([]);
  const [diagnosaId, setdiagnosaId] = useState([]);

  const [tandaGejalaOksigenasi, settandaGejalaOksigenasi] = useState([]);
  const [tandaGejalaSirkulasi, settandaGejalaSirkulasi] = useState([]);
  const [tandaGejalaNutrisi, settandaGejalaNutrisi] = useState([]);
  const [tandaGejalaEliminasi, settandaGejalaEliminasi] = useState([]);
  const [tandaGejalaAktivitasIstirahat, settandaGejalaAktivitasIstirahat] =
    useState([]);
  const [tandaGejalaProteksi, settandaGejalaProteksi] = useState([]);
  const [tandaGejalaPersepsi, settandaGejalaPersepsi] = useState([]);
  const [tandaGejalaCairanLektrolit, settandaGejalaCairanLektrolit] = useState(
    []
  );
  const [tandaGejalaNeurologis, settandaGejalaNeurologis] = useState([]);
  const [tandaGejalaEndokrin, settandaGejalaEndokrin] = useState([]);
  const [tandaGejalaKognitif, settandaGejalaKognitif] = useState([]);
  const [tandaGejalaPeran, settandaGejalaPeran] = useState([]);
  const [tandaGejalaKopingstress, settandaGejalaKopingstress] = useState([]);
  const [tandaGejalaSeksual, settandaGejalaSeksual] = useState([]);
  const [tandaGejalaKepercayaan, settandaGejalaKepercayaan] = useState([]);
  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const getTandagejalaSubAskep = () => {
    //1
    axios
      .get(`${apiku}/Askep/TandaGejala/GetBySubKategori/1`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          settandaGejalaOksigenasi(res.data.result);
        } else {
          settandaGejalaOksigenasi([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //2
    axios
      .get(`${apiku}/Askep/TandaGejala/GetBySubKategori/2`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          settandaGejalaSirkulasi(res.data.result);
        } else {
          settandaGejalaSirkulasi([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //3
    axios
      .get(`${apiku}/Askep/TandaGejala/GetBySubKategori/3`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          settandaGejalaNutrisi(res.data.result);
        } else {
          settandaGejalaNutrisi([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //4
    axios
      .get(`${apiku}/Askep/TandaGejala/GetBySubKategori/4`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          settandaGejalaEliminasi(res.data.result);
        } else {
          settandaGejalaEliminasi([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //5
    axios
      .get(`${apiku}/Askep/TandaGejala/GetBySubKategori/5`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          settandaGejalaAktivitasIstirahat(res.data.result);
        } else {
          settandaGejalaAktivitasIstirahat([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //6
    axios
      .get(`${apiku}/Askep/TandaGejala/GetBySubKategori/6`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          settandaGejalaProteksi(res.data.result);
        } else {
          settandaGejalaProteksi([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //7
    axios
      .get(`${apiku}/Askep/TandaGejala/GetBySubKategori/7`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          settandaGejalaPersepsi(res.data.result);
        } else {
          settandaGejalaPersepsi([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //8
    axios
      .get(`${apiku}/Askep/TandaGejala/GetBySubKategori/8`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          settandaGejalaCairanLektrolit(res.data.result);
        } else {
          settandaGejalaCairanLektrolit([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //9
    axios
      .get(`${apiku}/Askep/TandaGejala/GetBySubKategori/9`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          settandaGejalaNeurologis(res.data.result);
        } else {
          settandaGejalaNeurologis([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //10
    axios
      .get(`${apiku}/Askep/TandaGejala/GetBySubKategori/10`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          settandaGejalaEndokrin(res.data.result);
        } else {
          settandaGejalaEndokrin([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //11
    axios
      .get(`${apiku}/Askep/TandaGejala/GetBySubKategori/11`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          settandaGejalaKognitif(res.data.result);
        } else {
          settandaGejalaKognitif([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //12
    axios
      .get(`${apiku}/Askep/TandaGejala/GetBySubKategori/12`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          settandaGejalaPeran(res.data.result);
        } else {
          settandaGejalaPeran([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //13
    axios
      .get(`${apiku}/Askep/TandaGejala/GetBySubKategori/13`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          settandaGejalaKopingstress(res.data.result);
        } else {
          settandaGejalaKopingstress([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //14
    axios
      .get(`${apiku}/Askep/TandaGejala/GetBySubKategori/14`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          settandaGejalaSeksual(res.data.result);
        } else {
          settandaGejalaSeksual([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //15
    axios
      .get(`${apiku}/Askep/TandaGejala/GetBySubKategori/15`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          settandaGejalaKepercayaan(res.data.result);
        } else {
          settandaGejalaKepercayaan([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const GetTandaGejalaBySubKategori = (subkategori) => {
  //     axios.get(`${apiku}/Askep/TandaGejala/GetBySubKategori/${subkategori}`, options)
  //         .then(res => {
  //             if (res.data.statusCode === 200) {
  //                 settandaGejalaBySubKategori(res.data.result);
  //                 console.log('tgejalaby subkategori', res.data.result);
  //             } else {
  //                 settandaGejalaBySubKategori();
  //                 console.log('cek', res.data.result);
  //             }
  //         })
  //         .catch((err) => {
  //             console.log(err);
  //         });
  // }

  const detailMasterTandaGejala = () => {
    axios
      .get(`${apiku}/Askep/TandaGejala/Lookup`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setTandaGejala(res.data.result);
          // console.log('tes', res.data.result);
        } else {
          // setMasterSubkategori([]);
          console.log("cek", res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const listMasterTandaGejala = () => {
    axios
      .get(`${apiku}/Askep/TandaGejala/ListTandaGejala`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListMastertandagejala(res.data.result);
          // console.log('tes', res.data.result);
        } else {
          // setMasterSubkategori([]);
          console.log("cek", res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const insertMasterTandaGejala = (newdata) => {
    axios
      .post(`${apiku}/Askep/TandaGejala`, newdata)
      .then((res) => {
        setTandaGejala([
          ...tandagejala.filter(
            (item) => item.tandaGejalaId !== res.data.result.tandaGejalaId
          ),
          res.data.result,
        ]);
        message.success("Berhasil Disimpan!");
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Disimpan!");
      });
  };
  const deleteMasterTandaGelaja = (idkategori) => {
    axios
      .delete(`${apiku}/Askep/TandaGejala/${idkategori}`, options)
      .then((res) => {
        //console.log(res);
        setTandaGejala(
          tandagejala.filter((item) => item.tandaGejalaId !== idkategori)
        );
        message.success("Berhasil Dihapus!");
      })
      .catch((err) => {
        message.error("Gagal Dihapus!");
      });
  };
  const detailTndaGejalaId = (id) => {
    axios.get(`${apiku}/Askep/TandaGejala/ID/${id}`, options).then((res) => {
      if (res.data.statusCode === 200) {
        settandaGejalaId(res.data.result.tandaGejalaId);
        setdeskripsi(res.data.result.deskripsi);
        settandaGejalaSnomedId(res.data.result.tandaGejalaSnomedId);
        setdeskripsiSnomed(res.data.result.deskripsiSnomed);
        setdiagnosaId(res.data.result.diagnosaId);
      } else {
        settandaGejalaId("");
        setdeskripsi("");
        settandaGejalaSnomedId("");
        setdeskripsiSnomed("");
        setdiagnosaId("");
      }
    });
  };

  return (
    <MasterTandaGejalaContext.Provider
      value={{
        // tandaGejalaBySubKategori, settandaGejalaBySubKategori, GetTandaGejalaBySubKategori,
        tandagejala,
        setTandaGejala,
        detailMasterTandaGejala,
        insertMasterTandaGejala,
        deleteMasterTandaGelaja,
        detailTndaGejalaId,
        tandaGejalaId,
        settandaGejalaId,
        deskripsi,
        setdeskripsi,
        tandaGejalaSnomedId,
        settandaGejalaSnomedId,
        deskripsiSnomed,
        setdeskripsiSnomed,
        diagnosaId,
        setdiagnosaId,
        listmsttandagejala,
        listMasterTandaGejala,
        tandaGejalaOksigenasi,
        tandaGejalaSirkulasi,
        tandaGejalaNutrisi,
        tandaGejalaEliminasi,
        tandaGejalaAktivitasIstirahat,
        tandaGejalaProteksi,
        tandaGejalaPersepsi,
        tandaGejalaCairanLektrolit,
        tandaGejalaNeurologis,
        tandaGejalaEndokrin,
        tandaGejalaKognitif,
        tandaGejalaPeran,
        tandaGejalaKopingstress,
        tandaGejalaSeksual,
        tandaGejalaKepercayaan,
        getTandagejalaSubAskep,
      }}
    >
      {props.children}
    </MasterTandaGejalaContext.Provider>
  );
};

export default MasterTandaGejalaContextProvider;
