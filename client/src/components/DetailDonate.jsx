import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModalDonate from "../modals/transaction/ModalPayment";
import { API } from "../config/api";
import { useQuery } from "react-query";
import moment from "moment";
import Rupiah from "rupiah-format";
import { useEffect } from "react";

const DetailDonate = () => {
  const [openModalDonate, setOpenModalDonate] = useState(false);
  const [totalDonation, setTotalDonation] = useState(0);
  const navigate = useNavigate();

  let { id } = useParams();
  let { data: detailDonate, isLoading } = useQuery(
    "detaildonateCache",
    async () => {
      const response = await API.get("/donation/" + id);
      return response.data?.data;
    }
  );

  useEffect(() => {
    if (!isLoading) {
      let coba = 0;
      detailDonate.transaction.map((item) => {
        console.log(item.donateamount);
        coba += item.donateamount;
      });

      setTotalDonation(coba);
      console.log("total donation", coba);
    }
  }, [isLoading]);

  console.log(detailDonate);
  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <div>
          <div className="flex pt-[6rem]   px-[200px]">
            <div className="w-[50rem] grid md:grid-cols-2  space-x-[63px] py-20">
              <img
                src={detailDonate?.thumbnail}
                alt=""
                className="w-[30rem] h-[30rem] "
              />
              <div className=" w-full space-y-4">
                <h1 className="text-4xl font-bold text-black md:text-3xl">
                  {detailDonate?.title}
                </h1>
                <div className="space-y-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-xl  font-bold text-red-700  ">
                      Rp {totalDonation}
                    </span>
                    <span className="text-xl font-medium text-black">
                      gathered from
                    </span>
                    <span className="text-xl font-bold  text-black">
                      Rp {detailDonate?.goal - totalDonation}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-red-700 h-2.5 rounded-full"
                      style={{
                        width: `${(totalDonation / detailDonate?.goal) * 100}%`,
                        maxWidth: "100%",
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium  text-black">
                      {detailDonate?.transaction?.length} Donation
                    </span>
                    <span className="text-sm font-medium  text-black">
                      150 More Day
                    </span>
                  </div>
                </div>
                <p>{detailDonate?.description}</p>
                <button
                  onClick={() => {
                    setOpenModalDonate(true);
                  }}
                  className="font-bold  py-3 px-6 sm:w-[100%] rounded-lg "
                >
                  Donate{" "}
                </button>
              </div>
            </div>
          </div>
          <div className="flex pt-0  flex-col px-[200px] space-y-4 pb-11">
            <h1 className="text-3xl font-bold">
              List Donation ({detailDonate?.transaction?.length})
            </h1>
            <div className="flex flex-col space-y-2 ">
              {detailDonate?.transaction?.map((item, index) => {
                return (
                  <div key={id} className="bg-gray-600 py-5 px-5">
                    <p>{item.user?.name}</p>
                    <p>
                      {moment(item.donation.created_at).format(
                        "dddd, DD MMMM YYYY"
                      )}
                    </p>
                    <p>Total : {Rupiah.convert(item.donateamount)}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <ModalDonate
            setOpenModalDonate={setOpenModalDonate}
            showModalDonate={openModalDonate}
            funds={detailDonate}
            id={id}
          />
        </div>
      )}
    </>
  );
};

export default DetailDonate;
