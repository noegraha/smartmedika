import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  HashRouter as Router,
  Redirect,
} from "react-router-dom";
import "./App.css";
import "./login/logins.css";
import Loginform from "./login/Loginform";
import LoginContextProvider from "./rawatjalan/context/LoginContext";
import {
  StyleProvider,
  legacyLogicalPropertiesTransformer,
} from "@ant-design/cssinjs";
import { ConfigProvider, theme } from "antd";
import MainAPP from "./layout/MainAPP";
import MainAPPNew from "./layout/MainAPPNew";

const isTouchDevice = () => {
  return window.matchMedia("(pointer: coarse)").matches;
};

const AppMain = () => {
  const [isTouch, setIsTouch] = useState(false);
  const [themeMode, setThemeMode] = useState("compact");

  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, []);

  const currentTheme = {
    algorithm:
      themeMode === "dark"
        ? [theme.darkAlgorithm, theme.compactAlgorithm]
        : themeMode === "compact"
        ? theme.compactAlgorithm
        : theme.defaultAlgorithm,
    token: {
      borderRadius: 2,
    },
  };

  return (
    <div
      onKeyDownCapture={(e) => {
        if (e.key === "F12") {
          e.preventDefault();
        }
      }}
    >
      <StyleProvider
        hashPriority="high"
        transformers={[legacyLogicalPropertiesTransformer]}
      >
        <ConfigProvider theme={currentTheme}>
          <Router>
            <LoginContextProvider>
              <Switch>
                <Route exact path="/login" component={Loginform} />
                {/* Changed this part to exact path matching */}
                {/* <Route path="/" component={MainAPPNew} /> */}
                <Route path="/" component={MainAPP} />
                <Redirect from="*" to="/" />
              </Switch>
            </LoginContextProvider>
          </Router>
        </ConfigProvider>
      </StyleProvider>
    </div>
  );
};

export default AppMain;
