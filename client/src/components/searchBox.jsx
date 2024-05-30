import { useState } from "react"
import { IconButton } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { Link, useLocation } from "react-router-dom"
import apicalls from "../lib/apicalls"

export default function Search({recipeListState}){
    console.log("search", recipeListState)
    const [searchText, setSearchText] = useState("")


    const handleSearch = async (event) => {
        event.preventDefault()
        // alert(searchText) 
        apicalls.getRecipes(searchText).then((response) => {
            console.log(response)
            // recipeListState.setRecipeList(response) 
            let searchResults = []
            response.forEach(element => {
                console.log(element)
               searchResults = searchResults.concat(<Link className="recipe-link" to={`/recipes/${element.recipeID}`}>{element.recipeTitle}</Link>) 
            })
            recipeListState.setRecipeList(searchResults)
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
