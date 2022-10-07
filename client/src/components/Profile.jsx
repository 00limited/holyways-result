import React, { useContext } from "react";
import img1 from "../assets/img6.png";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import { useQuery } from "react-query";
import moment from "moment";
import Rupiah from "rupiah-format";

const Profile = () => {
  const [state] = useContext(UserContext);
  const getuserID = localStorage.getItem("token");
  console.log(getuserID);

  console.log(state);
  let { data: profile } = useQuery("profileCache", async () => {
    const response = await API.get("/user/id");
    return response.data.data;
  });
  let { data: transactions } = useQuery("transactionsCache", async () => {
    const response = await API.get("/fund");
    console.log(">>>>>>>", response);
    return response.data.data;
  });

  return (
    <div className="pt-[5rem]">
      <div className="grid grid-cols-2 px-[200px] py-[50px]">
        <div>
          <h1 className="text-3xl font-semibold pb-5">My Profile</h1>
          <div className="flex justify-start space-x-3">
            <img src={img1} alt="" />
            <div className="flex flex-col justify-between">
              <div>
                <label
                  for="fullName"
                  className="block  text-base font-semibold text-red-700"
                >
                  Full Name
                </label>
                <p>{state?.user.name}</p>
              </div>
              <div>
                <label
                  for="email"
                  className="block  text-base font-semibold text-red-700"
                >
                  Email
                </label>
                <p>{state?.user.email}</p>
              </div>
              <div>
                <label
                  for="phone"
                  className="block  text-base font-semibold text-red-700"
                >
                  Phone
                </label>
                <p>{state?.user?.phone}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-semibold pb-5">History Donation</h1>
          <div className="flex flex-col space-y-4">
            {transactions?.map((item, index) => (
              <div className="bg-gray-500 py-2 px-2 rounded-md">
                <div>
                  <h3 className="text-xl font-medium">{item.donation.title}</h3>
                  <p className="text-base">
                    <span className="font-normal">
                      {moment(item.donation.created_at).format(
                        "dddd, DD MMMM YYYY"
                      )}
                    </span>
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-sm">
                    Total : {Rupiah.convert(item.donateamount)}
                  </p>
                  <div className="bg-lime-500 py-1 px-2 rounded-lg">
                    <p className="text-lime-800 font-bold">Finished</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
