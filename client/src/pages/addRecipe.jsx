
import { useState } from "react"
import Navbar from "../components/navbar"
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import { AddCircleRounded } from "@mui/icons-material";


export default function MyRecipes(){
    const [stepsList, setStepsList] = useState([]);
    const [ingredientList, setIngredientList] = useState([])

    const addStep = (event) => {
        setStepsList(stepsList.concat(<input type="text" className="input-field" placeholder="Enter instruction" key={stepsList.length}/>))
    }
    
    const addIngredient = (event) => {
        setIngredientList(ingredientList.concat(<input type="text" className="input-field" placeholder="Enter ingredient" key={ingredientList.length}/>))
    }

    return (
    <>
            <div className="content">
                <span className="heading">Create a Recipe</span>
                <form className="list-container">
                    <span className="sub-header">Ingredients</span>
                    {ingredientList}
                    <AddCircleRounded className="button" onClick={addIngredient}/>
                    <span className="sub-header">Instructions</span>
                    {stepsList}
                    
                    <AddCircleRounded className="button" onClick={addStep}/>

                </form>
            </div>
    </>
    )
}
