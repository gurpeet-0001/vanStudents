import React, { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

import api from "../interceptor/axios.jsx"

export default function Protectedroute() {
    const token = localStorage.getItem('Authorization');
    
    return token ? <Outlet /> : <Navigate to="/login" replace></Navigate>
}
