//index.js

const fs = require("fs")
const path = require("path")
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()

const bcrypt = require("bcryptjs")

app.use(cors())
app.use(express.json())

let port = process.env.port || 8080

let mysql = require("mysql");
const { configDotenv } = require('dotenv');
let pool = mysql.createPool({
  connectionLimit : 10,
  host  : 'classmysql.engr.oregonstate.edu',
  user  : process.env.sqlUsername,
  password: process.env.sqlPassword,
  database: 'cs340_chengkai'
})

if(pool){
    console.log(pool)
    console.log("connection made")
}

app.use(express.static(path.join(__dirname, '../build')))


app.get('/api', (req, res) => {
    res.send("hello from server")
})

app.get('/all-recipes', (req, res) => {
    const sql = `SELECT * FROM recipes`
})

app.get("/login", (req, res) => {  
    console.log("params ==" , req.query)
    const sql = 'SELECT * FROM Website_user WHERE userId = ? LIMIT 1'
    const sqlFormatted = mysql.format(sql, [req.query.username])
    try{
        pool.query(sqlFormatted, (err, result) => {
            console.log(result)
            if(result.length){ 
                const passCheck = bcrypt.compareSync(req.query.password, result[0].password)
                console.log(passCheck)
                if(passCheck){
                    res.send(true)
                }
                else{
                    res.send(false)
                }
                console.log(result)
            }
            else{
                res.send(false)
            }
            // res.send("hello")
        })
    }
    catch (error){
        console.log(err)
    }
    
})

app.post('/create-account', (req, res) => {
    console.log("body === ", req.body)
    const userId = req.body.username
    const password = req.body.password

    const hash = bcrypt.hashSync(password)

    const sql = `INSERT INTO Website_user (userId, password) VALUES (?,?)`
    const sqlFormatted = mysql.format(sql,[userId,hash])

    try{
        pool.query(sqlFormatted, (err, result) => {
            console.log(result)
            if(result === undefined){
                res.sendStatus(400)
            }
            else{
                res.sendStatus(200)
            }
        })
    }
    catch (error){
        console.log(err)
    }

})

app.post('/create-recipe', (req, res) => {
    console.log("body === ", req.body)

    
    // insert into recipes, ingredients, specialTools, recipe_contains, recipe_uses, recipe_steps
    
    const sqlRecipe = `INSERT INTO Recipe (recipeID, cookTime, category, recipeTitle, userID) VALUES (?,?,?,?,?)`
    const recipeID = crypto.randomUUID()
    const sqlRecipeFormatted = mysql.format(sqlRecipe, [
        recipeID,
        req.body.cookTime,
        req.body.category,
        req.body.title,
        req.body.author
    ])
    console.log(sqlRecipeFormatted)
    
    const recipePromise = new Promise((resolve) =>{
        pool.query(sqlRecipeFormatted, (err, result) => {
            console.log("recipe", result)
            resolve()
        })
    })
    

    const equipmentPromise = new Promise((resolve) => {

        req.body.specialEquipment.forEach((tool) => {
            const sqlTool = `INSERT INTO SpecialTools (toolName) VALUES (?)`
            const sqlToolFormatted = mysql.format(sqlTool, [tool])
            console.log(sqlToolFormatted)
    
            const insertEquipment = new Promise((resolve) => {
                pool.query(sqlToolFormatted, (err, result) => {
                    console.log("tools",result)
                    resolve()
                })
            })

            const insertEquipmentDependancy = new Promise((resolve) => {
                const sqlRecipeUses = `INSERT INTO Recipe_uses (recipeID, toolName) VALUES (?,?)`
                const sqlRecipeUsesFormated = mysql.format(sqlRecipeUses,[recipeID, tool])
                console.log(sqlRecipeUsesFormated)
                pool.query(sqlRecipeUsesFormated, (err, result) => {
                    console.log("uses",result)
                    resolve()
                })
            })
            insertEquipment.then(insertEquipmentDependancy)
        })
        resolve()
    })

    const ingredientPromise = new Promise((resolve) => {

        req.body.ingredients.forEach((ingredient, ingredientNum) => {
            
            const insertIngredient = new Promise((resolve) => {
                const sqlIngredient = `INSERT INTO Ingredient (ingName) VALUES (?)`
                const sqlIngredientFormatted = mysql.format(sqlIngredient, [ingredient])
                console.log(sqlIngredientFormatted)
                pool.query(sqlIngredientFormatted, (err, result) => {
                    console.log("ingredient", result)
                })
            })

            const insertIngredientDependancy = new Promise((resolve) => {
                const sqlRecipeContains = `INSERT INTO Recipe_contains (amount, recipeID, ingName) VALUES (?,?,?)`
                const sqlRecipeContainsFormatted = mysql.format(sqlRecipeContains, [req.body.amounts[ingredientNum], recipeID, ingredient])
                console.log(sqlRecipeContainsFormatted)
                
                    pool.query(sqlRecipeContainsFormatted, (err, result) => {
                        console.log("contains", result)
                        resolve()
                    })
            })
            insertIngredient.then(insertIngredientDependancy)
        });
        resolve()
    })


    const instructionPromise = new Promise((resolve) => {
        req.body.instructions.forEach((step, stepNum) => {
            const sqlStep = `INSERT INTO Recipe_steps (stepNum, instruction, recipeID) VALUES(?,?,?)`
            const sqlStepFormatted = mysql.format(sqlStep, [stepNum+1, step, recipeID])
            console.log(sqlStepFormatted)

            pool.query(sqlStepFormatted, (err, result) => {
                console.log("step",result)
            })
        })
        resolve()
    })

    
    // recipePromise.then(equipmentPromise).then(ingredientPromise).then(instructionPromise).then(() => {
    //     res.sendStatus(200)
    // })

    Promise.all([recipePromise, equipmentPromise, ingredientPromise, instructionPromise]).then(() => {
        res.sendStatus((200))
    })


    // res.sendStatus(200) 
})


