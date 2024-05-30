
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
const createRecipe = (recipe) => {
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


    function capitalizeFirstLetter(string){
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    recipe.title = capitalizeFirstLetter(recipe.title)
    recipe.category = capitalizeFirstLetter(recipe.category)
    recipe.ingredients.forEach((element, i) => {
        recipe.ingredients[i] = capitalizeFirstLetter(element)
    });
    recipe.instructions.forEach((element, i) => {
        recipe.instructions[i] = capitalizeFirstLetter(element)
    })
    recipe.specialEquipment.forEach((element, i) => {
        recipe.specialEquipment[i] = capitalizeFirstLetter(element)
    });

    return new Promise((resolve) => {

       axios.post('/create-recipe', recipe).then((res) => {
            if(res){
                resolve(true)
            }
        })
    })
    
}

const getMyRecipes = (userid) => {
    return new Promise((resolve) => {
        axios.get('/get-user-recipes', {
            params: {
                user: userid
            }
        }).then((response) => {
                resolve(response.data)
            })
    })
}

const getRecipes = (searchQuery = "") => {
    return new Promise((resolve) => {
            axios.get('/get-recipes', {
                params: {
                    search: searchQuery
                    
                }
            }).then((response) => {
                    resolve(response.data)
                })
        })
}

const getRecipeContent = (recipeId) => {
    return new Promise((resolve) =>{
        try{
            axios.get('/get-recipe-content', {
                params: {
                    recipe: recipeId
                }
            }).then((response) =>{
                    console.log(response)
                    resolve(response.data)
                })
        }
        catch(err){
            console.log(err)
        }
    })
}

const getRecipeCount = (userID) => {
    console.log("getting recipe count")
    return new Promise((resolve) => {
        try {
            axios.get("/get-recipe-count", {
                params: {
                    user: userID
                }
            }).then((response) => {
                    resolve(response.data)
                })
        } catch (err) {
            console.log(err)
        }
    })
}

const checkUserHash = (user, password) => {
    return new Promise((resolve) => {
        axios.get("/check-pass", {
            params: {
                user: user,
                pass: password
            }
        }).then((response) => {
                // console.log(response.data)
                resolve(response.data)
            })
    })
}


//info{
//  user: string
//  oldPassword: string
//  newPassword: string 
//}
const updateUsername = (newUsername) => {
    console.log("username is getting changed")
    const oldUserID = sessionStorage.getItem("userid")
    return new Promise((resolve) => {
        axios.post("/update-username", {newUsername, oldUserID}).then((res) => {
            console.log(res)
            if(res.status !== 200){
                alert("Username is taken")
                resolve(false)
            }
            resolve(true)
        })
    })
}

const updatePassword = (newPassword) => {
    console.log("Password change")
    const user = sessionStorage.getItem("userid")
    return new Promise((resolve) => {
        axios.post("/update-password", {newPassword, user}).then((res) => {
            console.log(res)
            if(res.status !== 200){
                alert("Error updating password")
                resolve(false)
            }
            resolve(true)

        })
    })
    
}

const deleteAccount = (userID) => {
    const user = userID
    return new Promise((resolve) => {
        axios.post("/delete-account", {user}).then((res) => {
            if(res.status !== 200){
                alert("Error deleting account")
                resolve(false)
            }
            resolve(true)
        })
    })
}

const addSaved = (userID, recipeID) => {
    return new Promise((resolve) => {
        axios.post("/save-recipe", {
            params: {
                user: userID,
                recipe: recipeID
            }
        }).then((response) => {
            if(response.status !== 200){
                alert("Error saving recipe")
                resolve(false)
            }
            resolve(true)
        })
    })
}

const removeSaved = (userID, recipeID) => {
    return new Promise((resolve) => {
        axios.post("/remove-recipe", {
            params: {
                user: userID,
                recipe: recipeID
            }
        }).then((response) => {
            if(response.status !== 200){
                alert("Error removing recipe")
                resolve(false)
            }
            resolve(true)
        })
    })
}

const checkIsSaved = (userID, recipeID) => {
    // console.log("CHECKING")
    return new Promise((resolve) => {
        axios.get("/check-is-saved", {
            params: {
                user: userID,
                recipe: recipeID
            }
        }).then((response) => {
                console.log("saved?",response)
                resolve(response.data)
            })
    })
}

const getSaved = (userID) => {
    return new Promise((resolve) => {
        axios.get("/get-saved-recipes", {
            params: {
                user: userID
            }
        }).then((res) => {
                console.log(res)
                resolve(res.data)
            })
    })
}

const deleteRecipe = (recipeID) => {
    return new Promise((resolve) => {
        axios.post("/delete-recipe", {
            params: {
                recipe: recipeID
            } 
        }).then((res) => {
                if(res.status !== 200){
                    alert("Error deleting recipe")
                    resolve(false)
                }
                resolve(true)
            })
    })
}


const apis = {
    apiTest,
    login,
    createAccount,
    createRecipe,
    getRecipes,
    getMyRecipes,
    getRecipeContent,
    getRecipeCount,
    checkUserHash,
    updateUsername,
    updatePassword,
    deleteAccount,
    addSaved,
    removeSaved,
    checkIsSaved,
    getSaved,
    deleteRecipe
}

export default apis
