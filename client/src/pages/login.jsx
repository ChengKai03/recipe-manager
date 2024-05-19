
import { NavLink, Route } from "react-router-dom"
import Navbar from "../components/navbar"
import Panel from '../components/panel'
import Home from '../pages/home'

export default function Login(){
  return (
    <>

      <div id="login-content">
        <Panel content={
            <>
                <span className="heading">Login</span>
                <form className="login-field">
            
                    <input className="input-field" type="text" name="username" placeholder="Username"/>
                    <input className="input-field" type="password" name="password" placeholder="Password"/>
                        

                </form>
                <a id="prompt" href="#/create-account"><span>Create an account</span></a>
               
            </>
        }/> 
      </div>
    </>
  )
}
