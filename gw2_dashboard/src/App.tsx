import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './pages/home'
import { AccountProvider } from './contexts/accountContext'
import './App.css'

function App() {
  return (
    <AccountProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/account' element={<Home />} />
          <Route path='/achievments' element={<Home />} />
        </Routes>    
      </BrowserRouter>
    </AccountProvider>
  )
}

export default App
