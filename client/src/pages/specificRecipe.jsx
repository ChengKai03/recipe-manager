import { useParams } from "react-router-dom"




const Recipe = () => {

    const { recipeID } = useParams() 
    
    return(
    <>
        <span>{recipeID}</span>
    </>
    )

}
export default Recipe
