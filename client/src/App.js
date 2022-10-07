import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "./context/userContext";
import { API, setAuthToken } from "./config/api";
import RaiseFunds from "./router/RaiseFunds";
import Profiles from "./router/Profiles";
import DetailDonates from "./router/DetailDonates";
import FormFunds from "./router/FormFunds";
import ViewFunds from "./router/ViewFunds";

import Home from "./router/Home";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  //usestate for detail and name
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  // console.clear();
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    } else if (state.isLogin == false) {
      navigate("/");
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      // return console.log("response check auth" , response.data.data)
      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/raisefund" element={<RaiseFunds />} />
      <Route path="/profile" element={<Profiles />} />
      <Route path="/detailDonate/:id" element={<DetailDonates />} />
      <Route path="/formFund" element={<FormFunds />} />
      <Route path="/viewfund/:index" element={<ViewFunds />} />
    </Routes>
  );
}

export default App;
