import React, { useContext } from "react";
import { Layout } from "antd";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { LoginContext } from "../rawatjalan/context";
import { useIdleTimer } from "react-idle-timer";
import { routes } from "./routes"; // Create this file for route definitions
import Menubar from "./menubar";
import Footerbar from "./footerbar";
import TransaksiContextProvider from "./transaksiprovider";
import TransaksiRIContextProvider from "./transaksiproviderRI";
import SatuSehatModulContextProvider from "../satusehat/componentsatusehatmodul/context/SatuSehatModulContext";

const { Content } = Layout;

const MainAPPNew = () => {
  const { token, signOut } = useContext(LoginContext);

  // Idle timer setup
  useIdleTimer({
    timeout: 1000 * 60 * 60, // 1 hour
    onIdle: () => {
      console.log("User idle - logging out");
      signOut();
    },
    debounce: 500,
  });

  if (!token) return <Redirect to="/login" />;

  return (
    <Router>
      <Switch>
        <Layout>
          <TransaksiContextProvider>
            <TransaksiRIContextProvider>
              <SatuSehatModulContextProvider>
                <Layout>
                  <Menubar />
                  <Layout>
                    <Switch>
                      {routes.map(
                        ({
                          path,
                          exact,
                          component: Component,
                          layout: RouteLayout = Layout,
                        }) => (
                          <Route
                            key={path}
                            path={path}
                            exact={exact}
                            render={() => (
                              <RouteLayout>
                                <Content
                                  style={{
                                    padding: 7,
                                    background: "#fff",
                                    margin: "3px",
                                    minHeight: path === "/" ? "auto" : 280,
                                  }}
                                >
                                  <Component />
                                </Content>
                                <Footerbar />
                              </RouteLayout>
                            )}
                          />
                        )
                      )}
                    </Switch>
                  </Layout>
                </Layout>
              </SatuSehatModulContextProvider>
            </TransaksiRIContextProvider>
          </TransaksiContextProvider>
        </Layout>
      </Switch>
    </Router>
  );
};

export default MainAPPNew;
