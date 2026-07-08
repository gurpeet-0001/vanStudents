import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);

  const links = [
    ["Dashboard", "/"],
    ["Students", "/students"],
    ["Teachers", "/teachers"],
    ["Classes", "/classes"],
    ["Attendance", "/attendance"],
    ["Fees", "/fees"],
    ["Results", "/results"],
    ["Users", "/users"],
    ["Reports", "/reports"],
    ["Settings", "/settings"],
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Header */}
      <header className="bg-gray-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-2xl"
              onClick={() => setOpen(!open)}
            >
              ☰
            </button>

            <h1 className="text-2xl md:text-3xl font-bold">
              🛡️ Administrator Panel
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-5">
            <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Desktop Navbar */}
      <nav className="hidden md:block bg-white shadow border-b">
        <div className="max-w-7xl mx-auto flex justify-center gap-8 py-3 font-semibold text-gray-700">
          {links.map(([name, path]) => (
            <Link
              key={name}
              to={path}
              className="hover:text-emerald-600 transition"
            >
              {name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow">
          {links.map(([name, path]) => (
            <Link
              key={name}
              to={path}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 border-b hover:bg-gray-100"
            >
              {name}
            </Link>
          ))}

          <button className="w-full text-left px-6 py-3 text-red-600 font-semibold">
            Logout
          </button>
        </div>
      )}

      {/* Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        <div className="bg-white rounded-xl shadow-md min-h-[75vh] p-6">
          <Outlet />
        </div>
      </main>

    </div>
  );
}