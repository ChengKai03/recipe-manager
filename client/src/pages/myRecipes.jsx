


import { Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import apicalls from "../lib/apicalls.js"



export default function MyRecipes(currentUser){

    const [recipes, setRecipes] = useState([])
    const [recipeUI, setRecipeUI] = useState([])

    const navigate = useNavigate()


    const viewRecipe = (event) => {
        console.log(event.target.name)
        navigate(`/recipes/${event.target.name}`)
    }
    
    useEffect(() => {
        apicalls.getRecipes(sessionStorage.getItem("userid")).then((res) => {
            console.log(res)
            
            let newUI = []

            res.forEach(element => {                    
                newUI = newUI.concat(
                    <div className="sub-header-container">
                        <span className="sub-header">{element.recipeTitle}</span>
                        <Button variant="outlined" name={element.recipeID} onClick={viewRecipe}>View</Button>
                        <Button variant="outlined">Edit</Button>
                        <Button variant="outlined">Delete</Button>
                    </div>
                ) 
            });
            setRecipeUI(newUI)
        })
    }, recipes)

    return (
    <>
        {recipeUI}
    </>
    )


}