app.get('/get-recipes', (req, res) => {
    console.log("Getting Recipes")
    console.log(req.query.search)

    if(req.query.search === ""){
        try {
            const sql = `SELECT * FROM Recipe`
            const recipes = pool.query(sql, (err, result) => {
                console.log(result)
                res.send(result)
            })
        } catch (error) {
           console.log(err) 
        }
    }
    else{ //query db for match
        const sql = `SELECT DISTINCT Recipe.recipeID, Recipe.recipeTitle FROM Recipe 
            LEFT JOIN Recipe_uses ON Recipe.recipeID = Recipe_uses.recipeID
            LEFT JOIN Recipe_contains ON Recipe.recipeID = Recipe_contains.recipeID 
            WHERE Recipe.category LIKE ? OR Recipe_uses.toolName LIKE ? OR Recipe_contains.ingName LIKE ? OR Recipe.recipeTitle LIKE ?`
        const sqlFormatted = mysql.format(sql, [`%${req.query.search}%`, `%${req.query.search}%`, `%${req.query.search}%`, `%${req.query.search}%`])
        console.log(sqlFormatted)
        pool.query(sqlFormatted, (err, result) => {
            if(err){
                console.log(err)
            }
            res.send(result)
        })
    }
})

app.get('/get-user-recipes', (req,res) => { 
    const sql = `SELECT * FROM Recipe WHERE userID = ?`
    const sqlFormatted = mysql.format(sql, [req.query.user])
    console.log(sqlFormatted)
    pool.query(sqlFormatted, (err, result) => {
        console.log(result)
        // console.log(err)
        res.send(result)
    })
})



