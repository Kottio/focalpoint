"use client";
// import useSpotDetails from "@/hooks/useSpotDetails"
import { SpotTopPhoto } from "@/components/SpotDetailPage/SpotTopPhotos";
import { SpotMainInfo } from "@/components/SpotDetailPage/spotMainInfo";
import { SpotDetailInfo } from "@/components/SpotDetailPage/SpotDetailInfo";
import { SpotPhotoList } from "@/components/SpotDetailPage/spotPhotoList";
import { SpotComments } from "@/components/SpotDetailPage/SpotComments";
import { useState } from "react";
import { FullScreenPhoto } from "@/components/SpotDetailPage/fullScreenPhoto";
import { SpotDetailsType } from "@/types/spot-details";

import { SpotDetailsAddPhoto } from "./spotDetailsAddPhoto";

interface SpotDetailsProps {
  selectedLocation: SpotDetailsType;
  setOtherProfileId: (userId: string) => void;
}

export default function SpotDetails({
  selectedLocation,
  setOtherProfileId,
}: SpotDetailsProps) {
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"photos" | "comments" | "details">(
    "details"
  );
  const [addPhoto, setAddPhoto] = useState<boolean>(false);

  if (selectedLocation) {
    return (
      <>
        {!fullScreen ? (
          <div className="flex-1  overflow-y-scroll">
            <SpotTopPhoto
              FullPhoto={selectedLocation.fullPhotos}
              setFullScreen={setFullScreen}
              setSelectedPhoto={setSelectedPhoto}
            ></SpotTopPhoto>

            <SpotMainInfo
              selectedLocation={selectedLocation}
              setAddPhoto={setAddPhoto}
              setOtherProfileId={setOtherProfileId}
            ></SpotMainInfo>

            <div className="flex items-center justify-around border-b border-gray-200">
              <button
                onClick={() => setActiveTab("photos")}
                className={`flex-1 py-3 text-sm font-medium transition relative ${
                  activeTab === "photos"
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Photos
                {activeTab === "photos" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                )}
              </button>

              <button
                onClick={() => setActiveTab("comments")}
                className={`flex-1 py-3 text-sm font-medium transition relative ${
                  activeTab === "comments"
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Comments
                {activeTab === "comments" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                )}
              </button>

              <button
                onClick={() => setActiveTab("details")}
                className={`flex-1 py-3 text-sm font-medium transition relative ${
                  activeTab === "details"
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Details
                {activeTab === "details" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
                )}
              </button>
            </div>
            {activeTab === "details" && (
              <SpotDetailInfo
                selectedLocation={selectedLocation}
              ></SpotDetailInfo>
            )}
            {activeTab === "comments" && (
              <SpotComments
                comments={selectedLocation.SpotComment}
                spotId={selectedLocation.id}
              ></SpotComments>
            )}
            {activeTab === "photos" && (
              <SpotPhotoList
                photos={selectedLocation.fullPhotos}
              ></SpotPhotoList>
            )}
          </div>
        ) : (
          <FullScreenPhoto
            FullPhoto={selectedLocation.fullPhotos}
            selectedPhoto={selectedPhoto}
            setFullScreen={setFullScreen}
          ></FullScreenPhoto>
        )}

        {addPhoto && (
          <SpotDetailsAddPhoto
            setAddPhoto={setAddPhoto}
            spotId={selectedLocation.id}
          ></SpotDetailsAddPhoto>
        )}
      </>
    );
  } else {
    return;
  }
}
