import { SpotDetailsType } from '@/types/spot-details';
import { getCategoryColor, getCategoryIcon } from '@/utils/map-constants';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Heart, User } from 'lucide-react';
import Image from 'next/image';

interface SpotDetailsProps {
  selectedLocation: SpotDetailsType,
  handleCloseSelection: () => void
}

export default function SpotDetails({
  selectedLocation,
  handleCloseSelection }: SpotDetailsProps) {
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
              onClick={
                handleCloseSelection

              }
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
      </div >
    )
  } else {
    return (
      <div className='w-full h-full bg-white overflow-y-auto scrollbar-hide flex flex-col' data-vaul-no-drag>
        {/* Hero Photo Carousel - Like Google Maps */}
        <div className="relative w-full h-64 bg-gray-200 flex-shrink-0">
          {selectedLocation.fullPhotos.length > 0 ? (
            <>
              <div className="flex overflow-x-auto h-full scrollbar-hide">
                {selectedLocation.fullPhotos.map((p, index) => (
                  <div key={p.id} className="relative w-full h-full flex-shrink-0 snap-start">
                    <Image
                      src={p.originalUrl}
                      alt={p.title || selectedLocation.title}
                      fill
                      sizes="100vw"
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>
              {/* Photo counter badge */}
              <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                1/{selectedLocation.fullPhotos.length}
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500">No photos</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="p-4 space-y-4">
            {/* Title and Category */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedLocation.title}
              </h1>
              <div className="flex items-center gap-2">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: getCategoryColor(selectedLocation.category) }}
                >
                  {getCategoryIcon(selectedLocation.category)}
                </div>
                <span className="text-sm text-gray-600">{selectedLocation.category}</span>
              </div>
            </div>

            {/* Stats Row - Like Google Maps */}
            <div className="flex items-center gap-4 text-sm border-y border-gray-200 py-3">
              <div className="flex items-center gap-1.5">
                <Heart size={16} className="text-red-500" fill="currentColor" />
                <span className="text-gray-700 font-medium">{selectedLocation.upvotes}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User size={16} className="text-gray-600" />
                <span className="text-gray-700">{selectedLocation.user.fullName || 'Anonymous'}</span>
              </div>
            </div>

            {/* Tags */}
            {selectedLocation.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedLocation.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-3 py-1 rounded-full text-xs font-medium border"
                    style={{
                      backgroundColor: `${tag.color}15`,
                      borderColor: `${tag.color}40`,
                      color: tag.color
                    }}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            {selectedLocation.description && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">About</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {selectedLocation.description}
                </p>
              </div>
            )}

            {/* Photos Section - Like Google Maps gallery */}
            {selectedLocation.fullPhotos.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Photos ({selectedLocation.fullPhotos.length})
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {selectedLocation.fullPhotos.map((p) => (
                    <div
                      key={p.id}
                      className="relative aspect-square rounded-lg overflow-hidden bg-gray-200"
                    >
                      <Image
                        src={p.originalUrl}
                        alt={p.title || 'Photo'}
                        fill
                        sizes="(max-width: 768px) 33vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Extra padding at bottom */}
            <div className="h-4"></div>
          </div>
        </div>
      </div>
    )
  }
}
