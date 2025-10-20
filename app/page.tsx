"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/mainPhotos/web-01.jpg",
  "/mainPhotos/web-02.jpg",
  "/mainPhotos/web-03.jpg",
  "/mainPhotos/web-04.jpg",
  "/mainPhotos/web-05.jpg",
  "/mainPhotos/web-06.jpg",
  "/mainPhotos/web-07.jpg",
  "/mainPhotos/web-08.jpg",
  "/mainPhotos/web-09.jpg",
  "/mainPhotos/web-10.jpg",
  "/mainPhotos/web-11.jpg",
];

export default function MainPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  // Change images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 2) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleEnter = () => {
    router.push("/map");
  };

  // Left and right image index
  const leftIndex = index;
  const rightIndex = (index + 1) % images.length;

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black flex flex-col ">
      {/* LEFT IMAGE */}
      <div className="relative w-full h-1/2">
        <AnimatePresence mode="wait">
          <motion.div
            key={images[leftIndex]}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${images[leftIndex]})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative w-full h-1/2">
        <AnimatePresence mode="wait">
          <motion.div
            key={images[rightIndex]}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${images[rightIndex]})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" />

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 px-4">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 drop-shadow-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          MAPSHOT
        </motion.h1>
        <motion.button
          onClick={handleEnter}
          className="px-8 py-3 bg-white text-black font-semibold rounded-xl shadow-2xl hover:bg-gray-200 transition text-base sm:text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Enter App
        </motion.button>
      </div>
    </div>
  );
}
