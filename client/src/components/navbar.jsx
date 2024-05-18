import { NavLink } from "react-router-dom"

import Search from "./searchBox"

export default function Navbar(){
    return(
        <header id="navbar">
        <a className="brand" href="./">Recipe Manager</a>
        <nav className="nav">
          <ul className="nav-list">
          <li className="nav-search">
            <Search id="search-field"/>
          </li>
          
          <NavLink className="nav-item-text" to="/">
            <li className="nav-item" id="login-nav-option">
              <span>Login</span>
            </li>
          </NavLink>
          </ul> 
        </nav>
      </header>
    )
}
