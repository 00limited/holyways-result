import React, { useState, useEffect, Fragment } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import brand from "../assets/Icon.png";
import img1 from "../assets/img6.png";
import raise from "../assets/raiseFund.png";
import user from "../assets/profile.png";
import logout from "../assets/logout.png";
import { Menu, Transition } from "@headlessui/react";
import ModalLogin from "../modals/auth/ModalLogin";
import ModalRegister from "../modals/auth/ModalRegister";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const Navbar = () => {
  const [openModalLogin, setOpenModalLogin] = useState(false);
  const [openModalRegister, setOpenModalRegister] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(false);

  let navigate = useNavigate();
  console.log(state);

  const handleLogout = () => {
    console.log("ini state header", state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  useEffect(() => {
    if (localStorage.getItem("login")) {
      JSON.parse(localStorage.getItem("login")) === true
        ? setIsLogin(true)
        : setIsLogin(false);
    }
  }, []);
  return (
    <div className="w-screen h-[80px] z-10 bg-red-700 fixed drop-shadow-lg ">
      <div className="px-20 flex justify-between items-center w-full h-full">
        <Link to="/" className="flex items-center">
          <img src={brand} alt="" />
        </Link>

        {state.isLogin ? (
          <Menu as="div" className="relative inline-block text-left ">
            <div>
              <Menu.Button className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-11 h-11 rounded-full"
                  src={img1}
                  alt="user photo"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y  rounded-md bg-slate-400 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-0 py-1">
                  <Menu.Item>
                    <div
                      onClick={() => navigate("/profile")}
                      className="hover:bg-red-500 py-3 px-10 flex  justify-between cursor-pointer"
                    >
                      <img src={user} alt="" />
                      <p className="text-xl font-semibold">Profile</p>
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <div
                      onClick={() => navigate("/raisefund")}
                      className="hover:bg-red-500 py-3 px-8 flex  justify-between cursor-pointer "
                    >
                      <img src={raise} alt="" />
                      <p className="text-xl font-semibold">Raise Fund</p>
                    </div>
                  </Menu.Item>
                  <hr className="bg-black font-bold h-1" />
                  <Menu.Item>
                    <div
                      href="#"
                      onClick={handleLogout}
                      className="hover:bg-red-500 py-3 px-10 flex  justify-between cursor-pointer"
                    >
                      <img src={logout} alt="" />

                      <p className="text-xl font-semibold">Logout</p>
                    </div>
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : (
          <div className="md:flex pr-4">
            <button
              className="border-none bg-transparent text-white mr-4 px-8 py-3"
              onClick={() => {
                setOpenModalLogin(true);
              }}
            >
              Login
            </button>
            <button
              className="px-8 py-3"
              onClick={() => {
                setOpenModalRegister(true);
              }}
            >
              Register
            </button>
          </div>
        )}
      </div>
      <ModalLogin
        setOpenModalLogin={setOpenModalLogin}
        showModalLogin={openModalLogin}
        setOpenModalRegister={setOpenModalRegister}
        showModalRegis={openModalRegister}
      />
      <ModalRegister
        setOpenModalRegister={setOpenModalRegister}
        showModalRegis={openModalRegister}
        setOpenModalLogin={setOpenModalLogin}
        showModalLogin={openModalLogin}
      />
    </div>
  );
};

export default Navbar;

{
  /* <div className="md:hidden" onClick={handleClick}>
          {!nav ? <MenuIcon className="w-5" /> : <XIcon className="w-5" />}
        </div>
      </div>
      <ul className={!nav ? "hidden" : "absolute  bg-red-600 w-full px-20"}>
        <div className="flex flex-col my-4">
          <button className="bg-transparent text-white px-8 py-3 mb-4">
            Login
          </button>
          <button className="px-8 py-3">Register</button>
        </div>
      </ul> */
}
