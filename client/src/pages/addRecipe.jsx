
import { useState } from "react"
import Navbar from "../components/navbar"
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import { AddCircleRounded } from "@mui/icons-material";
import Panel from "../components/panel";
import { InputAdornment, TextField } from "@mui/material";


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
            <span className="heading">Create a Recipe</span>
            <div className="content">

                <Panel content={
                    <form className="list-container">
                        <span className="sub-header">Recipe Information</span>
                        <TextField variant="standard" label="Title"/>
                        <TextField 
                            variant="standard" 
                            type="number" 
                            label="Cook Time" 
                            InputProps={{endAdornment:<InputAdornment position="end">Minutes</InputAdornment>}}/>

                    </form>
                }/>
                <Panel content={
                    <form className="list-container">
                        <span className="sub-header">Ingredients</span>
                        {ingredientList}
                        <AddCircleRounded className="button" onClick={addIngredient}/>
                        <span className="sub-header">Instructions</span>
                        {stepsList}
                        
                        <AddCircleRounded className="button" onClick={addStep}/>

                    </form>
                }/>
            </div>
    </>
    )
}
