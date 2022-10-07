import React, { useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";
import { useEffect } from "react";

function ModalRegister(props) {
  function closeModal() {
    props.setOpenModalRegister(false);
  }
  function openModalL(e) {
    e.preventDefault();
    props.setOpenModalRegister(false);
    props.setOpenModalLogin(true);
  }
  const [message, setMessage] = useState(null);
  const [state, dispatch] = useContext(UserContext);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const { name, email, password, phone } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  }, [message]);

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post("/register", body, config);
      console.log(response);

      // Handling response here
      if (response.data.code === 200) {
        const alert = (
          <div
            className="flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
            role="alert"
          >
            <svg
              aria-hidden="true"
              className="flex-shrink-0 inline w-5 h-5 mr-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Success Register!</span> Welcome to
              my Jungle
            </div>
          </div>
        );
        closeModal();
        setMessage(alert);
        setForm({
          name: "",
          email: "",
          password: "",
          phone: "",
        });
      } else {
        const alert = (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Holy smokes!</strong>
            <span className="block sm:inline">
              Something seriously bad happened.
            </span>
          </div>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">
            Something seriously bad happened.
          </span>
        </div>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <>
      <div>
        {message && message}
        <Transition
          appear
          show={props.showModalRegis}
          onClose={props.closeModalLogin}
          as={Fragment}
        >
          <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl pb-2 font-semibold leading-6 text-gray-900 "
                    >
                      Register
                    </Dialog.Title>
                    <form onSubmit={(e) => handleSubmit.mutate(e)}>
                      <div className="mt-2 space-y-3">
                        <input
                          type="email"
                          id="email"
                          value={email}
                          name="email"
                          onChange={handleChange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Email"
                        />
                        <input
                          type="password"
                          id="password"
                          value={password}
                          name="password"
                          onChange={handleChange}
                          className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="password"
                        />
                        <input
                          type="text"
                          id="name"
                          value={name}
                          name="name"
                          onChange={handleChange}
                          className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Full Name"
                        />
                        <input
                          type="text"
                          id="phone"
                          value={phone}
                          name="phone"
                          onChange={handleChange}
                          className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="phone"
                        />
                      </div>

                      <div className="mt-8">
                        <button
                          className="py-3 px-6 sm:w-[100%] text-red-700 font-bold hover:bg-red-700 hover:text-white "
                          type="submit"
                        >
                          Register
                        </button>
                      </div>
                    </form>
                    <div className="flex justify-center pt-3">
                      <p>
                        Already have an account ? Klik
                        <span
                          onClick={openModalL}
                          className="hover:text-blue-500 cursor-pointer"
                        >
                          Here
                        </span>
                      </p>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        {/* <ModalLogin
          setOpenModalLogin={setOpenModalLogin}
          showModalLogin={openModalLogin}
        /> */}
      </div>
    </>
  );
}

export default ModalRegister;
