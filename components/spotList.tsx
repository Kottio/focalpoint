import { getCategoryColor, getCategoryIcon } from "@/utils/map-constants"
import { Spot } from "@/types/spot"
import { useIsMobile } from "@/hooks/useIsMobile";
import Image from "next/image";

interface SpotsListProps {
  filteredSpots: Spot[];
  selectedLocId: number | null;
  handleSpotSelect: (spotId: number) => void
}

export default function SpotList({ filteredSpots, selectedLocId, handleSpotSelect }: SpotsListProps) {
  const isMobile = useIsMobile()

  if (!isMobile) {
    return (filteredSpots.map(spot => (<div
      key={spot.id}
      className={`w-100 min-h-[140px] bg-gray-800 flex  border-b-1  transition-all duration-200 cursor-pointer hover:shadow-md  ${selectedLocId === spot.id
        ? 'border-blue-500 bg-blue-50'
        : 'border-gray-200 hover:border-gray-300'
        }`}
      onClick={() => handleSpotSelect(spot.id)}
    >
      <div className='p-4 h-full flex flex-col justify-between '>
        <div>
          <div className='flex items-center gap-2'>
            <div
              className="w-5 h-5 rounded-full flex justify-center items-center text-sm"
              style={{ backgroundColor: getCategoryColor(spot.category) }}>

              {getCategoryIcon(spot.category)}
            </div>
            <h3 className='text-lg  font-semibold text-gray-900  line-clamp-2'>
              {spot.title}
            </h3>


          </div>
          {spot.mediumPhotos && spot.mediumPhotos[0] && <>
            <div className="relative w-30 h-20 rounded overflow-hidden mt-2">
              <Image
                src={spot.mediumPhotos[0].url}
                alt={spot.title}
                fill
                sizes="120px"
                className="object-cover"
              />
            </div>
          </>}
          <div className="flex items-center mt-2 gap-2 text-black text-xs">
            {spot.tags.map((tag) => {
              return <div key={tag.id} className={` px-2 py-1 rounded  text-neutral-600`}
                style={{
                  backgroundColor: `${tag.color}20`,
                  color: `${tag.color}`
                }}

              > {tag.name} </div>

            })}
          </div>



        </div>
        {selectedLocId === spot.id && (
          <div className='text-xs text-blue-600 font-medium mt-2'>
            Selected →
          </div>
        )}
      </div>
    </div>
    )))
  } else {
    return (
      // { selectedLocId === spot.id
      //   ? 'border-blue-500 bg-blue-50'
      //   : 'border-gray-200 hover:border-gray-300'
      // }


      <div className="h-screen overflow-y-auto bg-gray-950 px-3 py-3">
        {filteredSpots.map(spot => (
          <div
            key={spot.id}
            className={`relative mb-4 rounded-xl overflow-hidden bg-gray-900 shadow-xl border-2
              transition-all duration-200 cursor-pointer hover:scale-[1.01] hover:shadow-2xl
              ${selectedLocId === spot.id ? 'ring-2 ring-blue-400 border-blue-400' : 'border-gray-800'}
            `}
            onClick={() => handleSpotSelect(spot.id)}
          >
            {/* Image principale grande */}
            {spot.mediumPhotos && spot.mediumPhotos[0] && (
              <div className="relative w-full h-56">
                <Image
                  src={spot.mediumPhotos[0].url}
                  alt={spot.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Badge catégorie */}
                <div
                  className="absolute top-3 left-3 px-3 py-1.5 rounded flex items-center gap-2 text-sm font-medium backdrop-blur-sm shadow-lg text-white"
                  style={{ backgroundColor: `${getCategoryColor(spot.category)}E6` }}
                >
                  {getCategoryIcon(spot.category)}
                  <span className="text-white">{spot.category}</span>
                </div>

                {/* Info utilisateur en haut */}
                <div className="absolute top-3 right-3 flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full px-3 py-1.5">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                    {spot.user?.fullName?.[0] || 'U'}
                  </div>
                  <span className="text-white text-sm font-medium">{spot.user?.fullName || 'Anonymous'}</span>
                </div>

                {/* Titre et infos en bas */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-bold text-white line-clamp-2 mb-2">
                    {spot.title}
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {spot.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag.id}
                        className="text-xs px-2 py-0.5 rounded-full backdrop-blur-sm"
                        style={{
                          backgroundColor: `${tag.color}40`,
                          color: 'white',
                          border: `1px solid ${tag.color}80`
                        }}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>

                  {/* Likes et photos count */}
                  <div className="flex items-center gap-4 text-white text-sm">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                      </svg>
                      <span className="font-medium">{spot.upvotes || 0}</span>
                    </div>
                    {spot.mediumPhotos && spot.mediumPhotos.length > 1 && (
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium">{spot.mediumPhotos.length}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Carousel de photos supplémentaires */}
            {spot.mediumPhotos && spot.mediumPhotos.length > 1 && (
              <div className="flex gap-2 p-3 overflow-x-auto bg-gray-800/50 backdrop-blur-sm">
                {spot.mediumPhotos.slice(1).map((photo, index) => (
                  <div
                    key={index}
                    className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0"
                  >
                    <Image
                      src={photo.url}
                      alt={`${spot.title} ${index + 2}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Indicateur de sélection */}
            {selectedLocId === spot.id && (
              <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs px-3 py-1.5 rounded-full shadow-lg font-medium">
                ✓ Sélectionné
              </div>
            )}
          </div>
        ))}
      </div>
    )

  }

}


// return (
//   <div className="flex w-screen overflow-auto gap-2 px-2"
//   >{filteredSpots.map(spot => (<div
//     key={spot.id}
//     className={`w-60 max-h-[250px]  rounded-t-xl bg-white    transition-all duration-200 cursor-pointer hover:shadow-md hover:bg-neutral-100 ${selectedLocId === spot.id
//       ? 'border-blue-500 bg-blue-50'
//       : 'border-gray-200 hover:border-gray-300'
//       }`}
//     style={{
//       border: `solid 2px ${getCategoryColor(spot.category)}`,
//       borderBottom: '0px'
//     }}
//     onClick={() => handleSpotSelect(spot.id)}
//   >
//     <div className='p-4 h-full w-full flex flex-col items-center overflow-y-auto'>

//       <div className='flex items-center gap-2'>

//         <h3 className='text-md    text-gray-900  line-clamp-2'>
//           {spot.title}
//         </h3>
//       </div>
//       <div className=" w-50 relative ">
//         {spot.mediumPhotos && spot.mediumPhotos[0] && <>
//           <img className=" w-full object-cover rounded " src={spot.mediumPhotos[0].url} alt={spot.title} />
//         </>}

//         <div className="  flex flex-wrap items-center mt-2 gap-1 text-black text-xs">
//           {spot.tags.map((tag) => {
//             return <div key={tag.id} className={`px-2 py-1 rounded  text-neutral-600`}
//               style={{
//                 backgroundColor: `${tag.color}20`,
//                 color: `${tag.color}`
//               }}

//             > {tag.name} </div>

//           })}
//         </div>
//       </div>





//     </div>
//   </div>
//   ))
//     }
//   </div >
// )
