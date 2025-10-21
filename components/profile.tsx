import { useSession, signOut } from "@/lib/auth-client"
import { useState } from 'react';
import { Bookmark, ChevronRight, MapPinHouse, Pencil, LogOut } from 'lucide-react';
import { EditProfileDrawer } from './editProfileDrawer';
import { useRouter } from 'next/navigation';


export function ProfilePage() {
  const { data: session } = useSession();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const router = useRouter();

  const handleSaveProfile = async (data: { username: string; bio: string }) => {
    const response = await fetch('/api/user/update-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update profile');
    }

    // Reload to get fresh session data
    window.location.reload();
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/auth/signin');
  };

  if (!session) {
    return <div>Not logged in</div>;
  }





  return (
    <section className=" bg-gray-700 fixed inset-0 bottom-20 z-40">
      <div className="flexflex-col  items-center ">
        <div className="bg-gray-700 h-20 w-full "
        >
        </div>

        {/* <div className="flex flex-col  items-center -mt-10    ">
        </div> */}
        <div className="bg-gray-900 rounded-t-2xl h-dvh w-full flex flex-col items-center">

          <div className="p-4 w-25 h-25 bg-[#9C27B0] flex items-center justify-center rounded-full border-7 border-gray-900 -mt-10">
            {/* <Snail size={50}></Snail> */}
            {/* <Image src={"/mainPhotos/web-01.jpg"} width={60} height={50} alt={'happyCamera'}></Image> */}
            <span className="text-4xl font-bold text-white">{session.user.email.split('')[0].toLocaleUpperCase()}</span>

          </div>
          <span className="text-white mt-2">{session.user.username || 'Anonymous Camera'}</span>
          <span className="text-gray-400 text-sm"> {session.user.email}</span>
          <ul className="w-9/10 h-100  flex flex-col gap-3 items-center py-5">

            <li
              onClick={() => setIsEditOpen(true)}
              className="w-full h-15 bg-gray-800/80 rounded-lg flex justify-between items-center px-3 cursor-pointer hover:bg-gray-800 transition"
            >
              <div className="flex items-center gap-3 text-gray-200" >
                <Pencil className="bg-gray-200 rounded-full p-1 text-gray-800 " size={35}></Pencil>
                <span>Edit Profile</span>
              </div>
              <ChevronRight className="text-white"></ChevronRight>
            </li>

            <li className="w-full h-15 bg-gray-800/80 rounded-lg flex justify-between items-center px-3">
              <div className="flex items-center gap-3 text-gray-200" >
                <Bookmark className="bg-gray-200 rounded-full p-1 text-gray-800 " size={35}></Bookmark>
                <span>Saved locations</span>
              </div>
              <ChevronRight className="text-white"></ChevronRight>
            </li>


            <li className="w-full h-17 bg-gray-800/80 rounded-lg flex justify-between items-center px-3">
              <div className="flex items-center gap-3 text-gray-200" >
                <MapPinHouse className="bg-gray-200 rounded-full p-1 text-gray-800 " size={35}></MapPinHouse>
                <span>Your Spots</span>
              </div>
              <ChevronRight className="text-white"></ChevronRight>
            </li>

            <li
              onClick={handleSignOut}
              className="w-full h-15 bg-red-900/30 rounded-lg flex justify-between items-center px-3 cursor-pointer hover:bg-red-900/40 transition"
            >
              <div className="flex items-center gap-3 text-red-400" >
                <LogOut className="bg-red-400 rounded-full p-1 text-gray-900 " size={35}></LogOut>
                <span>Sign Out</span>
              </div>
              <ChevronRight className="text-red-400"></ChevronRight>
            </li>

          </ul>

          {/* Access other user fields like username, fullName, bio, avatarUrl */}
        </div>
      </div>

      {/* Edit Profile Drawer */}
      <EditProfileDrawer
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        currentUsername={session.user.username}
        currentBio={session.user.bio}
        onSave={handleSaveProfile}
      />
    </section >
  );
}

