import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { message } from "antd";
import { ChatContext } from "../../chat/Chatcontext";

export const HasilRadiologiContext = createContext();

const HasilRadiologiContextProvider = (props) => {
  const [hasilradiologi, setHasilRadiologi] = useState([]);
  const [hasillab, setHasilLab] = useState([]);
  const [hasilRadiologiByPasienId, setHasilRadiologiByPasienId] = useState([]);
  const [hasilRisByNoreg, sethasilRisByNoreg] = useState([]);
  const [expandFitures, setexpandFitures] = useState(true);
  const [visible, setVisible] = useState(false);
  const [URL, setURL] = useState("");
  const { setLoading } = useContext(ChatContext);
  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };
  const [ipset, SetIPset] = useState(true);
  const ip = sessionStorage.getItem("IP");
  // const isIPValid = ip.slice(0, 3);

  // useEffect(() => {
  //     const token = sessionStorage.getItem('userData');

  //     const options = {
  //         headers: { 'Authorization': 'Bearer ' + token }
  //     }
  //     axios.get(`${apiku}/RiHasilRadiologi/ID/2008191395`, options)
  //         .then(res => {
  //             setHasilRadiologi(res.data.result);
  //             console.log(res.data.result);
  //         })
  // }, []);

  const detailHasilRadiologi = (id) => {
    axios
      .get(`${apiku}/EmrRadiologi/Lookup/GetByPasienId/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setHasilRadiologi(res.data.result);
          // console.log(res.data.result);
        } else {
          console.log("data radiologi kosong");
        }
      }, [])
      .catch((err) => {
        console.log("data radiologi kosong");
      });
  };

  const GetHasilRadiologiByPasienId = (id) => {
    axios
      .get(`${apiku}/EmrRadiologi/Lookup/GetById/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setHasilRadiologiByPasienId(
            res.data.result.sort((b, a) =>
              a.registrasiId.localeCompare(b.registrasiId)
            )
          );
          setURL(
            res.data.result.sort((b, a) =>
              a.registrasiId.localeCompare(b.registrasiId)
            )[0].listLink[0].urlExpertise
          );
          console.log(res.data.result);
          setVisible(true);
          setexpandFitures(true);
          setLoading(false);
        } else {
          setHasilRadiologiByPasienId([]);
          setexpandFitures(false);
          // console.log("data radiologi kosong121212", id);
          setLoading(false);
          message.warning("Data Radiologi Tidak Ditemukan!");
        }
      }, [])
      .catch((err) => {
        setexpandFitures(false);
        setLoading(false);
        message.error("Error Saat Mengambil Data!");
        // console.log("error radiologi kosong112121", id);
        setHasilRadiologiByPasienId([]);
      });
  };

  const GetHasilRadiologiByNoreg = (id, noreg) => {
    axios
      .get(`${apiku}/EmrRadiologi/Lookup/GetById/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          res.data.result.map((c) => c.registrasiId).indexOf(noreg) >= 0
            ? sethasilRisByNoreg([
                res.data.result[
                  res.data.result.map((c) => c.registrasiId).indexOf(noreg)
                ],
              ])
            : sethasilRisByNoreg([]);
          console.log(noreg);
          console.log(res.data.result);
        } else {
          message.warning("Data Radiologi Tidak Ditemukan!");
        }
      }, [])
      .catch((err) => {
        message.error("Error Saat Mengambil Data!");
        // console.log("error radiologi kosong112121", id);
        setHasilRadiologiByPasienId([]);
      });
  };

  const detailHasilLabKlinik = (id) => {
    axios
      .get(`${apiku}/EmrGizi/GetHasilLab/${id}`, options)
      .then((res) => {
        setHasilLab(res.data.result);
      }, [])
      .catch((err) => {
        console.log("data radiologi kosong");
      });
  };
  return (
    <HasilRadiologiContext.Provider
      value={{
        hasilradiologi,
        hasillab,
        detailHasilRadiologi,
        detailHasilLabKlinik,
        hasilRadiologiByPasienId,
        setHasilRadiologiByPasienId,
        GetHasilRadiologiByPasienId,
        visible,
        setVisible,
        GetHasilRadiologiByNoreg,
        URL,
        setURL,
        hasilRisByNoreg,
        sethasilRisByNoreg,
        expandFitures,
        setexpandFitures,
        ipset,
        SetIPset,
      }}
    >
      {props.children}
    </HasilRadiologiContext.Provider>
  );
};

export default HasilRadiologiContextProvider;
