
import { NavLink } from "react-router-dom"

import Search from "./searchBox"

const Navbar = (recipeListState) => {
    // console.log("navbar",recipeListState)
    return(
        <header id="navbar">
        <a className="brand" href="./">Recipe Manager</a>
        <nav className="nav">
            <ul className="nav-list">
                <Search id="search-field" recipeListState={recipeListState}/>
             
                <LoggedInNav name="My Recipes" link={"/my-recipes"}/>
                <LoggedInNav name="Add Recipe" link={"/add-recipe"}/>

                <NavLink className="nav-item-text" to="/">
                    <li className="nav-item" id="recipes-nav-option">
                        <span>Recipes</span>    
                    </li>
                </NavLink>
                <LoginText/>

            </ul> 
        </nav>
      </header>
    )

    function LoggedInNav({name, link}){
        // console.log(currentUser)
        if(!sessionStorage.getItem("userid")){
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

    // function logout(userState) {
        // userState.setCurrentUser("")
    // }

    function LoginText() {
        // console.log("LOGINTEXT", userState)
        if(sessionStorage.getItem("userid")){
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
