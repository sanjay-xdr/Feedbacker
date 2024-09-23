import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full h-16 bg-white shadow z-50">
        <Navbar setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Sidebar for larger screens */}
      <div className={`fixed top-16 left-0 w-64 h-[calc(100vh-4rem)]  shadow-lg hidden lg:block`}>
        <Sidebar />
      </div>

      {/* Sidebar for smaller screens (toggleable) */}
      <div className={`fixed top-16 left-0 w-64 h-[calc(100vh-4rem)]  shadow-lg transition-transform transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}>
        <Sidebar />
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >Helloji</div>
      )}

      {/* Main Content */}
      <div className="ml-0 lg:ml-64 mt-16 p-8">
        <h1>Hello</h1>
        <p>Welcome to the responsive admin dashboard!</p>
      </div>
    </>
  );
}
