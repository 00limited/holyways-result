import React from "react";
import img1 from "../../assets/bill.png";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Rupiah from "rupiah-format";
import moment from "moment";

function ApprovePayment(props) {
  function closeModalApprove() {
    props.setOpenModalApprove(false);
  }

  console.log("select3e", props.selectedModalApproveData);
  return (
    <>
      <div>
        <Transition appear show={props.showModalApprove} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={closeModalApprove}
          >
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
                      {props.selectedModalApproveData ? (
                        props.selectedModalApproveData.user.name
                      ) : (
                        <></>
                      )}
                    </Dialog.Title>
                    <div class="overflow-x-auto relative">
                      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" class="py-3 px-6">
                              Create at
                            </th>
                            <th scope="col" class="py-3 px-6">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td class="py-4 px-6">
                              {moment(
                                props.selectedModalApproveData?.created_at
                              )
                                .startOf("day")
                                .fromNow()}
                            </td>
                            <td
                              class={
                                props.selectedModalApproveData?.status ==
                                "success"
                                  ? "text-green-700 py-4 px-6"
                                  : props.selectedModalApproveData?.status ==
                                    "pending"
                                  ? "text-yellow-500 py-4 px-6"
                                  : "text-red-700 py-4 px-6"
                              }
                            >
                              {props.selectedModalApproveData?.status}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-8">
                      <button
                        className="py-3 px-6 sm:w-[100%] bg-gray-500 text-red-700 font-bold hover:bg-red-700 hover:text-white "
                        onClick={closeModalApprove}
                      >
                        Close
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
}

export default ApprovePayment;
