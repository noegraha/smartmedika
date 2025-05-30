import React, { createContext } from "react";
import {
  AlergiContextProvider,
  AnamnesaContextProvider,
  BillingContextProvider,
  BookingOpContextProvider,
  CatatanmedisContextProvider,
  DiagnosaContextProvider,
  HasilLabContextProvider,
  ImunisasiContextProvider,
  KolomContextProvider,
  KonsulContextProvider,
  PantauanInfeksiContextProvider,
  PasienContextProvider,
  PelayananContextProvider,
  PemeriksaanFisikContextProvider,
  PoliGigiContextProvider,
  PoliMataContextProvider,
  PoliSarafContextProvider,
  PoliTHTContextProvider,
  ProsedurContextProvider,
  ReminderContextProvider,
  ResepContexProvider,
  RJumumContextProvider,
  SisruteContextProvider,
  TransferPasienContextProvider,
  VClaimContextProvider,
} from "../rawatjalan/context";
import MasterKategoriAskepContextProvider from "../master/context/masteraskep/MasterKategoriAskepContext";
import MasterSubKategoriContextProvider from "../master/context/masteraskep/MasterSubKategoriContext";
import MasterTandaGejalaContextProvider from "../master/context/masteraskep/MasterTandaGejalaContext";
import MasterDiagnosaAskepContextProvider from "../master/context/masteraskep/MasterDiagnosaAskepContext";
import MasterIntervensiAskepContextProvider from "../master/context/masteraskep/MasterIntervensiAskepContext";
import MasterLuaranAskepContextProvider from "../master/context/masteraskep/MasterLuaranAskepContext";
import MasterKriteriaAskepContextProvider from "../master/context/masteraskep/MasterKriteriaAskepContext";
import UserContextProvider from "../appsetting/UserContext";
import ChatContextProvider from "../chat/Chatcontext";
import GambarContextProvider from "../rawatjalan/context/GambarContext";
import MasterBarangContextProvider from "../master/context/MasterBarangContext";
import PenunjangContextProvider from "../rawatjalan/orderpenunjang/OrderPenunjangContext";
import HasilRadiologiContextProvider from "../rawatjalan/context/HasilRadiologiContext";
import MasterContextProvider from "../master/context/MasterContext";
import MasterImplementasiAskepContextProvider from "../master/context/masteraskep/MasterImplementasiAskepContext";
import MasterKeluhanContextProvider from "../master/context/mastermedis/MasterKeluhanContext";
import AssesmentKeluhanRIContextProvider from "../rawatinap/context/AssesmentKeluhanRIContext";
import LaporanAskepContextProvider from "../laporan/Context/LaporanAskepContext";
import LaporanESWLContextProvider from "../laporan/Context/LaporanESWLContext";
import PemeriksaanLainContextProvider from "../rawatjalan/context/pemeriksaancontext/PemeriksaanLainContext";
import CetakanContextProvider from "../rawatjalan/context/CetakanContext";
import PrintOutContextProvider from "../PrintOutDokumen/PrintOutContext";
import { SuratKeteranganRJContextProvider } from "../rawatjalan/context";
import PoliJantungContextProvider from "../rawatjalan/context/pemeriksaancontext/PoliJantungContext";
import ReportingContextProvider from "../rawatjalan/context/ReportingContext";
import MasterPegawaiContextProvider from "../master/context/masterpegawai/MasterPegawaiContext";
import LogBookAskepContextProvider from "../master/context/masteraskep/LogBookAskepContext";
import TumKembangContextProvider from "../rawatjalan/context/pemeriksaancontext/TumKembangContext";
import MasterDokterContextProvider from "../master/context/MasterDokter/MasterDokterContext";
import EswlContextProvider from "../penunjang/ESWL/context/EswlCotext";
import MasterPPDSContextProvider from "../master/context/MasterDokter/MasterPPDSContext";
export const TransaksiContext = createContext();

