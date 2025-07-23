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
            relative  h-24 rounded-r-xl shadow-xl text-xs   duration-300 
            flex flex-col items-center justify-center gap-1 backdrop-blur-md border border-l-0
            ${showCategories
              ? 'bg-cyan-500 w-10 text-white  shadow-cyan-500/30'
              : 'bg-white/80 text-gray-700 w-7 border-gray-200/50'
            }
          `}
        >
          <span className="transform -rotate-90 whitespace-nowrap text-xs tracking-wide">CATEGORIES</span>
          {selectedCategory.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
              {selectedCategory.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setShowTags(!showTags)}
          className={`
            relative  h-16 rounded-r-xl shadow-xl text-xs  duration-300  mt-2
            flex flex-col items-center justify-center gap-1 backdrop-blur-md border border-l-0
            ${showTags
              ? 'bg-emerald-500 text-white w-10 shadow-green-500/30'
              : 'bg-white/80 text-gray-700 w-7 border-gray-200/50'
            }
          `}
        >
          <span className="transform -rotate-90">TAGS</span>
          {selectedTags.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
              {selectedTags.length}
            </span>
          )}
        </button>
      </div>

      {/* Enhanced filter panels with glassmorphism */}
      {(showCategories || showTags) && (
        <div className={`absolute z-20 transition-all duration-500 ease-out ${showCategories || showTags ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}>
          {showCategories && (
            <div className="w-screen  ">
              <div className="overflow-x-auto">
                <div className="flex p-3 gap-3">
                  {categories.map(cat => (
                    <div
                      className={`
                        px-4 py-2 rounded-xl cursor-pointer flex gap-2 items-center justify-center text-sm font-medium
                        backdrop-blur-sm transition-all duration-300 ease-out transform hover:scale-105
                        shadow-lg border whitespace-nowrap
                        ${selectedCategory.includes(cat)
                          ? 'shadow-lg scale-105'
                          : 'hover:shadow-md'
                        }
                      `}
                      style={{
                        color: selectedCategory.includes(cat) ? 'white' : getCategoryColor(cat),
                        border: `2px solid ${getCategoryColor(cat)}40`,
                        background: selectedCategory.includes(cat)
                          ? `linear-gradient(135deg, ${getCategoryColor(cat)}, ${getCategoryColor(cat)}CC)`
                          : 'rgba(255,255,255,0.8)',
                        boxShadow: selectedCategory.includes(cat)
                          ? `0 8px 32px ${getCategoryColor(cat)}40`
                          : '0 4px 16px rgba(0,0,0,0.1)'
                      }}
                      onClick={() => handleSelectionCategory(cat)}
                      key={cat}
                    >
                      <span className="text-lg">{getCategoryIcon(cat)}</span>
                      <span>{cat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {showTags && (
            <div className="w-screen overflow-x-auto ">
              <div className="flex flex-col max-h-40  w-screen overflow-x-auto">
                <div className="flex flex-col flex-wrap overflow-x-auto gap-2 p-3">
                  {uniqueTags.map(tag => (
                    <div
                      className={`
                        px-3 py-2 text-sm border-2 rounded-full cursor-pointer font-medium
                        backdrop-blur-sm transition-all duration-300 ease-out transform hover:scale-105
                        shadow-md whitespace-nowrap
                        ${selectedTags.some(t => t.id === tag.id)
                          ? 'shadow-lg scale-105'
                          : 'hover:shadow-md'
                        }
                      `}
                      style={{
                        backgroundColor: selectedTags.some(t => t.id === tag.id)
                          ? tag.color
                          : 'rgba(255,255,255,0.8)',
                        color: selectedTags.some(t => t.id === tag.id) ? 'white' : tag.color,
                        borderColor: `${tag.color}60`,
                        boxShadow: selectedTags.some(t => t.id === tag.id)
                          ? `0 6px 20px ${tag.color}40`
                          : '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                      onClick={() => handleSelectionTags(tag)}
                      key={tag.name}
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>}

  </>)
}
