
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './page/LandingPage'
import HomePage from './page/HomePage'
import BlogPage from './page/BlogPage'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