const TransaksiContextProvider = (props) => {
  return (
    <TransaksiContext.Provider>
      <PasienContextProvider>
        <BillingContextProvider>
          <KonsulContextProvider>
            <ChatContextProvider>
              <PrintOutContextProvider>
                <ProsedurContextProvider>
                  <PelayananContextProvider>
                    <KolomContextProvider>
                      <DiagnosaContextProvider>
                        <AnamnesaContextProvider>
                          <CatatanmedisContextProvider>
                            <PemeriksaanFisikContextProvider>
                              <TransferPasienContextProvider>
                                <RJumumContextProvider>
                                  <ReminderContextProvider>
                                    <AlergiContextProvider>
                                      <HasilRadiologiContextProvider>
                                        <PoliGigiContextProvider>
                                          <PoliTHTContextProvider>
                                            <PoliMataContextProvider>
                                              <PoliSarafContextProvider>
                                                <ImunisasiContextProvider>
                                                  <PoliJantungContextProvider>
                                                    <ResepContexProvider>
                                                      <MasterTandaGejalaContextProvider>
                                                        <MasterKategoriAskepContextProvider>
                                                          <MasterSubKategoriContextProvider>
                                                            <MasterDiagnosaAskepContextProvider>
                                                              <MasterIntervensiAskepContextProvider>
                                                                <MasterLuaranAskepContextProvider>
                                                                  <MasterKriteriaAskepContextProvider>
                                                                    <MasterImplementasiAskepContextProvider>
                                                                      <MasterBarangContextProvider>
                                                                        <MasterKeluhanContextProvider>
                                                                          <UserContextProvider>
                                                                            <GambarContextProvider>
                                                                              <PenunjangContextProvider>
                                                                                <VClaimContextProvider>
                                                                                  <MasterContextProvider>
                                                                                    <AssesmentKeluhanRIContextProvider>
                                                                                      <HasilLabContextProvider>
                                                                                        <LaporanAskepContextProvider>
                                                                                          <LaporanESWLContextProvider>
                                                                                            <PemeriksaanLainContextProvider>
                                                                                              <CetakanContextProvider>
                                                                                                <PantauanInfeksiContextProvider>
                                                                                                  <BookingOpContextProvider>
                                                                                                    <SisruteContextProvider>
                                                                                                      <SuratKeteranganRJContextProvider>
                                                                                                        <ReportingContextProvider>
                                                                                                          <MasterPegawaiContextProvider>
                                                                                                            <LogBookAskepContextProvider>
                                                                                                              <TumKembangContextProvider>
                                                                                                                <MasterDokterContextProvider>
                                                                                                                  <MasterPPDSContextProvider>
                                                                                                                    <EswlContextProvider>
                                                                                                                      {
                                                                                                                        props.children
                                                                                                                      }
                                                                                                                    </EswlContextProvider>
                                                                                                                  </MasterPPDSContextProvider>
                                                                                                                </MasterDokterContextProvider>
                                                                                                              </TumKembangContextProvider>
                                                                                                            </LogBookAskepContextProvider>
                                                                                                          </MasterPegawaiContextProvider>
                                                                                                        </ReportingContextProvider>
                                                                                                      </SuratKeteranganRJContextProvider>
                                                                                                    </SisruteContextProvider>
                                                                                                  </BookingOpContextProvider>
                                                                                                </PantauanInfeksiContextProvider>
                                                                                              </CetakanContextProvider>
                                                                                            </PemeriksaanLainContextProvider>
                                                                                          </LaporanESWLContextProvider>
                                                                                        </LaporanAskepContextProvider>
                                                                                      </HasilLabContextProvider>
                                                                                    </AssesmentKeluhanRIContextProvider>
                                                                                  </MasterContextProvider>
                                                                                </VClaimContextProvider>
                                                                              </PenunjangContextProvider>
                                                                            </GambarContextProvider>
                                                                          </UserContextProvider>
                                                                        </MasterKeluhanContextProvider>
                                                                      </MasterBarangContextProvider>
                                                                    </MasterImplementasiAskepContextProvider>
                                                                  </MasterKriteriaAskepContextProvider>
                                                                </MasterLuaranAskepContextProvider>
                                                              </MasterIntervensiAskepContextProvider>
                                                            </MasterDiagnosaAskepContextProvider>
                                                          </MasterSubKategoriContextProvider>
                                                        </MasterKategoriAskepContextProvider>
                                                      </MasterTandaGejalaContextProvider>
                                                    </ResepContexProvider>
                                                  </PoliJantungContextProvider>
                                                </ImunisasiContextProvider>
                                              </PoliSarafContextProvider>
                                            </PoliMataContextProvider>
                                          </PoliTHTContextProvider>
                                        </PoliGigiContextProvider>
                                      </HasilRadiologiContextProvider>
                                    </AlergiContextProvider>
                                  </ReminderContextProvider>
                                </RJumumContextProvider>
                              </TransferPasienContextProvider>
                            </PemeriksaanFisikContextProvider>
                          </CatatanmedisContextProvider>
                        </AnamnesaContextProvider>
                      </DiagnosaContextProvider>
                    </KolomContextProvider>
                  </PelayananContextProvider>
                </ProsedurContextProvider>
              </PrintOutContextProvider>
            </ChatContextProvider>
          </KonsulContextProvider>
        </BillingContextProvider>
      </PasienContextProvider>
    </TransaksiContext.Provider>
  );
};

export default TransaksiContextProvider;
