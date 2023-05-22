import React from "react";
import { Navbar, SideBar } from "../components";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  Dashboard,
  Documents,
  Employees,
  Login,
  NotFound,
  Register,
  Users,
} from "../containers";
import TestingPDF from "../TestingPDF";
import PrivateRoute from "./PrivateRoute";


const MainRoute = () => {
  const location = useLocation();

  return (
    <div className="w-screen h-screen flex flex-row">
      {["/register", "/login"].includes(location.pathname) ? null : <SideBar />}
      <div className="w-full h-full flex flex-col">
        {["/register", "/login"].includes(location.pathname) ? null : (
          <Navbar />
        )}
        <Routes>
          <Route
            index
            element={
              <PrivateRoute permissons={["admin", "gestionnaire"]}>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route
            path="/employees"
            element={
              <PrivateRoute permissons={["admin", "gestionnaire"]}>
                <Employees />
              </PrivateRoute>
            }
          />

          <Route
            path="/documents"
            element={
              <PrivateRoute permissons={["admin", "gestionnaire"]}>
                <Documents />
              </PrivateRoute>
            }
          />

          <Route path="/test" element={<TestingPDF />} />

          <Route
            path="/users"
            element={
              <PrivateRoute permissons={["admin"]}>
                <Users />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default MainRoute;
