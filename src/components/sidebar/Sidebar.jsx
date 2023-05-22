import React from "react";

import { HiOutlineHome, HiOutlineDocumentDuplicate } from "react-icons/hi";
import { FiUsers } from "react-icons/fi";
import { FaUserTie } from "react-icons/fa";

import LOGO from "../../assets/images/Sebmlogo.png";
import { useContext } from "react";
import { GeneralContext } from "../../hooks/context/GeneralContext";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const Sidebar = () => {
  const cookies = new Cookies();
  let user = cookies.get("user");
  const { sidebarOpen } = useContext(GeneralContext);
  return (
    <div
      id="main__sidebar"
      className="w-60 h-full flex flex-col gap-4 bg-white transition-all duration-300 ease-in-out "
    >
      <div className="py-8 flex items-center justify-center">
        <img src={LOGO} alt="LOGO" className="h-8 w-auto " />
      </div>

      <Link to="/">
        <div
          className={`
          mx-2 px-4 py-2 rounded-sm flex flex-row items-center gap-2 text-gray-600 hover:bg-blue-900 hover:text-white cursor-pointer 
          ${sidebarOpen ? "" : "hidden"}`}
        >
          <HiOutlineHome size={24} />
          <p className="text-lg font-semibold">Dashboard</p>
        </div>
      </Link>

      <Link to="/employees">
        <div
          className={`
          mx-2   px-4 py-2 rounded-sm flex flex-row items-center gap-2 text-gray-600 hover:bg-blue-900 hover:text-white cursor-pointer 
          ${sidebarOpen ? "" : "hidden"}`}
        >
          <FaUserTie size={24} />
          <p className="text-lg font-semibold">Employees</p>
        </div>
      </Link>
      
      <Link to="/documents">
        <div
          className={`
          mx-2   px-4 py-2 rounded-sm flex flex-row items-center gap-2 text-gray-600 hover:bg-blue-900 hover:text-white cursor-pointer 
          ${sidebarOpen ? "" : "hidden"}`}
        >
          <HiOutlineDocumentDuplicate size={24} />
          <p className="text-lg font-semibold">Documents</p>
        </div>
      </Link>

      {user && user.role === "admin" ? (
        <Link to="/users">
          <div
            className={`
          mx-2   px-4 py-2 rounded-sm flex flex-row items-center gap-2 text-gray-600 hover:bg-blue-900 hover:text-white cursor-pointer 
          ${sidebarOpen ? "" : "hidden"}`}
          >
            <FiUsers size={24} />
            <p className="text-lg font-semibold">Gestionnaires</p>
          </div>
        </Link>
      ) : null}
    </div>
  );
};

export default Sidebar;
