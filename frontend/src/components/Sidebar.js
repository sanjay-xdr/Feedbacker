import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-100 fixed flex flex-col pt-4">
      <ul className="w-full">
        <li className="px-6 py-3 text-black hover:bg-gray-300 text-base">
          <Link to="/projects">Projects</Link>
        </li>
        <li className="px-6 py-3 text-black hover:bg-gray-300 text-base mt-2">
          <Link to="/billing">Billing</Link>
        </li>
      </ul>
    </div>
  );
};
