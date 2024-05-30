import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import apicalls from "../lib/apicalls.js"
import { Button, InputAdornment, TextField } from "@mui/material";



const EditRecipe = () => {
    const { recipeID } = useParams()

    const navigate = useNavigate()

    const cancel = (event) => {
        navigate("/my-recipes")
    }

    const update = (event) => {
        // apicall to update
        console.log(recipe) 
        
        // navigate("/my-recipes")
    }


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


    const [stepsList, setStepsList] = useState([]);
    const [ingredientList, setIngredientList] = useState([])
    const [equipmentList, setEquipmentList] = useState([])
    
    const [recipe, setRecipe] = useState({
        title: "",
        cookTime: 0,
        category: "" ,
        specialEquipment : [],
        ingredients : [],
        amounts: [],
        instructions : []
    })

    const addStep = (event) => {
        setStepsList(stepsList.concat(<TextField variant="outlined"type="text" className="input-field" placeholder="Enter instruction" name="instructions" onChange={handleChange} key={stepsList.length}/>))
    }
    
    const removeStep = (event) => {
        let data = [...recipe.instructions]
        data.pop()
        setStepsList(stepsList.slice(0,-1))
        setRecipe((prev) => {return {...prev, instructions:data}}) 
    }

    const addIngredient = (event) => {
        setIngredientList(ingredientList.concat(
            <div>
                <TextField variant="outlined" className="input-field" placeholder="Enter ingredient" name="ingredients" onChange={handleChange} key={ingredientList.length}/>
                <TextField 
                    variant="outlined"
                    className="input-field" 
                    placeholder="Enter amount" 
                    name="amounts" type="number" 
                    InputProps={{endAdornment:<InputAdornment position="end">grams</InputAdornment>}}
                    onChange={handleChange}
                />
            </div>
        ))
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
        setEquipmentList(equipmentList.concat(<TextField type="text" className="input-field" placeholder="Enter equipment" name="specialEquipment" onChange={handleChange} key={equipmentList.length}/>))
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

    return(
    <>
        <div className="sub-header-container">
            <span className="sub-header">Now Editing: {recipeTitle}</span>
            <Button variant="outlined" onClick={cancel}>Cancel</Button>
            <Button variant="outlined" onClick={update}>Finish</Button>
        </div>

         <form className="list-container" onSubmit={update}>
                
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


export default EditRecipe
