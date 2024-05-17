import { NavLink } from "react-router-dom"

export default function Navbar(){
    return(
        <header id="navbar">
        <a className="brand" href="./">Recipe Manager</a>
        <nav className="nav">
          <ul className="nav-list">
          // <NavLink className="nav-item-text" to="/">
          //   <li className="nav-item" id="view-nav-option">
          //     <span>View</span>
          //   </li>
          // </NavLink>
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
