import { useState } from "react"
import axios from "axios"
import { IconButton } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { useLocation } from "react-router-dom"


export default function Search(){
  
  const [searchText, setSearchText] = useState("")

  const handleSearch = async (event) => {
    event.preventDefault()
    alert(searchText) 
    axios.get("/api").then((data) => {
      console.log(data)
    })
   
  }

  const handleChange = (event) => {
    const text = event.target.value
    setSearchText(text)  
  }
     
    let location = useLocation()
    // console.log(location)
    
    if(location.pathname === "/"){           
        return (  
            <li className="nav-search">
                <form onSubmit={handleSearch}>
                    <input className="input-field" type="text" placeholder="Search" name="searchText" onChange={handleChange}/>
                </form>
                
                <IconButton onClick={handleSearch}>
                    <SearchIcon id="search-button"/>
                </IconButton>
            </li>
      )
    }
    return null
} 
