import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
    const [isLoggedIn, setisLoggedIn] = useState(false)
    const naviagate = useNavigate()

    const login = () => {
      
      setisLoggedIn(true)
      naviagate('/dashboard')
    }

    const logout = () => {
      setisLoggedIn(false)
      naviagate('/')
    }

  return (
    <div className='nav_bar'>
        <Link to={'/'} className="left items">MealDB</Link>
        <div className="right">
          {isLoggedIn && (<>
            <Link className='items' to={'/dashboard'}>Dashboard</Link>
            <Link className='items' to={'/meal'}>Meal</Link>
            <Link className='items' to={'/profile'}>Profile</Link>
            {/* <Link className='items' to={'/courses'}>Courses</Link> */}
            <button className='items' onClick={logout} style={{fontWeight:600, backgroundColor: "#39dc39"}}>logOut</button>
          </>)}
          {!isLoggedIn && (<>
            <Link className='items' to={'/team'}>Team</Link>
            <Link className='items' to={'/about'}>About</Link>
            <Link className='items' to={'/contact'}>Contact</Link>
            <button className='items' onClick={login} style={{fontWeight:600, backgroundColor: "#39dc39"}}>LogIn</button>
          </>)}

        </div>
    </div>
  )
}

export default Navbar