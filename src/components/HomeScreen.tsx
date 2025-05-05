
import MainScreen from './MainScreen'
import Sidebar from './Sidebar'

const HomeScreen = () => {
  return (
    <div className='max-w-[1336px] mx-auto flex  w-full  bg-white'>
      <MainScreen/>
      <div className='sticky top-0 overflow-hidden h-full'>
      <Sidebar />
      </div>
    </div>
  )
}

export default HomeScreen