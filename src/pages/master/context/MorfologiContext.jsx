import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MorfologiContext = createContext();

const MorfologiContextProvider = (props) => {
  const [morfologi, setMorfologi] = useState([]);
  const apiku = sessionStorage.getItem("api");

  const token = sessionStorage.getItem("userData");

  // const options = {
  //     headers: { 'Authorization': 'Bearer ' + token }
  // }

  useEffect(() => {
    // const token = sessionStorage.getItem('userData');
    const options = {
      headers: { Authorization: "Bearer " + token },
    };

    axios
      .get(`${apiku}/MstMorfologiNeoplasma/Lookup/%20/1/1000`, options)
      .then((res) => {
        setMorfologi(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <MorfologiContext.Provider value={{ morfologi }}>
      {props.children}
    </MorfologiContext.Provider>
  );
};

export default MorfologiContextProvider;
