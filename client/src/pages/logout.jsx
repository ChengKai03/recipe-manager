import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const Logout = (users) => {
    const navigate = useNavigate()
    useEffect(() => {
        users.setCurrentUser("")
        sessionStorage.setItem("userid","")
        navigate("/") 
    })


    return null

}

export default Logout
