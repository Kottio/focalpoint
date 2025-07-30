import { getCategoryColor, getCategoryIcon } from "@/utils/map-constants"
import { Spot } from "@/types/spot"
import { useIsMobile } from "@/hooks/useIsMobile";

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
      className={`w-100 min-h-[140px] bg-white  border-b-1  transition-all duration-200 cursor-pointer hover:shadow-md hover:bg-neutral-100 ${selectedLocId === spot.id
        ? 'border-blue-500 bg-blue-50'
        : 'border-gray-200 hover:border-gray-300'
        }`}
      onClick={() => handleSpotSelect(spot.id)}
    >
      <div className='p-4 h-full flex flex-col justify-between'>
        <div>
          <div className='flex items-center gap-2'>
            <div
              className="w-5 h-5 rounded-full flex justify-center items-center text-sm"
              style={{ backgroundColor: getCategoryColor(spot.category) }}>

              {getCategoryIcon(spot.category)}
            </div>
            <h3 className='text-lg font-semibold text-gray-900  line-clamp-2'>
              {spot.title}
            </h3>


          </div>
          {spot.mediumPhotos && spot.mediumPhotos[0] && <>
            <img className=" w-30 object-cover rounded " src={spot.mediumPhotos[0].url} alt={spot.title} />
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
      <div className="h-full overflow-y-auto z-300">
        {filteredSpots.map(spot => (<div
          key={spot.id}
          className={`w-full min-h-[140px] bg-white  border-b-1  transition-all duration-200 cursor-pointer hover:shadow-md hover:bg-neutral-100 ${selectedLocId === spot.id
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-gray-300'
            }`}
          onClick={() => handleSpotSelect(spot.id)}
        >
          <div className='py-3 h-full flex flex-col justify-between'>
            <div>
              <div className='flex items-center gap-3'>
                <div
                  className="w-3 h-3 rounded-full flex justify-center items-center text-sm"
                  style={{ backgroundColor: getCategoryColor(spot.category) }} />



                <h3 className='text-lg font-semibold text-gray-900  line-clamp-2'>
                  {spot.title}
                </h3>


              </div>
              {spot.mediumPhotos && spot.mediumPhotos[0] && <>
                <img className=" w-30 object-cover rounded " src={spot.mediumPhotos[0].url} alt={spot.title} />
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
        ))
        }</div>)

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
