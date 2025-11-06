"use client";
import { Drawer } from "vaul";
import { useState } from "react";
import {
  X,
  ChevronDown,
  ChevronUp,
  Smile,
  Angry,
  Sunrise,
  Sunset,
} from "lucide-react";
import { getCategoryColor, getCategoryIcon } from "@/utils/map-constants";
import { useCreateSpot } from "@/hooks/useCreateSpot";
import { PhotoUploader } from "../PhotoUploader";
import { useCatandTags } from "@/hooks/useCatandTags";
import { Slider } from "../ui/slider";

interface CreationDrawerProps {
  location: { lat: number; lng: number } | null;
  closeDrawer: () => void;

  onSpotCreated: () => void;
}

export function CreationDrawer({
  location,
  closeDrawer,
  onSpotCreated,
}: CreationDrawerProps) {
  const { createSpot, isLoading } = useCreateSpot();
  const [showTags, setShowTags] = useState<boolean>(false);

  const { categories, tags: uniqueTags } = useCatandTags();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: [] as number[],
    idealTime: 12 as number,
    idealWeather: "",
    friendlyIndice: 3 as number,
  });

  const [photos, setPhotos] = useState<File[]>([]);

  const weatherOptions = [
    "Sunny",
    "Cloudy",
    "Rainy",
    "Foggy",
    "Snowy",
    "Golden Hour",
  ];

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTagToggle = (tagId: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter((id) => id !== tagId)
        : [...prev.tags, tagId],
    }));
  };

  const formatTime = (hour: number) => {
    if (hour === 0) return "12 AM";
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return "12 PM";
    return `${hour - 12} PM`;
  };

  return (
    <Drawer.Root open={true} modal={false} dismissible={false}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Drawer.Content className="z-100 fixed flex flex-col bg-white text-gray-900 rounded-t-2xl bottom-0 left-0 right-0 h-[85vh] mx-[-1px] outline-none">
          <Drawer.Description className="sr-only">
            Create a new spot by providing details, photos, and location
            information
          </Drawer.Description>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Drawer.Title className="text-xl font-bold text-gray-900">
              Create New Spot
            </Drawer.Title>
            <button
              onClick={closeDrawer}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>

          {/* Form Content - scrollable */}
          <div
            className="flex flex-col overflow-y-auto p-4 gap-4"
            data-vaul-no-drag
          >
            {/* Location Display */}
            <div className="bg-emerald-50 border border-emerald-300 p-3 rounded-lg">
              <p className="text-sm text-emerald-700">
                📍 Location: {location?.lat.toFixed(6)},{" "}
                {location?.lng.toFixed(6)}
              </p>
            </div>

            {/* Title Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="e.g., Eiffel Tower Sunset View"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 "></label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Describe what makes this spot special..."
                rows={4}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              />
            </div>

            {/* Category Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const isSelected = formData.category === cat;
                  return (
                    <div
                      key={cat}
                      className={`px-3 py-2 rounded-lg cursor-pointer flex items-center gap-2 font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-md border-2 ${
                        isSelected ? "shadow-lg scale-105" : "bg-white"
                      }`}
                      style={{
                        color: isSelected ? "white" : getCategoryColor(cat),
                        backgroundColor: isSelected
                          ? getCategoryColor(cat)
                          : "white",
                        borderColor: getCategoryColor(cat),
                      }}
                      onClick={() => handleInputChange("category", cat)}
                    >
                      {getCategoryIcon(cat)}
                      <span className="text-sm">{cat}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tags Field */}
            <div>
              <label
                className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2 cursor-pointer"
                onClick={() => {
                  setShowTags(!showTags);
                }}
              >
                Tags (optional)
                {!showTags ? (
                  <ChevronDown className="text-gray-600" />
                ) : (
                  <ChevronUp className="text-gray-600" />
                )}
              </label>
              {showTags && (
                <div className="flex flex-wrap gap-2">
                  {uniqueTags.map((tag) => {
                    const isSelected = formData.tags.includes(tag.id);
                    return (
                      <div
                        key={tag.id}
                        className={`px-2 py-1 rounded-lg cursor-pointer text-sm font-medium transition-all duration-200 transform hover:scale-105 border-2 ${
                          isSelected ? "shadow-md scale-105" : "bg-white"
                        }`}
                        style={{
                          color: isSelected ? "white" : tag.color,
                          backgroundColor: isSelected ? tag.color : "white",
                          borderColor: tag.color,
                        }}
                        onClick={() => handleTagToggle(tag.id)}
                      >
                        {tag.name}
                      </div>
                    );
                  })}
                </div>
              )}
              {formData.tags.length > 0 && (
                <p className="text-xs text-gray-600 mt-2">
                  {formData.tags.length} tag(s) selected
                </p>
              )}
            </div>

            {/* Spot Details Section */}
            <div className="">
              {/* Ideal Time */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3 ">
                  Best Time
                </label>
                <div className="flex gap-3 items-center">
                  <Sunrise className="text-orange-300"></Sunrise>
                  <Slider
                    min={6}
                    max={22}
                    step={1}
                    value={[formData.idealTime]}
                    onValueChange={(value) =>
                      handleInputChange("idealTime", value[0])
                    }
                    className="mb-2"
                  />
                  <Sunset className="text-orange-600"></Sunset>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Sunrise</span>
                  <span className="font-medium text-gray-500">
                    {formatTime(formData.idealTime)}
                  </span>
                  <span>Sunset</span>
                </div>
              </div>

              {/* Friendly Indice */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Friendly Indice
                </label>
                <div className="flex gap-3 items-center">
                  <Angry className="text-red-400 flex-shrink-0" size={20} />
                  <Slider
                    min={0}
                    max={5}
                    step={1}
                    value={[formData.friendlyIndice]}
                    onValueChange={(value) =>
                      handleInputChange("friendlyIndice", value[0])
                    }
                    className="flex-1"
                  />
                  <Smile className="text-emerald-400 flex-shrink-0" size={20} />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Dangerous</span>
                  <span className="font-medium text-gray-500">
                    {formData.friendlyIndice}/5
                  </span>
                  <span>Peacefull</span>
                </div>
              </div>

              {/* Ideal Weather */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Best Weather
                </label>
                <div className="flex flex-wrap gap-2">
                  {weatherOptions.map((weather) => {
                    const isSelected = formData.idealWeather === weather;
                    return (
                      <button
                        key={weather}
                        type="button"
                        onClick={() =>
                          handleInputChange(
                            "idealWeather",
                            isSelected ? "" : weather
                          )
                        }
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border-2 ${
                          isSelected
                            ? "bg-cyan-500 text-white border-cyan-500"
                            : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {weather}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Photo Upload */}
            <PhotoUploader
              photos={photos}
              onPhotosChange={setPhotos}
              maxPhotos={5}
            />

            <div className="p-4 border-t border-gray-200 bg-white left-0 right-0">
              <button
                onClick={async () => {
                  if (location && !isLoading) {
                    try {
                      await createSpot({
                        ...formData,
                        latitude: location.lat,
                        longitude: location.lng,
                        tags: formData.tags,
                        photos: photos,
                      });
                      // Refetch spots to show the new one
                      onSpotCreated();
                      closeDrawer();
                    } catch (error) {
                      console.error("Error creating spot:", error);
                    }
                  }
                }}
                disabled={!formData.title || !formData.category || isLoading}
                className="w-full bg-emerald-500 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? "Creating..." : "Create Spot"}
              </button>
            </div>
          </div>

          {/* Footer with Submit Button - Fixed at bottom */}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
