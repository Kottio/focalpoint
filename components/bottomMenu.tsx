import { Camera, CircleUserRound, Plus } from "lucide-react"

interface BottomMenuProps {
  handleStartCreation: () => void
  setTab: React.Dispatch<React.SetStateAction<'discover' | 'profile'>>
  tab: 'discover' | 'profile'
}

export function BottomMenu({ handleStartCreation, setTab, tab }: BottomMenuProps) {

  return (
    <div className="fixed z-300 bottom-0 left-0 right-0 h-20 bg-white border-t border-gray-200 w-full text-gray-700">

      <div className="w-full h-full flex justify-around px-3 ">
        <div className="flex flex-col justify-center w-15 items-center gap-1 cursor-pointer" onClick={() => setTab('discover')}>
          <Camera
            size={27}
            strokeWidth={1.5}
            className={`${tab === 'discover' ? 'bg-gray-200 text-gray-900' : 'bg-white text-gray-500'} w-12 h-10 py-1 rounded-2xl transition-colors`}
          />
          <span className={`text-sm ${tab === 'discover' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>Discover</span>
        </div>

        <div className="flex flex-col justify-center w-15 items-center gap-1 cursor-pointer" onClick={() => setTab('profile')}>
          <CircleUserRound
            size={27}
            strokeWidth={1.5}
            className={`${tab === 'profile' ? 'bg-gray-200 text-gray-900' : 'bg-white text-gray-500'} w-12 h-10 py-1 rounded-2xl transition-colors`}
          />
          <span className={`text-sm ${tab === 'profile' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>Profile</span>
        </div>

        <div className="flex flex-col justify-center w-15 items-center gap-1 cursor-pointer" onClick={() => {
          handleStartCreation()
          setTab('discover')
        }}>
          <Plus size={27} strokeWidth={1.5} className=" text-gray-500 w-12 h-10 py-1 rounded-2xl transition-colors hover:bg-gray-300"
          />
          <span className="text-sm text-gray-500 font-medium">New</span>
        </div>

      </div>
    </div >
  )
}