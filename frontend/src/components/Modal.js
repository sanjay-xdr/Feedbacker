// src/components/Modal.jsx
import React from 'react';

const Modal = ({ showModal, setShowModal }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Enter your Form Name</h2>
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={() => setShowModal(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <p>{window.location.host}/formName</p>
          <input
            type="text"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="User Feedback"
          />
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            className="px-4 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
          <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
