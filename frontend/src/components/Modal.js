import React, { useState } from "react";
import useEditorContext from "../context/editor-context";
import { v4 as uuidv4 } from "uuid";
import { hostForm } from "../utils/apiClient";
import { Navigate } from "react-router";
import { useNavigate } from "react-router-dom"; 

const Modal = ({ showModal, setShowModal }) => {
  const { editorData, setEditorData } = useEditorContext();
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  if (!showModal) return null;

  const inputHandler = (value) => {
    setInputValue(value);
    let generatedFormName = value + "_" + uuidv4() + ".html";
    setEditorData((prevState) => ({
      ...prevState,
      FormName: value,
      FormNameWithId: generatedFormName,
    }));
  };

  const submitForm =async () => {
    if (inputValue.trim()) {
   let response=  await hostForm(editorData);
   if(response){ //! Check the Response Properly
    console.log("Navigating to projects");
    navigate("/projects");
   }
      setShowModal(false); 
    } else {
      alert("Form name cannot be empty");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Enter your Form Name
            </h2>
          </div>
        </div>
        <div className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name
          </label>
          <p>{`${window.location.host}/${inputValue || "formName"}`}</p>
          <input
            type="text"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="User Feedback"
            onChange={(e) => inputHandler(e.target.value)}
            value={inputValue}
          />
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            className="px-4 py-2 text-white bg-gray-400 font-medium rounded-lg text-sm"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
          <button
            className={`px-4 py-2 text-white rounded-md ${inputValue.trim() ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
            onClick={submitForm}
            disabled={!inputValue.trim()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
