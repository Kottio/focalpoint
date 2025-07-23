'use client'
import { Drawer } from 'vaul';
import { useState } from 'react';
import { clsx } from 'clsx';
import { Spot } from '@/types/spot';
import { getCategoryColor, getCategoryIcon } from '@/utils/map-constants';

interface DrawerTestProps {
  filteredSpots: Spot[];
  selectedLocId: number | null;
  handleSpotSelect: (spotId: number) => void;
}

const snapPoints = ['148px', '300px', 1];

export function DrawerTest({ filteredSpots, selectedLocId, handleSpotSelect }: DrawerTestProps) {
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

  return (
    <Drawer.Root open={true} modal={false} snapPoints={snapPoints} activeSnapPoint={snap} setActiveSnapPoint={setSnap} dismissible={false}>

      <Drawer.Overlay className="fixed inset-0 bg-black/40" />
      <Drawer.Portal>
        <Drawer.Content
          data-testid="content"
          className="fixed z-100 flex flex-col bg-white border border-gray-200 border-b-none rounded-t-[10px] bottom-0 left-0 right-0 h-full max-h-[95%] mx-[-1px]"
        >
          <div aria-hidden className="mx-auto mt-4 w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-4" />

          <div
            className={clsx('flex flex-col w-full px-4 ', {
              'overflow-y-auto': snap === 1,
              'overflow-hidden': snap !== 1,
            })}
          >

            {/* Header */}
            <Drawer.Title className="text-2xl font-medium text-gray-900">Photography Spots</Drawer.Title>
            <p className="text-sm mt-1 text-gray-600 mb-2">{filteredSpots.length} spots found</p>

            {/* Peek view - horizontal cards */}
            {snap === snapPoints[0] && (<div>
            </div>
            )}


            {snap == snapPoints[1] && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {filteredSpots.slice(0, 6).map((spot) => (
                  <div
                    key={spot.id}
                    className={`flex-shrink-0  h-30 w-40 cursor-pointer transition-all duration-200 `}
                    onClick={() => handleSpotSelect(spot.id)}
                  >
                    {spot.mediumPhotos && spot.mediumPhotos[0] ? (
                      <div className="relative w-full h-full rounded">
                        <img
                          src={spot.mediumPhotos[0].url}
                          alt={spot.title}
                          className="w-full h-full object-cover rounded"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded " />

                        <div className="absolute bottom-1 left-2 right-2">
                          <p className="text-white text-xs font-medium truncate">{spot.title}</p>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="w-full h-full rounded-xl flex items-center justify-center text-white text-xl"
                        style={{ backgroundColor: getCategoryColor(spot.category) }}
                      >
                        {getCategoryIcon(spot.category)}
                      </div>
                    )}
                  </div>
                ))}
                {filteredSpots.length > 5 && (
                  <div className="flex-shrink-0 w-28 h-20 rounded-xl bg-gray-100 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-700">+{filteredSpots.length - 5}</p>
                      <p className="text-xs text-gray-500">more</p>
                    </div>
                  </div>
                )}
              </div>
            )}


            {(snap === snapPoints[2]) && (
              <div className="space-y-3">
                {filteredSpots.map((spot) => (
                  <div
                    key={spot.id}
                    className={`bg-white rounded-2xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-[1.02] ${selectedLocId === spot.id
                      ? 'ring-4 ring-blue-400/50 shadow-blue-200/50 scale-[1.02]'
                      : 'hover:shadow-xl'
                      }`}
                    onClick={() => handleSpotSelect(spot.id)}
                  >
                    {/* Image Container */}
                    <div className="relative h-32 w-full overflow-hidden rounded-t-2xl">
                      {spot.mediumPhotos && spot.mediumPhotos[0] ? (
                        <>
                          <img
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                            src={spot.mediumPhotos[0].url}
                            alt={spot.title}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                          <div
                            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg"
                            style={{ backgroundColor: getCategoryColor(spot.category) }}
                          >
                            <span className="text-sm">{getCategoryIcon(spot.category)}</span>
                          </div>

                          {selectedLocId === spot.id && (
                            <div className="absolute top-3 left-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                              📍 Selected
                            </div>
                          )}
                        </>
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center text-white text-4xl"
                          style={{ backgroundColor: getCategoryColor(spot.category) }}
                        >
                          {getCategoryIcon(spot.category)}
                        </div>
                      )}
                    </div>

                    {/* Content Container */}
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {spot.title}
                      </h3>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {spot.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag.id}
                            className="px-2 py-1 rounded-full text-xs font-medium shadow-sm"
                            style={{
                              backgroundColor: `${tag.color}20`,
                              color: tag.color,
                              border: `1px solid ${tag.color}40`
                            }}
                          >
                            {tag.name}
                          </span>
                        ))}
                        {spot.tags.length > 3 && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            +{spot.tags.length - 3} more
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            👍 {spot.upvotes || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            📸 {spot.photos?.length || 0}
                          </span>
                        </div>
                        <div className="text-xs text-gray-400">
                          {spot.user?.fullName || 'Anonymous'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}