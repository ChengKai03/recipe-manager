import { Button } from "@mui/material";
import { useState } from "react";
import Panel from "../components/panel";
import { Link } from "react-router-dom";

const validate = require("../lib/validate.js")

export default function CreateAccount(){

    const [info, setInfo] = useState({
        username: "", 
        password: "",
        passwordVerified : ""
    })
   
    const create = (event) =>{
        console.log(info)
        const validUser = validate.validateUsername(info.username)
        const validPass = validate.verifyPassword(info.password)
        console.log(validUser, validPass)
    }
    
    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        console.log(name, value)
        setInfo((prev) => {return {...prev, [name]: value}}) 
    }
    return(
        <>
            <Panel content={
                <>
                    
                    <span className="heading">Creat an Account</span>
                    <form className="login-field">
                        <input className="input-field" type="text" placeholder="Username" name="username" onChange={handleChange}/>
                        <input className="input-field" type="password" placeholder="Password" name="password" onChange={handleChange}/>
                        <input className="input-field" type="password" placeholder="Enter password again" name="passwordVerified" onChange={handleChange}/>
                    </form>
                    <Button variant="outlined" onClick={create} component={Link}>Create</Button>
                </>
            }/>
        </>
    )
}
