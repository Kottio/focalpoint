import { Camera, CircleUserRound, Plus } from "lucide-react"

interface BottomMenuProps {
  handleStartCreation: () => void
  setTab: React.Dispatch<React.SetStateAction<'discover' | 'profile'>>
  tab: 'discover' | 'profile'
}

export function BottomMenu({ handleStartCreation, setTab, tab }: BottomMenuProps) {

  return (
    <div className="fixed z-300 bottom-0 left-0 right-0 h-20 bg-gray-900 w-full  text-gray-300">

      <div className="w-full h-full flex justify-around px-3 ">
        <div className="flex flex-col justify-center w-15 items-center gap-1 " onClick={() => setTab('discover')}>
          <Camera
            size={27}
            strokeWidth={1}
            className={`${tab === 'discover' ? 'bg-gray-800' : 'bg-gray-900'} w-12 h-10 py-1 rounded-2xl transition-colors`}
          />
          <span className="text-sm">Discover</span>
        </div>

        <div className=" flex flex-col justify-center w-15 items-center gap-1" onClick={() => setTab('profile')}>
          <CircleUserRound
            size={27}
            strokeWidth={1}
            className={`${tab === 'profile' ? 'bg-gray-800' : 'bg-gray-900'} w-12 h-10 py-1 rounded-2xl transition-colors`}
          />
          <span className="text-sm">Profile</span>
        </div>

        <div className=" flex flex-col justify-center w-15 items-center gap-1" onClick={() => {
          handleStartCreation()
          setTab('discover')
        }}>
          <Plus size={27} strokeWidth={1} className={`w - 12 h-10 py-1 rounded-2xl transition-colors`}
          />
          <span className="text-sm">New</span>
        </div>

      </div>
    </div >
  )
}