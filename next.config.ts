import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',        // Autorise seulement HTTPS (sécurisé)
        hostname: 'res.cloudinary.com',  // Le domaine Cloudinary
        pathname: '/**',          // Tous les chemins (/** = n'importe quel chemin)
      },
    ],
  },
};

export default nextConfig;
