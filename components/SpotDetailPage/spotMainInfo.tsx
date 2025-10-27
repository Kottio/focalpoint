import { SpotDetailsType } from "@/types/spot-details"
import { Bookmark, Camera, ThumbsUp, User, Footprints } from "lucide-react"
// import { getCategoryColor, getCategoryIcon } from "@/utils/map-constants"

interface SpotMainInfo {
  selectedLocation: SpotDetailsType
}

export function SpotMainInfo({ selectedLocation }: SpotMainInfo) {
  let topComment
  if (selectedLocation.SpotComment.length > 0) {
    topComment = selectedLocation.SpotComment.sort((a, b) => (b.likes - a.likes))[0]
  }

  return (
    <div className="w-full flex flex-col bg-white">
      {/* Header Section */}
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex items-center gap-1">
          {/* <div className='flex items-center gap-2 '>
            <div
              className="w-auto h-auto rounded-full p-1 flex items-center gap-2 text-white justify-center"
              style={{ backgroundColor: getCategoryColor(selectedLocation.category) }}
            > {getCategoryIcon(selectedLocation.category)}

            </div>
          </div> */}
          <h1 className="text-xl font-semibold text-gray-900 flex-1 pr-4">
            {selectedLocation.title}
          </h1>
        </div>


        <div className="flex items-center gap-2">
          <button
            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50 transition"
            aria-label="Back"
          >
            <Footprints size={20} className="text-gray-600" />
          </button>
          <button
            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50 transition"
            aria-label="Bookmark"
          >
            <Bookmark size={18} className="text-gray-600" />
          </button>
          <button
            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50 transition"
            aria-label="Add photo"
          >
            <Camera size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex items-center gap-4 px-4 py-2 text-md text-gray-600">
        <div className="flex items-center gap-1.5">
          <Bookmark size={20} className="text-gray-500" />
          <span className="font-medium">{selectedLocation.upvotes}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ThumbsUp size={20} className="text-gray-500" />
          <span className="font-medium">{selectedLocation.upvotes}</span>
        </div>
      </div>

      {/* User Section */}
      <div className="flex items-center gap-3 px-4 py-1  border-gray-200">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 border border-gray-300">
          <User size={20} className="text-gray-600" fill="currentColor" />
        </div>
        <span className="text-sm font-medium text-gray-900 flex-1">
          {selectedLocation.user.username}
        </span>
        <button className="text-sm font-medium px-4 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
          Follow
        </button>
      </div>



      <div className="flex items-center  pt-2 px-4 gap-2 text-black text-sm">
        {selectedLocation.tags.map((tag) => {
          return <div key={tag.id} className={` px-2 py-1 rounded `}
            style={{
              backgroundColor: `${tag.color}20`,
              color: `${tag.color}`
            }}>
            {tag.name} </div>

        })}
      </div>

      {/* Top Comment Section */}
      {topComment && (
        <div className="mx-4 mt-3 mb-2 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-blue-100">
          <div className="flex items-start gap-2">

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-gray-600">
                  {topComment.user?.username || 'Anonymous'}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">{topComment.likes} likes</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {topComment.comment}
              </p>
            </div>
          </div>
        </div>
      )}





    </div >
  )
}