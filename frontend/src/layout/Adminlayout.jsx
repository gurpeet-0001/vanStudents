import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import api from "../middleware/axios";


export default function AdminLayout() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [studentsError, setStudentsError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchStudents = async () => {
      setLoadingStudents(true);
      try {
        const res = await api.get('/students');
        if (!mounted) return;
        // ensure alphabetical order by name
        const data = Array.isArray(res.data) ? res.data : res.data.students || [];
        data.sort((a, b) => (a.name || '').toString().localeCompare((b.name || '').toString(), undefined, { sensitivity: 'base' }));
        setStudents(data);
      } catch (err) {
        if (!mounted) return;
        setStudentsError(err.message || 'Failed to load students');
      } finally {
        if (mounted) setLoadingStudents(false);
      }
    };

    fetchStudents();

    return () => { mounted = false; };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('Authorization');
    window.location.href('/login');

  }
  const links = [
    ["All Students", "/admin/students"],
    ["Create User", "/admin/createuser"],
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Header */}
      <header>
        <div className="bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 text-white shadow-xl border-b border-amber-100/10">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-6">

            <div className="flex items-center gap-4">
              <button
                className="md:hidden text-2xl"
                onClick={() => setOpen(!open)}
              >
                ☰
              </button>

              <h1 className="text-2xl md:text-3xl font-bold">Admin</h1>
            </div>

            <div className="hidden md:flex items-center gap-5">
              <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg">Logout</button>
            </div>
          </div>
        </div>
      </header>

      {/* Desktop Navbar */}
      <nav className="hidden md:block bg-white shadow">
        <div className="max-w-6xl mx-auto flex justify-center gap-8 py-4 font-semibold text-gray-700">
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

          <button onClick={handleLogout} className="w-full text-left px-6 py-3 text-red-600 font-semibold">
            Logout
          </button>
        </div>
      )}

      {/* Content */}

      <Outlet context={{ students, setStudents, loadingStudents, studentsError }} />
    </div>
  )}
