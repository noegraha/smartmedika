import React, { useContext, useState } from "react";
import { SatuSehatEncounterContext } from "../../../context/SatuSehatEncounterContext";
import { Button, Col, Divider, Input, Row, Space, Spin, Table } from "antd";
import { CloudDownloadOutlined, SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const ResumeMedis = () => {
  const {
    ihsPasien,
    waktuPelayanan,
    identitasPx,
    paramEncounter,
    postResource,
    getRiwRscId,
    spCvg,
    getResourceById,
    setmsRscdetail,
    ihsRS,
  } = useContext(SatuSehatEncounterContext);
  const [diagnosisPrimer, setDiagnosisPrimer] = useState(null);
  const [diagnosisSekunder, setDiagnosisSekunder] = useState(null);
  const [keluhanUtama, setKeluhanUtama] = useState(null);
  const [keluhanPenyerta, setKeluhanPenyerta] = useState(null);
  const [penyakitSekarang, setPenyakitSekarang] = useState(null);
  const [penyakitTerdahulu, setPenyakitTerdahulu] = useState(null);
  const [penyakitKeluarga, setPenyakitKeluarga] = useState(null);
  const [riwayatPengobatan, setRiwayatPengobatan] = useState(null);
  const [sistolik, setSistolik] = useState(null);
  const [diastolik, setDiastolik] = useState(null);
  const [suhu, setSuhu] = useState(null);
  const [nadi, setNadi] = useState(null);
  const [nafas, setNafas] = useState(null);
  const [kesadaran, setKesadaran] = useState(null);
  const [tinggi, setTinggi] = useState(null);
  const [berat, setBerat] = useState(null);
  const [luas, setLuas] = useState(null);
  const [mata, setMata] = useState(null);
  const [alergi, setAlergi] = useState(null);
  const [triase, setTriase] = useState(null);
  const [assesmenNyeri, setAssesmenNyeri] = useState(null);
  const [morseFallScale, setMorseFallScale] = useState(null);
  const [lukaDecubitus, setLukaDecubitus] = useState(null);
  const [skalaNorton, setSkalaNorton] = useState(null);
  const [batuk, setBatuk] = useState(null);
  const [gizi, setGizi] = useState(null);
  const [muntah, setMuntah] = useState(null);
  const [statusPsikologis, setStatusPsikologis] = useState(null);
  const [goalTujuan, setGoalTujuan] = useState(null);
  const [rencanaRawat, setRencanaPerawatan] = useState(null);
  const [instruksiMedis, setInstruksiMedis] = useState(null);
  const [procedureLab, setProcedureLab] = useState(null);
  const [serviceRequest, setServiceRequest] = useState(null);
  const [specimenLab, setSpecimen] = useState(null);
  const [observationLab, setObservationLab] = useState(null);
  const [diagnosticReport, setDiagnosticReport] = useState(null);
  const [rasionalKlinis, setRasionalKlinis] = useState(null);
  const [penilaianResiko, setPenilaianResiko] = useState(null);
  const [procedureEKG, setProcedureEKG] = useState(null);
  const [observationEKG, setObservationEKG] = useState(null);
  const [medicationRequest, setMedicationRequest] = useState(null);
  const [medicationDispense, setMedicationDispense] = useState(null);
  const [medicationAdministration, setMedicationAdministration] =
    useState(null);
  const [riwayatPerjalanan, setRiwayatPerjalanan] = useState(null);
  const [listKeluar, setListKeluar] = useState([]);
  const [keterangan, setKeterangan] = useState("");
  const [load, setLoad] = useState(false);
  const klikRefresh = async (codeGrup) => {
    let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
    if (codeGrup === "106") {
      setListKeluar(data);
    } else if (codeGrup === "79") {
      setDiagnosisPrimer(data.lenght !== 0 ? data[0].ResourceID : null);
      console.log(data.lenght !== 0 ? data[0] : null);
    } else if (codeGrup === "80") {
      setDiagnosisSekunder(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "1") {
      setKeluhanUtama(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "2") {
      setKeluhanPenyerta(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "6") {
      setPenyakitSekarang(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "7") {
      setPenyakitTerdahulu(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "8") {
      setPenyakitKeluarga(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "9") {
      setTriase(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "10") {
      setAlergi(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "11") {
      setRiwayatPengobatan(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "12") {
      setAssesmenNyeri(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "13") {
      setMorseFallScale(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "15") {
      setSistolik(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "16") {
      setDiastolik(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "17") {
      setSuhu(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "18") {
      setNadi(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "19") {
      setNafas(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "20") {
      setKesadaran(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "22") {
      setMata(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "49") {
      setTinggi(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "50") {
      setBerat(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "51") {
      setLuas(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "52") {
      setLukaDecubitus(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "53") {
      setSkalaNorton(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "54") {
      setBatuk(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "55") {
      setGizi(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "56") {
      setMuntah(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "60") {
      setRiwayatPerjalanan(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "58") {
      setStatusPsikologis(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "61") {
      setGoalTujuan(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "63") {
      setRencanaPerawatan(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "64") {
      setInstruksiMedis(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "65") {
      setProcedureLab(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "66") {
      setServiceRequest(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "67") {
      setSpecimen(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "68") {
      setObservationLab(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "69") {
      setDiagnosticReport(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "78") {
      setRasionalKlinis(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "82") {
      setPenilaianResiko(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "85") {
      setProcedureEKG(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "86") {
      setObservationEKG(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "94") {
      setMedicationRequest(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "96") {
      setMedicationDispense(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "97") {
      setMedicationAdministration(
        data.lenght !== 0 ? data[0].ResourceID : null
      );
    }
  };
  const klikRefreshSemua = async () => {
    setLoad(true);
    // Daftar codeGrup dan fungsi setState
    const grupData = [
      { codeGrup: "106", setState: setListKeluar },
      { codeGrup: "79", setState: setDiagnosisPrimer },
      { codeGrup: "80", setState: setDiagnosisSekunder },
      { codeGrup: "1", setState: setKeluhanUtama },
      { codeGrup: "2", setState: setKeluhanPenyerta },
      { codeGrup: "6", setState: setPenyakitSekarang },
      { codeGrup: "7", setState: setPenyakitTerdahulu },
      { codeGrup: "8", setState: setPenyakitKeluarga },
      { codeGrup: "9", setState: setTriase },
      { codeGrup: "10", setState: setAlergi },
      { codeGrup: "11", setState: setRiwayatPengobatan },
      { codeGrup: "12", setState: setAssesmenNyeri },
      { codeGrup: "13", setState: setMorseFallScale },
      { codeGrup: "15", setState: setSistolik },
      { codeGrup: "16", setState: setDiastolik },
      { codeGrup: "17", setState: setSuhu },
      { codeGrup: "18", setState: setNadi },
      { codeGrup: "19", setState: setNafas },
      { codeGrup: "20", setState: setKesadaran },
      { codeGrup: "22", setState: setMata },
      { codeGrup: "49", setState: setTinggi },
      { codeGrup: "50", setState: setBerat },
      { codeGrup: "51", setState: setLuas },
      { codeGrup: "52", setState: setLukaDecubitus },
      { codeGrup: "53", setState: setSkalaNorton },
      { codeGrup: "54", setState: setBatuk },
      { codeGrup: "55", setState: setGizi },
      { codeGrup: "56", setState: setMuntah },
      { codeGrup: "58", setState: setStatusPsikologis },
      { codeGrup: "60", setState: setRiwayatPerjalanan },
      { codeGrup: "61", setState: setGoalTujuan },
      { codeGrup: "63", setState: setRencanaPerawatan },
      { codeGrup: "64", setState: setInstruksiMedis },
      { codeGrup: "65", setState: setProcedureLab },
      { codeGrup: "66", setState: setServiceRequest },
      { codeGrup: "67", setState: setSpecimen },
      { codeGrup: "68", setState: setObservationLab },
      { codeGrup: "69", setState: setDiagnosticReport },
      { codeGrup: "78", setState: setRasionalKlinis },
      { codeGrup: "82", setState: setPenilaianResiko },
      { codeGrup: "85", setState: setProcedureEKG },
      { codeGrup: "86", setState: setObservationEKG },
      { codeGrup: "94", setState: setMedicationRequest },
      { codeGrup: "96", setState: setMedicationDispense },
      { codeGrup: "97", setState: setMedicationAdministration },
    ];

    try {
      // Jalankan semua permintaan secara paralel
      const results = await Promise.all(
        grupData.map((item) =>
          getRiwRscId(identitasPx.RegistrasiId, item.codeGrup)
        )
      );

      // Proses hasil berdasarkan urutan
      results.forEach((data, index) => {
        const { setState } = grupData[index];
        setState(data?.length !== 0 ? data[0].ResourceID : null);
      });

      console.log("Semua data berhasil diperbarui!", results);
    } catch (err) {
      console.error("Terjadi kesalahan saat memperbarui data:", err);
    } finally {
      setKeterangan(
        `Pasien ${identitasPx.Nama} masuk rumah sakit pada tanggal 4 Juli 2023 dengan karena pendarahan di area vagina dan nyeri yang memberat. Pasien memiliki riwayat penyakit pribadi dan keluarga terkait diabetes melitus tipe 2. Hasil pemeriksaan lab dan radiologi menunjukkan hasil yang kurang baik. Pasien melakukan tindakan diagnostik dan terapetik. Pasien didiagnosis aborsi spontan. Pasien diberi obat pada saat saat kunjungan dan obat untuk dibawa pulang. Pasien pulang dengan prognosis baik dan keadaan stabil. Pasien melanjutkan perawatan ke rawat inap.`
      );
      setLoad(false); // Matikan spinner setelah selesai
    }
  };
  const colTriase = [
    {
      title: "No",
      dataIndex: "index",
      key: "index",
      align: "center",
      ellipsis: true,
      width: 50,
      render: (text, record, index) => index + 1,
    },
    {
      title: "RegistrasiId",
      dataIndex: "RegistrasiId",
      align: "center",
      key: "RegistrasiId",
      width: 150,
    },
    {
      title: "ResourceId",
      dataIndex: "ResourceID",
      key: "ResourceID",
    },
    {
      title: "ResourceType",
      dataIndex: "ResourceType",
      key: "ResourceType",
    },
    {
      title: "DateEntry",
      dataIndex: "DateEntry",
      key: "DateEntry",
      align: "center",
      width: 200,
    },
    {
      title: "Aksi",
      dataIndex: "aksi",
      key: "aksi",
      align: "center",
      width: 70,
      render: (text, record, index) => (
        <div>
          <Button
            type="primary"
            onClick={() => klikDetail(record.ResourceID, record.ResourceType)}
            icon={<SearchOutlined />}
            size="small"
            style={{ backgroundColor: "#73d13d", borderColor: "#73d13d" }}
          />
        </div>
      ),
    },
  ];
  const klikDetail = (id, rscType) => {
    setmsRscdetail(true);
    getResourceById(id, rscType);
  };


  const klikPost = () => {
    let dataResumeMedis = {
      resourceType: "Composition",
      identifier: {
        system: `http://sys-ids.kemkes.go.id/composition/${ihsRS}`,
        value: "P20240001",
      },
      status: "final",
      category: [
        {
          coding: [
            {
              system: "http://loinc.org",
              code: "LP173421-1",
              display: "Report",
            },
          ],
        },
      ],
      type: {
        coding: [
          {
            system: "http://loinc.org",
            code: "97663-9",
            display: "Emergency medicine Emergency department Discharge summary",
          },
        ],
      },
      subject: {
        reference: `Patient/${ihsPasien}`,
      },
      date: dayjs(waktuPelayanan).subtract(7, "hour").format(),
      title: `Resume Medis Pasien Rawat Jalan ${identitasPx.Nama} pada tanggal 4 Juni 2023`,
      author: [
        {
          reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
        },
      ],
      custodian: {
        reference: `Organization/${ihsRS}`,
      },
      encounter: {
        reference: `Encounter/${paramEncounter.ResourceID}`,
      },
      section: [
        {
          title: "Asesmen Awal IGD",
          code: {
            coding: [
              {
                system: "http://loinc.org",
                code: "97667-0",
                display:
                  "Emergency medicine Emergency department Initial evaluation note",
              },
            ],
          },
          entry: [
            {
              reference: `Observation/${triase}`,
            },
            {
              reference: `Observation/${assesmenNyeri}`,
            },
            {
              reference: `Observation/${morseFallScale}`,
            },
          ],
        },
        {
          title: "Skrining",
          code: {
            coding: [
              {
                system: "http://terminology.kemkes.go.id",
                code: "TK000129",
                display: "Skrining",
              },
            ],
          },
          entry: [
            {
              reference: `Observation/${lukaDecubitus}`,
            },
            {
              reference: `QuestionnaireResponse/${batuk}`,
            },
            {
              reference: `QuestionnaireResponse/${gizi}`,
            },
            {
              reference: `Observation/${muntah}`,
            },
          ],
        },
        {
          title: "Anamnesis",
          code: {
            coding: [
              {
                system: "http://terminology.kemkes.go.id",
                code: "TK000003",
                display: "Anamnesis",
              },
            ],
          },
          section: [
            {
              title: "Keluhan Utama",
              code: {
                coding: [
                  {
                    system: "http://loinc.org",
                    code: "10154-3",
                    display: "Chief complaint Narrative - Reported",
                  },
                ],
              },
              entry: [
                {
                  reference: `Condition/${keluhanUtama}`,
                },
              ],
            },
            {
              title: "Keluhan Penyerta",
              code: {
                coding: [
                  {
                    system: "http://loinc.org",
                    code: "11450-4",
                    display: "Problem list - Reported",
                  },
                ],
              },
              entry: [
                {
                  reference: `Condition/${keluhanPenyerta}`,
                },
              ],
            },
            {
              title: "Riwayat Penyakit Pribadi Terdahulu",
              code: {
                coding: [
                  {
                    system: "http://loinc.org",
                    code: "11348-0",
                    display: "History of Past illness Narrative",
                  },
                ],
              },
              entry: [
                {
                  reference: `Condition/${penyakitTerdahulu}`,
                },
              ],
            },
            {
              title: "Riwayat Penyakit Pribadi Sekarang",
              code: {
                coding: [
                  {
                    system: "http://loinc.org",
                    code: "10164-2",
                    display: "History of Present illness Narrative",
                  },
                ],
              },
              entry: [
                {
                  reference: `Condition/${penyakitSekarang}`,
                },
              ],
            },
            {
              title: "Riwayat Penyakit Keluarga",
              code: {
                coding: [
                  {
                    system: "http://loinc.org",
                    code: "10157-6",
                    display: "History of family member diseases Narrative",
                  },
                ],
              },
              entry: [
                {
                  reference: `FamilyMemberHistory/${penyakitKeluarga}`,
                },
              ],
            },
            {
              title: "Riwayat Alergi",
              code: {
                coding: [
                  {
                    system: "http://loinc.org",
                    code: "48765-2",
                    display: "Allergies",
                  },
                ],
              },
              entry: [
                {
                  reference: `AllergyIntolerance/${alergi}`,
                },
              ],
            },
            {
              title: "Riwayat Pengobatan",
              code: {
                coding: [
                  {
                    system: "http://loinc.org",
                    code: "10160-0",
                    display: "History of Medication use Narrative",
                  },
                ],
              },
              entry: [
                {
                  reference: `MedicationStatement/${riwayatPengobatan}`,
                },
              ],
            },
          ],
        },
        {
          title: "Pemeriksaan Fisik",
          code: {
            coding: [
              {
                system: "http://terminology.kemkes.go.id",
                code: "TK000007",
                display: "Pemeriksaan Fisik",
              },
            ],
          },
          section: [
            {
              title: "Tanda Vital",
              code: {
                coding: [
                  {
                    system: "http://loinc.org",
                    code: "8716-3",
                    display: "Vital signs",
                  },
                ],
              },
              entry: [
                {
                  reference: `Observation/${sistolik}`,
                },
                {
                  reference: `Observation/${diastolik}`,
                },
                {
                  reference: `Observation/${suhu}`,
                },
                {
                  reference: `Observation/${nadi}`,
                },
                {
                  reference: `Observation/${nafas}`,
                },
                {
                  reference: `Observation/${kesadaran}`,
                },
                {
                  reference: `Observation/${tinggi}`,
                },
                {
                  reference: `Observation/${berat}`,
                },
                {
                  reference: `Observation/${luas}`,
                },
              ],
            },
            {
              title: "Pemeriksaan Fisik Head to Toe",
              code: {
                coding: [
                  {
                    system: "http://loinc.org",
                    code: "10187-3",
                    display: "Review of systems Narrative - Reported",
                  },
                ],
              },
              entry: [
                {
                  reference: `Observation/${mata}`,
                },
              ],
            },
          ],
        },
        {
          title: "Pemeriksaan Fungsional",
          code: {
            coding: [
              {
                system: "http://loinc.org",
                code: "47420-5",
                display: "Functional status assessment note",
              },
            ],
          },
          entry: [
            {
              reference: `Observation/${statusPsikologis}`,
            },
          ],
        },
        {
          title: "Perencanaan Perawatan",
          code: {
            coding: [
              {
                system: "http://loinc.org",
                code: "18776-5",
                display: "Plan of care note",
              },
            ],
          },
          entry: [
            {
              reference: `ClinicalImpression/${riwayatPerjalanan}`,
            },
            {
              reference: `Goal/${goalTujuan}`,
            },
            {
              reference: `CarePlan/${rencanaRawat}`,
            },
            {
              reference: `CarePlan/${instruksiMedis}`,
            },
          ],
        },
        {
          title: "Pemeriksaan Penunjang",
          code: {
            coding: [
              {
                system: "http://terminology.kemkes.go.id",
                code: "TK000009",
                display: "Hasil Pemeriksaan Penunjang",
              },
            ],
          },
          section: [
            {
              title: "Hasil Pemeriksaan Laboratorium",
              code: {
                coding: [
                  {
                    system: "http://loinc.org",
                    code: "11502-2",
                    display: "Laboratory report",
                  },
                ],
              },
              entry: [
                {
                  reference: `ServiceRequest/${serviceRequest}`,
                },
                {
                  reference: `Procedure/${procedureLab}`,
                },
                {
                  reference: `Specimen/${specimenLab}`,
                },
                {
                  reference: `Observation/${observationLab}`,
                },
                //   {
                //     reference: `Observation/{{Observation_Lab2}}`,
                //   },
                {
                  reference: `DiagnosticReport/${diagnosticReport}`,
                },
              ],
            },
            //       {
            //         title: "Hasil Pemeriksaan Radiologi",
            //         code: {
            //           coding: [
            //             {
            //               system: "http://loinc.org",
            //               code: "18782-3",
            //               display: "Radiology Study observation (narrative)",
            //             },
            //           ],
            //         },
            //         entry: [
            //           {
            //             reference: "ServiceRequest/{{ServiceRequest_Rad}}",
            //           },
            //           {
            //             reference: "Procedure/{{Procedure_PraRad}}",
            //           },
            //           {
            //             reference: "Observation/{{Observation_PraRad}}",
            //           },
            //           {
            //             reference: "AllergyIntolerance/{{AllergyIntolerance_PraRad}}",
            //           },
            //           {
            //             reference: "ImagingStudy/{{ImagingStudy_Rad}}",
            //           },
            //           {
            //             reference: "Observation/{{Observation_Rad}}",
            //           },
            //           {
            //             reference: "DiagnosticReport/{{DiagnosticReport_Rad}}",
            //           },
            //         ],
            //       },
            //     ],
            //   },
            {
              title: "Diagnosis",
              code: {
                coding: [
                  {
                    system: "http://terminology.kemkes.go.id",
                    code: "TK000004",
                    display: "Diagnosis",
                  },
                ],
              },
              section: [
                {
                  title: "Diagnosis Awal",
                  code: {
                    coding: [
                      {
                        system: "http://loinc.org",
                        code: "42347-5",
                        display: "Admission diagnosis (narrative)",
                      },
                    ],
                  },
                  entry: [
                    {
                      reference: "Condition/{{Condition_DiagnosisAwal}}",
                    },
                    {
                      reference: "Condition/{{Condition_DiagnosisKerja}}",
                    },
                    {
                      reference: "Condition/{{Condition_DiagnosisBanding}}",
                    },
                  ],
                },
                {
                  title: "Diagnosis Akhir",
                  code: {
                    coding: [
                      {
                        system: "http://loinc.org",
                        code: "78375-3",
                        display: "Discharge diagnosis Narrative",
                      },
                    ],
                  },
                  entry: [
                    {
                      reference: `ClinicalImpression/${rasionalKlinis}`,
                    },
                    {
                      reference: `RiskAssessment/${penilaianResiko}`,
                    },
                  ],
                },
              ],
            },
            {
              title: "Tindakan/Prosedur Medis",
              code: {
                coding: [
                  {
                    system: "http://terminology.kemkes.go.id",
                    code: "TK000005",
                    display: "Tindakan/Prosedur Medis",
                  },
                ],
              },
              entry: [
                {
                  reference: `Procedure/${procedureEKG}`,
                },
                {
                  reference: `Observation/${observationEKG}`,
                },
                //   {
                //     reference: "Procedure/{{Procedure_Cesar}}",
                //   },
              ],
            },
            {
              title: "Farmasi",
              code: {
                coding: [
                  {
                    system: "http://terminology.kemkes.go.id",
                    code: "TK000013",
                    display: "Obat",
                  },
                ],
              },
              section: [
                {
                  title: "Obat Saat Kunjungan",
                  code: {
                    coding: [
                      {
                        system: "http://loinc.org",
                        code: "42346-7",
                        display: "Medications on admission (narrative)",
                      },
                    ],
                  },
                  entry: [
                    {
                      reference: `MedicationRequest/${medicationRequest}`,
                    },
                    {
                      reference: `MedicationDispense/${medicationDispense}`,
                    },
                    {
                      reference: `MedicationAdministration/${medicationAdministration}`,
                    },
                  ],
                },
                {
                  title: "Obat Pulang",
                  code: {
                    coding: [
                      {
                        system: "http://loinc.org",
                        code: "75311-1",
                        display: "Discharge medications Narrative",
                      },
                    ],
                  },
                  entry: [
                    {
                      reference: `MedicationRequest/${medicationRequest}`,
                    },
                    {
                      reference: `MedicationDispense/${medicationDispense}`,
                    },
                  ],
                },
              ],
            },
            {
              title: "Kondisi Saat Meninggalkan Rumah Sakit",
              code: {
                coding: [
                  {
                    system: "http://loinc.org",
                    code: "10184-0",
                    display: "Hospital discharge physical findings Narrative",
                  },
                ],
              },
              entry: [
                {
                  reference: "Condition/{{KondisiKeluar}}",
                },
              ],
            },
            {
              title: "Rencana Tindak Lanjut",
              code: {
                coding: [
                  {
                    system: "http://loinc.org",
                    code: "8653-8",
                    display: "Hospital Discharge instructions",
                  },
                ],
              },
              entry: [
                {
                  reference: "Observation/{{Observation_Pemulangan}}",
                },
                {
                  reference: "CarePlan/{{CarePlan_Pemulangan}}",
                },
                {
                  reference: "ServiceRequest/{{SR_RTL}}",
                },
              ],
            },
            {
              title: "Perjalanan Kunjungan Pasien",
              code: {
                coding: [
                  {
                    system: "http://loinc.org",
                    code: "8648-8",
                    display: "Hospital course Narrative",
                  },
                ],
              },
              text: {
                status: "additional",
                div: keterangan,
              },
            },
          ],
        },
      ],
    };

    postResource(dataResumeMedis, "Composition", "106");
  }
  return (
    <div>
      <Spin
        spinning={load}
        percent="auto"
        size="large"
        fullscreen
        tip="Sedang Memuat Data ..."
      />
      <Row>
        <Col span={22}>
          <Divider
            variant="dotted"
            orientation="left"
            style={{
              borderColor: "#7cb305",
            }}
          >
            Resume Medis
          </Divider>
        </Col>
        <Col span={2}>
          <Button onClick={() => klikRefreshSemua()}>Ambil Semua</Button>
        </Col>
      </Row>
      <Divider orientation="left" plain>
        Anamnesis
      </Divider>
      <Row>
        <Col span={4}>Keluhan Utama :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={keluhanUtama} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("1")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Keluhan Penyerta :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={keluhanPenyerta} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("2")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Riwayat Penyakit Sekarang :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={penyakitSekarang} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("6")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Riwayat Penyakit Terdahulu :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={penyakitTerdahulu} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("7")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Riwayat Penyakit Keluarga :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={penyakitKeluarga} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("8")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Divider orientation="left" plain>
        Assesmen Awal IGD
      </Divider>
      <Row>
        <Col span={4}>Triase :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={triase} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("9")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Alergi :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={alergi} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("10")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Riwayat Pengobatan :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={riwayatPengobatan} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("11")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Divider orientation="left" plain>
        Tanda Vital
      </Divider>
      <Row>
        <Col span={4}>Sistolik :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={sistolik} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("15")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Diastolik :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={diastolik} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("16")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Suhu :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={suhu} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("17")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Nadi :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={nadi} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("18")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Nafas :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={nafas} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("19")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Kesadaran :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={kesadaran} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("20")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Tinggi :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={tinggi} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("49")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Berat :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={berat} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("50")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Luas :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={luas} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("51")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Divider orientation="left" plain>
        Pemeriksaan Fisik
      </Divider>
      <Row>
        <Col span={4}>Mata :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={mata} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("22")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Divider orientation="left" plain>
        Pemeriksaan Fungsional
      </Divider>
      <Row>
        <Col span={4}>Status Psikologis :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={statusPsikologis} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("58")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Divider orientation="left" plain>
        Perencanaan Perawatan
      </Divider>
      <Row>
        <Col span={4}>Riwayat Perjalanan :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={riwayatPerjalanan} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("60")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Goal Tujuan :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={goalTujuan} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("61")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Rencana Rawat :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={rencanaRawat} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("63")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Instruksi Medis :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={instruksiMedis} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("64")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Divider orientation="left" plain>
        Hasil Pemeriksaan Lab
      </Divider>
      <Row>
        <Col span={4}>Service Request :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={serviceRequest} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("66")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Procedure Lab :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={procedureLab} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("65")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Specimen Lab :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={specimenLab} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("67")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Observation Lab :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={observationLab} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("68")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Diagnotics Report :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={diagnosticReport} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("69")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Divider orientation="left" plain>
        Diagnosis Awal
      </Divider>
      <Divider orientation="left" plain>
        Diagnosis Akhir
      </Divider>
      <Row>
        <Col span={4}>Rasional Klinis :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={rasionalKlinis} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("78")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Penilaian Resiko :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={penilaianResiko} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("82")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Divider orientation="left" plain>
        Tindakan / Prosedur Medis
      </Divider>
      <Row>
        <Col span={4}>Procedure EKG :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={procedureEKG} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("85")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Observation EKG :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={observationEKG} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("86")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Divider orientation="left" plain>
        Obat Kunjungan
      </Divider>
      <Row>
        <Col span={4}>Medication Request:</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={medicationRequest} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("94")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Medication Dispense:</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={medicationDispense} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("96")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Medication Administration:</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={medicationAdministration} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("97")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Divider orientation="left" plain>
        Obat Pulang
      </Divider>
      <Divider orientation="left" plain>
        Kondisi Keluar
      </Divider>
      <Divider orientation="left" plain>
        Rencana Tindak Lanjut
      </Divider>
      <Divider orientation="left" plain>
        Perjalanan Kunjungan Pasien
      </Divider>
      <Row>
        <Col span={4}>Keterangan :</Col>
        <Col span={20}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input value={keterangan} />
            <Button
              icon={<CloudDownloadOutlined />}
              type="primary"
              onClick={() => klikRefresh("97")}
            />
          </Space.Compact>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button
            type="primary"
            onClick={() => {
              // console.log(dataResumeMedis);
              // postResource(dataResumeMedis, "Composition", "106");
              klikPost();
            }}
            style={{ float: "right", width: "150px" }}
          >
            Post Resume Medis
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button
            onClick={() => {
              klikRefresh("79");
            }}
            style={{ float: "right" }}
          >
            Refresh
          </Button>
        </Col>
      </Row>
      <Row>
        <Table
          bordered
          loading={spCvg}
          columns={colTriase}
          dataSource={listKeluar}
          pagination={false}
          size="small"
        />
      </Row>
    </div>
  );
};

export default ResumeMedis;
