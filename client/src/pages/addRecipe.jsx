
import { useState } from "react"
import { AddCircleRounded } from "@mui/icons-material";
import { Button, InputAdornment, TextField } from "@mui/material";

import apicalls from "../lib/apicalls.js"

export default function MyRecipes(currentUser){
    const [stepsList, setStepsList] = useState([]);
    const [ingredientList, setIngredientList] = useState([])
    const [equipmentList, setEquipmentList] = useState([])
    
    const [recipe, setRecipe] = useState({
        title: "",
        cookTime: 0,
        category: "" ,
        specialEquipment : [],
        ingredients : [],
        instructions : []
    })

    const addStep = (event) => {
        setStepsList(stepsList.concat(<input type="text" className="input-field" placeholder="Enter instruction" name="instructions" onChange={handleChange} key={stepsList.length}/>))
    }
    
    const removeStep = (event) => {
        let data = [...recipe.instructions]
        data.pop()
        setStepsList(stepsList.slice(0,-1))
        setRecipe((prev) => {return {...prev, instructions:data}}) 
    }

    const addIngredient = (event) => {
        setIngredientList(ingredientList.concat(<input type="text" className="input-field" placeholder="Enter ingredient" name="ingredients" onChange={handleChange} key={ingredientList.length}/>))
    }

    const removeIngredient = (index) => {
        // const newList = ingredientList
        let data = [...recipe.ingredients]
        data.pop()
        setIngredientList(ingredientList.slice(0,-1))
        setRecipe((prev) => {return {...prev, ingredients: data}})
        // setRecipe(recipe.ingredients.slice(0,-1))
    }

    const addEquipment = (event) => {
        setEquipmentList(equipmentList.concat(<input type="text" className="input-field" placeholder="Enter equipment" name="specialEquipment" onChange={handleChange} key={equipmentList.length}/>))
    }

    const removeEquipment = (index) => {
        let data = [...recipe.specialEquipment]
        data.pop()
        setEquipmentList(equipmentList.slice(0,-1))
        setRecipe((prev) => {return {...prev, specialEquipment: data}})
    }



    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        console.log(name, value)

        if(name === "title" || name === "cookTime" || name === "category"){
            setRecipe((prev) => {return {...prev, [name]: value}}) 
        }
        else{
            let arr = recipe[name]
            // arr.push(value)
            setRecipe((prev) => {return {...prev, [name]: arr.concat(value)
            
            }})
        }

    }
    const createRecipe = (event) =>{

        console.log(ingredientList)



        event.preventDefault() 
        console.log(recipe) 
        const recipeToSend = {
            title: recipe.title,
            ingredients: recipe.ingredients.filter((ingredient) => {return ingredient !== ""}),
            instructions: recipe.instructions.filter((step) => {return step !== ""}),
            specialEquipment: recipe.specialEquipment.filter((equipment) => {return equipment !== ""}),
            cookTime: recipe.cookTime,
            author: currentUser,
            category: recipe.category
        } 
        apicalls.createRecipe(recipeToSend) 
    }


    return (
    <>
        <span className="heading">Create a Recipe</span>

            <form className="list-container" onSubmit={createRecipe}>
                <div className="sub-header-container">
                    <span className="sub-header">Recipe Information</span>
                    <Button variant="outlined" id="create-recipe-button" onClick={createRecipe}>Create Recipe</Button>
                </div>
                
                <TextField variant="standard" name="title" label="Title" onChange={handleChange}/>
                <TextField variant="standard" name="category" label="Category" onChange={handleChange}/>
                <TextField 
                    variant="standard" 
                    type="number" 
                    name="cookTime"
                    label="Cook Time" 
                    onChange={handleChange}
                    InputProps={{endAdornment:<InputAdornment position="end">Minutes</InputAdornment>}}/>

                <div className="sub-header-container">
                    <span className="sub-header">Special Equipment</span>
                    <Button variant="outlined" className="button" onClick={addEquipment}>+</Button>
                    <Button variant="outlined" className="button" onClick={removeEquipment}>-</Button>
                </div>

                {equipmentList}
                    
                <div className="sub-header-container">
                    <span className="sub-header">Ingredients</span>
                    <Button variant="outlined" className="button" onClick={addIngredient}>+</Button>  
                    <Button variant="outlined" className="button" onClick={removeIngredient}>-</Button>
                </div>

                {ingredientList}

                <div className="sub-header-container">
                    <span className="sub-header">Instructions</span>
                    <Button variant="outlined" className="button" onClick={addStep}>+</Button>
                    <Button variant="outlined" className="button" onClick={removeStep}>-</Button>
                </div>
               
                {stepsList}
            </form>
            
    </>
    )
}
