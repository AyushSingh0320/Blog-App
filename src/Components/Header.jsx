
import {Logoutbtn , Logo , Container} from './index'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';


function Header (){
    const [menuOpen, setMenuOpen] = useState(false);
    const authStatus =  useSelector((state) => state.auth.status) 
    const navigate = useNavigate()

    const navItems = [
        {
          name: 'Home',
          slug: "/",
          active: true
        }, 
        {
          name: "Login",
          slug: "/login",
          active: !authStatus,
      },
      {
          name: "Signup",
          slug: "/signup",
          active: !authStatus,
      },
      {
          name: "All Posts",
          slug: "/all-posts",
          active: authStatus,
      },
      {
          name: "Add Post",
          slug: "/add-post",
          active: authStatus,
      },
      ]





    return (
        <header className="py-3 shadow bg-gray-600">
            <Container>
            <nav className="flex flex-col sm:flex-row items-start sm:items-center relative">
                <div className="mr-4 mb-2 sm:mb-0 flex items-center w-full justify-between">
                    <Link to = "/">
                        <Logo />
                    </Link>
                    {/* Hamburger button for mobile */}
                    <button
                        className="sm:hidden inline-flex items-center p-2 text-sm text-gray-200 rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        aria-controls="mobile-menu"
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((prev) => !prev)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
                {/* Nav links */}
                <ul className={`flex-col sm:flex-row ml-auto space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto ${menuOpen ? 'flex' : 'hidden'} sm:flex bg-gray-600 sm:bg-transparent absolute sm:static left-0 top-full sm:top-auto z-50 sm:z-auto p-4 sm:p-0 rounded-b-lg sm:rounded-none shadow-lg sm:shadow-none`}
                    id="mobile-menu">
                    {navItems.map((item)=> (
                        item.active ? (
                    <li key = {item.name}>
                     <button
                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full w-full text-left sm:w-auto sm:text-center"
                     onClick = {() => { setMenuOpen(false); navigate(item.slug); }} 
                     >
                        {item.name}
                     </button>
                    </li>
                        ) : null
                    )
                    )}
                    {authStatus && (
                        <li>
                            <Logoutbtn/>
                        </li>
                    )}
                </ul>
            </nav>
            </Container>
        </header>
    )
}

export default Header;