import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-white px-4">
      
      <div className="bg-white text-black rounded-lg p-6 shadow-lg w-full min-w-50 max-w-100">
      <h2 className="text-3xl text-center text-slate-800 font-bold mb-8">wiseagent.ai</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-base font-medium text-slate-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="e.g. john@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 border border-slate-300 rounded-md shadow-sm focus:ring-slate-500 focus:border-slate-500 px-3"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-base font-medium text-slate-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 border border-slate-300 rounded-md shadow-sm focus:ring-slate-500 focus:border-slate-500 px-3"
            />
          </div>

          <div className="text-right">
            <p className="text-sm text-slate-600 hover:text-slate-800 cursor-pointer">
              Forgot Password?
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#ff7a59] text-white rounded-md hover:bg-orange-600 font-semibold transition-colors"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-slate-700 hover:text-slate-900 font-medium">
              Sign up
            </a>
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center">
          <div className="border-t border-slate-300 flex-grow"></div>
          <span className="mx-4 text-slate-500">or</span>
          <div className="border-t border-slate-300 flex-grow"></div>
        </div>

        <div className="mt-6">
          <div
            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white hover:bg-slate-50 transition-colors"
          >
            <GoogleLogin
            onSuccess={(credentialResponse) => {
              try {
                const token = credentialResponse.credential;
                if (!token) {
                  throw new Error('No token found');
                }
                const decode = jwtDecode(token);
                console.log('Decoded Token', decode);
                navigate('/');
              } catch (error) {
                console.error('Error', error);
              }
            }}
            theme="outline"
            shape="rectangular"
            text="continue_with"
            useOneTap={false}
            
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;