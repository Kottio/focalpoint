'use client'
import { Drawer } from "vaul"
import { useState } from "react"
import { X, ChevronDown, ChevronUp } from "lucide-react"
import { getCategoryColor, getCategoryIcon } from "@/utils/map-constants"
import { useCreateSpot } from "@/hooks/useCreateSpot"
import { PhotoUploader } from "./PhotoUploader"
import { useCatandTags } from "@/hooks/useCatandTags"


interface CreationDrawerProps {
  location: { lat: number; lng: number } | null
  closeDrawer: () => void

  onSpotCreated: () => void
}

export function CreationDrawer({ location, closeDrawer, onSpotCreated }: CreationDrawerProps) {
  const { createSpot, isLoading } = useCreateSpot()
  const [showTags, setShowTags] = useState<boolean>(false)


  const { categories, tags: uniqueTags } = useCatandTags()



  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tags: [] as number[],
  })

  const [photos, setPhotos] = useState<File[]>([])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleTagToggle = (tagId: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter(id => id !== tagId)
        : [...prev.tags, tagId]
    }))
  }

  return (
    <Drawer.Root
      open={true}
      modal={false}
      dismissible={false}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Drawer.Content
          className="z-100 fixed flex flex-col bg-gray-800 text-white rounded-t-2xl bottom-0 left-0 right-0 h-[90vh] mx-[-1px] outline-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <Drawer.Title className="text-xl font-bold text-white">
              Create New Spot
            </Drawer.Title>
            <button
              onClick={closeDrawer}
              className="p-2 hover:bg-gray-800 rounded-full transition"
            >
              <X size={24} className="text-gray-400" />
            </button>
          </div>

          {/* Form Content - scrollable */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6" data-vaul-no-drag>
            {/* Location Display */}
            <div className="bg-emerald-900/30 border border-emerald-700/50 p-3 rounded-lg">
              <p className="text-sm text-emerald-300">
                📍 Location: {location?.lat.toFixed(6)}, {location?.lng.toFixed(6)}
              </p>
            </div>

            {/* Title Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Eiffel Tower Sunset View"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe what makes this spot special..."
                rows={4}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              />
            </div>

            {/* Category Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category *
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => {
                  const isSelected = formData.category === cat;
                  return (
                    <div
                      key={cat}
                      className={`px-3 py-2 rounded-lg cursor-pointer flex items-center gap-2 font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-md border-2 ${isSelected ? 'shadow-lg scale-105' : 'bg-white'
                        }`}
                      style={{
                        color: isSelected ? 'white' : getCategoryColor(cat),
                        backgroundColor: isSelected ? getCategoryColor(cat) : 'white',
                        borderColor: getCategoryColor(cat),
                      }}
                      onClick={() => handleInputChange('category', cat)}
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

              <label className="flex items-center gap-1 text-sm font-medium text-gray-300 mb-2 cursor-pointer" onClick={() => { setShowTags(!showTags) }}>
                Tags (optional)
                {!showTags ? <ChevronDown className="text-gray-400" /> : <ChevronUp className="text-gray-400" />}
              </label>
              {showTags && <div className="flex flex-wrap gap-2">
                {uniqueTags.map(tag => {
                  const isSelected = formData.tags.includes(tag.id);
                  return (
                    <div
                      key={tag.id}
                      className={`px-3 py-2 rounded-full cursor-pointer text-sm font-medium transition-all duration-200 transform hover:scale-105 border-2 ${isSelected ? 'shadow-md scale-105' : 'bg-white'
                        }`}
                      style={{
                        color: isSelected ? 'white' : tag.color,
                        backgroundColor: isSelected ? tag.color : 'white',
                        borderColor: tag.color,
                      }}
                      onClick={() => handleTagToggle(tag.id)}
                    >
                      {tag.name}
                    </div>
                  );
                })}
              </div>}
              {formData.tags.length > 0 && (
                <p className="text-xs text-gray-400 mt-2">
                  {formData.tags.length} tag(s) selected
                </p>
              )}
            </div>

            {/* Photo Upload */}
            <PhotoUploader photos={photos} onPhotosChange={setPhotos} maxPhotos={5} />

            {/* Extra padding to ensure content isn't hidden behind button */}
            <div className="h-20"></div>
            <div className="p-4 border-t border-gray-700 bg-gray-800  left-0 right-0">
              <button
                onClick={async () => {
                  if (location && !isLoading) {
                    try {
                      await createSpot({
                        ...formData,
                        latitude: location.lat,
                        longitude: location.lng,
                        tags: formData.tags,
                        photos: photos
                      });
                      // Refetch spots to show the new one
                      onSpotCreated();
                      closeDrawer();
                    } catch (error) {
                      console.error('Error creating spot:', error);
                    }
                  }
                }}
                disabled={!formData.title || !formData.category || isLoading}
                className="w-full bg-emerald-500 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition disabled:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? 'Creating...' : 'Create Spot'}
              </button>
            </div>
          </div>

          {/* Footer with Submit Button - Fixed at bottom */}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root >
  )
}

