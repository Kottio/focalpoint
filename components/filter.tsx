'use client'
import { Spot, Tag } from "@/types/spot";
import { useEffect, useState } from "react";
import { getCategoryColor, getCategoryIcon } from "@/utils/map-constants";

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
  return (
    <div className="flex flex-col  w-full text-neutral-500">
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


  )
}
