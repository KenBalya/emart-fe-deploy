// app/login/page.tsx
"use client";

import { useState } from 'react';
import { useAuth } from '../components/context/AuthContext';
import Image from 'next/image';

export default function LoginPage() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login({ username, password });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 bg-cover bg-center px-10" style={{ backgroundImage: "url('/loginBg.webp')" }}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg opacity-95 flex flex-col justify-center">
        <div className='w-full text-center flex items-center justify-center'>
            <Image 
            src={'/logo.png'} 
            alt={''}
            width={150}
            height={150}
        />
        </div>
        
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Login To Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-10">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input 
              type="text" 
              id="username"
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Username" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm text-black"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              id="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm text-black"
              required
            />
          </div>
          <div>
            <button 
              type="submit" 
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#21BF73] hover:bg-[#4bdf49] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
