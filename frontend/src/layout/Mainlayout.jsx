import React from 'react'
import { Outlet } from 'react-router-dom'
import { Login } from '../pages/Login'

export default function Mainlayout() {
    return (
        <div>
            <h1>this is header</h1>
            <Outlet></Outlet>
            <h1>This is footer</h1>
        </div>
    )
}
