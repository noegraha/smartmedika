import React, { createContext, useState } from "react";
import axios from "axios";
import { message } from "antd";

export const AlergiContext = createContext();

const AlergiContextProvider = (props) => {
  const [loading, setLoading] = useState(false);
  const [allergy, setAllergy] = useState([]);
  const [allergycategory, setAllergyCategory] = useState([]);
  const [allergyclinicalfindings, setAllergyClinicalFindings] = useState([]);
  const [allergyclinicalstatus, setAllergyClinicalStatus] = useState([]);
  const [allergycritical, setAllergyCriticality] = useState([]);
  const [allergyreaction, setAllergyReactionEventSeverity] = useState([]);
  const [allergyroute, setAllergyRouteCodes] = useState([]);
  const [allergysubtance, setAllergySubtance] = useState([]);
  const [allergytype, setAllergyType] = useState([]);
  const [allergyverification, setAllergyVerificationStatus] = useState([]);

  const apiku = sessionStorage.getItem("api");
  const tok = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };

  const getMasterAllergy = () => {
    axios
      .get(`${apiku}/MstAllergyCategory/Lookup/%20/1/10`, options)
      .then((res) => {
        setAllergyCategory(res.data.result);
      });
    axios
      .get(`${apiku}/MstAllergyClinicalFindings/Lookup/%20/1/10`, options)
      .then((res) => {
        setAllergyClinicalFindings(res.data.result);
      });
    axios
      .get(`${apiku}/MstAllergyClinicalStatus/Lookup/%20/1/10`, options)
      .then((res) => {
        setAllergyClinicalStatus(res.data.result);
      });
    axios
      .get(`${apiku}/MstAllergyCriticality/Lookup/%20/1/10`, options)
      .then((res) => {
        setAllergyCriticality(res.data.result);
      });
    axios
      .get(`${apiku}/MstAllergyReactionEventSeverity/Lookup/%20/1/10`, options)
      .then((res) => {
        setAllergyReactionEventSeverity(res.data.result);
      });
    axios
      .get(`${apiku}/MstAllergyRouteCodes/Lookup/%20/1/10`, options)
      .then((res) => {
        setAllergyRouteCodes(res.data.result);
      });
    axios
      .get(`${apiku}/MstAllergySubstance/Lookup/%20/1/1000`, options)
      .then((res) => {
        setAllergySubtance(res.data.result);
      });
    axios
      .get(`${apiku}/MstAllergyType/Lookup/%20/1/10`, options)
      .then((res) => {
        setAllergyType(res.data.result);
      });
    axios
      .get(`${apiku}/MstAllergyVerificationStatus/Lookup/%20/1/10`, options)
      .then((res) => {
        setAllergyVerificationStatus(res.data.result);
      });
  };

  const detailAllergy = (id) => {
    axios
      .get(`${apiku}/EmrAllergyIntolerance/Read/${id}/1/10`, options)
      .then((res) => {
        var newdataalergi = [];
        // eslint-disable-next-line array-callback-return
        res.data.result.map((r) => {
          newdataalergi.push({
            noreg: r.registrasiId,
            alerginya: r.codeNavigation.display,
            kodenya: r.codeNavigation.code,
          });
        });
        setAllergy(newdataalergi);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const insertAllergy = (dataalergi) => {
    axios
      .post(`${apiku}/EmrAllergyIntolerance`, dataalergi, {
        headers: options.headers,
      })
      .then((res) => {
        // setAllergy([...allergy, res.data.result]);
        setAllergy([
          ...allergy,
          {
            noreg: res.data.result.registrasiId,
            alerginya: res.data.result.codeNavigation.display,
            kodenya: res.data.result.codeNavigation.code,
          },
        ]);
        console.log(res.data.result);
        message.success("Berhasil Disimpan!");
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Disimpan!");
      });
  };

  const deleteAllergy = (noreg, kode) => {
    axios
      .delete(`${apiku}/EmrAllergyIntolerance/${noreg}/${kode}`, options)
      .then((res) => {
        setAllergy(allergy.filter((item) => item.kodenya !== kode));
        console.log(res);
        message.success("Berhasil Dihapus!");
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Dihapus!");
      });
  };

  return (
    <AlergiContext.Provider
      value={{
        getMasterAllergy,
        loading,
        setLoading,
        allergy,
        allergycategory,
        allergyclinicalfindings,
        allergyclinicalstatus,
        allergycritical,
        allergyreaction,
        allergyroute,
        allergysubtance,
        allergytype,
        allergyverification,
        insertAllergy,
        detailAllergy,
        deleteAllergy,
      }}
    >
      {props.children}
    </AlergiContext.Provider>
  );
};

export default AlergiContextProvider;
