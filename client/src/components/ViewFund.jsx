import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ModalApprove from "../modals/transaction/ApprovePayment";
import ModalDonate from "../modals/transaction/ModalPayment";
import { API } from "../config/api";
import { useQuery } from "react-query";
import moment from "moment";
import Rupiah from "rupiah-format";

const ViewFund = () => {
  const [openModalApprove, setOpenModalApprove] = useState(false);
  const [openModalDonate, setOpenModalDonate] = useState(false);
  const [totalDonation, setTotalDonation] = useState(0);
  const [selectedModalApproveData, setSelectedModalApproveData] =
    useState(null);

  let { index } = useParams();
  let { data: donations, isLoading } = useQuery(
    "donationosCache22",
    async () => {
      const response = await API.get("/donation/" + index);
      return response.data?.data;
    }
  );
  console.log(donations);

  useEffect(() => {
    if (!isLoading) {
      let coba = 0;
      donations.transaction.map((item) => {
        console.log(item.donateamount);
        coba += item.donateamount;
      });
      setTotalDonation(coba);
      console.log("total donation", coba);
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <div>
          <div className="flex pt-[6rem]   px-[200px]">
            <div className="w-[50rem] grid md:grid-cols-2  space-x-[63px] py-20">
              <img src={donations?.thumbnail} alt="" className="w-full " />
              <div className=" w-full space-y-4">
                <h1 className="text-4xl font-bold text-black md:text-3xl">
                  {donations?.title}
                </h1>
                <div className="space-y-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm  font-bold text-red-700  ">
                      {Rupiah.convert(totalDonation)}
                    </span>
                    <span className="text-sm font-medium text-black">
                      gathered from
                    </span>
                    <span className="text-sm font-bold  text-black">
                      {Rupiah.convert(donations?.goal - totalDonation)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-red-700 h-2.5 rounded-full"
                      style={{
                        width: `${(totalDonation / donations?.goal) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium  text-black">
                      {donations?.transaction?.length} Donation
                    </span>
                    <span className="text-sm font-medium  text-black">
                      150 More Day
                    </span>
                  </div>
                </div>
                <p>{donations?.description}</p>
                <button
                  onClick={() => {
                    setOpenModalDonate(true);
                  }}
                  className="font-bold  py-3 px-6 sm:w-[100%] rounded-lg "
                >
                  Donate
                </button>
              </div>
            </div>
          </div>
          <div className="flex pt-0  flex-col px-[200px] space-y-4 pb-11">
            <h1 className="text-3xl font-bold">
              List Donation ({donations?.transaction?.length})
            </h1>

            <div className="flex flex-col space-y-2 ">
              {donations?.transaction?.map((item, index) => {
                {
                  if (item?.status == "success") {
                    return (
                      <div className="bg-gray-600 py-5 px-5">
                        <p>{item.user?.name}</p>
                        <p>
                          {moment(item.donation.created_at).format(
                            "dddd, DD MMMM YYYY"
                          )}
                        </p>
                        <p>Total : {Rupiah.convert(item.donateamount)}</p>
                      </div>
                    );
                  } else {
                    <div></div>;
                  }
                }
              })}
            </div>
          </div>
          <div className="flex pt-0  flex-col px-[200px] space-y-6 pb-11">
            <h1 className="text-3xl font-bold">
              Donation has not been approved (10)
            </h1>
            <div className="flex flex-col space-y-2 ">
              {donations?.transaction?.map((item, index) => {
                {
                  if (item?.status == "pending") {
                    return (
                      <>
                        <div className="bg-gray-600 py-5 px-5 flex flex-row justify-between">
                          <div>
                            <p>{item.user?.name}</p>
                            <p>
                              {" "}
                              {moment(item.donation.created_at).format(
                                "dddd, DD MMMM YYYY"
                              )}
                            </p>
                            <p>Total : {Rupiah.convert(item.donateamount)}</p>
                          </div>
                          <div className="self-center">
                            <button
                              onClick={() => {
                                setOpenModalApprove(true);
                                setSelectedModalApproveData(item);
                              }}
                              className="py-1 px-3 rounded-lg"
                            >
                              View
                            </button>
                          </div>
                        </div>
                      </>
                    );
                  } else {
                    <div></div>;
                  }
                }
              })}
            </div>
            <h3 className="self-center">
              <a href="#">Load more</a>
            </h3>
          </div>
          <ModalApprove
            setOpenModalApprove={setOpenModalApprove}
            showModalApprove={openModalApprove}
            selectedModalApproveData={selectedModalApproveData}
          />
          <ModalDonate
            setOpenModalDonate={setOpenModalDonate}
            showModalDonate={openModalDonate}
            funds={donations}
            id={index}
          />
        </div>
      )}
    </>
  );
};

export default ViewFund;