app.get('/get-recipe-content' ,(req, res) => {
    console.log("Getting recipe contents")
    console.log(req.query.recipe)
    
    let recipe = {
        author: "",
        title: "",
        cookTime: "",
        category: "",
        ingredients: [],
        instructions: [],
        specialTools: []
    }

    // try {
        const recipeBase = `SELECT cookTime, category, recipeTitle, userID FROM Recipe WHERE recipeID = ?`
        const recipeBaseFormatted = mysql.format(recipeBase, [req.query.recipe])
        console.log(recipeBaseFormatted)
        const basePromise = new Promise((resolve) => {

                pool.query(recipeBaseFormatted, (err, result) => {
                console.log(result)
                const fetchedRecipeBase = result[0]
                recipe.title = fetchedRecipeBase.recipeTitle 
                recipe.category = fetchedRecipeBase.category
                recipe.author = fetchedRecipeBase.userID
                recipe.cookTime = fetchedRecipeBase.cookTime
                console.log("recipe", recipe)
                resolve()
            })

        })
    // } catch (error) {
       // console.log(err) 
    // }
    
    // try {

        const recipeIngredients = `SELECT * FROM Recipe_contains WHERE recipeID = ?`
        const recipeIngredientsFormatted = mysql.format(recipeIngredients, [req.query.recipe])
        const ingredientPromise = new Promise((resolve) =>{ 
            pool.query(recipeIngredientsFormatted, (err, result) => {
                console.log(result) 
                result.forEach(element => {
                    console.log("ing", element)
                    recipe.ingredients.push({
                        ingredient: element.ingName,
                        amount: element.amount
                    })
                })
                console.log(recipe)
                resolve()
            })
        })
    // } catch (err) {
        // console.log(err)
    // }

    const recipeSteps = `SELECT * FROM Recipe_steps WHERE recipeID = ? ORDER BY stepNum ASC`
    const recipeStepsFormatted = mysql.format(recipeSteps, [req.query.recipe])
    const stepsPromise = new Promise((resolve) => {
        pool.query(recipeStepsFormatted, (err, result) => {
            console.log(result)
            result.forEach(element => {
                recipe.instructions.push(element.instruction)
            });
            console.log(recipe)
            resolve()
         })
    }) 
   
    const recipeTools = `SELECT * FROM Recipe_uses WHERE recipeID = ?`
    const recipeToolsFormatted = mysql.format(recipeTools,[req.query.recipe])
    const toolsPromise = new Promise((resolve) => {
        pool.query(recipeToolsFormatted, (err, result) => {
            console.log(result)
            result.forEach(element => {
                recipe.specialTools.push(element.toolName);
            })
            console.log(recipe)
            resolve()
        })
    })
    

   Promise.all([basePromise,ingredientPromise, stepsPromise, toolsPromise]).then(() => {
        res.send(recipe)
    }) 

})


app.get("/get-recipe-count", (req, res) => {
    console.log("getting recipe count for", req.query.user) 
    const sql = `SELECT COUNT(recipeID) AS count FROM Recipe WHERE userID = ?`
    const sqlFormatted = mysql.format(sql, [req.query.user])
    console.log(sqlFormatted)
    try{
        pool.query(sqlFormatted, (err, result) => {
            console.log(result[0])
            res.send(result[0])
        })
    }
    catch(error){
        console.log(err)
    }

})

app.get("/check-pass", (req, res) => {
    const sql = `SELECT password FROM Website_user WHERE userID = ?`
    const sqlFormatted = mysql.format(sql, [req.query.user])
    pool.query(sqlFormatted, (err, result) => {
        console.log(result)
        const check = bcrypt.compareSync(req.query.pass, result[0].password)
        console.log(check)
        res.send(check)
    })
})

app.post("/update-username", (req, res) => {
    console.log(req.body)
    const sql = `UPDATE Website_user SET userID = ? WHERE userID = ?`
    const sqlFormatted = mysql.format(sql, [req.body.newUsername, req.body.oldUserID])
    console.log(sqlFormatted)
    pool.query(sqlFormatted, (err, result) => {
        console.log(result)
        if(result){

            res.sendStatus(200)
        }
        else{
            
            res.sendStatus(202)
        }
    })
    // res.sendStatus(200)
})

app.post("/update-password", (req, res) => {
    console.log(req)
    const sql = `UPDATE Website_user SET \`password\` = ? WHERE userID = ?`

    const hash = bcrypt.hashSync(req.body.newPassword)

    const sqlFormatted = mysql.format(sql, [hash, req.body.user])
    console.log(sqlFormatted)

    pool.query(sqlFormatted, (err, result) => {
        if(result){
            res.sendStatus(200)
        }
        else{
            res.sendStatus(202)
        }
    })


    // res.sendStatus(200)
})

app.post("/delete-account", (req, res) => {
    console.log(req)
    const sql = `DELETE FROM Website_user WHERE userID = ?`
    const sqlFormatted = mysql.format(sql, [req.body.user])

    pool.query(sqlFormatted, (err, result) => {
        if(result){
            res.sendStatus(200)
        }
        else{
            res.sendStatus(202)
        }
    })
})

