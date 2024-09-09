import React, { useEffect, useState } from "react";
import "./App.css";
import DefaultLayout from "./layout/DefaultLayout";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import DashboardIndex from "./page/Dashboard";
import PropertyIndex from "./page/Property";
import AddProperty from "./page/Property/Components/AddProperty/AddProperty";
import AddGallery from "./page/Gallery/Components/AddGallery/AddGallery";
import AddLife from "./page/Life/Components/AddLife/AddLife";
import GalleryIndex from "./page/Gallery";
import ContactIndex from "./page/Contacts";
import LifeIndex from "./page/Life";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
            }
          />
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <DefaultLayout>
                  <LifeIndex />
                </DefaultLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          
          <Route
            path="/addgallery"
            element={
              isLoggedIn ? (
                <DefaultLayout>
                  <AddGallery />
                </DefaultLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/gallery"
            element={
              isLoggedIn ? (
                <DefaultLayout>
                  <GalleryIndex />
                </DefaultLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
           <Route
            path="/addlife"
            element={
              isLoggedIn ? (
                <DefaultLayout>
                  <AddLife />
                </DefaultLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/life"
            element={
              isLoggedIn ? (
                <DefaultLayout>
                  <LifeIndex />
                </DefaultLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
           <Route
            path="/contactus"
            element={
              isLoggedIn ? (
                <DefaultLayout>
                  <ContactIndex />
                </DefaultLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
