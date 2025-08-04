'use client';
import { MainDrawer } from '@/components/mainDrawer';
import { useState, useContext } from 'react';
import Map from '@/components/map';
import Filter from '@/components/filter';
import SpotList from '@/components/spotList';
import SpotDetails from '@/components/spotDetails';
import { useSpots } from '@/hooks/useSpots';
import useSpotDetails from '@/hooks/useSpotDetails';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Tag } from '@/types/spot';
import { Funnel } from 'lucide-react';
import { getCategoryColor, getCategoryIcon } from '@/utils/map-constants';

export default function MapPage() {
  // UI State
  const [selectedLocId, setSelectedLocId] = useState<number | null>(null);
  const [isSelected, setIsSelected] = useState(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [mapBounds, setMapBounds] = useState({
    north: 48.9,
    south: 48.8,
    east: 2.4,
    west: 2.1
  });

  const [selectedCategory, setSelectedCategory] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])



  // Data from custom hooks
  const { spots, filteredSpots, setFilteredSpots, isLoading } = useSpots(mapBounds);
  const { selectedLocation } = useSpotDetails(selectedLocId);
  const isMobile = useIsMobile()




  // Event handlers

  const handleCloseSelection = () => {
    setSelectedLocId(null);
    setIsSelected(false);
  };

  const handleSpotSelect = (spotId: number) => {
    setSelectedLocId(spotId);
    setIsSelected(true);
  };


  return (<>


    {!isMobile &&

      <div className="bg-white h-screen text-white">
        < div className="absolute z-10 flex h-screen gap-4 text-white bg-white" >
          <div className="flex flex-col max-w-100">
            <div className={`transition-all duration-700 ease-in-out border-b-2 border-dotted flex flex-col justify-baseline gap-2 text-neutral-400 ${showFilter ? 'max-h-100 p-5' : 'overflow-hidden max-h-0 p-0'
              }`}>

              {/* <Filter spots={spots} setFilteredSpots={setFilteredSpots} /> */}

              <span>Spots({filteredSpots.length})</span>
            </div>

            <button
              className="text-neutral-500 border px-10 py-1 border-neutral-200 hover:bg-neutral-300"
              onClick={() => setShowFilter(!showFilter)}>
              Filters
            </button>

            <div className="overflow-y-auto">

              <SpotList
                filteredSpots={filteredSpots}
                selectedLocId={selectedLocId}
                handleSpotSelect={handleSpotSelect}
              />

            </div>
          </div>

          {/* Detail Panel */}
          {
            isSelected && selectedLocation && (
              <SpotDetails
                selectedLocation={selectedLocation}
                handleCloseSelection={handleCloseSelection}
              />
            )
          }
        </div >

        <Map
          spots={spots}
          filteredSpots={filteredSpots}
          selectedLocId={selectedLocId}
          onSpotSelect={handleSpotSelect}
          initialBounds={mapBounds}
          setMapBounds={setMapBounds}
        />


      </div >
    }



    {isMobile && <>

      <div className=" absolute z-20 top-2 left-2  flex items-center   ">
        {/* <Funnel className="p-2  rounded m-2 bg-white" size={45} color='black' fill='white' onClick={() => { setShowFilter(!showFilter) }}></Funnel> */}

        <div className="flex gap-2 h-10  ">
          {selectedCategory.map(cat => (
            <div
              key={cat}
              className="px-3 py-3  h-10 rounded-3xl cursor-pointer flex items-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-md"
              style={{
                color: `white`,
                background: `${getCategoryColor(cat)}`
              }}>
              {getCategoryIcon(cat)}

            </div>
          ))}
        </div>
      </div>
      {showFilter && <Filter spots={spots} setFilteredSpots={setFilteredSpots} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} selectedTags={selectedTags} setSelectedTags={setSelectedTags} setShowFilter={setShowFilter}></Filter>}





      <div className=" absolute   w-screen bottom-0">

        <MainDrawer
          filteredSpots={filteredSpots}
          selectedLocId={selectedLocId}
          handleSpotSelect={handleSpotSelect}
          handleCloseSelection={handleCloseSelection}
          selectedCategory={selectedCategory}
          selectedTags={selectedTags}
          setShowFilter={setShowFilter}
        />
      </div>

      <Map
        spots={spots}
        filteredSpots={filteredSpots}
        selectedLocId={selectedLocId}
        onSpotSelect={handleSpotSelect}
        initialBounds={mapBounds}
        setMapBounds={setMapBounds}></Map>
    </>


    }
  </>
  )
}