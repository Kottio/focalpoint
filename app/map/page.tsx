'use client';

import { useEffect, useState } from 'react';
import Map from '@/components/map';
import Filter from '@/components/filter';
import { Spot } from '../generated/prisma';


export default function MapPage() {
  // const [clickedLocation, setClickedLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [editMode, setEditMode] = useState(false)
  const [spots, setSpots] = useState([])
  const [filteredSpot, setFilteredSpots] = useState([])

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


  return (
    <div className=" bg-white h-screen text-white">


      <Filter spots={spots} setFilteredSpots={setFilteredSpots} ></Filter>
      {/* <span>Spots({filteredSpots.length})</span> */}

      <Map spots={spots} filteredSpots={filteredSpot} setFilteredSpots={setFilteredSpots} />





    </div >
  );
}