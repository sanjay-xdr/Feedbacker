import React from "react";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Editor() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex">
        <div className="w-1/2  p-4 flex ">
          <h2 className="text-xl font-bold">Left Side</h2>
        </div>
        <div className="w-px bg-gray-300"></div> {/* Vertical Line */}
        <div className="w-1/2  p-4 flex flex-col justify-center items-center">
          <h2 className="text-xl font-bold">Right Side</h2>
        </div>
      </div>
    </>
  );
}
