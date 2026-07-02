import React, { useEffect, useState } from "react";
import axios from "axios"

export const Login = () => {
    const [phoneNumber , setphoneNumber] = useState('');
    const [password , setPassword] = useState('');

    const handleLogin = async (e)=>{
        e.preventDefault()
        try {
          const response = await axios.post("http://localhost:5001/api/login",{password : password , phoneNumber : phoneNumber})   
          console.log(response.data) 
        } catch (error) {
          console.log('error postting data' + error)
        }
            
        
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form className="flex flex-col gap-4 " onSubmit={handleLogin}>
          <div>
            <label className="block mb-2 font-medium">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e)=>(setphoneNumber(e.target.value))}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e)=>(setPassword(e.target.value))}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};