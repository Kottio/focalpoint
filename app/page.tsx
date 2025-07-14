'use client'
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };


  const imageUrl = [
    "/mainPhotos/film-5.jpg",
    "/mainPhotos/film-6.jpg",
    "/mainPhotos/film-7.jpg",
    "/mainPhotos/film-8.jpg",
    "/mainPhotos/film-9.jpg",
    "/mainPhotos/film-10.jpg",
    "/mainPhotos/film-11.jpg",
    "/mainPhotos/film-12.jpg",
  ];

  // Function to generate grid layouts 
  const getGridLayout = (index: number) => {
    const layouts = [
      { colSpan: 'col-span-2', rowSpan: 'row-span-2' }, // Large
      { colSpan: 'col-span-1', rowSpan: 'row-span-2' }, // Tall
      { colSpan: 'col-span-2', rowSpan: 'row-span-1' }, // Wide
      { colSpan: 'col-span-1', rowSpan: 'row-span-1' }, // Small
    ];
    const pattern = [0, 1, 1, 2, 3, 3, 0, 1, 2, 3]
    return layouts[pattern[index % pattern.length]];
  };



  return (
    <div className="flex w-full">
      <div className="w-1/3 bg-white ">

        <div className="flex flex-col pt-30 items-center h-screen">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-light text-black rounded pb-1">Welcome to <span className="font-bold"> FocalPoint</span></span>
            <span className="text-emerald-700/50">Explore, discover and share</span>
          </div>

          <div className="bg-white w-100 p-5 rounded-xl text-black placeholder-neutral-300">
            {!isLogin && (
              <span className="text-sm">
                Thank you for showing interest in my project, it means a lot to me! I hope to build a project for passionate photographers and explorers, just like us! <br />
                This is an initial version of the project that I will be building based on your inputs
              </span>
            )}

            {/* Form inputs */}
            <div className="space-y-4 pt-10">
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <button
                onClick={handleSubmit}
                className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-400 transition duration-300"
              >
                {isLogin ? "Login" : "Register"}
              </button>
            </div>

            {/* Extra link */}
            {isLogin && (
              <p className="mt-4 text-sm text-center text-gray-500">
                Don't have an account?{" "}
                <span
                  className="text-emerald-500 cursor-pointer hover:underline"
                  onClick={() => setIsLogin(false)}
                >
                  Register
                </span>
              </p>
            )}

            {!isLogin && (
              <p className="mt-4 text-sm text-center text-gray-500">
                Already have an account?{" "}
                <span
                  className="text-emerald-500 cursor-pointer hover:underline"
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </span>
              </p>
            )}
          </div>
        </div>
      </div>


      {/* PHOTO GRID */}
      <div className="w-2/3 h-screen  overflow-hidden">
        <div className="grid grid-cols-3 auto-rows-[140px] gap-2 p-2 h-full">
          {imageUrl.map((src, index) => {

            const layout = getGridLayout(index);

            return (
              <div
                key={index}
                className={`relative ${layout.colSpan} ${layout.rowSpan} group cursor-pointer overflow-hidden rounded`}
              >
                <Image
                  src={src}
                  alt={`Photography ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 4}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

              </div>
            );
          })}
        </div>
      </div>
    </div >
  );
}