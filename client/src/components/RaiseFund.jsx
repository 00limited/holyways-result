import React, { useState, useEffect } from "react";
import img3 from "../assets/img4.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { useQuery } from "react-query";
import Rupiah from "rupiah-format";

const RaiseFund = () => {
  let { data: donation } = useQuery("DonationCache", async () => {
    const response = await API.get("/donation-user");
    console.log(">>>>>>>", response);
    return response.data.data;
  });
  return (
    <div className="pt-[5rem]">
      <div className="space-y-8 py-11 px-[154px]">
        <div className="flex justify-between">
          <h1 className="text-4xl font-semibold">My Raise Fund</h1>
          <Link
            to="/formfund"
            className="py-2 px-4 font-medium bg-red-700 rounded-lg text-white"
          >
            Make Raise Fund
          </Link>
        </div>

        <div className="flex flex-wrap space-x-3 space-y-3 justify-start">
          {donation?.map((item, index) => {
            return (
              <div
                key={index}
                className="w-[300px] h-[33rem] bg-slate-50 rounded-lg shadow-2xl pb-1"
              >
                <div className="flex flex-col ">
                  <img
                    src={item?.thumbnail}
                    alt=""
                    className="w-full h-[20rem]"
                  />
                  <div className="px-2 space-y-4 justify-between">
                    <h5 className="text-2xl font-semibold ">{item?.title}</h5>
                    <p>{item?.description.substring(0, 40)}</p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                      <div
                        className="bg-red-700 h-1.5 rounded-full"
                        style={{ width: "20%" }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between ">
                      <span className="text-xl font-bold">
                        {Rupiah.convert(item?.goal)}
                      </span>
                      <Link
                        to={"/viewfund/" + item.id}
                        className="rounded-lg  bg-transparent border-2 border-red-700 px-5 py-2.5 text-center text-sm font-medium text-black hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Detail
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RaiseFund;
