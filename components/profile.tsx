import { useSession } from "@/lib/auth-client"

import Image from "next/image";
import { Bookmark, ChevronRight } from 'lucide-react';


export function ProfilePage() {
  const { data: session } = useSession();



  if (!session) {
    return <div>Not logged in</div>;
  }

  return (
    <section className="bg-gray-900 fixed inset-0 bottom-20 z-40">
      <div className="flex flex-col  items-center ">
        <div className="bg-gray-800 h-15 w-full "
        >
        </div>
        <div className="flex flex-col  items-center -mt-10  ">
          <div className="p-4 bg-gray-100 flex items-center justify-center rounded-full border-7 border-gray-900 ">
            {/* <Snail size={50}></Snail> */}
            <Image src={"/logo/happycamera.png"} width={60} height={50} alt={'happyCamera'}></Image>

          </div>
          <span className="text-white mt-2">Anonymous Camera</span>
          <span className="text-gray-400 text-sm"> {session.user.name || session.user.email}</span>
        </div>

        <ul className="w-9/10 h-100  flex flex-col items-center py-5">
          <li className="w-full h-15 bg-gray-800/80 rounded-lg flex justify-between items-center px-3">
            <div className="flex items-center gap-3 text-gray-200" >
              <Bookmark className="bg-gray-200 rounded-full p-1 text-gray-800 " size={35}></Bookmark>
              <span>Saved Spot</span>
            </div>
            <ChevronRight className="text-white"></ChevronRight>


          </li>


        </ul>


        {/* Access other user fields like username, fullName, bio, avatarUrl */}
      </div>
    </section >
  );
}

