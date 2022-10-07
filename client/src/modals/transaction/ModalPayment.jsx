import React, { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import API from "../../config/api";

function ModalPayment(props) {
  function closeModalDonate() {
    props.setOpenModalDonate(false);
  }

  let navigate = useNavigate();

  // console.log("ini funds", props.funds);

  const [form, setForm] = useState({
    donateAmount: null,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      donate_id: props.detailDonate?.id,
    });
  };
  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-Q8guGCRbXc-Z4_bw";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const handlePayment = useMutation(async (event) => {
    try {
      event.preventDefault();
      let result = await API.post(
        "/fund",
        {
          status: "pending",
          donateAmount: parseInt(form.donateAmount),
          donation_id: parseInt(props.id),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        }
      );
      console.log(result);

      // create variable token for store token payment from response here
      const token = result.data.data.token;

      setForm({
        donateAmount: null,
      });

      // init snap for display payment page with token here
      window.snap.pay(token, {
        onSuccess: function (result) {
          navigate("/detailDonate");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          navigate("/detailDonate");
        },
        onError: function (result) {
          /* You may add your own implementation here */
        },
        onClose: function () {
          /* You may add your own implementation here */
          alert("You closed the popup without finishing the payment");
        },
      });
    } catch (err) {
      console.log("ini errornya", err);
    }
  });

  return (
    <>
      <div>
        <Transition appear show={props.showModalDonate} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeModalDonate}>
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
                    <form onSubmit={(event) => handlePayment.mutate(event)}>
                      <div className="mt-2 space-y-3">
                        <input
                          type="number"
                          placeholder="Nominal Donation"
                          name="donateAmount"
                          value={form.donateAmount}
                          onChange={handleChange}
                          id="donation"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </div>

                      <div className="mt-8 ">
                        <button
                          type="submit"
                          className="py-3 px-6 sm:w-[100%] text-red-700"
                          // onClick={closeModalDonate}
                        >
                          Donate
                        </button>
                      </div>
                    </form>
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

export default ModalPayment;
