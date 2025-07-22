'use client'
import { Spot, Tag } from "@/types/spot";
import { useEffect, useState } from "react";
import { getCategoryColor, getCategoryIcon } from "@/utils/map-constants";
import { useIsMobile } from "@/hooks/useIsMobile";


interface FilterProps {
  spots: Spot[],
  setFilteredSpots: (spots: Spot[]) => void
}

export default function Filter({ spots, setFilteredSpots }: FilterProps) {
  const categories = [... new Set(spots.map(spot => spot.category))]
  const allTags = spots.flatMap(spot => spot.tags);
  const uniqueTags = allTags.filter((tag, index, self) =>
    index === self.findIndex(t => t.id === tag.id))
  const [selectedCategory, setSelectedCategory] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])

  // Mobile filter toggle states
  const [showCategories, setShowCategories] = useState(false)
  const [showTags, setShowTags] = useState(false)

  const isMobile = useIsMobile()



  useEffect(() => {
    const filtered = spots.filter(spot => {
      // Category filter: if no categories selected, show all categories
      const categoryMatch = selectedCategory.length === 0 || selectedCategory.includes(spot.category);

      // Tag filter: if no tags selected, show all tags
      const tagMatch = selectedTags.length === 0 || spot.tags.some(tag => selectedTags.some(selTag => selTag.id === tag.id));

      return categoryMatch && tagMatch;
    });
    setFilteredSpots(filtered);


  }, [selectedCategory, selectedTags, spots]);



  const handleSelectionCategory = (category: string) => {
    if (selectedCategory.includes(category)) {
      const newCategories = selectedCategory.filter(cat => cat != category)
      setSelectedCategory(newCategories)
    } else {
      setSelectedCategory([...selectedCategory, category])
    }
  }

  const handleSelectionTags = (tag: Tag) => {
    if (selectedTags.some(t => t.id === tag.id)) {
      const newTags = selectedTags.filter(t => t.id !== tag.id)
      setSelectedTags(newTags)
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }
  //TODO: making the Tag AND filter
  return (<>
    {!isMobile && <div className="flex flex-col  w-full text-neutral-500">
      Categories
      <div className=" flex flex-wrap gap-2  border-neutral-200 border-b-1 pb-2 mb-2 ">

        {
          categories.map(cat => {
            return <div
              className={`px-3 py-1 rounded cursor-pointer flex flex-col justify-center text-sm`}

              style={{
                backgroundColor: ` ${selectedCategory.includes(cat) ? `${getCategoryColor(cat)}90` : `${getCategoryColor(cat)}30 `}`,
                color: ` ${selectedCategory.includes(cat) ? `white` : `${getCategoryColor(cat)} `}`
              }}
              onClick={() => { handleSelectionCategory(cat) }}
              key={cat}
            >{getCategoryIcon(cat)} {cat}

            </div>
          })
        }
      </div >

      Tags
      <div className="flex flex-wrap gap-1 border-neutral-200   ">
        {
          uniqueTags.map(tag => {
            return <div
              className={` px-3 py-1 text-xs  border rounded cursor-pointer`}

              style={{
                backgroundColor: `${selectedTags.some(t => t.id === tag.id) ? `${tag.color}` : `${tag.color}10`}`,
                color: `${selectedTags.some(t => t.id === tag.id) ? `white` : `${tag.color}`}`
              }}

              onClick={() => { handleSelectionTags(tag) }}
              key={tag.name}
            >{tag.name}</div>
          })
        }
      </div>

    </div >
    }
    {isMobile && <>
      {/* Vertical toggle buttons - glued to left edge */}
      <div className="fixed left-0 top-1/3 z-30 flex flex-col">
        <button
          onClick={() => setShowCategories(!showCategories)}
          className={`
            w-9 h-26 rounded-r-lg shadow-md text-xs font-medium transition-all duration-200
            flex flex-col items-center justify-center gap-1
            ${showCategories ? 'bg-cyan-500 text-white translate-x-0' : 'bg-white/90 text-gray-700 -translate-x-2 hover:translate-x-0'}
          `}
        >
          <span className="transform -rotate-90 whitespace-nowrap text-xs">CATEGORIES</span>
          {selectedCategory.length > 0 && (
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          )}
        </button>

        <button
          onClick={() => setShowTags(!showTags)}
          className={`
            w-9 h-16 rounded-r-lg shadow-md text-xs font-medium transition-all duration-200
            flex flex-col items-center justify-center gap-1 mt-1
            ${showTags ? 'bg-green-500 text-white translate-x-0' : 'bg-white/90 text-gray-700 -translate-x-2 hover:translate-x-0'}
          `}
        >
          <span className="transform -rotate-90 whitespace-nowrap">TAGS</span>
          {selectedTags.length > 0 && (
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          )}
        </button>
      </div>

      {/* Filter panels - your original styling */}
      {(showCategories || showTags) && (
        <div className="absolute z-20">
          {showCategories && (
            <div className="overflow-x-auto w-screen">
              <div className="flex p-2 gap-2">
                {categories.map(cat => (
                  <div
                    className="px-2 py-0 rounded cursor-pointer flex gap-1 items-center justify-center text-md bg-white"
                    style={{
                      color: selectedCategory.includes(cat) ? 'white' : getCategoryColor(cat),
                      border: `1px solid ${selectedCategory.includes(cat) ? 'white' : getCategoryColor(cat)}`,
                      background: selectedCategory.includes(cat) ? getCategoryColor(cat) : 'white',
                    }}
                    onClick={() => handleSelectionCategory(cat)}
                    key={cat}
                  >
                    {getCategoryIcon(cat)}
                    <span>{cat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showTags && (
            <div className="overflow-x-auto w-screen">
              <div className="flex flex-col flex-wrap gap-1 max-h-30 p-2">
                {uniqueTags.map(tag => (
                  <div
                    className="px-2 py-2 text-md border rounded cursor-pointer flex items-center justify-center"
                    style={{
                      backgroundColor: selectedTags.some(t => t.id === tag.id) ? tag.color : 'white',
                      color: selectedTags.some(t => t.id === tag.id) ? 'white' : tag.color
                    }}
                    onClick={() => handleSelectionTags(tag)}
                    key={tag.name}
                  >
                    {tag.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>}

  </>)
}
