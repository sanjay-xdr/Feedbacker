import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import Modal from "../components/Modal";
import useEditorContext from "../context/editor-context";
import { UserPreview } from "../components/UserPreview";

export default function Editor() {
  const { editorData, setEditorData } = useEditorContext();
  const [showModal, setShowModal] = useState(false);

  //InputHandler
  const inputHandler = (e) => {
    const { name, type, value, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    console.log(name, inputValue);
    setEditorData((prevState) => ({ ...prevState, [name]: inputValue }));
  };

  const generateFeedbackForm = () => {
    if (!editorData.FormName) {
      setShowModal(true);
      return;
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex">
        {!showModal ? (
          ""
        ) : (
          <Modal showModal={showModal} setShowModal={setShowModal} />
        )}
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
                className="block m-2 text-sm font-medium text-gray-900 "
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
                className="block m-2 text-sm font-medium text-gray-900 "
              >
                Description
                <span className="text-red-600">
                  {" "}
                  Make FOrm Name Unique show a pop up{" "}
                </span>
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
                className="block m-2 text-sm font-medium text-gray-900 "
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
                id="showEmailBox"
                name="showEmailBox"
                type="checkbox"
                value={editorData.showEmailBox}
                className=" w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => inputHandler(e)}
              />
              <label
                htmlFor="showEmailBox"
                className="ms-2 text-sm font-medium text-gray-900 "
              >
                Collect User Email
              </label>
            </div>

            <div className="w-1/2 flex items-center mb-4 mt-4">
              <input
                id="showRatingBox"
                type="checkbox"
                name="showRatingBox"
                value={editorData.showRatingBox}
                className=" w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => inputHandler(e)}
              />
              <label
                htmlFor="showRatingBox"
                className="ms-2 text-sm font-medium text-gray-900"
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
        <UserPreview />
      </div>
    </>
  );
}
