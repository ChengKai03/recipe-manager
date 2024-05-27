
import axios from 'axios';


// const axios = require("")
// const bcrypt = require("bcryptjs-react")
// const saltRounds = 10

const apiTest = () => {
  axios.get('/api').then((data) => {
    //this console.log will be in our frontend console
    console.log(data)
  })
}

const login = async (username, password) => { 

    if(!username){
        alert("Username is empty")
        return false
    }
    if(!password){
        alert("Password is empty")
        return false
    }

    let success = false
    const result = await axios.get('/login', {
        params:{
            username: username,
            password: password
        }
    })
   
    console.log(result.data)
    success = result.data
    if(!success){
        alert("No such user exists")
    }
    return success 
}

const createAccount = async(username, password) => {
    console.log("Creating Account")

    if(!username){
        alert("Username is empty")
        return false
    }

    if(!password){
        alert("Password is empty")
        return false
    }


    let success = true
    try{
        await axios.post('/create-account',{username,password})
    } 
    catch(error){
        success = false
    } 
    return success
}
//takes in a recipe object
//{
//  title: string
//  ingredients: array[strings]
//  instructions: array[strings]
//  specialEquipment: array[strings]
//  cookTime: Int
//}
const createRecipe = async(recipe) => {
    console.log("Creating Recipe")

    console.log(recipe)
    if(!recipe){
        alert("Fields are empty!")
        return false
    }
    if(!recipe.title){
        alert("Title is empty!")
        return false
    }
    if(!recipe.cookTime || recipe.cookTime <= 0){
        alert("Cook time is invalid")
        return false
    }
    if(!recipe.ingredients.length){
        alert("A recipe needs at least one ingredient")
        
        return false
    }  
    if(!recipe.instructions.length){
        alert("A recipe needs at least one step")
        return false
    }




    let success = true
    try{
       await axios.post('/create-recipe', recipe) 
    }
    catch(err){
        success = false
    }
    return success
}



const apis = {
    apiTest,
    login,
    createAccount,
    createRecipe
}

export default apis
