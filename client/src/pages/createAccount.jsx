import { Button } from "@mui/material";
import { useState } from "react";
import Panel from "../components/panel";
import { Link } from "react-router-dom";


export default function CreateAccount(){

    const [info, setInfo] = useState({
        username: "", 
        password: "",
        passwordVerified : ""
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
                    <Button variant="outlined" to="/login" component={Link}>Create</Button>
                </>
            }/>
        </>
    )
}
