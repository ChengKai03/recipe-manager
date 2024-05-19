
import { Button } from "@mui/material"
import { useState } from "react"
import { NavLink, Route } from "react-router-dom"
import Navbar from "../components/navbar"
import Panel from '../components/panel'
import Home from '../pages/home'

export default function Login(){
    
    const [info, setInfo] = useState({
        username: "", 
        password: ""
    })
   

    const login = (event) =>{
        console.log(info)
    }

    
    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        console.log(name, value)
        setInfo((prev) => {return {...prev, [name]: value}}) 
    }
    return (
    <>

        <div id="login-content">
            <Panel content={
            <>
                <span className="heading">Login</span>
                <form className="login-field" onSubmit={login}>
            
                    <input className="input-field" type="text" name="username" placeholder="Username" onChange={handleChange}/>
                    <input className="input-field" type="password" name="password" placeholder="Password" onChange={handleChange}/>
                        

                </form>
                <Button variant="outlined" color="primary" onClick={login}>Login</Button>
                <a id="prompt" href="#/create-account"><span>Create an account</span></a>
               
            </>
        }/> 
      </div>
    </>
  )
}
