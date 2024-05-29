import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import apicalls from "../lib/apicalls"



export default function Home(recipeListState) {
    

    // const [recipes, setRecipes] = useState([])
    // const [recipesList, setRecipesList] = useState([])
    // console.log(recipeListState)
    useEffect(()=> {
        apicalls.getRecipes().then((result) => {
            console.log(result)
            let newRecipeList = []
            result.forEach(recipe => {
                const recipeToPush = {title: recipe.recipeTitle, recipeID: recipe.recipeID} 
                // allRecipes.push(recipeToPush)
                newRecipeList = newRecipeList.concat(
                    <Link className="recipe-link" to={"recipes/" + recipeToPush.recipeID}>{recipeToPush.title}</Link>
                )
            });

            recipeListState.recipeListState.setRecipeList(newRecipeList)
            // console.log(allRecipes)
        },(error) => {
                console.log(error)
        })
    },[])
    return(
        <>
            <div className="page-contents">
                <span className="heading">Recipes</span>
                {recipeListState.recipeListState.recipeList}                
            </div> 
        </>
  )
}
