import React from "react"
import { Routes, Route, Outlet } from "react-router-dom"
import { Login } from "./pages/Login"
import { Authlayout } from "./layout/Authlayout"
import Mainlayout from "./layout/Mainlayout"
import Home from "./pages/Home"
import Protectedroute from "./layout/Protectedroute"

export const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Authlayout />}>
          <Route path="/login" element={<Login />}></Route>
        </Route>

        <Route element={<Protectedroute/>}>
          <Route element={<Mainlayout />}>
            <Route path="/" element={<Home />}></Route>
          </Route>
        </Route>
      </Routes>
    </>
  )
}

