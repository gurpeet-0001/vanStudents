import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { Login } from "./pages/Login"
import { Authlayout } from "./layout/Authlayout"
import Mainlayout from "./layout/Mainlayout"
import Protectedroute from "./layout/Protectedroute"
import Adminlayout from "./layout/Adminlayout"
import Students from "./userComponents/Students"
import Fees from "./userComponents/Fees"

export const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/students" replace />} />

        <Route element={<Authlayout />}>
          <Route path="/login" element={<Login />}></Route>
        </Route>

        <Route element={<Protectedroute />}>
          <Route element={<Mainlayout />}>
            <Route path="/students" element={<Students />}></Route>
            <Route path="/fees/:id" element={<Fees/>}></Route>
          </Route>
          <Route path="/admin" element={<Adminlayout />}></Route>
        </Route>

      </Routes>
    </>
  )
}

