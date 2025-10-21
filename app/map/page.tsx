'use client';
import { MainDrawer } from '@/components/mainDrawer';
import { useState, useEffect } from 'react';
import Map from '@/components/map';
import Filter from '@/components/filter';
import SpotList from '@/components/spotList';
import SpotDetails from '@/components/spotDetails';
import { useSpots } from '@/hooks/useSpots';
import useSpotDetails from '@/hooks/useSpotDetails';
import { useIsMobile } from '@/hooks/useIsMobile';
import { Tag } from '@/types/spot';
// import { getCategoryColor, getCategoryIcon } from '@/utils/map-constants';
import { CreationDrawer } from '@/components/creationDrawer';
import { BottomMenu } from '@/components/bottomMenu';
import { ProfilePage } from '@/components/profile';
import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export default function MapPage() {
  // Auth hooks - TOUJOURS EN PREMIER
  const { data: session, isPending } = useSession();
  const router = useRouter();

  // State hooks - TOUS AVANT LES CONDITIONS
  const [selectedLocId, setSelectedLocId] = useState<number | null>(null);
  const [isSelected, setIsSelected] = useState(false);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [mapBounds, setMapBounds] = useState({
    north: 48.9,
    south: 48.8,
    east: 2.4,
    west: 2.1
  });
  const [tab, setTab] = useState<'discover' | 'profile'>('discover')
  const [selectedCategory, setSelectedCategory] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [isCreationMode, setIsCreationMode] = useState<boolean>(false);
  const [newSpotLocation, setNewSpotLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);

  // Data hooks
  const { spots, filteredSpots, setFilteredSpots, refetchSpots } = useSpots(mapBounds);
  const { selectedLocation } = useSpotDetails(selectedLocId);
  const isMobile = useIsMobile()

  // Vérifier la session avant de charger la map
  useEffect(() => {
    if (!isPending && !session) {
      router.push('/auth/signin');
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-800">
        <div className="text-white text-lg">Loading of Session...</div>
      </div>
    );
  }

  // Ne rien afficher si pas de session (va rediriger)
  if (!session) {
    return null;
  }


  // Event Selection
  const handleCloseSelection = () => {
    setSelectedLocId(null);
    setIsSelected(false);
  };

  const handleSpotSelect = (spotId: number) => {
    setSelectedLocId(spotId);
    setIsSelected(true);
  };


  // Creation mode handlers
  const handleStartCreation = () => {
    setIsCreationMode(true);
    setIsSelected(false);
    setSelectedLocId(null);
    // Set initial marker position to map center
    const centerLat = (mapBounds.north + mapBounds.south) / 2;
    const centerLng = (mapBounds.east + mapBounds.west) / 2;
    setNewSpotLocation({ lat: centerLat, lng: centerLng });
  };
  const handleCancelCreation = () => {
    setIsCreationMode(false);
    setNewSpotLocation(null);
    setShowCreateForm(false);
  };
  const handleConfirmLocation = () => {
    setShowCreateForm(true);
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
          mapBounds={mapBounds}
          setMapBounds={setMapBounds}
          isCreationMode={isCreationMode}
          newSpotLocation={newSpotLocation}
          setNewSpotLocation={setNewSpotLocation}
        />


      </div >
    }



    {isMobile && <div className='h-dvh  w-dvw  overflow-hidden inset-0'>
      {/* Creation Mode Controls */}
      {isCreationMode && <>
        < div className="absolute z-20 top-4 right-4 flex gap-2">
          <button
            onClick={handleCancelCreation}
            className='bg-red-400 text-white px-4 py-2 rounded shadow-lg hover:bg-red-600 transition'>
            Cancel
          </button>
          <button
            onClick={handleConfirmLocation}
            className='bg-emerald-600 text-white px-4 py-2 rounded shadow-lg hover:bg-emerald-700 transition'>
            Confirm
          </button>
        </div>
      </>
      }

      {/* <div className=" absolute z-20 top-2 left-2  flex items-center   "> */}
      {/* <Funnel className="p-2  rounded m-2 bg-white" size={45} color='black' fill='white' onClick={() => { setShowFilter(!showFilter) }}></Funnel> */}

      {/* <div className="flex gap-2 h-10  ">
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
        </div> */}
      {/* </div> */}


      {showFilter && <Filter spots={spots} setFilteredSpots={setFilteredSpots} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} selectedTags={selectedTags} setSelectedTags={setSelectedTags} setShowFilter={setShowFilter}></Filter>}



      <div className=" absolute   w-screen bottom-0">
        {!isCreationMode && <div className='flex flex-col'>
          {tab === 'discover' ? <MainDrawer
            filteredSpots={filteredSpots}
            selectedLocId={selectedLocId}
            handleSpotSelect={handleSpotSelect}
            handleCloseSelection={handleCloseSelection}
            selectedCategory={selectedCategory}
            selectedTags={selectedTags}
            setShowFilter={setShowFilter}
          /> : <ProfilePage />}
          <BottomMenu
            handleStartCreation={handleStartCreation}
            setTab={setTab}
            tab={tab}
          ></BottomMenu>
        </div>
        }

        {showCreateForm && isCreationMode &&
          <CreationDrawer
            location={newSpotLocation}
            closeDrawer={handleCancelCreation}
            onSpotCreated={refetchSpots}
          />
        }

      </div>

      <div className={`fixed inset-0   rounded overflow-hidden ${tab === 'profile' ? 'hidden' : 'block'}`}>
        <Map
          spots={spots}
          filteredSpots={filteredSpots}
          selectedLocId={selectedLocId}
          onSpotSelect={handleSpotSelect}
          mapBounds={mapBounds}
          setMapBounds={setMapBounds}
          isCreationMode={isCreationMode}
          newSpotLocation={newSpotLocation}
          setNewSpotLocation={setNewSpotLocation}
        />
      </div>




    </div >

    }
  </>
  )
}