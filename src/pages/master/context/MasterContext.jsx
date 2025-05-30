import React, { createContext, useState } from "react";
import axios from "axios";

export const MasterContext = createContext();

const MasterContextProvider = (props) => {
  const [listagama, setListAgama] = useState([]);
  const [listgoldarah, setListGolDarah] = useState([]);
  const [listjnskelamin, setListJnsKelamin] = useState([]);
  const [listpekerjaan, setListPekerjaan] = useState([]);
  const [listpendidikan, setListPendidikan] = useState([]);
  const [listsuku, setListSuku] = useState([]);
  const [listbahasa, setListBahasa] = useState([]);
  const [liststtkawin, setListSttKawin] = useState([]);
  const [ruangAll, setruangAll] = useState([]);

  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const getListAgama = () => {
    axios
      .get(`${apiku}/MstAgama/Lookup/%20/1/10`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListAgama(res.data.result);
        } else {
          setListAgama([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setListAgama([]);
      });
  };

  const getListGolDarah = () => {
    axios
      .get(`${apiku}/MstGolDarah/Lookup/%20/1/10`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListGolDarah(res.data.result);
        } else {
          setListGolDarah([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setListGolDarah([]);
      });
  };

  const getListJnsKelamin = () => {
    axios
      .get(`${apiku}/MstJenisKelamin/Lookup/%20/1/10`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListJnsKelamin(res.data.result);
        } else {
          setListJnsKelamin([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setListJnsKelamin([]);
      });
  };

  const getListPekerjaan = () => {
    axios
      .get(`${apiku}/MstPekerjaan/Lookup/%20/1/100`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListPekerjaan(res.data.result);
        } else {
          setListPekerjaan([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setListPekerjaan([]);
      });
  };

  const getListPendidikan = () => {
    axios
      .get(`${apiku}/MstPendidikan/Lookup/%20/1/10`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListPendidikan(res.data.result);
        } else {
          setListPendidikan([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setListPendidikan([]);
      });
  };

  const getListSuku = () => {
    axios
      .get(`${apiku}/MstSukuBangsa/Lookup/%20/1/100`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListSuku(res.data.result);
        } else {
          setListSuku([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setListSuku([]);
      });
  };

  const getListBahasa = () => {
    axios
      .get(`${apiku}/MstBahasa/Lookup/%20/1/10`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListBahasa(res.data.result);
        } else {
          setListBahasa([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setListBahasa([]);
      });
  };

  const getListSttKawin = () => {
    axios
      .get(`${apiku}/MstStatusKawin/Lookup/%20/1/10`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListSttKawin(res.data.result);
        } else {
          setListSttKawin([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setListSttKawin([]);
      });
  };

  const getRuangMedis = () => {
    axios
      .get(`${apiku}/MstRuang/Lookup/%20/1/1/100`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          const ruangRi = res.data.result;
          axios
            .get(`${apiku}/MstRuang/Lookup/%20/2/1/100`, options)
            .then((res) => {
              if (res.data.statusCode === 200) {
                const ruangRj = res.data.result;
                axios
                  .get(`${apiku}/MstRuang/Lookup/%20/4/1/100`, options)
                  .then((res) => {
                    if (res.data.statusCode === 200) {
                      const ruangPenunjang = res.data.result;
                      //setruangAll(ruangRi.concat(ruangRj, ruangPenunjang));
                      let datac = ruangRi.concat(ruangRj, ruangPenunjang);
                      datac.forEach(function (row, index) {
                        row.key = index;
                      });
                      setruangAll(datac);
                      console.log(datac);
                    } else {
                      setruangAll([]);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                    setruangAll([]);
                  });
              } else {
                setruangAll([]);
              }
            })
            .catch((err) => {
              console.log(err);
              setruangAll([]);
            });
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
        setruangAll([]);
      });
  };

  return (
    <MasterContext.Provider
      value={{
        getListAgama,
        listagama,
        getListGolDarah,
        listgoldarah,
        getListJnsKelamin,
        listjnskelamin,
        getListPekerjaan,
        listpekerjaan,
        getListPendidikan,
        listpendidikan,
        getListSuku,
        listsuku,
        getListBahasa,
        listbahasa,
        getListSttKawin,
        liststtkawin,
        ruangAll,
        setruangAll,
        getRuangMedis,
      }}
    >
      {props.children}
    </MasterContext.Provider>
  );
};

export default MasterContextProvider;
