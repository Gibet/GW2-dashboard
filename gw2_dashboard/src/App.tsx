import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Home from './pages/home'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/account' element={<Home />} />
        <Route path='/achievments' element={<Home />} />
      </Routes>    
    </BrowserRouter>
  )
}

export default App
