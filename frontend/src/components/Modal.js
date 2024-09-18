// src/components/Modal.jsx
import React, { useState } from 'react';
import useEditorContext from '../context/editor-context';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const Modal = ({ showModal, setShowModal }) => {
    const { editorData, setEditorData } = useEditorContext();
    const [formName,setFormName]=useState("");
  if (!showModal) return null;

  const submitForm=()=>{
    
    let formNameFinal=formName+'_'+uuidv4()+".html";

    setEditorData((prevstate) => ({ ...prevstate, FormName: formName,FormNameWithId:formNameFinal }));
    

  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Enter your Form Name</h2>
        
          </div>
        </div>
        <div className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <p>{window.location.host}/formName</p>
          <input
            type="text"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="User Feedback"
            onChange={(e)=>setFormName(e.target.value)}
            
          />
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            className="text-white bg-gray-400  cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            disabled="true" 
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
          <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700" onClick={submitForm}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
