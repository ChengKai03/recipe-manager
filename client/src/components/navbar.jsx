import { useState } from "react"
import { NavLink } from "react-router-dom"

import Search from "./searchBox"

export default function Navbar({currentUser, setCurrentUser}) {
    return(
        <header id="navbar">
        <a className="brand" href="./">Recipe Manager</a>
        <nav className="nav">
            <ul className="nav-list">
                <Search id="search-field"/>
             
                <LoggedInNav name="My Recipes" link={"/my-recipes"} currentUser={currentUser}/>
                <LoggedInNav name="Add Recipe" link={"/add-recipe"} currentUser={currentUser}/>

                <NavLink className="nav-item-text" to="/">
                    <li className="nav-item" id="recipes-nav-option">
                        <span>Recipes</span>    
                    </li>
                </NavLink>
                <LoginText currentUser={currentUser}/>

            </ul> 
        </nav>
      </header>
    )

    function LoggedInNav({name, link, currentUser}){
        console.log(currentUser)
        if(!currentUser){
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

    function LoginText({currentUser}) {
        if(currentUser){
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
