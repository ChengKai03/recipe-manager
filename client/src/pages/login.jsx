
import { Button } from "@mui/material"
import { useState } from "react"
import Panel from '../components/panel'
import { useNavigate } from "react-router-dom"

// const api = require("../lib/apicalls.js")

import apicalls from "../lib/apicalls"

const Login = (users) => {
    const navigate = useNavigate()
    const [info, setInfo] = useState({
        username: "", 
        password: ""
    })
   

    const login = async (event) =>{
        const success = await apicalls.login(info.username, info.password)
        // console.log("loginjsx == ", success)
        if(success){
            users.setCurrentUser(info.username)
            // console.log(info)
            // console.log(users)
            navigate("/")
        }
    }

    
    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        // console.log(name, value)
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

export default Login
