'use client'
import React, {useState} from 'react';
import Link from 'next/link';
interface LoginUser {
    email: string;
    password: string;
}

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
      });
    
      const [alert, setAlert] = useState({
        status: "",
        message: "",
      });
    
      const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
      };

      const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try{
            console.log('loginData')
            // await fetch('/api/auth/login', {
            //   method: 'POST',
            //   body: JSON.stringify(loginData)
            // })
            setAlert({ status: 'success', message: 'Login successfully' })
            setLoginData({  
                email: "",
                password: "",
            })
        }catch(error: any){
            console.log({ error })
            setAlert({ status: 'error', message:error.message })
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        {alert.message && 
        <div style={{ 
          color: alert.status === 'success' ? 'green' : 'red',
          fontWeight: 'bold'
        }}>   
          {alert.status === 'success' ? '✅' : '❌'} {alert.message}
        </div>
      }
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              onChange={onChange}
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={onChange}
              name="password"
              placeholder="Enter your password"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded font-semibold"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
