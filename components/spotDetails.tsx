import { SpotDetailsType } from '@/types/spot-details';
import { getCategoryColor, getCategoryIcon } from '@/utils/map-constants';
import { useIsMobile } from '@/hooks/useIsMobile';
import { X } from 'lucide-react';
import Image from 'next/image';

interface SpotDetailsProps {
  selectedLocation: SpotDetailsType,
  handleCloseSelection: () => void,
  handleOpenChange: (status: boolean) => void
}

export default function SpotDetails({
  selectedLocation,
  handleCloseSelection,
  handleOpenChange }: SpotDetailsProps) {
  const isMobile = useIsMobile()
  if (!isMobile) {
    return (


      <div className='w-96 flex flex-col  bg-gray-800 text-neutral-700  shadow-lg border border-gray-200 overflow-hidden'>
        <div className='p-6'>

          <div className='flex items-start justify-between '>
            <div className='flex flex-col '>
              <h2 className='text-xl font-bold text-neutral-900 my-1'>
                {selectedLocation.title}
              </h2>



              <div> {selectedLocation.upvotes} 👍 </div>

              <div className='flex items-center gap-2 mb-4'>

                <div
                  className="w-5 h-5 rounded-full flex items-center text-white justify-center"
                  style={{ backgroundColor: getCategoryColor(selectedLocation.category) }}
                > {getCategoryIcon(selectedLocation.category)}
                </div>
                <span className='text-sm font-medium text-gray-600'>
                  {selectedLocation.category}
                </span>
              </div>

              <div>{selectedLocation.user.fullName}</div>

            </div>
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600"
              onClick={handleCloseSelection}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              hey
            </button>
          </div>


          <div>


            <div className="flex items-center  gap-2 text-black text-sm">
              {selectedLocation.tags.map((tag) => {
                return <div key={tag.id} className={` px-2 py-1 rounded `}
                  style={{
                    backgroundColor: `${tag.color}20`,
                    color: `${tag.color}`
                  }}>
                  {tag.name} </div>

              })}
            </div>
            <div>
              <span>
                {selectedLocation.description}

              </span>
            </div>
            <ul className="grid grid-cols-1 gap-4 mt-4 rounded-2xl">
              {selectedLocation.fullPhotos.map(p => (
                <li key={p.id} className="bg-gray-50 rounded-lg overflow-hidden">
                  <Image
                    src={p.originalUrl}
                    alt={p.id + ''}
                    fill
                    sizes='200px'
                    className="w-full h-48 object-cover">
                  </Image>
                  <div className="p-3">
                    <span className="font-medium">{p.title}</span>
                    <span className="text-sm text-gray-600">{p.user.fullName}</span>
                    <span className="text-sm text-gray-500">❤️ {p.likes}</span>
                  </div>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </div>
    )
  } else {
    return (<div className='w-full h-full bg-gray-800   overflow-hidden'>
      <div className='py-1 ' >
        <div className='flex items-start justify-between '>
          <div className='flex flex-col gap-4 text-white w-full'>
            <div className='flex justify-between items-center'>
              <div className='flex gap-3'>
                <h2 className='text-xl font-bold  my-1'>
                  {selectedLocation.title}
                </h2>
                <div className='flex  gap-1 items-center bg-white  px-2 rounded'>
                  <div className="w-3 h-3 rounded-full flex items-center text-white justify-center"
                    style={{ backgroundColor: getCategoryColor(selectedLocation.category) }} />
                  <span className='text-sm font-medium' style={{ color: getCategoryColor(selectedLocation.category) }}>
                    {selectedLocation.category} </span>
                </div>
              </div>
              <button onClick={() => {
                handleCloseSelection()
                handleOpenChange(false)

              }}>
                <X></X>
              </button>

            </div>



            <div className="flex items-center gap-2 rounded text-white text-sm">
              {selectedLocation.tags.map((tag) => {
                return <div key={tag.id} className={` px-2 py-1 rounded `}
                  style={{
                    backgroundColor: `${tag.color}80`,
                    color: `white`
                  }}>
                  {tag.name} </div>

              })}
            </div>



            <div className='flex  justify-between'>
              <div className='text-md text-neutral-400'> {selectedLocation.upvotes} Likes </div>
              <div>{selectedLocation.user.fullName}</div>
            </div>
          </div>
        </div>


        <div>



          <ul className="flex gap-3 overflow-x-auto w-full">
            {selectedLocation.fullPhotos.map(p => (
              <li key={p.id} className="bg-gray-100/10 relative max-h-70 rounded-lg overflow-hidden  flex-shrink-0 w-80">
                <Image
                  src={p.originalUrl}
                  alt={p.id + ''}
                  width={400}
                  height={192}
                  className="w-full z-1 max-h-70 object-cover">
                </Image>
                <div className="p-3  z-20 absolute bottom-0 w-full pt-30 bg-gradient-to-t from-black/80 to-transparent flex justify-between">
                  <div className='flex items-center justify-between'>
                    <span className="font-medium">{p.title}</span>
                    <span className="text-sm text-gray-100">{p.likes} Likes</span>
                  </div>
                  <span className="text-sm text-gray-100">{p.user.fullName}</span>

                </div>
              </li>
            ))}
          </ul>

          <div>
            <span>
              {selectedLocation.description}
            </span>
          </div>

        </div>
      </div>
    </div>)
  }
}