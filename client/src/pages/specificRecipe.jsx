import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import apicalls from "../lib/apicalls"
import { FavoriteBorder, Favorite } from "@mui/icons-material"


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

            setRecipeTitle(<span className="sub-header">{result.title}</span>)
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


    const [favorite, setFavorite] = useState(false)
    
    useEffect(() => {
       apicalls.checkIsSaved(sessionStorage.getItem("userid"), recipeID).then((result) => {
            setFavorite(result)
        }) 
    }, [recipeID])

    const updateFavorite = () => {
        if(!favorite){
            //set to false
            setFavorite(true)
            //apicall to add to save
            apicalls.addSaved(sessionStorage.getItem("userid"), recipeID).then((result) => {
                console.log(result)
            })
        }
        else{
            //set to true
            setFavorite(false)
            // apicall to remove from save
            apicalls.removeSaved(sessionStorage.getItem("userid"), recipeID).then((result) => {
                console.log(result)
            })
        }

        // console.log(favorite)
    }

    // const [favoriteUI, setFavoriteUI] = useState(favorite ? <Favorite onClick={updateFavorite}/> : <FavoriteBorder onClick={updateFavorite}/>)
   
    // const [favoriteUI, setFavoriteUI] = useState(<FavoriteBorder onClick={updateFavorite}/>)


    return(
    <>
        <div className="page-contents">
            <div className="sub-header-container">
                {recipeTitle}
                {favorite ? <Favorite className="like" onClick={updateFavorite}/> : <FavoriteBorder className="like" onClick={updateFavorite} />} 
            </div>
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
