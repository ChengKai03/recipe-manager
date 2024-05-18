import { useState } from "react"
import { NavLink } from "react-router-dom"

import Search from "./searchBox"

function LoggedInNav({name, link, isLogged,}){
  if(!isLogged){
    return null
  }
  return(
    <NavLink className="nav-item-text" to={link}>
      <li className="nav-item">
        <span>{name}</span>
      </li>
    </NavLink>
  )
}


export default function Navbar(){

    const [loginStatus, setLoginStatus] = useState(false)

    return(
        <header id="navbar">
        <a className="brand" href="./">Recipe Manager</a>
        <nav className="nav">
          <ul className="nav-list">
          <li className="nav-search">
            <Search id="search-field"/>
          </li>
         
          <LoggedInNav name="My Recipes" link={"/my-recipes"} isLogged={loginStatus}/>
          <LoggedInNav name="Add Recipe" link={"/add-recipe"} isLogged={loginStatus}/>

          <NavLink className="nav-item-text" to="/">
            <li className="nav-item" id="recipes-nav-option">
              <span>Recipes</span>
            </li>
          </NavLink>
          <NavLink className="nav-item-text" to="/login">
            <li className="nav-item" id="login-nav-option">
              <span>Login</span>
            </li>
          </NavLink>
          </ul> 
        </nav>
      </header>
    )
}
