"use client";

import { useState } from "react";
import { X, Upload, ImagePlus } from "lucide-react";
import { PhotoUploader } from "../PhotoUploader";
import { useAddPhotos } from "@/hooks/useAddPhotos";

interface SpotDetailsAddPhotoProps {
  setAddPhoto: (status: boolean) => void;
  spotId: number;
}

export function SpotDetailsAddPhoto({
  setAddPhoto,
  spotId,
}: SpotDetailsAddPhotoProps) {
  const [photos, setPhotos] = useState<File[]>([]);
  const [batchTitle, setBatchTitle] = useState("");
  const [batchDescription, setBatchDescription] = useState("");

  const { addPhotos, isLoading } = useAddPhotos();

  const handleSubmit = async () => {
    if (photos.length === 0) {
      alert("Please select at least one photo");
      return;
    }

    try {
      await addPhotos(spotId, {
        title: batchTitle || undefined,
        description: batchDescription || undefined,
        photos,
      });

      // Success - close modal
      setAddPhoto(false);
    } catch (error) {
      console.error("Failed to upload photos:", error);
      alert("Failed to upload photos. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <ImagePlus size={24} className="text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Add Photos
              </h2>
              <p className="text-sm text-gray-500">
                Upload photos to this spot
              </p>
            </div>
          </div>
          <button
            onClick={() => setAddPhoto(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {/* Batch Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Serie Title
              </label>
              <input
                type="text"
                value={batchTitle}
                onChange={(e) => setBatchTitle(e.target.value)}
                placeholder="e.g., Summer 2024 shots"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                value={batchDescription}
                onChange={(e) => setBatchDescription(e.target.value)}
                placeholder="Add context about this photo batch..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Photo Uploader */}
          <PhotoUploader
            photos={photos}
            onPhotosChange={setPhotos}
            maxPhotos={3}
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {photos.length > 0 ? (
              <span className="font-medium text-emerald-600">
                {photos.length} photo{photos.length > 1 ? "s" : ""} selected
              </span>
            ) : (
              <span>No photos selected yet</span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setAddPhoto(false)}
              className="px-5 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={photos.length === 0 || isLoading}
              className="px-5 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition font-medium flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload size={18} />
                  Upload Photos
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
