import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './pages/home'
import { AccountProvider } from './contexts/accountContext'
import './App.css'
import Header from './components/header'
import Footer from './components/footer'

function App() {
  return (
    <AccountProvider>
      <BrowserRouter>
        <Header />  
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/account' element={<Home />} />
          <Route path='/achievments' element={<Home />} />
        </Routes>
        <Footer />    
      </BrowserRouter>
    </AccountProvider>
  )
}

export default App
