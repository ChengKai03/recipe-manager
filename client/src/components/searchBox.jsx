import { useState } from "react"
import axios from "axios"

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

  return (  
    <>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Search" name="searchText" onChange={handleChange}/>
      </form>
      <button id="search-button" onClick={handleSearch}>Go</button>
    </>
  )
} 
