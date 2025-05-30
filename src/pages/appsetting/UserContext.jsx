import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  // Group related state into objects
  const [userData, setUserData] = useState({
    userlist: [],
    smfUser: "",
    kategoriUser: "",
    ruang: [],
  });

  const [modulData, setModulData] = useState({
    modullist: [],
    modul: [],
    moduldetail: [],
    modulMenuId: "",
    modulMenuDeskripsi: "",
    modulAksesFull: true,
    modulAksesUpdate: true,
    modulAksesInsert: true,
    modulAksesDelete: true,
    modulAksesRead: true,
  });

  const [groupData, setGroupData] = useState({
    grouplist: [],
    groupakses: [],
    groupId: "",
    groupName: "",
  });

  // Combine all menu permissions into a single object
  const [menuPermissions, setMenuPermissions] = useState({
    menuuser: [],
    menuRJ: false,
    menuRI: false,
    menuPnj: false,
    menuRM: false,
    menuAkses: false,
    menuLaporanStatistik: false,
    menuHD: false,
    menuGizi: false,
    menuMaster: false,
    menuRM02: false,
    menuRadio: false,
    menuPenunjang: false,
    menuKemoterapi: false,
    menuRadioterapi: false,
    menuIBS: false,
    menuPnjLain: false,
    menuJadwalPnj: false,
    menuBridging: false,
    menuValidDarah: false,
    menuOrderTT: false,
    menuDiklat: false,
  });

  const [appConfig, setAppConfig] = useState({
    appTesting: true,
    listIP: [],
  });

  // API and auth setup
  const apiku = sessionStorage.getItem("api");
  const tok = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };

  // Initialize user permissions
  useEffect(() => {
    const auth = sessionStorage.getItem("authId");
    loadUserPermissions(auth);
  }, [apiku]);

  // Simplified function to load user permissions
  const loadUserPermissions = (auth) => {
    axios
      .get(`${apiku}/SisUserRule/ReadAuthId/${auth}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          const rules = res.data.result.rule;

          // Update all menu permissions at once
          setMenuPermissions((prevState) => ({
            ...prevState,
            menuuser: rules,
            menuRJ: rules.some((x) => x.MenuId === "RJ0000"),
            menuRI: rules.some((x) => x.MenuId === "RI0000"),
            menuPnj: rules.some((x) => x.MenuId === "PN0000"),
            menuAkses: rules.some((x) => x.MenuId === "MN0001"),
            menuLaporanStatistik: rules.some((x) => x.MenuId === "LP0001"),
            menuGizi: rules.some((x) => x.MenuId === "GZ0001"),
            menuHD: rules.some((x) => x.MenuId === "HD0001"),
            menuMaster: rules.some((x) => x.MenuId === "MST001"),
            menuRM: rules.some((x) => x.MenuId === "RM0001"),
            menuRadio: rules.some((x) => x.MenuId === "RT0002"),
            menuPenunjang: rules.some((x) => x.MenuId === "PNJ001"),
            menuIBS: rules.some((x) => x.MenuId === "BS0001"),
            menuPnjLain: rules.some((x) => x.MenuId === "PNJ002"),
            menuJadwalPnj: rules.some((x) => x.MenuId === "PNJ003"),
            menuRadioterapi: rules.some((x) => x.MenuId === "RT0001"),
            menuKemoterapi: rules.some((x) => x.MenuId === "KMO001"),
            menuRM02: rules.some((x) => x.MenuId === "RM0002"),
            menuBridging: rules.some((x) => x.MenuId === "BRG000"),
            menuValidDarah: rules.some((x) => x.MenuId === "DAR001"),
            menuOrderTT: rules.some((x) => x.MenuId === "KRI001"),
            menuDiklat: rules.some((x) => x.MenuId === "PNJ004"),
          }));
        } else {
          resetMenuPermissions();
        }
      })
      .catch((err) => {
        console.log("Menu User error:", err);
        resetMenuPermissions();
      });
  };

  // Reset all menu permissions
  const resetMenuPermissions = () => {
    setMenuPermissions((prevState) => ({
      ...prevState,
      menuuser: [],
      menuRJ: false,
      menuRI: false,
      menuAkses: false,
      menuLaporanStatistik: false,
      menuGizi: false,
      menuHD: false,
      menuRadio: false,
      menuRadioterapi: false,
      menuPenunjang: false,
      menuPnjLain: false,
      menuJadwalPnj: false,
      menuIBS: false,
      menuRM02: false,
      menuBridging: false,
      menuValidDarah: false,
      menuOrderTT: false,
      menuDiklat: false,
    }));
  };

  // Simplified API functions
  const getMenu = (auth) => {
    axios
      .get(`${apiku}/SisUserRule/ReadAuthId/${auth}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setGroupData((prevState) => ({
            ...prevState,
            groupId: res.data.result.userGroupId,
            groupName: res.data.result.groupDeskripsi,
          }));
          setMenuPermissions((prevState) => ({
            ...prevState,
            menuuser: res.data.result.rule,
          }));
        }
      })
      .catch((err) => console.log(err));
  };

  // User management functions
  const getUserList = (searchTerm = "%20") => {
    axios
      .get(`${apiku}/SisJwt/Lookup/${searchTerm}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setUserData((prevState) => ({
            ...prevState,
            userlist: res.data.result,
          }));
        }
      })
      .catch((err) => console.log(err));
  };

  // Module management functions
  const getModulList = (name = "%20") => {
    axios
      .get(`${apiku}/SisUserRule/Menu/${name}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setModulData((prevState) => ({
            ...prevState,
            modullist: res.data.result,
          }));
        }
      })
      .catch((err) => console.log(err));
  };

  // Group management functions
  const getGrouplist = (name = "%20") => {
    axios
      .get(`${apiku}/SisUserRule/UserGroup/${name}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setGroupData((prevState) => ({
            ...prevState,
            grouplist: res.data.result,
          }));
        }
      })
      .catch((err) => console.log(err));
  };

  // Module rule functions
  const readModulList = (groupId) => {
    axios
      .get(`${apiku}/SisUserRule/Rule/${groupId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setModulData((prevState) => ({
            ...prevState,
            modul: res.data.result,
          }));
        }
      })
      .catch((err) => console.log(err));
  };

  const readModul = (groupId, menuId) => {
    axios
      .get(`${apiku}/SisUserRule/ReadRule/${groupId}/${menuId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          const result = res.data.result;
          setModulData((prevState) => ({
            ...prevState,
            moduldetail: result,
            modulMenuId: result.MenuId,
            modulMenuDeskripsi: result.MenuDeksripsi,
            modulAksesFull: result.AksesFull,
            modulAksesUpdate: result.AksesUpdate,
            modulAksesInsert: result.AksesInsert,
            modulAksesDelete: result.AksesDelete,
            modulAksesRead: result.AksesRead,
          }));
        }
      })
      .catch((err) => console.log(err));
  };

  // Group access functions
  const readGroupAkses = (groupId) => {
    axios
      .get(`${apiku}/SisUserRule/ReadGroupAkses/${groupId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setGroupData((prevState) => ({
            ...prevState,
            groupakses: res.data.result,
          }));
        }
      })
      .catch((err) => console.log(err));
  };

  // Data modification functions with success/error messages
  const insertRuleModul = (rule) => {
    axios
      .post(`${apiku}/SisUserRule/Rule`, rule, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil Disimpan!");
          readModulList(rule.userGroupId);
        } else {
          message.error("Gagal Disimpan!");
        }
      })
      .catch(() => message.error("Gagal Disimpan!"));
  };

  const deleteRuleModul = (groupId, menuId) => {
    axios
      .delete(`${apiku}/SisUserRule/Rule/${groupId}/${menuId}`, options)
      .then(() => {
        readModulList(groupId);
        message.success("Berhasil Dihapus!");
      })
      .catch(() => message.error("Gagal Dihapus!"));
  };

  // Create a single value object with all context values
  const contextValue = {
    // User data and functions
    userlist: userData.userlist,
    smfUser: userData.smfUser,
    kategoriUser: userData.kategoriUser,
    ruang: userData.ruang,
    getUserList,
    getUserListName: getUserList, // Aliased for backward compatibility
    getSMFbyUser: (username) => {
      axios
        .get(`${apiku}/SisJwt/GetSpesialisById/${username}`, options)
        .then((res) => {
          if (res.data.statusCode === 200) {
            setUserData((prevState) => ({
              ...prevState,
              kategoriUser: res.data.result.KategoriId,
              smfUser: res.data.result.SpesialisId,
            }));
          }
        })
        .catch((err) => console.log(err));
    },
    userBag: (user) => {
      axios
        .get(`${apiku}/SisJwt/RuangByUser/${user}/%20/2/%20`, options)
        .then((res) => {
          if (res.data.statusCode === 200) {
            setUserData((prevState) => ({
              ...prevState,
              ruang: res.data.result,
            }));
          }
        })
        .catch((err) => console.log(err));
    },

    // Module data and functions
    ...modulData,
    getModulList,
    getModulListName: getModulList, // Aliased for backward compatibility
    readModulList,
    readModul,
    insertModul: (modul) => {
      axios
        .post(`${apiku}/SisUserRule/Menu`, modul, options)
        .then(() => {
          message.success("Berhasil Disimpan!");
          getModulList();
        })
        .catch(() => message.error("Gagal Disimpan!"));
    },
    deleteModul: (modul) => {
      axios
        .delete(`${apiku}/SisUserRule/Menu/${modul}`, options)
        .then(() => {
          message.success("Berhasil Dihapus!");
          getModulList();
        })
        .catch(() => message.error("Gagal Dihapus!"));
    },
    insertRuleModul,
    deleteRuleModul,

    // Group data and functions
    ...groupData,
    getGrouplist,
    getGrouplistName: getGrouplist, // Aliased for backward compatibility
    readGroupAkses,
    insertGroupAkses: (group) => {
      axios
        .post(`${apiku}/SisUserRule/GroupAkses`, group, options)
        .then((res) => {
          if (res.data.statusCode === 200) {
            message.success("Berhasil Disimpan!");
            readGroupAkses(res.data.result.userGroupId);
          } else {
            message.warning("Gagal Disimpan!");
          }
        })
        .catch(() => message.error("Gagal Disimpan!"));
    },
    deleteGroupAkses: (authId, groupId) => {
      axios
        .delete(
          `${apiku}/SisUserRule/UserGroupAkses/${authId}/${groupId}`,
          options
        )
        .then(() => {
          readGroupAkses(groupId);
          message.success("Berhasil Dihapus!");
        })
        .catch(() => message.error("Gagal Dihapus!"));
    },

    // Menu permissions
    ...menuPermissions,
    getMenu,

    // App configuration
    ...appConfig,
    getListIP: () => {
      axios
        .get(`${apiku}/SisGetIP/GetListIP`, options)
        .then((res) => {
          setAppConfig((prevState) => ({
            ...prevState,
            listIP: res.data.result,
          }));
        })
        .catch((err) => console.log(err));
    },
    getApptesting: () => {
      axios
        .get(`${apiku}/SisSettingApp/GetAppTesting/SMRI`, options)
        .then((res) => {
          if (res.data.statusCode === 200) {
            setAppConfig((prevState) => ({
              ...prevState,
              appTesting: res.data.result,
            }));
          }
        })
        .catch((err) => console.log(err));
    },

    // Setters for state management
    setModulMenuId: (value) =>
      setModulData((prev) => ({ ...prev, modulMenuId: value })),
    setModulMenuDeskripsi: (value) =>
      setModulData((prev) => ({ ...prev, modulMenuDeskripsi: value })),
    setModulAksesFull: (value) =>
      setModulData((prev) => ({ ...prev, modulAksesFull: value })),
    setModulAksesUpdate: (value) =>
      setModulData((prev) => ({ ...prev, modulAksesUpdate: value })),
    setModulAksesInsert: (value) =>
      setModulData((prev) => ({ ...prev, modulAksesInsert: value })),
    setModulAksesDelete: (value) =>
      setModulData((prev) => ({ ...prev, modulAksesDelete: value })),
    setModulAksesRead: (value) =>
      setModulData((prev) => ({ ...prev, modulAksesRead: value })),
    setMenuJadwalPnj: (value) =>
      setMenuPermissions((prev) => ({ ...prev, menuJadwalPnj: value })),
    setMenuRM02: (value) =>
      setMenuPermissions((prev) => ({ ...prev, menuRM02: value })),
    setMenuKemoterapi: (value) =>
      setMenuPermissions((prev) => ({ ...prev, menuKemoterapi: value })),
    setMenuRadioterapi: (value) =>
      setMenuPermissions((prev) => ({ ...prev, menuRadioterapi: value })),
    setMenuValidDarah: (value) =>
      setMenuPermissions((prev) => ({ ...prev, menuValidDarah: value })),
    setmenuOrderTT: (value) =>
      setMenuPermissions((prev) => ({ ...prev, menuOrderTT: value })),
    setmenuDiklat: (value) =>
      setMenuPermissions((prev) => ({ ...prev, menuDiklat: value })),
    setRuang: (value) => setUserData((prev) => ({ ...prev, ruang: value })),
    setappTesting: (value) =>
      setAppConfig((prev) => ({ ...prev, appTesting: value })),
    setsmfUser: (value) => setUserData((prev) => ({ ...prev, smfUser: value })),
    setkategpriUser: (value) =>
      setUserData((prev) => ({ ...prev, kategoriUser: value })),
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
