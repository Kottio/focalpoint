'use client'
import { Spot } from "@/types/spot";
import { useEffect, useState } from "react";

interface FilterProps {
  spots: Spot[],
  setFilteteredSpots: (spots: Spot[]) => void
}


export default function Filter({ spots, setFilteteredSpots }: FilterProps) {
  const categories = [... new Set(spots.map(spot => spot.category))]
  const allTags = spots.flatMap(spot => spot.tags);
  const uniqueTags = allTags.filter((tag, index, self) =>
    index === self.findIndex(t => t.id === tag.id))


  const [selectedCategory, setSelectedCategory] = useState([])
  const [selectedTags, setSelectedTags] = useState([])


  useEffect(() => {
    const filtered = spots.filter(spot => {
      // Category filter: if no categories selected, show all categories
      const categoryMatch = selectedCategory.length === 0 || selectedCategory.includes(spot.category);

      // Tag filter: if no tags selected, show all tags
      const tagMatch = selectedTags.length === 0 || spot.tags.some(tag => selectedTags.some(selTag => selTag.id === tag.id));

      return categoryMatch && tagMatch;
    });
    setFilteteredSpots(filtered);
  }, [selectedCategory, selectedTags, spots]);



  const handleSelectionCategory = (category: string) => {
    if (selectedCategory.includes(category)) {
      const newCategories = selectedCategory.filter(cat => cat != category)
      setSelectedCategory(newCategories)
    } else {
      setSelectedCategory([...selectedCategory, category])
    }
  }

  const handleSelectionTags = (tag) => {
    if (selectedTags.some(t => t.id === tag.id)) {
      const newTags = selectedTags.filter(t => t.id !== tag.id)
      setSelectedTags(newTags)
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  return (
    <div className="flex flex-col gap-2 w-full">

      <div className="text-black flex gap-1 ">
        {categories.map(cat => {
          return <div
            className={`border-1 px-3 py-1 rounded hover:bg-neutral-200 hover:border-none cursor-pointer
            ${selectedCategory.includes(cat) ? 'bg-red-200' : 'bg-gray-100'}`}
            onClick={() => { handleSelectionCategory(cat) }}
            key={cat}
          >{cat}</div>
        })}
      </div >


      <div className="flex flex-wrap gap-1  ">
        {
          uniqueTags.map(tag => {
            return <div
              className={` px-3 py-1 text-xs   rounded hover:bg-neutral-200 hover:border-none cursor-pointer`}

              style={{
                backgroundColor: `${selectedTags.some(t => t.id === tag.id) ? `${tag.color}70` : `${tag.color}10`}`,
                color: `${tag.color}`
              }}

              onClick={() => { handleSelectionTags(tag) }}
              key={tag.name}
            >{tag.name}</div>
          })
        }
      </div>
    </div>


  )
}
