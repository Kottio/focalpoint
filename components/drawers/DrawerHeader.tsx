'use client'
import { Drawer } from 'vaul';
import { Tag } from '@/types/spot';
import { getCategoryIcon, getCategoryColor } from '@/utils/map-constants';
import { Funnel } from 'lucide-react';

interface DrawerHeaderProps {
  title: string;
  spotCount?: number; selectedCategory: string[], selectedTags: Tag[],
  setShowFilter: (version: boolean) => void
}

export function DrawerHeader({ title, spotCount, selectedCategory, selectedTags, setShowFilter }: DrawerHeaderProps) {
  return (
    <>
      <div aria-hidden className="mx-auto mt-4  w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-3" />
      <div className="flex flex-col w-full px-4 gap-1 border-b-1 mb-2 ">
        <Drawer.Title className="text-2xl font-medium text-gray-900  flex  items-center justify-between">{title}

          <Funnel size={25} strokeWidth={1.5} onClick={() => { setShowFilter(true) }} ></Funnel>
        </Drawer.Title>
        <div className='flex justify-between items-start ' >
          {spotCount !== undefined && (
            <p className="text-sm mt-1 text-gray-600 ">{spotCount} spots found</p>
          )}

        </div>
        <div className='flex justify-between items-start my-2 overflow-x-auto'>
          <ul className='flex gap-2 ' >
            {selectedTags.length > 0 && selectedTags.map(tag => {

              return <div className='text-xs rounded px-2' style={{ color: tag.color, border: `solid 1px ${tag.color}90` }} key={tag.name}> {tag.name}</div>
            })}
          </ul>
          <ul className='flex gap-1' >
            {selectedCategory.length > 0 && selectedCategory.map(cat => { return <div style={{ color: getCategoryColor(cat) }} key={cat}>{getCategoryIcon(cat)}</div> })}
          </ul>
        </div>

      </div >
    </>
  );
}

