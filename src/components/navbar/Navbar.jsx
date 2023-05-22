import React, { useContext, useEffect, useRef, useState } from "react";

import { FiMenu, FiBell } from "react-icons/fi";
import { BiSearchAlt } from "react-icons/bi";
import { GeneralContext } from "../../hooks/context/GeneralContext";
import Cookies from "universal-cookie";
import { useNavigate, Link } from "react-router-dom";
import swal from "sweetalert";
import { path } from "../../utils/variables";

const Navbar = () => {
  const { ToggleSidebar } = useContext(GeneralContext);
  const cookies = new Cookies();
  const navigate = useNavigate();
  let user = cookies.get("user");
  const menuRef = useRef(null);

  const [toggleMenu, setToggleMenu] = useState(false);

  const handleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setToggleMenu(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Unbind the event listener on cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const Logout = async () => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Are you sure that you want to LogOut?",
      icon: "warning",
      dangerMode: true,
    });

    if (willDelete) {
      cookies.remove("user");
      window.location.reload();
    }
  };

  return (
    <div className="w-full h-12 px-6 flex flex-row items-center justify-between bg-white ">
      <div className=" py-2 flex flex-row items-center gap-4">
        <FiMenu
          size={24}
          className="cursor-pointer transition-all duration-300 ease-in-out text-gray-600 hover:text-blue-900"
          onClick={() => ToggleSidebar()}
        />
      </div>

      <div className="h-full flex flex-row items-center gap-4">
        <BiSearchAlt
          size={24}
          className="cursor-pointer transition-all duration-300 ease-in-out text-gray-600 hover:text-blue-900"
        />
        <FiBell
          size={24}
          className="cursor-pointer transition-all duration-300 ease-in-out text-gray-600 hover:text-blue-900"
        />
        <div className="relative h-full w-full" ref={menuRef}>
          <div
            onClick={() => setToggleMenu(!toggleMenu)}
            className=" h-full px-2 flex items-center gap-1 cursor-pointer hover:text-white hover:bg-blue-900"
          >
            <img
              src={`${
                user && `${path}uploads/files/${user.avatar}`
              }`}
              alt="user_avatr"
              className="w-9 h-9 rounded-full"
            />
            <span className="text-base font-semibold ">
              {user && user.nom} {user && user.prenom}
            </span>
          </div>
          {!toggleMenu ? null : (
            <div
              className="scale-up-ver-top shadow-md flex flex-col items-center gap-2 px-4 py-2 font-medium 
              rounded-md z-30 absolute top-12 right-7 bg-white border "
            >
              <Link
                to={`/user/${user._id}`}
                className="w-full px-3 py-1 text-center hover:bg-blue-700 hover:text-white rounded-md"
              >
                My Profile
              </Link>
              <div className="w-full border-b " />
              <button
                onClick={Logout}
                className="w-full px-3 py-1 text-center hover:bg-blue-700 hover:text-white rounded-md"
              >
                LOGOUT
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
