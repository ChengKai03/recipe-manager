
import { useState } from "react"
import { AddCircleRounded } from "@mui/icons-material";
import Panel from "../components/panel";
import { InputAdornment, TextField } from "@mui/material";


export default function MyRecipes(){
    const [stepsList, setStepsList] = useState([]);
    const [ingredientList, setIngredientList] = useState([])
    const [equipmentList, setEquipmentList] = useState([])

    const addStep = (event) => {
        setStepsList(stepsList.concat(<input type="text" className="input-field" placeholder="Enter instruction" key={stepsList.length}/>))
    }
    
    const addIngredient = (event) => {
        setIngredientList(ingredientList.concat(<input type="text" className="input-field" placeholder="Enter ingredient" key={ingredientList.length}/>))
    }

    const addEquipment = (event) => {
        setEquipmentList(equipmentList.concat(<input type="text" className="input-field" placeholder="Enter equipment" key={equipmentList.length}/>))
    }
    return (
    <>
        <span className="heading">Create a Recipe</span>

            <form className="list-container">
                <span className="sub-header">Recipe Information</span>
                <TextField variant="standard" label="Title"/>
                <TextField 
                    variant="standard" 
                    type="number" 
                    label="Cook Time" 
                    InputProps={{endAdornment:<InputAdornment position="end">Minutes</InputAdornment>}}/>

                <div className="sub-header-container">
                    <span className="sub-header">Special Equipment</span>
                    <AddCircleRounded className="button" onClick={addEquipment}/>
                </div>

                {equipmentList}
                    
                <div className="sub-header-container">
                    <span className="sub-header">Ingredients</span>
                    <AddCircleRounded className="button" onClick={addIngredient}/>
                </div>

                {ingredientList}

                <div className="sub-header-container">
                    <span className="sub-header">Instructions</span>
                    <AddCircleRounded className="button" onClick={addStep}/>
                </div>
               
                {stepsList}
            </form>
            
    </>
    )
}
