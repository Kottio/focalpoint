import { getCategoryColor } from "@/utils/map-constants";
import { Spot } from "@/types/spot";


interface MapMarkerProps {
  selectedLocId: number | null,
  spot: Spot,
  onSpotSelect: (spotId: number) => void;
}

export function createMarkerElement({ selectedLocId, spot, onSpotSelect }: MapMarkerProps): HTMLDivElement {
  const isSelected = spot.id === selectedLocId;
  const markerEl = document.createElement('div');
  markerEl.className = 'custom-marker';
  markerEl.innerHTML = `
  <div >
  <img
    src="${spot.thumbnailPhoto || '/placeholder-spot.jpg'}"
    alt="${spot.title}"
    style="
      width: ${isSelected ? '45px' : '35px'};
      height: ${isSelected ? '45px' : '35px'};
      border: 3px solid ${isSelected ? '#FF6B6B' : `${getCategoryColor(spot.category)}`};
      border-radius: 50%;
      object-fit: cover;
      cursor: pointer;
    "/>
    </div>`;
  markerEl.addEventListener('click', () => {
    onSpotSelect(spot.id);
  });
  return markerEl
}





