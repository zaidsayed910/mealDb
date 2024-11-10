import React from 'react'
import Meal from './Food_Recipe/Meal'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Team from './pages/Team'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Course_Detail from './pages/Course_Detail'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
// import IndianGov from './Home/IndianGov'

function App() {
  const money = 10000;
  return (
    <>
      {/* <Meal /> */}
      <Router>
        <Navbar />
        <Routes>
          {/* <Route path='/' element={<IndianGov money={money}/>} /n */}
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/team' element={<Team />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/courses' element={<Product />} />
          <Route path='/courses/:id' element={<Course_Detail />} />
          <Route path='/meal' element={<Meal />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
