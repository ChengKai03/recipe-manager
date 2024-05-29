import { Button, Divider, TextField } from "@mui/material"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const Profile = () => {
    const navigate = useNavigate() 
    const { userID } = useParams() 

    const [updater, setUpdater] = useState("")
    const [recipeCount, setRecipeCount] = useState(0)

    const editProfile = () => {
        console.log("Editing profile")
        setUpdater(
        <> 
            <Divider className="divider"/> 
    
            <div className="sub-header-container">
                <span className="sub-header">Update Username</span>
            </div>
            <div className="list-container">
                <TextField className="input-field" variant="outlined" placeholder="Enter new password" name="newUsername"/>
            </div>

            <Divider className="divider"/>

            <div className="sub-header-container">
                <span className="sub-header">Update Password</span>
            </div>
            <div className="list-container">        
                <TextField className="input-field" variant="outlined" placeholder="Enter current password" name="oldPassword"/>
                <TextField className="input-field" variant="outlined" placeholder="Enter new password" name="newPassword"/>
                <TextField className="input-field" variant="outlined" placeholder="Enter new password again" name="verifyNewPassword"/>
            </div>

            <Button variant="outlined" onClick={update}>Update</Button>
        </>

        )
    }

    const deleteProfile = () => {
        console.log("Deleting Profile")
    }

    const update = () => {
        console.log("Update Password")


        // api call update
        // set sessionStorage userID to new userId
        const path = `/profile/${sessionStorage.getItem("userid")}`
        window.location.reload()
    }

    const logout = () => {
       navigate("/logout") 
    }

    return (
    <div className="page-contents">
        <div id="profile-heading">        
            <span className="heading">Profile</span>
            <Button variant="outlined" onClick={editProfile}>Edit Profile</Button>
            <Button variant="outlined" onClick={deleteProfile}>Delete Profile</Button>
        </div>
        <div className="sub-header-container">
            <span className="sub-header">Username: {userID}</span>
        </div>
        <div className="sub-header-container">
            <span className="sub-header">Recipes created: {recipeCount}</span>
        </div>

        {updater}
        


        <Divider className="divider"/>
        <Button variant="outlined" onClick={logout}>Logout</Button>
    </div>
    )
} 
export default Profile
