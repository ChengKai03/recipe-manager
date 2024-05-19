import { useState } from "react"
import { NavLink } from "react-router-dom"

import Search from "./searchBox"

export default function Navbar({loginStatus, setLoginStatus}) {
    return(
        <header id="navbar">
        <a className="brand" href="./">Recipe Manager</a>
        <nav className="nav">
            <ul className="nav-list">
                <Search id="search-field"/>
             
                <LoggedInNav name="My Recipes" link={"/my-recipes"} isLogged={loginStatus}/>
                <LoggedInNav name="Add Recipe" link={"/add-recipe"} isLogged={loginStatus}/>

                <NavLink className="nav-item-text" to="/">
                    <li className="nav-item" id="recipes-nav-option">
                        <span>Recipes</span>
                    </li>
                </NavLink>
                <LoginText isLogged={loginStatus}/>

            </ul> 
        </nav>
      </header>
    )

    function LoggedInNav({name, link, isLogged}){
        console.log(isLogged)
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

    function LoginText({isLogged}) {
        if(isLogged === true){
            return(
                <>    
                    <NavLink className="nav-item-text" to="/login">
                        <li className="nav-item" id="login-nav-option">
                            <span>Logout</span>
                        </li>
                    </NavLink>
                </>
            )
        }
        else{ 
            return(
                <>    
                    <NavLink className="nav-item-text" to="/login">
                    <li className="nav-item" id="login-nav-option">
                        <span>Login</span>
                    </li>
                    </NavLink>
                </>
            ) 
        }

    }
}
