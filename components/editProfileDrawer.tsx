'use client';

import { useState } from 'react';
import { Drawer } from 'vaul';
import { X, Instagram } from 'lucide-react';

interface EditProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentUsername?: string | null;
  currentBio?: string | null;
  currentSocialLinks?: {
    instagram?: string;
    tiktok?: string;
  } | null;
  onSave: (data: {
    username: string;
    bio: string;
    socialLinks: {
      instagram?: string;
      tiktok?: string;
    };
  }) => Promise<void>;
}

export function EditProfileDrawer({
  isOpen,
  onClose,
  currentUsername,
  currentBio,
  currentSocialLinks,
  onSave
}: EditProfileDrawerProps) {
  const [username, setUsername] = useState(currentUsername || '');
  const [bio, setBio] = useState(currentBio || '');
  const [instagram, setInstagram] = useState(currentSocialLinks?.instagram || '');
  const [tiktok, setTiktok] = useState(currentSocialLinks?.tiktok || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      await onSave({
        username: username.trim(),
        bio: bio.trim(),
        socialLinks: {
          instagram: instagram.trim() || undefined,
          tiktok: tiktok.trim() || undefined,
        },
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer.Root open={isOpen} onOpenChange={onClose}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Drawer.Content className="bg-white flex flex-col rounded-t-2xl h-[85vh] fixed bottom-0 left-0 right-0 z-50 outline-none">
          <Drawer.Description className="sr-only">
            Edit your profile information including username and bio
          </Drawer.Description>
          {/* Header */}
          <Drawer.Title></Drawer.Title>
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Form */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))
                }
                placeholder="your_username"
                maxLength={30}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Only lowercase letters, numbers, and underscores
              </p>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
                maxLength={200}
                rows={4}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                {bio.length}/200 characters
              </p>
            </div>

            {/* Social Links Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">Social Links</h3>

              {/* Instagram */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Instagram size={16} className="text-pink-600" />
                    <span>Instagram</span>
                  </div>
                </label>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value.replace(/[^a-zA-Z0-9._]/g, ''))}
                  placeholder="username"
                  maxLength={30}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Without @ symbol
                </p>
              </div>

              {/* TikTok */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🎵</span>
                    <span>TikTok</span>
                  </div>
                </label>
                <input
                  type="text"
                  value={tiktok}
                  onChange={(e) => setTiktok(e.target.value.replace(/[^a-zA-Z0-9._]/g, ''))}
                  placeholder="username"
                  maxLength={30}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Without @ symbol
                </p>
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <button
              onClick={handleSave}
              disabled={loading || !username.trim()}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={onClose}
              disabled={loading}
              className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
            >
              Cancel
            </button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
