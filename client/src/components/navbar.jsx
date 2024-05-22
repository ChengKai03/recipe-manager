import { useState } from "react"
import { NavLink } from "react-router-dom"

import Search from "./searchBox"

const Navbar = (userState) => {
    return(
        <header id="navbar">
        <a className="brand" href="./">Recipe Manager</a>
        <nav className="nav">
            <ul className="nav-list">
                <Search id="search-field"/>
             
                <LoggedInNav name="My Recipes" link={"/my-recipes"} currentUser={userState.currentUser}/>
                <LoggedInNav name="Add Recipe" link={"/add-recipe"} currentUser={userState.currentUser}/>

                <NavLink className="nav-item-text" to="/">
                    <li className="nav-item" id="recipes-nav-option">
                        <span>Recipes</span>    
                    </li>
                </NavLink>
                <LoginText userState={userState}/>

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

    function logout(userState) {
        userState.setCurrentUser("")
    }

    function LoginText({userState}) {
        console.log("LOGINTEXT", userState)
        if(userState.currentUser){
            return(
                <>    
                    <NavLink className="nav-item-text" to="/logout" >
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
export default Navbar
