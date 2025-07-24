import { SpotDetailsType } from '@/types/spot-details';
import { getCategoryColor, getCategoryIcon } from '@/utils/map-constants';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Divide } from 'lucide-react';
interface SpotDetailsProps {
  selectedLocation: SpotDetailsType,
  handleCloseSelection: () => void
}

export default function SpotDetails({ selectedLocation, handleCloseSelection }: SpotDetailsProps) {
  const isMobile = useIsMobile()
  if (!isMobile) {
    return (


      <div className='w-96 flex flex-col  bg-white text-neutral-700  shadow-lg border border-gray-200 overflow-hidden'>
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
            <ul className="grid grid-cols-1 gap-4 mt-4">
              {selectedLocation.fullPhotos.map(p => (
                <li key={p.id} className="bg-gray-50 rounded-lg overflow-hidden">
                  <img
                    src={p.originalUrl}
                    // alt={p.title}
                    className="w-full h-48 object-cover"
                  />
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
    return (<div className='w-full h-full bg-white   overflow-hidden'>
      <div className='py-1 ' >

        <div className='flex items-start justify-between '>
          <div className='flex flex-col gap-1 text-neutral-600 w-full'>

            <div className='flex gap-3'>
              <h2 className='text-xl font-bold  my-1'>
                {selectedLocation.title}
              </h2>
              <div className='flex  gap-1 items-center '>
                <div className="w-3 h-3 rounded-full flex items-center text-white justify-center"
                  style={{ backgroundColor: getCategoryColor(selectedLocation.category) }} />
                <span className='text-sm font-medium' style={{ color: getCategoryColor(selectedLocation.category) }}>
                  {selectedLocation.category} </span>
              </div>
            </div>
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



            <div className='flex  justify-between'>
              <div className='text-md text-neutral-400'> {selectedLocation.upvotes} Likes </div>
              <div>{selectedLocation.user.fullName}</div>
            </div>
          </div>
        </div>


        <div>



          <ul className="grid grid-cols-1 gap-4 mt-4">
            {selectedLocation.fullPhotos.map(p => (
              <li key={p.id} className="bg-gray-50 overflow-hidden">
                <img
                  src={p.originalUrl}
                  alt={p.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3 flex flex-col">
                  <div className='flex items-center justify-between'>
                    <span className="font-medium">{p.title}</span>
                    <span className="text-sm text-gray-500">{p.likes} Likes</span>
                  </div>
                  <span className="text-sm text-gray-600">{p.user.fullName}</span>

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