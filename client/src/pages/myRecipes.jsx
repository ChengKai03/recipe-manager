


import { Button, Divider } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import apicalls from "../lib/apicalls.js"



export default function MyRecipes(currentUser){

    // const [recipes, setRecipes] = useState([])
    const [recipeUI, setRecipeUI] = useState([])
    const [savedRecipesUI, setSavedRecipesUI] = useState([])
    const navigate = useNavigate()


    
    useEffect(() => {

        const viewRecipe = (event) => {
            console.log(event.target.name)
            navigate(`/recipes/${event.target.name}`)
        }

        const deleteRecipe = (event) => {
            apicalls.deleteRecipe(event.target.name).then((res) => {
                console.log(res)
                if(res){
                    window.location.reload()
                }
                // window.location.reload()
                return
            })
        } 

        const editRecipe = (event) => {
            navigate(`/edit-recipe/${event.target.name}`)
        }

        apicalls.getMyRecipes(sessionStorage.getItem("userid")).then((res) => {
            console.log(res)
            
            let newUI = []

            res.forEach(element => {                    
                newUI = newUI.concat(
                    <div className="sub-header-container">
                        <span className="sub-header">{element.recipeTitle}</span>
                        <Button variant="outlined" name={element.recipeID} onClick={viewRecipe}>View</Button>
                        <Button variant="outlined" name={element.recipeID} onClick={editRecipe}>Edit</Button>
                        <Button variant="outlined" name={element.recipeID} onClick={deleteRecipe}>Delete</Button>
                    </div>
                ) 
            });
            setRecipeUI(newUI)
        })

        apicalls.getSaved(sessionStorage.getItem("userid")).then((res) => {
            let newUI = []

            res.forEach(element => {
                newUI = newUI.concat(
                    <div className="sub-header-container">
                        <span className="sub-header">{element.recipeTitle}</span>
                        <Button variant="outlined" name={element.recipeID} onClick={viewRecipe}>View</Button>
                    </div>
                )
            })
            setSavedRecipesUI(newUI)
        })

    }, [navigate])

    return (
    <>
        <span className="heading">Your Recipes</span>
        {recipeUI}
        <Divider className="divider"/>
        <span className="heading">Saved Recipes</span>
        {savedRecipesUI}
    </>
    )


}
