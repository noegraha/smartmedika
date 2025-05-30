import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
// import { MasterRuangContext } from "../context/masterreferensi/MasterRuangContext";
import { MasterPPDSContext } from "../context/MasterDokter/MasterPPDSContext";
import { MasterDokterContext } from "../context/MasterDokter/MasterDokterContext";
import dayjs from "dayjs";
import { LoginContext } from "../../rawatjalan/context";
import { MasterPegawaiContext } from "../context/masterpegawai/MasterPegawaiContext";
import axios from "axios";
import {
  EditTwoTone,
  MinusCircleTwoTone,
  PlusCircleOutlined,
  PlusCircleTwoTone,
} from "@ant-design/icons";
import Message from "../../chat/Message";
const { Option } = Select;
const { Column } = Table;
const formItemLayoutdpjp = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const formItemLayoutdpjp1 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const MasterPPDS = () => {
  const [searchTerm, setSearchTerm] = useState("");
  //   const { getRuang, r
  //  const [searchTerm, setSearchTerm] = useState('');uangList } = useContext(MasterRuangContext);
  const { getListSpesialisAll, listSpesialisAll } =
    useContext(MasterDokterContext);
  const {
    enkrip,
    cekPasswordUser,
    userName,
    setUserName,
    passWord,
    setPassWord,
    datauser,
  } = useContext(LoginContext);
  const { listRuangUSer, setlistRuangUSer, getruangUser } =
    useContext(MasterPegawaiContext);
  const [grup, setGrup] = useState("");
  const [ruangList, setRuangList] = useState([]);
  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };
  const {
    ppdsId,
    setPpdsId,
    namaPPDS,
    setNamaPPDS,
    jenisKelamin,
    setJenisKelamin,
    alamatPPDS,
    setAlamatPPDS,
    telponPPDS,
    setTelponPPDS,
    teleponPraktek,
    setTeleponPraktek,
    spesialisId,
    setSpesialisId,
    spesialisDesk,
    setSpesialisDesk,
    ruangId,
    setRuangId,
    ruangDesk,
    setRuangDesk,
    maxpasien,
    setMaxPasien,
    kategori,
    setKategori,
    kategoriDokter,
    setKategoriDokter,
    mulaiAktif,
    setMulaiAktif,
    aktifSampai,
    setAktifSampai,
    tandaTanganBinner,
    setTandaTanganBinner,
    username,
    setUsername,
    nim,
    setNim,
    kompetensi,
    setKompetensi,
    noSIP,
    setNoSIP,
    tglAkhirSIP,
    setTglAkhirSIP,
    noSTR,
    setNoSTR,
    tglAkhirSTR,
    setTglAkhirSTR,
    asalUniversitas,
    setAsalUniversitas,
    getListPPDS,
    postPPDS,
    modalPPDS,
    setmodalPPDS,
    listPPDS,
    setlistPPDS,
    password,
    setpassword,
    postUserAkses,
    modalAkses,
    setmodalAkses,
    nikPpds,
    setnikPpds,
    tmpLahir,
    settmpLahir,
    tglLahir,
    settglLahir,
    data,
    setData,
    postPPDSmaster,
    getListPPDSDetail,
    postPPDSWA,
    postWa,
    modalAkun,
    setmodalAkun,
  } = useContext(MasterPPDSContext);

  const getRuang = (e) => {
    axios
      .get(`${apiku}/MstRuang/Lookup/%20/${e}/1/200`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setRuangList(res.data.result);
        } else {
          setRuangList([]);
        }
      })
      .catch((err) => {
        setRuangList([]);
      });
  };

  // const dataUniv =  [
  //     { kode: "UI", nama: "Universitas Indonesia" },
  //     { kode: "UGM", nama: "Universitas Gadjah Mada" },
  //     { kode: "UNAIR", nama: "Universitas Airlangga" },
  //     { kode: "UNDIP", nama: "Universitas Diponegoro" },
  //     { kode: "UNPAD", nama: "Universitas Padjadjaran" },
  //     { kode: "USU", nama: "Universitas Sumatera Utara" },
  //     { kode: "UNHAS", nama: "Universitas Hasanuddin" },
  //     { kode: "UB", nama: "Universitas Brawijaya" },
  //     { kode: "UNAND", nama: "Universitas Andalas" },
  //     {
  //       kode: "UINJKT",
  //       nama: "Universitas Islam Negeri Syarif Hidayatullah Jakarta",
  //     },
  //     { kode: "UPH", nama: "Universitas Pelita Harapan" },
  //     { kode: "UKDW", nama: "Universitas Kristen Duta Wacana" },
  //     { kode: "UMS", nama: "Universitas Muhammadiyah Surakarta" },
  //     { kode: "UKRIDA", nama: "Universitas Kristen Krida Wacana" },
  //     { kode: "UHT", nama: "Universitas Hang Tuah" },
  //     { kode: "UINB", nama: "Universitas Islam Negeri Bandung" },
  //     { kode: "UNTAD", nama: "Universitas Tadulako" },
  //     { kode: "UNSRAT", nama: "Universitas Sam Ratulangi" },
  //     { kode: "UMI", nama: "Universitas Muslim Indonesia" },
  //     { kode: "UAD", nama: "Universitas Ahmad Dahlan" },
  //     { kode: "ITB", nama: "Institut Teknologi Bandung" },
  //     { kode: "ITS", nama: "Institut Teknologi Sepuluh Nopember" },
  //     { kode: "IPB", nama: "Institut Pertanian Bogor" },
  //     { kode: "UNJ", nama: "Universitas Negeri Jakarta" },
  //     { kode: "UNS", nama: "Universitas Sebelas Maret" },
  //     { kode: "UINSA", nama: "Universitas Islam Negeri Sunan Ampel" },
  //     { kode: "UINSU", nama: "Universitas Islam Negeri Sumatera Utara" },
  //     { kode: "UINJY", nama: "Universitas Islam Negeri Sunan Kalijaga" },
  //     { kode: "UNRI", nama: "Universitas Riau" },
  //     { kode: "UNTAN", nama: "Universitas Tanjungpura" },
  //     { kode: "UNMUL", nama: "Universitas Mulawarman" },
  //     { kode: "UNLAM", nama: "Universitas Lambung Mangkurat" },
  //     { kode: "UNRAM", nama: "Universitas Mataram" },
  //     { kode: "UNPATTI", nama: "Universitas Pattimura" },
  //     { kode: "UNCEN", nama: "Universitas Cenderawasih" },
  //     { kode: "UHO", nama: "Universitas Halu Oleo" },
  //     { kode: "UNIMA", nama: "Universitas Negeri Manado" },
  //     { kode: "UNP", nama: "Universitas Negeri Padang" },
  //     { kode: "UNY", nama: "Universitas Negeri Yogyakarta" },
  //     { kode: "UM", nama: "Universitas Negeri Malang" },
  //     {
  //       kode: "UINSMH",
  //       nama: "Universitas Islam Negeri Sultan Maulana Hasanuddin",
  //     },
  //     { kode: "UINSU", nama: "Universitas Islam Negeri Sultan Syarif Kasim" },
  //     {
  //       kode: "UINSUSKA",
  //       nama: "Universitas Islam Negeri Sultan Syarif Kasim Riau",
  //     },
  //     { kode: "UNISSULA", nama: "Universitas Islam Sultan Agung" },
  //     { kode: "UNIKOM", nama: "Universitas Komputer Indonesia" },
  //     { kode: "UNPAM", nama: "Universitas Pamulang" },
  //     { kode: "UNISBA", nama: "Universitas Islam Bandung" },
  //     { kode: "UHAMKA", nama: "Universitas Muhammadiyah Prof. Dr. Hamka" },
  //     { kode: "UNISNU", nama: "Universitas Islam Nahdlatul Ulama Jepara" },
  //     { kode: "UBSI", nama: "Universitas Bina Sarana Informatika" },
  //     { kode: "UPN", nama: "Universitas Pembangunan Nasional Veteran" },
  //     { kode: "UNSOED", nama: "Universitas Jenderal Soedirman" },
  //   ]
  // ;

  const dataUniv = [
    { kode: "UI", nama: "Universitas Indonesia" },
    { kode: "UGM", nama: "Universitas Gadjah Mada" },
    { kode: "UNAIR", nama: "Universitas Airlangga" },
    { kode: "UNDIP", nama: "Universitas Diponegoro" },
    { kode: "UNPAD", nama: "Universitas Padjadjaran" },
    { kode: "USU", nama: "Universitas Sumatera Utara" },
    { kode: "UNHAS", nama: "Universitas Hasanuddin" },
    { kode: "UB", nama: "Universitas Brawijaya" },
    { kode: "UNAND", nama: "Universitas Andalas" },
    { kode: "UNSRAT", nama: "Universitas Sam Ratulangi" },
    { kode: "UMI", nama: "Universitas Muslim Indonesia" },
    { kode: "UNISSULA", nama: "Universitas Islam Sultan Agung" },
    { kode: "UNSOED", nama: "Universitas Jenderal Soedirman" },
  ];
  const dataPPDs = {
    ppdsId: ppdsId,
    namaPPDS: namaPPDS,
    jenisKelamin: jenisKelamin,
    alamatPPDS: alamatPPDS,
    telponPPDS: telponPPDS,
    spesialisId: spesialisId.split("-").shift(),
    spesialisDesk: spesialisId.split("-").pop(),
    kategori: "12",
    kategoriDokter: "PPDS",
    username:
      username === null || username === "" ? null : username.toUpperCase(),
    nim: nim,
    noSIP: noSIP,
    tglAkhirSIP:
      tglAkhirSIP === "" || tglAkhirSIP === null
        ? null
        : dayjs(tglAkhirSIP).format("YYYY-MM-DD"),
    noSTR: noSTR,
    tglAkhirSTR:
      tglAkhirSTR === "" || tglAkhirSTR === null
        ? null
        : dayjs(tglAkhirSTR).format("YYYY-MM-DD"),
    asalUniversitas: asalUniversitas,
    nik: nikPpds,
    tempatLahir: tmpLahir,
    tanggalLahir:
      tglLahir === "" || tglLahir === null
        ? null
        : dayjs(tglLahir).format("YYYY-MM-DD"),
    detail: data.map(({ key, ...rest }) => ({
      ...rest,
      mulaiAktif: rest.mulaiAktif
        ? dayjs(rest.mulaiAktif).format("YYYY-MM-DD")
        : null,
      aktifSampai: rest.aktifSampai
        ? dayjs(rest.aktifSampai).format("YYYY-MM-DD")
        : null,
    })),
  };

  const datauserbuat = {
    authId: 0,
    namaLengkap: namaPPDS,
    userName: username === null || username === "" ? null : enkrip(username),
    password: enkrip(password),
    secret: "SmartMedikaProd",
  };

  const kirimwa = {
    noTelp: telponPPDS.trim(),
    message:
      username === null || username === ""
        ? null
        : "Nama Akun: " +
          username.toUpperCase() +
          " || Kata Sandi: " +
          password,
  };

  function generateRandomPassword(length = 6) {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  function generateRandomString(length) {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomString = "";
    for (let i = 0; i < length; i++) {
      randomString += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return randomString;
  }

  // async function generateUsernameAndPassword(
  //   namaPPDS,
  //   setUsername,
  //   setpassword
  // ) {
  //   if (!namaPPDS || namaPPDS.trim() === "") {
  //     setUsername("");
  //     setpassword("");
  //     return;
  //   }

  //   const words = namaPPDS
  //     .replace(/dr\.|Dr\.|drg\.|DRG\./gi, "") // Remove "dr.", "Dr.", "drg.", "DRG."
  //     .trim()
  //     .split(/\s+/); // Remove extra spaces and split into words

  //   let username;

  //   if (words[0].length >= 6) {
  //     // If the first name is at least 6 characters, use it as username
  //     username = words[0].toLowerCase();
  //   } else if (words.length > 1) {
  //     // If the first name is shorter than 6, add the second name
  //     username = `${words[0].toLowerCase()} ${words[1].toLowerCase()}`;
  //   } else {
  //     // If the name is a single short word, append random characters to meet the 6-character minimum
  //     username =
  //       words[0].toLowerCase() + generateRandomString(6 - words[0].length);
  //   }

  //   // Ensure username doesn't exceed 15 characters
  //   if (username.length > 15) {
  //     username = username.slice(0, 15);
  //   }

  //   // Function to check username availability and generate a new one if needed
  //   async function checkAndGenerateUsername(
  //     currentUsername,
  //     wordIndex = 1,
  //     letterIndex = 1
  //   ) {
  //     let newUsername = currentUsername;

  //     while (true) {
  //       try {
  //         const response = await axios.get(
  //           `${apiku}/SisJwt/CekPassword/${newUsername.toUpperCase()}`,
  //           options
  //         );

  //         if (response.data.statusCode !== 200) {
  //           // Found a unique username
  //           return newUsername;
  //         }

  //         // If username exists and there is a second word, append next letter from second word
  //         if (
  //           wordIndex < words.length &&
  //           letterIndex < words[wordIndex].length
  //         ) {
  //           newUsername = `${words[0].toLowerCase()} ${words[wordIndex]
  //             .slice(0, letterIndex + 1)
  //             .toUpperCase()}`;
  //           letterIndex++;
  //         } else {
  //           // If all letters from the second word are used, start appending random characters
  //           newUsername = `${currentUsername} ${String.fromCharCode(
  //             97 + (letterIndex - words[wordIndex].length)
  //           )}`;
  //           letterIndex++;
  //         }

  //         // Ensure username meets minimum length of 6 characters
  //         if (newUsername.length < 6) {
  //           newUsername += generateRandomString(6 - newUsername.length);
  //         }

  //         // Ensure username does not exceed 15 characters
  //         if (newUsername.length > 15) {
  //           newUsername = newUsername.slice(0, 15);
  //         }
  //       } catch (error) {
  //         console.error("Error checking username:", error);
  //         return newUsername; // Return last valid username in case of an error
  //       }
  //     }
  //   }

  //   // Generate a unique username
  //   username = await checkAndGenerateUsername(username);

  //   setUsername(username.toUpperCase());
  //   setpassword(generateRandomPassword());
  //   console.log(username, generateRandomPassword());
  // }

  // async function generateUsernameAndPassword(
  //   namaPPDS,
  //   setUsername,
  //   setPassword
  // ) {
  //   if (!namaPPDS || namaPPDS.trim() === "") {
  //     setUsername("");
  //     setPassword("");
  //     return;
  //   }

  //   // Pisahkan nama berdasarkan spasi
  //   const words = namaPPDS
  //     .replace(/dr\.|Dr\.|drg\.|DRG\./gi, "") // Hapus titel seperti "Dr." atau "drg."
  //     .trim()
  //     .split(/\s+/); // Pisahkan berdasarkan spasi

  //   let username;

  //   // Fungsi untuk menghasilkan string acak
  //   function generateRandomString(length = 6) {
  //     const chars = "abcdefghijklmnopqrstuvwxyz";
  //     let randomString = "";
  //     for (let i = 0; i < length; i++) {
  //       randomString += chars.charAt(Math.floor(Math.random() * chars.length));
  //     }
  //     return randomString;
  //   }

  //   // Fungsi untuk memeriksa ketersediaan username dan menghasilkan username baru jika sudah digunakan
  //   async function checkAndGenerateUsername(baseUsername) {
  //     let newUsername = baseUsername;
  //     let attempt = 1;

  //     while (true) {
  //       try {
  //         const response = await axios.get(
  //           `${apiku}/SisJwt/CekUser/${newUsername.toUpperCase()}`,
  //           options
  //         );

  //         if (response.data.statusCode === 200) {
  //           return newUsername; // Username available
  //         }

  //         if (response.data.statusCode === 201) {
  //           console.log(
  //             `Username ${newUsername} already taken. Trying again...`
  //           );

  //           // Jika username sudah terpakai, coba format lain
  //           if (attempt === 1) {
  //             // Pertama: Gunakan nama depan
  //             newUsername = words[0].toLowerCase();
  //           } else if (attempt === 2) {
  //             // Kedua: Gabungkan nama depan + inisial nama belakang
  //             newUsername =
  //               words[0].toLowerCase() +
  //               " " +
  //               words
  //                 .slice(1, 2)
  //                 .map((word) => word[0].toLowerCase())
  //                 .join("");
  //           } else if (attempt === 3) {
  //             // Ketiga: Gabungkan nama depan + nama belakang
  //             newUsername =
  //               words[0].toLowerCase() + " " + words[1]?.toLowerCase();
  //           } else {
  //             // Jika semua format di atas sudah digunakan, tambahkan string acak
  //             newUsername = baseUsername + " " + generateRandomString(attempt);
  //           }
  //           attempt++;
  //         }
  //       } catch (error) {
  //         console.error("Error checking username:", error);
  //         return newUsername; // Return last valid username in case of an error
  //       }
  //     }
  //   }

  //   // Generate username berdasarkan nama yang diberikan
  //   if (words.length === 1) {
  //     // Jika hanya ada satu kata (misalnya nama depan saja)
  //     username = words[0].toLowerCase();
  //     if (username.length < 6) {
  //       username += generateRandomString(6 - username.length); // Pad with random string if less than 6 characters
  //     }
  //   } else {
  //     // Jika ada lebih dari satu kata
  //     if (words[0].length === 1) {
  //       // Jika nama depan hanya satu huruf (misalnya "M")
  //       username = words[0].toLowerCase() + " " + words[1]?.toLowerCase(); // Gunakan nama depan + nama belakang
  //       if (username.length < 6) {
  //         username =
  //           words[0].toLowerCase() +
  //           " " +
  //           words[1]?.toLowerCase() +
  //           " " +
  //           words[2]?.toLowerCase(); // Coba gunakan nama depan + nama belakang lengkap
  //       }
  //     } else {
  //       // Jika nama depan sudah lebih dari 1 karakter
  //       if (words[0].length >= 6) {
  //         // Jika nama depan sudah lebih dari atau sama dengan 6 karakter, gunakan nama depan
  //         username = words[0].toLowerCase();
  //       } else {
  //         // Gabungkan nama depan dengan inisial nama belakang (maksimal 3 kata belakang)
  //         username =
  //           words[0].toLowerCase() +
  //           " " +
  //           words
  //             .slice(1, 4)
  //             .map((word) => word[0].toLowerCase())
  //             .join("");
  //       }

  //       // Pastikan panjang username minimal 6 karakter
  //       if (username.length < 6) {
  //         username = username + generateRandomString(6 - username.length); // Tambahkan string acak
  //       }
  //     }
  //   }

  //   // Cek ketersediaan username yang dihasilkan
  //   username = await checkAndGenerateUsername(username);

  //   setUsername(username.toUpperCase());
  //   setPassword(generateRandomPassword());
  //   console.log(
  //     "Generated Username:",
  //     username,
  //     "Password:",
  //     generateRandomPassword()
  //   );
  // }

  async function generatePPDSUsernameAndPassword(
    namaPPDS,
    setUsername,
    setPassword
  ) {
    if (!namaPPDS || namaPPDS.trim() === "") {
      setUsername("");
      setPassword("");
      return;
    }

    // Pisahkan nama berdasarkan spasi
    const words = namaPPDS
      .replace(/dr\.|Dr\.|drg\.|DRG\./gi, "") // Hapus titel seperti "Dr." atau "drg."
      .trim()
      .split(/\s+/); // Pisahkan berdasarkan spasi

    let username;

    // Fungsi untuk menghasilkan string acak
    function generateRandomString(length = 6) {
      const chars = "abcdefghijklmnopqrstuvwxyz";
      let randomString = "";
      for (let i = 0; i < length; i++) {
        randomString += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return randomString;
    }

    // Fungsi untuk memeriksa ketersediaan username dan menghasilkan username baru jika sudah digunakan
    async function checkAndGenerateUsername(baseUsername) {
      let newUsername = baseUsername;
      let attempt = 1;

      while (true) {
        try {
          const response = await axios.get(
            `${apiku}/SisJwt/CekUser/${newUsername.toUpperCase()}`,
            options
          );

          if (response.data.statusCode === 200) {
            return newUsername; // Username available
          }

          if (response.data.statusCode === 201) {
            console.log(
              `Username ${newUsername} already taken. Trying again...`
            );

            // Jika username sudah terpakai, coba format lain
            if (attempt === 1) {
              // Pertama: Gunakan PPDS + kata pertama
              newUsername = "PPDS " + words[0].toLowerCase();
            } else {
              // Kedua dan seterusnya: Tambahkan karakter pertama dari kata-kata berikutnya
              let nextChars = words
                .slice(1, 4)
                .map((word) => word[0].toLowerCase())
                .join("");
              newUsername = "PPDS " + words[0].toLowerCase() + " " + nextChars;
            }

            // Pastikan panjang username tetap dalam batas yang ditentukan (6-15 karakter)
            if (newUsername.length > 15) {
              newUsername = newUsername.slice(0, 15);
            }

            attempt++;
          }
        } catch (error) {
          console.error("Error checking username:", error);
          return newUsername; // Return last valid username in case of an error
        }
      }
    }

    // Mulai dengan PPDS + kata pertama
    username = "PPDS " + words[0].toLowerCase();

    // Cek ketersediaan username yang dihasilkan
    username = await checkAndGenerateUsername(username);

    setUsername(username.toUpperCase());
    setPassword(generateRandomPassword());
    console.log(
      "Generated PPDS Username:",
      username,
      "Password:",
      generateRandomPassword()
    );
  }

  const addData = (record) => {
    if (listRuangUSer.some((data) => data.ruangId === record.ruangId)) {
      message.warning("Data sudah ada di daftar akses!");
      return;
    }
    setlistRuangUSer([...listRuangUSer, record]);
  };

  const removeData = (record) => {
    setlistRuangUSer(
      listRuangUSer.filter((data) => data.ruangId !== record.ruangId)
    );
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "ruangId",
      key: "ruangId",
      width: "10%",
    },
    {
      title: "Deskripsi",
      dataIndex: "deskripsi",
      key: "deskripsi",
      width: "80%",
    },
    {
      title: "Aksi",
      key: "action",
      width: "10%",
      render: (_, record) => (
        <Button
          //   type="primary"
          onClick={() => addData(record)}
          icon={<PlusCircleTwoTone />}
        />
      ),
    },
  ];

  const dataruang = {
    username:
      username === null || username === ""
        ? null
        : enkrip(username.toUpperCase()),
    ruangAkses: listRuangUSer.map((item) => item.ruangId),
  };

  const accessibleColumns = [
    {
      title: "ID",
      dataIndex: "ruangId",
      key: "ruangId",
      width: "10%",
    },
    {
      title: "Deskripsi",
      dataIndex: "deskripsi",
      key: "deskripsi",
      width: "80%",
    },
    {
      title: "Aksi",
      key: "action",
      width: "10%",
      render: (_, record) => (
        <Button
          //   type="danger"
          onClick={() => removeData(record)}
          icon={<MinusCircleTwoTone twoToneColor="#f5222d" />}
        />
      ),
    },
  ];

  const handleInputChange = (key, field, value) => {
    const newData = data.map((item) =>
      item.key === key ? { ...item, [field]: value } : item
    );
    setData(newData);
  };

  const handleAddRow = () => {
    const newRow = {
      key: String(data.length + 1),
      ppdsId: ppdsId,
      kompetensi: "",
      mulaiAktif: null,
      aktifSampai: null,
    };
    setData([...data, newRow]);
  };

  const handleDeleteRow = (key) => {
    Modal.confirm({
      title: "Konfirmasi",
      content: "Apakah Anda yakin ingin menghapus baris ini?",
      onOk: () => {
        setData(data.filter((item) => item.key !== key));
      },
    });
  };

  const columns1 = [
    {
      width: "35%",
      title: "Kompetensi",
      dataIndex: "kompetensi",
      key: "kompetensi",
      render: (text, record) => (
        <Select
          placeholder="Pilih Kompetensi"
          value={text}
          onChange={(e) => handleInputChange(record.key, "kompetensi", e)}
        >
          <Option value="HIJAU">HIJAU</Option>
          <Option value="KUNING">KUNING</Option>
          <Option value="MERAH">MERAH</Option>
          <Option value="BIRU">BIRU</Option>
        </Select>
      ),
    },
    {
      width: "30%",

      title: "Mulai Aktif",
      dataIndex: "mulaiAktif",
      key: "mulaiAktif",
      render: (text, record) => (
        <DatePicker
          format="DD-MM-YYYY"
          value={text ? dayjs(text) : null}
          onChange={(date) =>
            handleInputChange(
              record.key,
              "mulaiAktif",
              date ? dayjs(date) : null
            )
          }
          placeholder="Pilih Tanggal Mulai"
        />
      ),
    },
    {
      width: "30%",

      title: "Aktif Sampai",
      dataIndex: "aktifSampai",
      key: "aktifSampai",
      render: (text, record) => (
        <DatePicker
          format="DD-MM-YYYY"
          value={text ? dayjs(text) : null}
          onChange={(date) =>
            handleInputChange(
              record.key,
              "aktifSampai",
              date ? dayjs(date) : null
            )
          }
          placeholder="Pilih Tanggal Berakhir"
        />
      ),
    },
    {
      width: "5%",

      title: "Aksi",
      key: "action",
      render: (_, record) => (
        <Button
          //   type="danger"
          onClick={() => handleDeleteRow(record.key)}
          icon={<MinusCircleTwoTone twoToneColor="#f5222d" />}
        />
      ),
    },
  ];
  const filteredPPDS =
    searchTerm.trim() === ""
      ? listPPDS
      : listPPDS.filter((ppds) =>
          ppds.namaPPDS?.toLowerCase().includes(searchTerm.toLowerCase())
        );

  useEffect(() => {
    getListPPDSDetail();
  }, []);
  return (
    <div>
      <Card
        title="Data Master PPDS"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        size="small"
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
        extra={[
          <Space>
            <Button
              size="small"
              onClick={() => {
                getListPPDSDetail();
              }}
            >
              Lihat
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                setPpdsId("");
                setNamaPPDS("");
                setJenisKelamin("");
                setAlamatPPDS("");
                setTelponPPDS("");
                setNim("");
                setAsalUniversitas("");
                setNoSIP("");
                setTglAkhirSIP("");
                setNoSTR("");
                setTglAkhirSTR("");
                setUsername("");
                setSpesialisId("");
                setKompetensi("");
                setMulaiAktif("");
                setAktifSampai("");
                setpassword("");
                setnikPpds("");
                settmpLahir("");
                settglLahir("");
                setData([]);
                setmodalPPDS(true);
              }}
            >
              Tambah
            </Button>
          </Space>,
        ]}
      >
        <Form.Item
          {...formItemLayoutdpjp1}
          label="Cari Nama PPDS"
          style={{ marginBottom: 5 }}
        >
          <Input
            placeholder="Cari Nama PPDS..."
            value={searchTerm}
            onChange={(e) => {
              const value = e.target.value || ""; // Ensure value is always a string
              setSearchTerm(value);
            }}
          />
        </Form.Item>
        <Table
          size="small"
          dataSource={filteredPPDS}
          scroll={{
            // x: "calc(900px + 100%)",
            y: 700,
          }}
          rowKey="ppdsId"
        >
          <Column
            width="5%"
            title="Kode"
            render={(text, record) => <span>{record.ppdsId}</span>}
          />
          <Column
            width="20%"
            title="Nama"
            defaultSortOrder="ascend" // Menentukan urutan default untuk kolom
            sorter={(a, b) => a.namaPPDS.localeCompare(b.namaPPDS)} // Menggunakan localeCompare untuk string
            render={(text, record) => <span>{record.namaPPDS}</span>}
          />
          <Column
            width="10%"
            title="SMF"
            render={(text, record) => <span>{record.spesialisDesk}</span>}
            defaultSortOrder="ascend" // Menentukan urutan default untuk kolom
            sorter={(a, b) => a.spesialisDesk.localeCompare(b.spesialisDesk)} // Menggunakan localeCompare untuk string
          />
          <Column
            width="10%"
            title="Periode"
            render={(text, record) => {
              if (!record.detail || record.detail.length === 0) {
                return <Tag>-</Tag>;
              }

              // Mendapatkan data dengan aktifSampai terlama
              let dataaktif = record.detail.reduce((max, item) =>
                new Date(item.mulaiAktif) > new Date(max.mulaiAktif)
                  ? item
                  : max
              );

              return (
                <span>
                  <Row>
                    <Col span={12}>Kompetensi: </Col>
                    <Col span={12}>
                      {dataaktif.kompetensi === "MERAH" ? (
                        <Tag color="red">MERAH</Tag>
                      ) : dataaktif.kompetensi === "HIJAU" ? (
                        <Tag color="green">HIJAU</Tag>
                      ) : dataaktif.kompetensi === "KUNING" ? (
                        <Tag color="yellow">KUNING</Tag>
                      ) : dataaktif.kompetensi === "BIRU" ? (
                        <Tag color="blue">BIRU</Tag>
                      ) : (
                        <Tag>-</Tag>
                      )}
                    </Col>
                    <Col span={12}>Tgl Mulai: </Col>
                    <Col span={12}>
                      {dataaktif.mulaiAktif === null
                        ? "-"
                        : dayjs(dataaktif.mulaiAktif).format("DD-MM-YYYY")}
                    </Col>
                    <Col span={12}> Tgl Selesai: </Col>
                    <Col span={12}>
                      {dataaktif.aktifSampai === null
                        ? "-"
                        : dayjs(dataaktif.aktifSampai).format("DD-MM-YYYY")}
                    </Col>
                  </Row>
                </span>
              );
            }}
          />
          <Column
            width="15%"
            title="Asal Sekolah"
            render={(text, record) => <span>{record.asalUniversitas}</span>}
            defaultSortOrder="ascend" // Menentukan urutan default untuk kolom
            sorter={(a, b) =>
              a.asalUniversitas.localeCompare(b.asalUniversitas)
            } // Menggunakan localeCompare untuk string
          />
          <Column
            width="10%"
            title="Nama Akun"
            render={(text, record) => {
              if (record.username === null || record.username === "") {
                return (
                  <Button
                    onClick={() => {
                      generatePPDSUsernameAndPassword(
                        record.namaPPDS.toUpperCase(),
                        setUsername,
                        setpassword
                      );
                      setPpdsId(record.ppdsId.trim());
                      setNamaPPDS(record.namaPPDS);
                      setJenisKelamin(record.jenisKelamin.trim());
                      setAlamatPPDS(record.alamatPPDS);
                      setTelponPPDS(record.telponPPDS.trim());
                      setNim(record.nim);
                      setAsalUniversitas(record.asalUniversitas);
                      setNoSIP(record.noSIP);
                      setTglAkhirSIP(
                        record.tglAkhirSIP === null || record.tglAkhirSIP === ""
                          ? ""
                          : dayjs(record.tglAkhirSIP)
                      );
                      setNoSTR(record.noSTR);
                      setTglAkhirSTR(
                        record.tglAkhirSTR === null || record.tglAkhirSTR === ""
                          ? ""
                          : dayjs(record.tglAkhirSTR)
                      );
                      // setUsername(record.username);
                      setSpesialisId(
                        record.spesialisId + "-" + record.spesialisDesk
                      );
                      setKompetensi(record.kompetensi);
                      setMulaiAktif(dayjs(record.mulaiAktif));
                      setAktifSampai(dayjs(record.aktifSampai));
                      settglLahir(
                        record.tanggalLahir === null ||
                          record.tanggalLahir === ""
                          ? ""
                          : dayjs(record.tanggalLahir)
                      );
                      setData(
                        record.detail.map((item, index) => ({
                          ...item,
                          key: index + 1, // Menambahkan key berdasarkan index
                        }))
                      );
                      setnikPpds(record.nik);
                      settmpLahir(record.tempatLahir);
                      // getListSpesialisAll();
                      setmodalAkun(true);
                      // console.log(record.detail);
                    }}
                  >
                    Buat Akun
                  </Button>
                );
              } else {
                return record.username;
              }
            }}
          />
          <Column
            width="20%"
            title="Action"
            render={(text, record) => (
              <Space>
                {record.username && (
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => {
                      console.log();
                      record.telponPPDS.trim() === null ||
                      record.telponPPDS.trim() === ""
                        ? Modal.warning({
                            content: "No Telpon Tidak Ditemukan!",
                          })
                        : postWa(record.username);
                    }}
                    style={{ backgroundColor: "#b7eb8f", color: "black" }}
                  >
                    Kirim WA
                  </Button>
                )}
                <Button
                  size="small"
                  type="primary"
                  onClick={() => {
                    setPpdsId(record.ppdsId.trim());
                    setNamaPPDS(record.namaPPDS);
                    setJenisKelamin(record.jenisKelamin.trim());
                    setAlamatPPDS(record.alamatPPDS);
                    setTelponPPDS(record.telponPPDS.trim());
                    setNim(record.nim);
                    setAsalUniversitas(record.asalUniversitas);
                    setNoSIP(record.noSIP);
                    setTglAkhirSIP(
                      record.tglAkhirSIP === null || record.tglAkhirSIP === ""
                        ? ""
                        : dayjs(record.tglAkhirSIP)
                    );
                    setNoSTR(record.noSTR);
                    setTglAkhirSTR(
                      record.tglAkhirSTR === null || record.tglAkhirSTR === ""
                        ? ""
                        : dayjs(record.tglAkhirSTR)
                    );
                    setUsername(record.username);
                    setSpesialisId(
                      record.spesialisId + "-" + record.spesialisDesk
                    );
                    setKompetensi(record.kompetensi);
                    setMulaiAktif(dayjs(record.mulaiAktif));
                    setAktifSampai(dayjs(record.aktifSampai));
                    settglLahir(
                      record.tanggalLahir === null || record.tanggalLahir === ""
                        ? ""
                        : dayjs(record.tanggalLahir)
                    );
                    setData(
                      record.detail.map((item, index) => ({
                        ...item,
                        key: index + 1, // Menambahkan key berdasarkan index
                      }))
                    );
                    setnikPpds(record.nik);
                    settmpLahir(record.tempatLahir);
                    getListSpesialisAll();
                    setmodalPPDS(true);
                    console.log(record.detail);
                    // cekPasswordUser(record.username.toUpperCase());
                  }}
                >
                  Lihat
                </Button>
                <Button
                  size="small"
                  type="primary"
                  onClick={() => {
                    setNamaPPDS(record.namaPPDS);
                    setUsername(record.username);
                    setmodalAkses(true);
                    setlistRuangUSer([]);
                    setGrup("");
                  }}
                  style={{
                    backgroundColor: "forestgreen",
                  }}
                >
                  Akses Ruang
                </Button>
              </Space>
            )}
          />
        </Table>
      </Card>
      <Modal
        title="Form Tambah Master PPDS"
        open={modalPPDS}
        onCancel={() => setmodalPPDS(false)}
        closable={false}
        footer={null}
        width="80%"
        style={{ top: 50 }}
        maskClosable={false}
      >
        <Row gutter={[5, 5]}>
          <Col span={10}>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Nama"
              style={{ marginBottom: 5 }}
            >
              <Input
                value={namaPPDS}
                onChange={(e) => {
                  setNamaPPDS(e.target.value);
                }}
              />
              {/* <small style={{ color: "red" }}>Tidak Boleh Kosong</small> */}
            </Form.Item>

            <Form.Item
              {...formItemLayoutdpjp}
              label="Jenis Kelamin"
              style={{ marginBottom: 5 }}
            >
              <Select
                value={jenisKelamin}
                onChange={(e) => {
                  setJenisKelamin(e);
                }}
              >
                <Option value="L">Laki-Laki</Option>
                <Option value="P">Perempuan</Option>
              </Select>
            </Form.Item>
            <Form.Item
              {...formItemLayoutdpjp}
              label="NIK"
              style={{ marginBottom: 5 }}
            >
              <Input
                value={nikPpds}
                onChange={(e) => {
                  setnikPpds(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Tempat Lahir"
              style={{ marginBottom: 5 }}
            >
              <Input
                value={tmpLahir}
                onChange={(e) => {
                  settmpLahir(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Tgl Lahir"
              style={{ marginBottom: 5 }}
            >
              <DatePicker
                value={tglLahir}
                style={{ width: "100%" }}
                format="DD-MM-YYYY"
                onChange={(e) => {
                  settglLahir(e);
                }}
              />
            </Form.Item>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Alamat"
              style={{ marginBottom: 5 }}
            >
              <Input.TextArea
                rows={2}
                value={alamatPPDS}
                onChange={(e) => {
                  setAlamatPPDS(e.target.value);
                }}
                showCount
                maxLength={100}
              />
            </Form.Item>
            <Form.Item
              {...formItemLayoutdpjp}
              label="No HP"
              style={{ marginBottom: 5 }}
            >
              <Input
                value={telponPPDS}
                onChange={(e) => {
                  setTelponPPDS(e.target.value);
                }}
              />
              <small style={{ color: "red" }}>
                ex. 085xxxx atau +6285xxx / jangan gunkan - atau lainnya
              </small>
            </Form.Item>
            <Form.Item
              {...formItemLayoutdpjp}
              label="NIM"
              style={{ marginBottom: 5 }}
            >
              <Input
                value={nim}
                onChange={(e) => {
                  setNim(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Asal Univ"
              style={{ marginBottom: 5 }}
            >
              <Select
                onChange={(value) => {
                  setAsalUniversitas(value);
                }}
                value={asalUniversitas} // Mengatur tampilan nilai yang dipilih
                showSearch
                style={{ width: "100%" }}
                placeholder="..."
                optionFilterProp="children"
              >
                {dataUniv.map((d) => (
                  <Option value={d.nama}>{d.nama}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              {...formItemLayoutdpjp}
              label="No SIP"
              style={{ marginBottom: 5 }}
            >
              <Input
                value={noSIP}
                onChange={(e) => {
                  setNoSIP(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Tgl Akhir SIP"
              style={{ marginBottom: 5 }}
            >
              <DatePicker
                value={tglAkhirSIP}
                style={{ width: "100%" }}
                format="DD-MM-YYYY"
                onChange={(e) => {
                  setTglAkhirSIP(e);
                }}
              />
            </Form.Item>
            <Form.Item
              {...formItemLayoutdpjp}
              label="No STR"
              style={{ marginBottom: 5 }}
            >
              <Input
                value={noSTR}
                onChange={(e) => {
                  setNoSTR(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Tgl Akhir STR"
              style={{ marginBottom: 5 }}
            >
              <DatePicker
                value={tglAkhirSTR}
                style={{ width: "100%" }}
                format="DD-MM-YYYY"
                onChange={(e) => {
                  setTglAkhirSTR(e);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Kode PPDS"
              style={{ marginBottom: 5 }}
            >
              <Input disabled readOnly value={ppdsId === 0 ? "" : ppdsId} />
            </Form.Item>

            <Form.Item
              {...formItemLayoutdpjp}
              label="SMF"
              style={{ marginBottom: 5 }}
            >
              <Select
                onChange={(value) => {
                  setSpesialisId(value);
                  console.log(value);
                }}
                dataSource={listSpesialisAll}
                value={spesialisId} // Mengatur tampilan nilai yang dipilih
                onFocus={() => {
                  getListSpesialisAll();
                }}
                showSearch
                style={{ width: "100%" }}
                placeholder="..."
                optionFilterProp="children"
              >
                {listSpesialisAll.map((d) => (
                  <Option value={d.SpesialisId + "-" + d.Deskripsi}>
                    {d.Deskripsi}
                  </Option>
                ))}
              </Select>
              {/* <small style={{ color: "red" }}>Tidak Boleh Kosong</small> */}
            </Form.Item>

            {/* <Form.Item
              {...formItemLayoutdpjp}
              label="Kompetensi"
              style={{ marginBottom: 5 }}
            >
              <Select
                value={kompetensi}
                onChange={(e) => {
                  setKompetensi(e);
                }}
              >
                <Option value="HIJAU">HIJAU</Option>
                <Option value="KUNING">KUNING</Option>
                <Option value="MERAH">MERAH</Option>
                <Option value="BIRU">BIRU</Option>
              </Select>
            </Form.Item>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Tgl Mulai"
              style={{ marginBottom: 5 }}
            >
              <DatePicker
                value={mulaiAktif}
                style={{ width: "100%" }}
                format="DD-MM-YYYY"
                onChange={(e) => {
                  setMulaiAktif(e);
                }}
              />
            </Form.Item>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Tgl Selesai"
              style={{ marginBottom: 5 }}
            >
              <DatePicker
                value={aktifSampai}
                style={{ width: "100%" }}
                format="DD-MM-YYYY"
                onChange={(e) => {
                  setAktifSampai(e);
                }}
              />
            </Form.Item> */}
            <Form.Item
              {...formItemLayoutdpjp}
              label="Periode/Kompetensi"
              style={{ marginBottom: 5 }}
            >
              <Row>
                <Col span={24}>
                  <Button
                    iconPosition="end"
                    icon={<PlusCircleOutlined />}
                    size="small"
                    type="primary"
                    onClick={handleAddRow}
                    style={{ marginBottom: 5 }}
                  >
                    Periode
                  </Button>
                  {/* <small style={{ color: "red" }}>
                    Tidak Boleh Kosong, isi Kompetensi, Mulai Aktif, Aktif
                    Sampai
                  </small> */}
                </Col>
                <Col span={24}>
                  <Table
                    dataSource={data}
                    columns={columns1}
                    pagination={false}
                  />
                </Col>
              </Row>
            </Form.Item>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Generate Akun"
              style={{ marginBottom: 5 }}
            >
              <Space.Compact
                style={{
                  width: "100%",
                }}
              >
                <Input
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  value={username}
                  showCount
                  maxLength={15}
                />
                <Button
                  //   type="danger"
                  onClick={() => {
                    generatePPDSUsernameAndPassword(
                      namaPPDS.toUpperCase(),
                      setUsername,
                      setpassword
                    );
                  }}
                  icon={<EditTwoTone />}
                />

                {/* <Button
                  type="primary"
                  iconPosition="end"
                  style={{ marginBottom: 5 }}
                  icon={<PlusCircleOutlined />}
                  size="small"
                >
                  Generate
                </Button> */}
              </Space.Compact>
              <small style={{ color: "red" }}>
                Klik icon pensil untuk melakukan generate akun dan passord
              </small>
              {/* <Row>
                <Col span={24}></Col>
                <Col span={24}>
                  <Form.Item
                    {...formItemLayoutdpjp}
                    label="Akun"
                    style={{ marginBottom: 5 }}
                  ></Form.Item>
                </Col> */}
              {/* <Col span={24}>
                <Form.Item
                  {...formItemLayoutdpjp}
                  label="Sandi"
                  style={{ marginBottom: 5 }}
                >
                  <Input readOnly value={password} showCount maxLength={15} />
                </Form.Item>
              </Col> */}
              {/* </Row>*/}
            </Form.Item>
          </Col>
          <Col span={24} style={{ textAlign: "right" }}>
            <Space>
              <Button
                onClick={() => {
                  setmodalPPDS(false);
                }}
              >
                Kembali
              </Button>
              <Button
                type="primary"
                onClick={async () => {
                  console.log(dataPPDs, datauserbuat, kirimwa);
                  try {
                    if (ppdsId === "") {
                      if (username === "") {
                        await postPPDSmaster(dataPPDs);
                      } else {
                        const response = await axios.get(
                          `${apiku}/SisJwt/CekUser/${username.toUpperCase()}`,
                          options
                        );

                        if (response.data.statusCode === 201) {
                          return Modal.warning({
                            content:
                              "Nama Akun Sudah Digunakan, Silakan Ubah Nama Akun",
                          });
                        } else {
                          await postPPDS(dataPPDs, datauserbuat);
                        }
                      }
                    } else {
                      await postPPDSmaster(dataPPDs);
                    }
                  } catch (error) {
                    Modal.error({ content: "Terjadi Kesalahan Koneksi!" });
                  }
                }}
              >
                Simpan
              </Button>
            </Space>
          </Col>
        </Row>
      </Modal>
      <Modal
        title="Form Tambah Master PPDS"
        open={modalAkses}
        onCancel={() => setmodalAkses(false)}
        closable={false}
        footer={null}
        width="80%"
        style={{ top: 50 }}
        maskClosable={false}
      >
        <Divider size="small">Daftar Akses Ruang Pelayanan</Divider>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              //   {...formItemLayoutdpjp}
              label="Nama PPDS"
              style={{ marginBottom: 5 }}
            >
              <Input readOnly value={namaPPDS} />
            </Form.Item>
            <Form.Item
              //   {...formItemLayoutdpjp}
              label="Nama Akun"
              style={{ marginBottom: 5 }}
            >
              <Input readOnly value={username} />
            </Form.Item>
            <Form.Item label="Grup Ruang" style={{ marginBottom: 5 }}>
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Grup"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
                onSelect={(e) => {
                  setGrup(e);
                  getRuang(e);
                  getruangUser(
                    encodeURIComponent(enkrip(username.toUpperCase())),
                    "%20",
                    e
                  );
                  console.log(username);
                }}
                value={grup}
              >
                <Option key={"1"}>Rawat Inap</Option>
                <Option key={"2"}>Rawat Jalan</Option>
                <Option key={"3"}>IGD</Option>
                <Option key={"4"}>Penunjang Medis</Option>
                <Option key={"5"}>Penunjang Non Medis</Option>
                <Option key={"6"}>Struktural</Option>
                <Option key={"7"}>Apotik Farmasi</Option>
              </Select>
              <small style={{ color: "red" }}>
                Pilih Group Pelayanan Yang akan Ditambahkan
              </small>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Divider orientation="left" plain size="small">
              Pilihan
            </Divider>
            <Table
              pagination={false}
              dataSource={ruangList}
              columns={columns}
              rowKey="ruangId"
              size="small"
              scroll={{ y: 300 }}
            />
          </Col>
          <Col span={12}>
            <Divider orientation="left" plain size="small">
              Terpilih
            </Divider>
            <Table
              pagination={false}
              dataSource={listRuangUSer}
              columns={accessibleColumns}
              rowKey="ruangId"
              size="small"
              scroll={{ y: 300 }}
            />
          </Col>
          <Col span={24} style={{ textAlign: "end" }}>
            <Space>
              {/* <Button>Batal</Button> */}
              <Button
                //   type="primary"
                onClick={() => {
                  setmodalAkses(false);
                }}
              >
                Kembali
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  postUserAkses(dataruang);
                  console.log(dataruang);
                }}
              >
                Simpan
              </Button>
            </Space>
          </Col>
        </Row>
      </Modal>

      <Modal
        title="Form Buat Akun PPDS"
        open={modalAkun}
        onCancel={() => setmodalAkun(false)}
        closable={false}
        footer={null}
        width="50%"
        style={{ top: 50 }}
        maskClosable={false}
      >
        <Row gutter={[5, 5]}>
          <Col span={24}>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Nama"
              style={{ marginBottom: 5 }}
            >
              <Input value={namaPPDS} readOnly />
            </Form.Item>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Generate Akun"
              style={{ marginBottom: 5 }}
            >
              <Space.Compact
                style={{
                  width: "100%",
                }}
              >
                <Input
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  value={username}
                  showCount
                  maxLength={15}
                />
                <Button
                  //   type="danger"
                  onClick={() => {
                    generatePPDSUsernameAndPassword(
                      namaPPDS.toUpperCase(),
                      setUsername,
                      setpassword
                    );
                  }}
                  icon={<EditTwoTone />}
                />
              </Space.Compact>
              <small style={{ color: "red" }}>
                Klik icon pensil untuk melakukan generate akun dan passord
              </small>
            </Form.Item>
          </Col>
          <Col span={24} style={{ textAlign: "right" }}>
            <Space>
              <Button
                onClick={() => {
                  setmodalAkun(false);
                }}
              >
                Kembali
              </Button>
              <Button
                type="primary"
                onClick={async () => {
                  console.log(dataPPDs, datauserbuat);
                  try {
                    const response = await axios.get(
                      `${apiku}/SisJwt/CekUser/${username.toUpperCase()}`,
                      options
                    );
                    if (response.data.statusCode === 201) {
                      return Modal.warning({
                        content:
                          "Nama Akun Sudah DiGunakan Silahkan Ubah Nama Akun",
                      });
                    } else {
                      await postPPDS(dataPPDs, datauserbuat); // Likewise, use await here
                    }
                  } catch (error) {
                    Modal.error({ content: "Terjadi Kesalahan Koneksi!" }); // Display error modal
                  }
                }}
              >
                Simpan
              </Button>
            </Space>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default MasterPPDS;
