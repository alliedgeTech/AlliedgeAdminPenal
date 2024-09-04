import React, { useEffect, useState } from "react";
import "./App.css";
import DefaultLayout from "./layout/DefaultLayout";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import DashboardIndex from "./page/Dashboard";
import PropertyIndex from "./page/Property";
import Addlife from "./page/Property/Components/Addlife/Addlife";
import AddGallery from "./page/Gallery/Components/AddGallery/AddGallery";
import GalleryIndex from "./page/Gallery";
import AddLife from "./page/Property/Components/Addlife/Addlife";
import ContactIndex from "./page/Contacts";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
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
                  <DashboardIndex />
                </DefaultLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/addproperty"
            element={
              isLoggedIn ? (
                <DefaultLayout>
                  <Addlife />
                </DefaultLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/property"
            element={
              isLoggedIn ? (
                <DefaultLayout>
                  <PropertyIndex />
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
