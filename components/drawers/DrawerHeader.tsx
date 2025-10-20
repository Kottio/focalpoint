'use client'
import { Drawer } from 'vaul';
import { Tag } from '@/types/spot';
import { getCategoryIcon, getCategoryColor } from '@/utils/map-constants';
import { ListFilterPlus } from 'lucide-react';

interface DrawerHeaderProps {
  title: string;
  spotCount?: number; selectedCategory: string[], selectedTags: Tag[],
  setShowFilter: (version: boolean) => void
}

export function DrawerHeader({ title, spotCount, selectedCategory, selectedTags, setShowFilter }: DrawerHeaderProps) {
  return (
    <>
      <div aria-hidden className="mx-auto mt-4  w-12 h-1   flex-shrink-0 rounded-full bg-gray-300 mb-2" />
      <div className="flex flex-col w-full px-7 gap-1   ">
        <Drawer.Title className="text-xl  text-white  flex  items-center justify-between">
          <div className='flex items-center gap-2'>{title}
            {spotCount !== undefined && (
              <p className="text-sm mt-1 text-gray-400 ">{spotCount} </p>
            )}
          </div>

          <ListFilterPlus size={30} strokeWidth={1.5} onClick={() => { setShowFilter(true) }} className='  text-white'></ListFilterPlus>
        </Drawer.Title>

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

