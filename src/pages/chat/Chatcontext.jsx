/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";
import * as signalR from "@microsoft/signalr";
import axios from "axios";
import { notification } from "antd";
import Countdown from "react-countdown";
import { BillingContext } from "../rawatjalan/context/BillingContext";
import { PasienContext } from "../rawatjalan/context/PasienContext";
import { KonsulContext } from "../rawatjalan/context/KonsulContext";

export const ChatContext = createContext();

const ChatContextProvider = (props) => {
  const [connection, setConnection] = useState(null);
  const [connectionid, setConnectionId] = useState(null);
  const [chat, setChat] = useState([]);
  const [tampilpesan, setTampilPesan] = useState([]);
  const [isimessage, setIsiMessage] = useState("");
  const [id, setId] = useState([]);
  const [grafik, setGrafik] = useState([]);
  const [grafikruang, setGrafikRuang] = useState([]);
  const [pasienrsms, setPasienRSMS] = useState([]);
  const [pasienabiyasa, setPasienAbiyasa] = useState([]);
  const [pasienigd, setPasienIGD] = useState([]);
  const [listuser, setListUser] = useState([]);
  const [usergroupantrian, setUserGroupAntrian] = useState([]);
  const [usergroupantriandetail, setUserGroupAntrianDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [animasi, setAnimasi] = useState(true);
  const [ruang, setRuang] = useState(null);
  const [message, setMessage] = useState(null);

  const [broad, setBroad] = useState([]);
  const { ruangasal, setRefresh, poli1 } = useContext(PasienContext);
  const { syncKonsulKHSAll } = useContext(KonsulContext);
  const { syncBayarKHS } = useContext(BillingContext);

  const latestChat = useRef(null);
  const latestBroad = useRef(null);
  latestChat.current = chat;
  latestBroad.current = broad;
  //CEK CURRENT URL
  const currentURL = new URL(window.location.href);
  const host = currentURL.host;
  const tok = sessionStorage.getItem("userData");
  const user = sessionStorage.getItem("userId");
  const apiku =
    host === "smart.rsmargono.id" || host === "smart.rsmargono.my.id"
      ? process.env.REACT_APP_API_BASE_SIGNALRS
      : process.env.REACT_APP_API_BASE_SIGNALR;
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };
  const renderer = ({ seconds, completed }) => {
    if (completed) {
      // Render a complete state
      window.location.reload();
    } else {
      // Render a countdown
      return <span>{seconds}</span>;
    }
  };
  const openNotification = (type) => {
    notification.config({
      placement: "topRight",
    });
    notification[type]({
      message: "Notifikasi Update Baru!",
      description: (
        <div>
          Browser Anda akan otomatis refresh dalam{" "}
          <Countdown date={Date.now() + 10000} renderer={renderer} /> detik.
        </div>
      ),
      duration: 10,
    });
  };

  const renderer2 = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      // window.location.reload();
    } else {
      // Render a countdown
      return <span>{seconds}</span>;
    }
  };

  const refresh = async (e) => {
    console.log(ruang, poli1);
    if (ruangasal === e) {
      syncBayarKHS(e);
      syncKonsulKHSAll(e);
      setRefresh(true);
    } else {
      console.log("pass");
    }
  };

  useEffect(() => {
    let isMounted = true;

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${apiku}/pushnotification`)
      .withAutomaticReconnect()
      .build();

    newConnection.on("ClientReceive", (pesan) => {
      const updatedChat = [...latestChat.current];
      updatedChat.push(pesan);
      setChat(updatedChat);
    });

    newConnection.on("Broadcast", (pesan) => {
      console.log(pesan);
      setGrafik(pesan);
    });
    newConnection.on("StatistikByRuang", (pesan) => {
      console.log(pesan);
      setGrafikRuang(pesan);
    });
    newConnection.on("TotalPasienRSMS", (pesan) => setPasienRSMS(pesan.TOTAL));
    newConnection.on("TotalPasienAbiasa", (pesan) =>
      setPasienAbiyasa(pesan.TOTAL)
    );
    newConnection.on("TotalPasienIGD", (pesan) => setPasienIGD(pesan.TOTAL));
    newConnection.on("Status", (status) => {
      const updatedBroad = [...latestBroad.current];
      updatedBroad.push(status);
      // setBroad(updatedBroad); // jika memang ingin ditampilkan
    });
    newConnection.on("ClientIdName", setConnectionId);
    newConnection.on("List", setBroad);
    newConnection.on("RefreshApp", () => {
      openNotification("info");
      console.log("refresh masuk");
    });
    newConnection.on("Telegram", (e) => {
      console.log("Telegram : ", e);
      setMessage(e);
    });
    newConnection.on("RefreshPasien", refresh);
    newConnection.on("broadcastAppInfo", (pesan) => {
      console.log("Masuk", pesan);
    });
    newConnection.on("userAdd", setListUser);
    newConnection.on("userRemove", (userId) => {
      console.log("REMOVE", userId);
    });

    // Dynamic channel for private message
    const privateChannel = `M${user}-${id}`;
    newConnection.on(privateChannel, (pesan) => {
      console.log("PESAN", pesan);
      setTampilPesan(pesan);
    });

    newConnection
      .start()
      .then(() => {
        if (isMounted) {
          setConnection(newConnection);
        }
      })
      .catch((err) => console.log("SIGNALR : ", err));

    return () => {
      isMounted = false;
      newConnection.stop();
    };
  }, [user, id]);

  const sendMessage = async (user, message) => {
    const chatMessage = {
      user: user,
      message: message,
    };

    if (connection.connectionStarted) {
      try {
        await connection.send("SendMessage", chatMessage);
      } catch (e) {
        console.log(e);
      }
    } else {
      alert("No connection to server yet.");
    }
  };

  const insertUser = (user) => {
    axios
      .post(`${apiku}/api/Chat/AddUser/pesan`, user, {
        headers: options.headers,
      })
      .then((res) => {
        message.success("Berhasil Konek!");
      })
      .catch((err) => {
        message.warning("Gagal Insert User!");
      });
  };

  const sendMessageUser = (pesan) => {
    axios
      .post(`${apiku}/api/Chat/Client/pesan`, pesan, {
        headers: options.headers,
      })
      .then((res) => {
        console.log("terkirim");
      })
      .catch((err) => {
        console.log("tidak terkirim");
      });
  };

  const ambilGrafik = (data) => {
    axios
      .post(`${apiku}/api/Chat/Statistik/Pesan`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post(`${apiku}/api/Chat/StatistikByRuang/Pesan`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ambilTotalPasien = (data) => {
    axios
      .post(`${apiku}/api/Chat/TotalPasienAbiasa/Pesan`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post(`${apiku}/api/Chat/TotalPasienRSMS/Pesan`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .post(`${apiku}/api/Chat/TotalPasienIGD/Pesan`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const panggilAntrianPoliKlinik = (antrian) => {
    axios
      .post(`${apiku}/api/Chat/AntrianPoli/pesan`, antrian)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const insertGroupAntrian = (datagrupantrian) => {
    axios
      .post(`${apiku}/api/Chat/AddUser/pesan`, datagrupantrian, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.code === 200) {
          message.success("Berhasil Disimpan!");
          ambilUserGroupAntrian();
        } else {
          message.warning(res.data.message);
          ambilUserGroupAntrian();
        }
      })
      .catch((err) => {
        message.error("Gagal Menyimpan!");
        console.log(err);
        ambilUserGroupAntrian();
      });
  };

  const ambilUserGroupAntrian = () => {
    axios
      .get(`${apiku}/api/Chat/GetUserGroup`)
      .then((res) => {
        if (res.data.code === "200") {
          console.log(res.data.result);
          setUserGroupAntrian(res.data.result);
        } else {
          console.log(res.data.result);
          setUserGroupAntrian(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
        setUserGroupAntrian([]);
      });
  };

  const ambilUserGroupAntrianDetail = (user) => {
    axios
      .get(`${apiku}/api/Chat/GetByUnitGroup/${user}`)
      .then((res) => {
        if (res.data.code === "200") {
          console.log(res.data.result.unitId.map((d) => d.Deskripsi));
          setUserGroupAntrianDetail(res.data.result.unitId);
        } else {
          console.log(res.data.result);
          setUserGroupAntrianDetail([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setUserGroupAntrianDetail([]);
      });
  };

  const deleteUserGroupAntrian = (data) => {
    axios
      .delete(`${apiku}/api/Chat/RemoveUser/${data}`)
      .then((res) => {
        if (res.data.code === "200") {
          console.log(res.data.result);
          ambilUserGroupAntrian();
        } else {
          console.log(res.data.result);
          ambilUserGroupAntrian();
        }
      })
      .catch((err) => {
        console.log(err);
        ambilUserGroupAntrian();
      });
  };

  const addChatUser = (datauser) => {
    axios
      .post(`${apiku}/api/Chat/AddChatUser/pesan`, datauser, {
        headers: options.headers,
      })
      .then((res) => {
        message.success(res.data.message);
      })
      .catch((err) => {
        message.error("Gagal Menyimpan!");
        console.log(err);
      });
    console.log(datauser);
  };

  const removeChatUser = (user) => {
    axios
      .delete(`${apiku}/api/Chat/InActiveUser/${user}`, {
        headers: options.headers,
      })
      .then((res) => {
        message.warning(res.data.message);
      })
      .catch((err) => {
        message.error("Gagal Logout!");
        console.log(err);
      });
  };

  const insertChat = (pesan) => {
    axios
      .post(`${apiku}/api/Chat/PostChat/pesan`, pesan, {
        headers: options.headers,
      })
      .then((res) => {})
      .catch((err) => {
        message.error("Gagal Menyimpan!");
        console.log(err);
      });
  };

  const sendNotifUser = (pesan) => {
    axios
      .post(`${apiku}/api/Chat/BroadcastApp/pesan`, pesan, {
        headers: options.headers,
      })
      .then((res) => {
        console.log("Berhasil Kirim Notif");
      })
      .catch((err) => {
        console.log("Gagal Terkirim");
      });
  };

  const refreshApp = () => {
    axios
      .post(`${apiku}/api/Chat/RefreshApp`, {
        headers: options.headers,
      })
      .then((res) => {
        console.log("Berhasil Kirim Refresh");
      })
      .catch((err) => {
        console.log("Gagal Refresh");
      });
  };

  return (
    <ChatContext.Provider
      value={{
        insertUser,
        chat,
        sendMessage,
        connectionid,
        setId,
        id,
        sendMessageUser,
        isimessage,
        setIsiMessage,
        loading,
        setLoading,
        grafik,
        setGrafik,
        animasi,
        setAnimasi,
        grafikruang,
        ambilGrafik,
        pasienrsms,
        pasienabiyasa,
        pasienigd,
        ambilTotalPasien,
        panggilAntrianPoliKlinik,
        insertGroupAntrian,
        ambilUserGroupAntrian,
        usergroupantrian,
        deleteUserGroupAntrian,
        ambilUserGroupAntrianDetail,
        usergroupantriandetail,
        addChatUser,
        removeChatUser,
        insertChat,
        listuser,
        tampilpesan,
        sendNotifUser,
        setRuang,
        refreshApp,
        message,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
