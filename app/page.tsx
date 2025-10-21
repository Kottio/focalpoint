"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Github, Globe, Linkedin } from "lucide-react";

const images = [
  "/mainPhotos/web-06.jpg",
  "/mainPhotos/web-07.jpg",
  "/mainPhotos/web-01.jpg",
  "/mainPhotos/web-02.jpg",
  "/mainPhotos/web-03.jpg",
  "/mainPhotos/web-04.jpg",
  "/mainPhotos/web-05.jpg",

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
    <div className="relative h-dvh w-screen overflow-hidden bg-black flex flex-col ">
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 px-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="text-4xl font-bold ">MAPSHOT</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-4 max-w-md font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover & Share <br></br> Amazing Photography Spots
        </motion.p>

        {/* Enter Button */}
        <motion.button
          onClick={handleEnter}
          className="px-10 py-4 bg-white text-black font-semibold rounded-2xl shadow-2xl hover:bg-gray-100 transition text-base sm:text-lg mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Enter App
        </motion.button>

        {/* Social Links */}
        <motion.div
          className="flex gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
            aria-label="Instagram"
          >
            <Instagram size={24} className="text-white" />
          </a>
          <a
            href="https://www.linkedin.com/in/thomas-cottiaux-data-consultant"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} className="text-white" />
          </a>
          <a
            href="https://github.com/Kottio/focalpoint"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
            aria-label="GitHub"
          >
            <Github size={24} className="text-white" />
          </a>
          <a
            href="https://www.kottio.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
            aria-label="Website"
          >
            <Globe size={24} className="text-white" />
          </a>
        </motion.div>
      </div>
    </div >
  );
}
