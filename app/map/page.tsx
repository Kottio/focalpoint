'use client';

import { useEffect, useState } from 'react';

import Map from '@/components/map';

export default function MapTest() {
  const [clickedLocation, setClickedLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [editMode, setEditMode] = useState(false)
  const [spots, setSpots] = useState([])

  async function fetchInitialSpots() {
    try {
      const response = await fetch('/api/spots')
      const data = await response.json()
      setSpots(data)
    } catch (error) {
      console.error("Could not fetch initial data")
    };
  }

  useEffect(() => {
    fetchInitialSpots()
  }, [])
  3

  // const handleMapClick = (lat: number, lng: number) => {
  //   setClickedLocation({ lat, lng });
  //   console.log('Clicked at:', lat, lng);
  // };

  // Mock spots data for testing
  // const mockSpots = [
  //   {
  //     id: 1,
  //     title: "Eiffel Tower Viewpoint",
  //     latitude: 48.8584,
  //     longitude: 2.2945,
  //     category: "Urban"
  //   },
  //   {
  //     id: 2,
  //     title: "Seine River Sunset",
  //     latitude: 48.8566,
  //     longitude: 2.3522,
  //     category: "Coastal"
  //   },
  //   {
  //     id: 3,
  //     title: "test 2",
  //     latitude: 48.9566,
  //     longitude: 2.3622,
  //     category: "Coastal"
  //   },
  //   {
  //     id: 4,
  //     title: "test 2",
  //     latitude: 48.8266,
  //     longitude: 2.3622,
  //     category: "Urban"
  //   },
  //   {
  //     id: 5,
  //     title: "test 5",
  //     latitude: 48.8766,
  //     longitude: 2.3622,
  //     category: "Urban"
  //   }

  // ];

  return (
    <div className=" bg-white h-screen text-black">

      <div className='absolute z-10 right-10'>
        <button className=" bg-blue-500 rounded cursor-pointer  text-white p-2 m-2 hover:bg-neutral-600 hover:text-white"
          onClick={() => {
            setEditMode(!editMode)
          }}
        >Add New location</button>
        {/* <span className='text-white'>{String(editMode)}</span> */}
      </div>




      <div className="h-full  text-white ">
        <Map
          // onMapClick={handleMapClick}
          spots={spots}
          editMode={editMode}
        />
      </div>



    </div >
  );
}