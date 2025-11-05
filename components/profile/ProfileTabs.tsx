import { MapPin, Camera, Bookmark } from 'lucide-react';


interface ProfileTabsProps {
  activeTab: 'photos' | 'spots' | 'saved';
  onTabChange: (tab: 'photos' | 'spots' | 'saved') => void;
}

export function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  return (
    <div className="flex items-center justify-around border-b border-gray-200 bg-white sticky top-0 z-10">
      <button
        onClick={() => onTabChange('photos')}
        className={`flex-1 py-3  flex  justify-center  transition relative ${activeTab === 'photos'
          ? 'text-gray-900'
          : 'text-gray-500 hover:text-gray-700'
          }`}
      >
        <Camera></Camera>
        {activeTab === 'photos' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
        )}
      </button>

      <button
        onClick={() => onTabChange('spots')}
        className={`flex-1 py-3 flex  justify-center transition relative ${activeTab === 'spots'
          ? 'text-gray-900'
          : 'text-gray-500 hover:text-gray-700'
          }`}
      >
        <MapPin></MapPin>
        {activeTab === 'spots' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
        )}
      </button>

      <button
        onClick={() => onTabChange('saved')}
        className={`flex-1 py-3 flex  justify-center transition relative ${activeTab === 'saved'
          ? 'text-gray-900'
          : 'text-gray-500 hover:text-gray-700'
          }`}
      >
        <Bookmark></Bookmark>
        {activeTab === 'saved' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
        )}
      </button>
    </div>
  );
}
