import { Button, Divider, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import apicalls from "../lib/apicalls.js"

const validate = require("../lib/validate.js")

const Profile = () => {
    const navigate = useNavigate() 
    const { userID } = useParams() 

    const [updater, setUpdater] = useState("")
    const [recipeCount, setRecipeCount] = useState(0)
    const [profile, setProfile] = useState({
        newUsername: "",
        oldPassword: "",
        newPassword: "",
        verifyNewPassword: ""
    })

    useEffect(() => {
        apicalls.getRecipeCount(sessionStorage.getItem("userid")).then((result) => {
            setRecipeCount(result.count)
        })
    }, recipeCount)

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        console.log(name, value)
        setProfile((prev) => {return {...prev, [name]: value}}) 
    } 

    const deleteProfile = () => {
        console.log("Deleting Profile")
    }

    const updateUsername = () => {
        // console.log("name change")
        if(profile.newUsername !== "" && (!validate.validateUsername(profile.newUsername).username)){
            alert("Invalid username")
            return
        }
        
        apicalls.updateUsername(profile.newUsername).then((res) => {
            console.log(res)
            if(res){
                sessionStorage.setItem("userid",profile.newUsername)
                navigate("/")
            } 
        })

    }

    const updatePassword = () => {
        console.log("Update Password")
        console.log(profile)

        // validate username or password

        apicalls.checkUserHash(sessionStorage.getItem("userid"), profile.oldPassword).then((checkPass) => {
            if(!checkPass){
                alert("Old password is incorrect")
                return
            }
        })


        if(profile.newPassword !== "" && !validate.verifyPassword(profile.newPassword).pass){
            alert("Invalid password")
            return
        }

        if(profile.newPassword !== "" && (profile.newPassword !== profile.verifyNewPassword)){
            alert("Passwords do not match")
            return
        }
        // api call update
        apicalls.updatePassword(profile.newPassword)
        // then set sessionStorage userID to new userId
        const path = `/profile/${sessionStorage.getItem("userid")}`
        // window.location.reload()
    }

    const logout = () => {
       navigate("/logout") 
    }

    return (
    <div className="page-contents">
        <div id="profile-heading">        
            <span className="heading">Profile</span>
            <Button variant="outlined" onClick={deleteProfile}>Delete Profile</Button>
        </div>
        <div className="sub-header-container">
            <span className="sub-header">Username: {userID}</span>
        </div>
        <div className="sub-header-container">
            <span className="sub-header">Recipes created: {recipeCount}</span>
        </div>
 
        <Divider className="divider"/> 

        <div className="sub-header-container">
            <span className="sub-header">Update Username</span>
        </div>
        <div className="list-container">
            <TextField className="input-field" variant="outlined" placeholder="Enter new username" onChange={handleChange} name="newUsername"/>
        </div>

        <Button variant="outlined" onClick={updateUsername}>Update</Button>

        <Divider className="divider"/>

        <div className="sub-header-container">
            <span className="sub-header">Update Password</span>
        </div>
        <div className="list-container">        
            <TextField type="password" className="input-field" variant="outlined" placeholder="Enter current password" name="oldPassword" onChange={handleChange}/>
            <TextField type="password" className="input-field" variant="outlined" placeholder="Enter new password" name="newPassword" onChange={handleChange}/>
            <TextField type="password" className="input-field" variant="outlined" placeholder="Enter new password again" name="verifyNewPassword" onChange={handleChange}/>
        </div>

        <Button variant="outlined" onClick={updatePassword}>Update</Button>

        
        


        <Divider className="divider"/>
        <Button variant="outlined" onClick={logout}>Logout</Button>
    </div>
    )
} 
export default Profile
