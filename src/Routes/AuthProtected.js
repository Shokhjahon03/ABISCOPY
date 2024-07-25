import React, { useEffect } from "react";
import { Navigate, Route } from "react-router-dom";
import { setAuthorization } from "../helpers/api_helper";
import { useDispatch } from "react-redux";

import { useProfile } from "../Components/Hooks/UserHooks";

import { logoutUser } from "../slices/thunks";
import { DataService } from "../helpers/dataService/dataService";
import endpoints from "../endpoints";
import { profileSuccess } from "../slices/auth/profile/reducer";

const AuthProtected = (props) => {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("abisToken");
  const fetchData = async () => {
    const response = await DataService.get(endpoints.me);
    dispatch(profileSuccess(response));
  };
  fetchData();

  if (!token) {
    return <Navigate to={{ pathname: "/login" }} />;
  }

  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            {" "}
            <Component {...props} />{" "}
          </>
        );
      }}
    />
  );
};

export { AuthProtected, AccessRoute };
