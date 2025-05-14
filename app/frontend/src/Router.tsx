import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Mobile from './pages/Mobile'

export default function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/mobile' element={<Mobile />} />
      </Routes>
    </BrowserRouter>
  )
}
