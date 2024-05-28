import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import apicalls from "../lib/apicalls"



const Recipe = () => {

    const { recipeID } = useParams()

    const [recipeTitle, setRecipeTitle] = useState("")
    const [recipeAuthor, setRecipeAuthor] = useState("")
    const [recipeCookTime, setRecipeCookTime] = useState("")
    const [recipeCategory, setRecipeCategory] = useState("")
    const [recipeIngredients, setRecipeIngredients] = useState([])
    const [recipeSteps, setRecipeSteps] = useState([])
    const [recipeTools, setRecipeTools] = useState([])

    useEffect(()=>{
        console.log(recipeID)
        apicalls.getRecipeContent(recipeID).then((result) => {
            console.log("SHOWING", result)

            setRecipeTitle(<span>{result.title}</span>)
            setRecipeAuthor(<span>Author: {result.author}</span>)
            setRecipeCookTime(<span>Cook Time: {result.cookTime}</span>)
            setRecipeCategory(<span>Category: {result.category}</span>)
            

            setRecipeIngredients(result.ingredients.map((item) => {
                return <span>{item.ingredient} : {item.amount} g</span>
            }))

            setRecipeTools(result.specialTools.map((item) => {
               return <span>{item}</span>     
            }))

            setRecipeSteps(result.instructions.map((step, stepNum) => {
                return <span>Step {stepNum+1}: {step}</span>
            }))
        }) 
        // console.log("SHOWING ", result)
    },[recipeID])

    return(
    <>
        <div className="content">
            {recipeTitle}
            {recipeAuthor}
            {recipeCookTime}
            {recipeCategory}
            <div className="list-container">
                <span className="sub-header">Ingredients</span>
                {recipeIngredients}
            </div>
            <div className="list-container">
                <span className="sub-header">Required Equipment</span>
                {recipeTools}
            </div>
            <div className="list-container">
                <span className="sub-header">Instructions</span>
                {recipeSteps}
            </div>
           

        </div>
    </>
    )

}
export default Recipe
