import { Spot } from '@/types/spot';
import { getCategoryColor, getCategoryIcon } from '@/utils/map-constants';

interface SpotDetailsProps {
  selectedLocation: Spot,
  handleCloseSelection: () => void
}

export default function SpotDetails({ selectedLocation, handleCloseSelection }: SpotDetailsProps) {
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

            <div> {selectedLocation.user.fullName} </div>

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


        </div>
      </div>
    </div>
  )
}
