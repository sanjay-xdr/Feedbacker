import React from "react";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";
import useEditorContext from "../context/editor-context";
import { validateObject } from "../utils/Validator";


export default function Editor() {
    const {editorData,setEditorData} =useEditorContext();

 const inputHandler=(e)=>{
    const { name, value } = e.target;
    setEditorData(prevstate=>({...prevstate,[name]:value}))
 }

 const generateFeedbackForm=()=>{
    console.log("Generating FORM LINK HERE")

    const result = validateObject(editorData);
    if (result === true) {
      //here then create a api call to backend beaches
    } else {
      console.log(`Field "${result}" is empty.`);
      //show a alert here 
    }
 }


  return (
    <>
      <Navbar />
      <div className="min-h-screen flex">
        <div className="w-1/2  p-4 flex ">
          <div className="w-full">
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
                onChange={(e)=>inputHandler(e)}
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
                onChange={(e)=>inputHandler(e)}
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
                onChange={(e)=>inputHandler(e)}
              />
            </div>
            <button type="button" className="m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={generateFeedbackForm}>Generate</button>
          </div>
      
        </div>
        <div className="w-px bg-gray-300"></div> {/* Vertical Line */}
        <div className="w-1/2  p-4 flex flex-col justify-center items-center">
          <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" action="#">
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
               {editorData.Heading || "Write a Heading"}
              </h5>
              <div>
                <label
                  htmlfol="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  {editorData.Description || "Write a Description Here"}
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                ></textarea>
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
