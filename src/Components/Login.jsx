import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gradient-to-t from-gray-500 to-blue-500">
      <div className="bg-white p-10 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-gray-800 mb-5">Login</h2>
        <form onSubmit={() => navigate("/home")} className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-gray-700 font-semibold">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value='test1'
              className="py-2 px-4 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700 font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value='123456'
              className="py-2 px-4 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
