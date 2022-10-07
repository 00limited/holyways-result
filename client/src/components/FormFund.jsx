import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation } from "react-query";
import { API } from "../config/api";

const FormFund = () => {
  const [preview, setPreview] = useState(null); //For image preview
  let navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    thumbnail: "",
    description: "",
    goal: "",
  }); //Store product data

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("thumbnail", form.thumbnail[0], form.thumbnail[0].name);
      formData.set("title", form?.title);
      formData.set("description", form?.description);
      formData.set("goal", form?.goal);

      console.log(form);

      // Insert product data
      const response = await API.post("/donation", formData, config);
      console.log(response);

      navigate("/raisefund");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div>
      <div className="pt-[10rem] px-[200px]">
        <h1 className="text-2xl font-semibold pb-8">Make Raise Fund</h1>
        <form
          onSubmit={(e) => handleSubmit.mutate(e)}
          className="space-y-5 pb-8"
        >
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Title"
          />
          <div className="flex justify-between">
            <div className="flex items-center ">
              <label className="flex flex-col justify-center items-center w-[10rem] h-10 bg-red-700 rounded-lg  border cursor-pointer  hover:bg-red-500   ">
                <div className="flex flex-col justify-center items-center">
                  <p className="mb-2 text-sm text-white font-bold ">
                    Attache thumbnail
                  </p>
                </div>
                <input
                  id="upload"
                  name="thumbnail"
                  type="file"
                  className="hidden"
                  onChange={handleChange}
                />
              </label>
            </div>
            {preview && (
              <img
                className="max-w-full max-h-[150px] object-cover"
                src={preview}
                alt=""
              />
            )}
          </div>

          <input
            type="text"
            id="goal"
            name="goal"
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Goals Donation"
          />
          <textarea
            id="message"
            rows="4"
            name="description"
            onChange={handleChange}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your message..."
          ></textarea>
          <div className=" flex justify-end pt-11">
            <button
              type="submit"
              className="py-2 px-4 text-red-700 font-bold hover:bg-red-700 hover:text-white"
            >
              Public Fundraising
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormFund;
