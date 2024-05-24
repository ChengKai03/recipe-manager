
import { useState } from "react"
import { AddCircleRounded } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";


export default function MyRecipes(currentUser){
    const [stepsList, setStepsList] = useState([]);
    const [ingredientList, setIngredientList] = useState([])
    const [equipmentList, setEquipmentList] = useState([])

    const addStep = (event) => {
        setStepsList(stepsList.concat(<input type="text" className="input-field" placeholder="Enter instruction" name="instructions" onChange={handleChange} key={stepsList.length}/>))
    }
    
    const addIngredient = (event) => {
        setIngredientList(ingredientList.concat(<input type="text" className="input-field" placeholder="Enter ingredient" name="ingredients" onChange={handleChange} key={ingredientList.length}/>))
    }

    const addEquipment = (event) => {
        setEquipmentList(equipmentList.concat(<input type="text" className="input-field" placeholder="Enter equipment" name="specialEquipment" onChange={handleChange} key={equipmentList.length}/>))
    }


    const [recipe, setRecipe] = useState({
        title: "",
        cookTime: 0,
        specialEquipment : [],
        ingredients : [],
        instructions : []
    })

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        console.log(name, value)

        if(name === "title" || name === "cookTime"){
            setRecipe((prev) => {return {...prev, [name]: value}}) 
        }
        else{
            const arr = recipe[name]
            setRecipe((prev) => {return {...prev, [name]: arr.concat([value])
            }})
        }

    }
    const createRecipe = (event) =>{
        event.preventDefault() 
        console.log(recipe) 
    }


    return (
    <>
        <span className="heading">Create a Recipe</span>

            <form className="list-container" onSubmit={createRecipe}>
                <div className="sub-header-container">
                    <span className="sub-header">Recipe Information</span>
                    <button id="create-recipe-button" onClick={createRecipe}>Create Recipe</button>
                </div>
                
                <TextField variant="standard" name="title" label="Title" onChange={handleChange}/>
                <TextField 
                    variant="standard" 
                    type="number" 
                    name="cookTime"
                    label="Cook Time" 
                    onChange={handleChange}
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
