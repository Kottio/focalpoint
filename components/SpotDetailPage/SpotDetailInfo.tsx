import { SpotDetailsType } from "@/types/spot-details"
import { Clock, Cloud, Smile } from "lucide-react"

interface SpotDetailInfo {
  selectedLocation: SpotDetailsType
}

export function SpotDetailInfo({ selectedLocation }: SpotDetailInfo) {
  const formatTime = (hour: number) => {
    if (hour === 0) return '12 AM'
    if (hour < 12) return `${hour} AM`
    if (hour === 12) return '12 PM'
    return `${hour - 12} PM`
  }

  const getFriendlyLabel = (indice: number) => {
    if (indice <= 1) return 'Dangerous'
    if (indice <= 2) return 'Caution Required'
    if (indice <= 3) return 'Moderate'
    if (indice <= 4) return 'Safe'
    return 'Very Safe'
  }

  return (
    <div className="w-full flex flex-col bg-white">
      {/* Description Section */}
      <div className="px-4 py-4 border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          {selectedLocation.description || "No description available for this spot."}
        </p>
      </div>

      {/* Details Grid */}
      <div className="px-4 py-4 space-y-4">


        {/* Ideal Time */}
        {selectedLocation.SpotDetails?.idealTime && selectedLocation.SpotDetails.idealTime.length > 0 && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-100">
              <Clock size={20} className="text-orange-600" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900 mb-0.5">Best Time</div>
              <div className="text-sm text-gray-600">
                {formatTime(selectedLocation.SpotDetails.idealTime[0] || 12)}
              </div>
            </div>
          </div>
        )}

        {/* Ideal Weather */}
        {selectedLocation.SpotDetails?.idealWeather && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-100">
              <Cloud size={20} className="text-cyan-600" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900 mb-0.5">Best Weather</div>
              <div className="text-sm text-gray-600">
                {selectedLocation.SpotDetails.idealWeather || "sunny"}
              </div>
            </div>
          </div>
        )}

        {/* Friendly Indice */}
        {selectedLocation.SpotDetails?.friendlyIndice !== null && selectedLocation.SpotDetails?.friendlyIndice !== undefined && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-100">
              <Smile size={20} className="text-emerald-600" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900 mb-0.5">Safety Level</div>
              <div className="flex items-center gap-2">
                <div className="text-sm text-gray-600">
                  {getFriendlyLabel(selectedLocation.SpotDetails.friendlyIndice || 3)}
                </div>
                <div className="text-xs text-gray-400">
                  ({selectedLocation.SpotDetails.friendlyIndice}/5 )
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Location Coordinates */}

      </div>
    </div>
  )
}