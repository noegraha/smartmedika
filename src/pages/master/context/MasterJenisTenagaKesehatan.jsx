import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const JenisTenagaKesehatanContext = createContext();

const JenisTenagaKesehatanContextProvider = (props) => {
  const [jnstenagakesehatan, setJnstenagakesehatan] = useState([]);
  const apiku = sessionStorage.getItem("api");

  const token = sessionStorage.getItem("userData");

  // const options = {
  //     headers: { 'Authorization': 'Bearer ' + token }
  // }

  useEffect(() => {
    //const token = sessionStorage.getItem('userData');
    const options = {
      headers: { Authorization: "Bearer " + token },
    };

    axios
      .get(`${apiku}/MstJenisTenagaKesehatan/Lookup/%20/1/1000`, options)
      .then((res) => {
        setJnstenagakesehatan(res.data.result);
        // console.log(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <JenisTenagaKesehatanContext.Provider
      value={{
        jnstenagakesehatan,
      }}
    >
      {props.children}
    </JenisTenagaKesehatanContext.Provider>
  );
};

export default JenisTenagaKesehatanContextProvider;