app.post("/save-recipe", (req, res) => {
    console.log(req.body)
    const sql = `INSERT INTO Saves (userID, recipeID) VALUES (?, ?)`
    const sqlFormatted = mysql.format(sql, [req.body.params.user, req.body.params.recipe])
    console.log(sqlFormatted)

    pool.query(sqlFormatted, (err, result) => {
        if(err){
            console.log(err)
        }
        if(result){
            res.sendStatus(200)
        }
        else{
            res.sendStatus(202)
        }
    })

    // res.send("hello")
})

app.post("/remove-recipe", (req, res) => {
    console.log(req.body)
    const sql = `DELETE FROM Saves WHERE userID = ? AND recipeID = ?`
    const sqlFormatted = mysql.format(sql, [req.body.params.user, req.body.params.recipe])
    console.log(sqlFormatted)

    pool.query(sqlFormatted, (err, result) => {
        if(err){
            console.log(err)
        }
        if(result){
            res.sendStatus(200)
        }
        else{
            res.sendStatus(202)
        }
    })

    // res.send("hello")
})

app.get("/check-is-saved", (req,res) => {
    console.log("CHECKING IS SAVED", req.query)
    const sql = `SELECT * FROM Saves WHERE userID = ? AND recipeID = ?`
    const sqlFormatted = mysql.format(sql, [req.query.user, req.query.recipe])
    console.log(sqlFormatted)
    pool.query(sqlFormatted, (err, result) => {
        if(err){
            console.log(err)
        }
        console.log("IS SAVED?\n",result)
        if(result.length){
            res.send(true)
        }
        else{
            res.send(false)
        }
    })
    // res.send("hello")
})

app.get("/get-saved-recipes", (req, res) => {
    const sql = `SELECT Recipe.recipeID, Recipe.recipeTitle FROM Saves RIGHT JOIN Recipe ON Saves.recipeID = Recipe.recipeID WHERE Saves.userID = ?`
    const sqlFormatted = mysql.format(sql, [req.query.user])
    pool.query(sqlFormatted, (err, result) => {
        if(err){
            console.log(err)
        }
        res.send(result)
        
    })
})

app.post("/delete-recipe", (req, res) => {
    const sql = `DELETE FROM Recipe WHERE recipeID = ?`
    const sqlFormatted = mysql.format(sql, [req.body.params.recipe])
    pool.query(sqlFormatted, (err, result) => {
        if (err){
            console.log(err)
        }
        if(result){
            res.sendStatus(200)
        }
        else{
            res.sendStatus(202)
        }
    })
})

