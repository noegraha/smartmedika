import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { LoginContext } from "../rawatjalan/context";
import AccessDenied from "./AccessDenied";

const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const { token } = useContext(LoginContext); // pastikan user info tersedia
  const userRole = decodeURIComponent(sessionStorage.getItem("userRole")); // ambil role dari sessionStorage

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!token) {
          return <Redirect to="/login" />;
        }

        // Kalau ada pengecekan role
        if (allowedRoles && !allowedRoles.includes(userRole)) {
          return <AccessDenied />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
