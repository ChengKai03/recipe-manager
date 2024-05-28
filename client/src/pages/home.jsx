import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import apicalls from "../lib/apicalls"



export default function Home() {
    

    // const [recipes, setRecipes] = useState([])
    const [recipesList, setRecipesList] = useState([])

    useEffect(()=> {
        apicalls.getRecipes().then((result) => {
            console.log(result.data)
            let newRecipeList = []
            result.data.forEach(recipe => {
                const recipeToPush = {title: recipe.recipeTitle, recipeID: recipe.recipeID} 
                // allRecipes.push(recipeToPush)
                newRecipeList = newRecipeList.concat(
                    <Link to={"recipes/" + recipeToPush.recipeID}>{recipeToPush.title}</Link>
                )
            });

            setRecipesList(newRecipeList)
            // console.log(allRecipes)
        },(error) => {
                console.log(error)
        })
    },[])
    return(
        <>
            <div className="content">
                {recipesList}                
            </div> 
        </>
  )
}
