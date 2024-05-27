import { useParams } from "react-router-dom"


const Profile = () => {
    const { userID } = useParams() 

    return (
    <span>
            {userID}
        </span>
    )
} 
export default Profile
