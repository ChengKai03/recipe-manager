import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const Logout = (users) => {
    const navigate = useNavigate()
    useEffect(() => {
        users.setCurrentUser("")
        navigate("/") 
    },[users])


    return null

}

export default Logout
