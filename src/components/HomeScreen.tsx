
import MainScreen from './MainScreen'
import Sidebar from './Sidebar'

const HomeScreen = () => {
  return (
    <div className='max-w-[1336px] mx-auto flex  w-full overflow-y-hidden bg-white'>
      <MainScreen/>
      <Sidebar />
    </div>
  )
}

export default HomeScreen