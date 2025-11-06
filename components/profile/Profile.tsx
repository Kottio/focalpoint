"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileStats } from "./ProfileStats";
import { ProfileBio } from "./ProfileBio";
import { ProfileTabs } from "./ProfileTabs";
import { ProfilePhotosGrid } from "./ProfilePhotosGrid";
import { ProfileSpotsList } from "./ProfileSpotsList";
import { ProfileSavedSpots } from "./ProfileSavedSpots";
import { EditProfileDrawer } from "../editProfileDrawer";
import { UserData } from "@/types/userData";

interface ProfilePage {
  userData: UserData | null;
  handleSpotSelect: (id: number) => void;
  setOtherProfileId: (userId: string | null) => void;
}

export function ProfilePage({
  userData,
  handleSpotSelect,
  setOtherProfileId,
}: ProfilePage) {
  const { data: session } = useSession();

  const [activeTab, setActiveTab] = useState<"photos" | "spots" | "saved">(
    "photos"
  );
  const [isEditOpen, setIsEditOpen] = useState(false);

  if (!session) {
    return <div>Not logged in</div>;
  }
  const handleSaveProfile = async (data: { username: string; bio: string }) => {
    const response = await fetch("/api/user/update-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update profile");
    }

    // Reload to get fresh session data
    window.location.reload();
  };

  // const handleSignOut = async () => {
  //   await signOut();
  //   router.push('/auth/signin');
  // };
  // Check if viewing own profile

  const isOwnProfile = session.user.id === userData?.id;

  const handleEditClick = () => {
    setIsEditOpen(true);
  };

  const handlePhotoClick = (photoId: number) => {
    console.log("Photo clicked:", photoId);
    // TODO: Open photo viewer
  };

  const handleSpotClick = (spotId: number) => {
    console.log("Spot clicked:", spotId);
    handleSpotSelect(spotId);
  };

  return (
    <section className="bg-white fixed inset-0 bottom-20 z-40 overflow-y-auto">
      {!isOwnProfile && (
        <button
          onClick={() => {
            setOtherProfileId(null);
          }}
        >
          {" "}
          back
        </button>
      )}
      {/* Header Section */}
      <div className="px-4 pt-6 pb-4">
        <ProfileHeader
          username={userData?.username || "Anonymous"}
          avatarUrl={userData?.avatarUrl}
          isOwnProfile={isOwnProfile}
          onEditClick={handleEditClick}
        />

        <ProfileStats
          photoCount={userData?.photos.length || 0}
          spotCount={userData?.spots.length || 0}
          totalLikes={
            userData?.photos.reduce((total, photo) => {
              return total + photo.likes;
            }, 0) || 0
          }
        />

        {/* <ProfileBio
          bio={session.user.bio}
          socialLinks={mockProfile.socialLinks}
        /> */}
      </div>
      {/* Tabs */}
      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {/* Tab Content */}
      <div className="pb-4">
        {activeTab === "photos" && (
          <ProfilePhotosGrid
            photos={userData?.photos}
            onPhotoClick={handlePhotoClick}
          />
        )}

        {activeTab === "spots" && (
          <ProfileSpotsList
            spots={userData?.spots}
            onSpotClick={handleSpotClick}
          />
        )}

        {activeTab === "saved" && (
          <ProfileSavedSpots
            spots={userData?.SavedSpots}
            onSpotClick={handleSpotClick}
          />
        )}
      </div>
      <EditProfileDrawer
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        currentUsername={session?.user.username}
        currentBio={session?.user.bio}
        onSave={handleSaveProfile}
      />
    </section>
  );
}
