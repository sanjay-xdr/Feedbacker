import React from "react";
import useEditorContext from "../context/editor-context";

export const UserPreview = () => {
  const { editorData } = useEditorContext();
  return (
    <div className="w-1/2  p-4 flex flex-col justify-center items-center">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <div className="bg-white p-4 flex justify-center">
          <img
            className="mx-auto h-10 "
            src="https://avatars.githubusercontent.com/u/55450200?v=4"
            alt="Company Logo"
          />
        </div>
        <form className="space-y-6" action="#">
          <h5 className="text-xl font-medium text-gray-900 ">
            {editorData.Heading || "Write a Heading"}
          </h5>
          <div>
            <label
              htmlfol="email"
              className="ml-1 mb-4 block mb-2 text-sm font-medium text-gray-900 "
            >
              {editorData.Description || "Write a Description Here"}
            </label>
            <div className="w-full">
              <label
                htmlfol="Name"
                className="ml-1 mb-1 block  text-sm font-medium text-gray-900 "
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="Name"
                id="Name"
                className=" mb-3 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block  p-2.5 focus:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="enter your Name here"
                required
              />
            </div>

            {editorData.showEmailBox && (
              <div className="w-full">
                <label
                  htmlfol="Name"
                  className="ml-1 mb-1 block  text-sm font-medium text-gray-900 "
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="Email"
                  id="Email"
                  className="mb-4 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block  p-2.5 focus:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="enter your Email here"
                  required
                />
              </div>
            )}

            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Write your thoughts here..."
            ></textarea>

            {editorData.showRatingBox && (
              <>
                <label
                  htmlfol="Name"
                  className="ml-1 mt-3 block  text-sm font-medium text-gray-900 "
                >
                  Rating <span className="text-red-500">*</span>
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
              <p className="ms-2 text-sm font-medium text-gray-900">
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
  );
};
