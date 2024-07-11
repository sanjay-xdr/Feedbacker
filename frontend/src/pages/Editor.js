import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";
import useEditorContext from "../context/editor-context";
import { validateObject } from "../utils/Validator";
import axios from "axios"

export default function Editor() {
  const { editorData, setEditorData } = useEditorContext();
  const [showEmailBox, setShowEmailBox] = useState(false);
  const [showRatingBox, setShowRatingBox] = useState(false);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setEditorData((prevstate) => ({ ...prevstate, [name]: value }));
  };

  // console.log(visibleItems);
  const generateFeedbackForm = () => {
    console.log("Generating FORM LINK HERE");

    const result = validateObject(editorData);
    if (result === true) {
      //here then create a api call to backend beaches
 let url="http://localhost:8080"
      axios.post(`${url}/hostsite`, {
        Heading:editorData.Heading,
        Description:editorData.Description,
        Footer:editorData.Footer,
        showEmailBox,
        showRatingBox

      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });



    } else {
      console.log(`Field "${result}" is empty.`);
      //show a alert here
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex">
        <div className="w-1/2  p-4 flex  ">
          <div
            className="w-full"
            style={{
              display: "flex",
              flexDirection: "column",

              alignItems: "center",
            }}
          >
            <div className="w-1/2 ">
              <div className="mb-4">
                <label
                  htmlFor="file-upload"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload File:<span className="text-red-600">(Pending)</span>
                </label>
                <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 24h8m-4-4v8m8-8v4m-24-4h8m-4-4v8m8-8v4m4-12v8m4-4h8m-4 12h8m-12-16v8m-8-4h8m-4 12h8m-12-8v8m-8-4h8"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-500 hover:text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept=".jpg, .jpeg, .png, "
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG and JPEG up to 5MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <label
                htmlfol="heading"
                className="block m-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Heading
              </label>
              <input
                type="text"
                name="Heading"
                id="heading"
                className="m-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block  p-2.5 focus:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="enter your heading here"
                required
                onChange={(e) => inputHandler(e)}
              />
            </div>
            <div className="w-1/2">
              <label
                htmlfol="Description"
                className="block m-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <input
                type="text"
                name="Description"
                id="Description"
                className="m-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block  p-2.5 focus:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="enter your Description here"
                required
                onChange={(e) => inputHandler(e)}
              />
            </div>
            <div className="w-1/2">
              <label
                htmlfol="Footer"
                className="block m-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Footer
              </label>
              <input
                type="text"
                name="Footer"
                id="Footer"
                className="m-2 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block  p-2.5 focus:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="enter your Footer here"
                required
                onChange={(e) => inputHandler(e)}
              />
            </div>

            <div className="w-1/2 flex items-center mb-4 mt-4">
              <input
                id="default-checkbox"
                name="EmailBox"
                type="checkbox"
                value={showEmailBox}
                className=" w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={() => setShowEmailBox((prev) => !prev)}
              />
              <label
                htmlFor="default-checkbox"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Collect User Email
              </label>
            </div>

            <div className="w-1/2 flex items-center mb-4 mt-4">
              <input
                id="default-checkbox"
                type="checkbox"
                value={showRatingBox}
                className=" w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={() => setShowRatingBox((prev) => !prev)}
              />
              <label
                htmlFor="default-checkbox"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Add Rating
              </label>
            </div>

            <div></div>

            <button
              type="button"
              className="m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={generateFeedbackForm}
            >
              Generate
            </button>
          </div>
        </div>
        <div className="w-px bg-gray-300"></div> {/* Vertical Line */}
        <div className="w-1/2  p-4 flex flex-col justify-center items-center">
          <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="bg-white p-4 flex justify-center">
            <img className="mx-auto h-10 "  src="https://avatars.githubusercontent.com/u/55450200?v=4" alt="Company Logo" />
             
            </div>
            <form className="space-y-6" action="#">
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                {editorData.Heading || "Write a Heading"}
              </h5>
              <div>
                <label
                  htmlfol="email"
                  className="ml-1 mb-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {editorData.Description || "Write a Description Here"}
                </label>
                <div className="w-full">
                  <label
                    htmlfol="Name"
                    className="ml-1 mb-1 block  text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name <span class="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="Name"
                    id="Name"
                    className=" mb-3 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block  p-2.5 focus:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="enter your Name here"
                    required
                    onChange={(e) => inputHandler(e)}
                  />
                </div>

                {showEmailBox && (
                  <div className="w-full">
                    <label
                      htmlfol="Name"
                      className="ml-1 mb-1 block  text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="Email"
                      id="Email"
                      className="mb-4 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block  p-2.5 focus:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="enter your Email here"
                      required
                      onChange={(e) => inputHandler(e)}
                    />
                  </div>
                )}

                <textarea
                  id="message"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                ></textarea>

                {showRatingBox && (
                  <>
                    <label
                      htmlfol="Name"
                      className="ml-1 mt-3 block  text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Rating <span class="text-red-500">*</span>
                    </label>
                    <div className="flex items-center mt-1">
                      <svg
                        className="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    </div>
                  </>
                )}
              </div>

              <div className="flex items-start">
                <div className="flex items-start">
                  <p className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {editorData.Footer || "Write a Footer "}
                  </p>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
