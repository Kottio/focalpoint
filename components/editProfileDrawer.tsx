'use client';

import { useState } from 'react';
import { Drawer } from 'vaul';
import { X } from 'lucide-react';

interface EditProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentUsername?: string | null;
  currentBio?: string | null;
  onSave: (data: { username: string; bio: string }) => Promise<void>;
}

export function EditProfileDrawer({
  isOpen,
  onClose,
  currentUsername,
  currentBio,
  onSave
}: EditProfileDrawerProps) {
  const [username, setUsername] = useState(currentUsername || '');
  const [bio, setBio] = useState(currentBio || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      await onSave({
        username: username.trim(),
        bio: bio.trim(),
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
        <Drawer.Content className="bg-gray-900 flex flex-col rounded-t-2xl h-[85vh] fixed bottom-0 left-0 right-0 z-50 outline-none">
          {/* Header */}
          <Drawer.Title></Drawer.Title>
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">Edit Profile</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-full transition"
            >
              <X size={24} className="text-gray-400" />
            </button>
          </div>

          {/* Form */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
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
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Only lowercase letters, numbers, and underscores
              </p>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself..."
                maxLength={200}
                rows={4}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                {bio.length}/200 characters
              </p>
            </div>

            {error && (
              <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded-lg">
                {error}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700 space-y-2">
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
              className="w-full py-3 bg-gray-800 text-gray-300 rounded-lg font-medium hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
