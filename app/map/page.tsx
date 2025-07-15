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

  return (
    <div className=" bg-white h-screen text-black">

      <div className='absolute z-10 right-10'>
        <button className=" bg-blue-500 rounded cursor-pointer  text-white p-2 m-2 hover:bg-neutral-600 hover:text-white"
          onClick={() => {
            setEditMode(!editMode)
          }}
        >Add New location</button>
      </div>




      <div className="h-full  text-white ">
        <Map

          spots={spots}
          editMode={editMode}
        />
      </div>



    </div >
  );
}