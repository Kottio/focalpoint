import { useState } from "react";
import { X, Check, Search } from "lucide-react";
import { LocationSearchInput } from "../LocationSearchInput";

interface CreationControlsProps {
  onCancel: () => void;
  onConfirm: () => void;
  onLocationSelect: (longitude: number, latitude: number) => void;
}

export function CreationControls({
  onCancel,
  onConfirm,
  onLocationSelect,
}: CreationControlsProps) {
  const [isResearchInCreation, setIsResearchInCreation] = useState(false);

  return (
    <div className="absolute z-20 top-4 right-4 flex gap-2">
      {!isResearchInCreation ? (
        <>
          {/* Search Button */}
          <button
            className="bg-white p-2.5 rounded-lg border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all shadow-sm"
            onClick={() => setIsResearchInCreation(true)}
            aria-label="Search location"
          >
            <Search size={20} className="text-gray-700" />
          </button>

          {/* Cancel Button */}
          <button
            onClick={onCancel}
            className="bg-white px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-400 hover:shadow-md transition-all shadow-sm flex items-center gap-2 text-gray-700 font-medium"
          >
            <X size={18} />
            <span className="hidden sm:inline">Cancel</span>
          </button>

          {/* Confirm Button */}
          <button
            onClick={onConfirm}
            className="bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-lg transition-all flex items-center gap-2 text-white font-medium shadow-md hover:shadow-lg"
          >
            <Check size={18} />
            <span className="hidden sm:inline">Confirm</span>
          </button>
        </>
      ) : (
        <LocationSearchInput
          onLocationSelect={onLocationSelect}
          setIsResearchMode={setIsResearchInCreation}
        />
      )}
    </div>
  );
}