app.post("/update-recipe", (req, res) => {
    console.log("Updating recipe")
    console.log(req.body)


    const updateRecipeBase = new Promise((resolve) => {
        const sql = `UPDATE Recipe SET recipeTitle = ?, category = ?, cookTime = ? WHERE recipeID = ?`
        const sqlFormatted = mysql.format(sql, [req.body.title, req.body.category, req.body.cookTime, req.body.id])
        console.log(sqlFormatted)
        pool.query((sqlFormatted), (err, res) => {
            if(err){
                console.log(err)
            }
            if(res){
                resolve()
            }
        })
    })

    const updateRecipeIngredients = new Promise((resolve) => {
            
        const deleteRecipeIngredients = new Promise((resolve) => {
            const sql = `DELETE FROM Recipe_contains WHERE recipeID = ?`
            const sqlFormatted = mysql.format(sql, [req.body.id])
            console.log(sqlFormatted)
            pool.query((sqlFormatted), (err, result) => {
                if(err){
                    console.log(err)
                }
                if(res){
                    resolve()
                }
            })
        })
        
     
        const ingredientPromise = new Promise((resolve) => {

            req.body.ingredients.forEach((ingredient, ingredientNum) => {
                
                const insertIngredient = new Promise((resolve) => {
                    const sqlIngredient = `INSERT INTO Ingredient (ingName) VALUES (?)`
                    const sqlIngredientFormatted = mysql.format(sqlIngredient, [ingredient])
                    console.log(sqlIngredientFormatted)
                    pool.query(sqlIngredientFormatted, (err, result) => {
                        if(err){
                            console.log(err)
                        }
                        console.log("ingredient", result)
                        resolve()
                    })
                })

                const insertIngredientDependancy = new Promise((resolve) => {
                    const sqlRecipeContains = `INSERT INTO Recipe_contains (amount, recipeID, ingName) VALUES (?,?,?)`
                    const sqlRecipeContainsFormatted = mysql.format(sqlRecipeContains, [req.body.amounts[ingredientNum], req.body.id, ingredient])
                    console.log(sqlRecipeContainsFormatted)
                    
                        pool.query(sqlRecipeContainsFormatted, (err, result) => {
                            if(err){
                                console.log(err)
                            }
                            console.log("contains", result)
                            resolve()
                        })
                })
                insertIngredient.then(insertIngredientDependancy)
            });
            resolve()
        })

        deleteRecipeIngredients.then(ingredientPromise).then(() => {
            resolve()
        })
    })

    const updateRecipeSteps = new Promise((resolve) => {

        const deleteRecipeSteps = new Promise((resolve) => {
            const sql = `DELETE FROM Recipe_steps WHERE recipeID = ?`
            const sqlFormatted = mysql.format(sql, [req.body.id])
            console.log(sqlFormatted)
            pool.query(sqlFormatted, (err, result) => {
                if(err){
                    console.log(err)
                }
                resolve()
            })
        })

        const insertRecipeSteps = new Promise((resolve) => {    
            req.body.instructions.forEach((step, stepNum) => {
                const sqlStep = `INSERT INTO Recipe_steps (stepNum, instruction, recipeID) VALUES(?,?,?)`
                const sqlStepFormatted = mysql.format(sqlStep, [stepNum+1, step, req.body.id])
                console.log(sqlStepFormatted)

                pool.query(sqlStepFormatted, (err, result) => {
                    console.log("step",result)
                })
            })
            resolve()
        })
        deleteRecipeSteps.then(insertRecipeSteps).then(() => {
            resolve()
        })
    })

    const updateRecipeEquipment = new Promise((resolve) => {
        
        const deleteRecipeEquipment = new Promise((resolve) => {
            const sql = `DELETE FROM Recipe_uses WHERE recipeID = ?`
            const sqlFormatted = mysql.format(sql, [req.body.id])
            console.log(sqlFormatted)
            pool.query(sqlFormatted, (err, result) =>{
                if(err){
                    console.log(err)
                }
                resolve()
            })
        })

        
        const equipmentPromise = new Promise((resolve) => {

            req.body.specialEquipment.forEach((tool) => {
                const sqlTool = `INSERT INTO SpecialTools (toolName) VALUES (?)`
                const sqlToolFormatted = mysql.format(sqlTool, [tool])
                console.log(sqlToolFormatted)
        
                const insertEquipment = new Promise((resolve) => {
                    pool.query(sqlToolFormatted, (err, result) => {
                        console.log("tools",result)
                        resolve()
                    })
                })

                const insertEquipmentDependancy = new Promise((resolve) => {
                    const sqlRecipeUses = `INSERT INTO Recipe_uses (recipeID, toolName) VALUES (?,?)`
                    const sqlRecipeUsesFormated = mysql.format(sqlRecipeUses,[req.body.id, tool])
                    console.log(sqlRecipeUsesFormated)
                    pool.query(sqlRecipeUsesFormated, (err, result) => {
                        console.log("uses",result)
                        resolve()
                    })
                })
                insertEquipment.then(insertEquipmentDependancy)
            })
            resolve()
        })

        deleteRecipeEquipment.then(equipmentPromise).then(() => {
            resolve()
        })


    })



    updateRecipeBase.then(updateRecipeIngredients).then(updateRecipeSteps).then(() => {
        console.log("finished updating")
        res.sendStatus(200)
    })

})


//
// app.get("/*", (req, res) => {
//     const dirname = path.resolve()
//     const fp = path.join(dirname, '../client', 'build/')
//     console.log(fp)
//     res.sendFile(fp)
// })

app.listen(port, () => {
      console.log(`server listening on port ${port}`)
})
