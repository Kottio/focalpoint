import { Instagram } from 'lucide-react';

interface ProfileBioProps {
  bio?: string | null;
  socialLinks?: {
    tiktok?: string;
    instagram?: string;
  };
}

export function ProfileBio({ bio, socialLinks }: ProfileBioProps) {
  if (!bio && !socialLinks?.instagram && !socialLinks?.tiktok) {
    return null;
  }

  return (
    <div className="mt-3 px-15 flex flex-col items-center">
      {/* Bio Text */}
      {bio && (
        <p className="text-sm text-gray-700  text-center leading-relaxed">{bio}</p>
      )}

      {/* Social Links */}
      {(socialLinks?.instagram || socialLinks?.tiktok) && (
        <div className="flex gap-3 mt-3">
          {socialLinks.instagram && (
            <a
              href={`https://instagram.com/${socialLinks.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-pink-600 hover:text-pink-700"
            >
              <Instagram size={15} />
              <span>{socialLinks.instagram}</span>
            </a>
          )}
          {socialLinks.tiktok && (
            <a
              href={`https://tiktok.com/@${socialLinks.tiktok.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-gray-900 hover:text-gray-700"
            >
              <span>🎵</span>
              <span>{socialLinks.tiktok}</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
