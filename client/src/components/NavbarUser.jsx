import React, { Fragment } from "react";
import img1 from "../assets/img6.png";
import brand from "../assets/Icon.png";
import raise from "../assets/raiseFund.png";
import user from "../assets/profile.png";
import logout from "../assets/logout.png";
import { Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useContext } from "react";

function NavbarUser() {
  const [state] = useContext(UserContext);
  console.log(state);
  return (
    <div className="w-screen h-[80px] z-10 bg-red-700 fixed drop-shadow-lg ">
      <div className="px-20 flex justify-between items-center w-full h-full ">
        <Link to="/" className="flex items-center">
          <img src={brand} alt="" />
        </Link>
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
                  <Link
                    to="/profile"
                    className="hover:bg-red-500 py-3 px-10 flex  justify-between"
                  >
                    <img src={user} alt="" />
                    <p className="text-xl font-semibold">Profile</p>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    to="/raisefund"
                    className="hover:bg-red-500 py-3 px-8 flex  justify-between "
                  >
                    <img src={raise} alt="" />
                    <p className="text-xl font-semibold">Raise Fund</p>
                  </Link>
                </Menu.Item>
                <hr className="bg-black font-bold h-1" />
                <Menu.Item>
                  <Link
                    to="/"
                    className="hover:bg-red-500 py-3 px-10 flex  justify-between"
                  >
                    <img src={logout} alt="" />

                    <p className="text-xl font-semibold">Logout</p>
                  </Link>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}

export default NavbarUser;
