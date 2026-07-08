import React, { useEffect } from 'react'
import { Outlet , Navigate} from 'react-router-dom'


export default function Protectedroute() {
    const token = localStorage.getItem('token');
    
    return token ? <Outlet/> : <Navigate to="/login" replace></Navigate>
}
