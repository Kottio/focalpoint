'use client'
import { Drawer } from 'vaul';
import { Tag } from '@/types/spot';
import { getCategoryIcon, getCategoryColor } from '@/utils/map-constants';

interface DrawerHeaderProps {
  title: string;
  spotCount?: number; selectedCategory: string[], selectedTags: Tag[]
}

export function DrawerHeader({ title, spotCount, selectedCategory, selectedTags }: DrawerHeaderProps) {
  return (
    <>
      <div aria-hidden className="mx-auto mt-4  w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-4" />
      <div className="flex flex-col w-full px-4">
        <Drawer.Title className="text-2xl font-medium text-gray-900">{title}</Drawer.Title>

        <div className='flex justify-between'>
          {spotCount !== undefined && (
            <p className="text-sm mt-1 text-gray-600 mb-2">{spotCount} spots found</p>
          )}
          <ul className='flex gap-1' >
            {selectedCategory.length > 0 && selectedCategory.map(cat => { return <div style={{ color: getCategoryColor(cat) }} key={cat}>{getCategoryIcon(cat)}</div> })}
          </ul>
        </div>
        <ul className='flex gap-2 mb-3' >
          {selectedTags.length > 0 && selectedTags.map(tag => { return <div className='text-xs rounded-2xl px-1' style={{ color: tag.color, border: `solid 1px ${tag.color}90` }} key={tag.name}> {tag.name}</div> })}
        </ul>

      </div >
    </>
  );
}