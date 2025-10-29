'use client'
import { Drawer } from 'vaul';
import { Tag } from '@/types/spot';
// import { getCategoryIcon, getCategoryColor } from '@/utils/map-constants';
// import { ListFilterPlus } from 'lucide-react';

interface DrawerHeaderProps {
  title: string;
  spotCount?: number; selectedCategory: string[], selectedTags: Tag[],
  // setShowFilter: (version: boolean) => void
}

export function DrawerHeader({ title, spotCount, selectedTags }: DrawerHeaderProps) {
  return (
    <>
      <div aria-hidden className="mx-auto mt-4  w-12 h-1   flex-shrink-0 rounded-full bg-gray-300 mb-2" />
      <div className="flex flex-col w-full px-7 gap-1   ">
        <Drawer.Title className="text-gray-900  flex  mb-2 items-center justify-between">
          <div className='flex items-center  gap-2'>
            <div className='hidden'>{title}</div>
            {spotCount !== undefined && (
              <p className="text-sm text-gray-500 ">({spotCount}) Spots </p>
            )}

            <div className='flex items-center gap-2  overflow-x-auto'>
              {/* <ul className='flex gap-1' >
                {selectedCategory.length > 0 && selectedCategory.map(cat => { return <div className='text-white p-1 flex items-center text-sm gap-2 px-2 rounded-full' style={{ backgroundColor: getCategoryColor(cat) }} key={cat}>{getCategoryIcon(cat)}{cat}</div> })}
              </ul> */}


              <ul className='flex gap-2 ' >
                {selectedTags.length > 0 && selectedTags.map(tag => {

                  return <div className='text-xs rounded px-2' style={{ color: tag.color, border: `solid 1px ${tag.color}90` }} key={tag.name}> {tag.name}</div>
                })}
              </ul>

            </div>
          </div>


          {/* <ListFilterPlus size={30} strokeWidth={1.5} onClick={() => { setShowFilter(true) }} className='text-gray-700 hover:text-gray-900 cursor-pointer'></ListFilterPlus> */}
        </Drawer.Title>



      </div >
    </>
  );
}

