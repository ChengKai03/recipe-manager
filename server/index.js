//index.js

const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()

const bcrypt = require("bcryptjs")

app.use(cors())
app.use(express.json())

let port = process.env.PORT || 8080

let mysql = require("mysql");
const { configDotenv } = require('dotenv');
let pool = mysql.createPool({
  connectionLimit : 10,
  host  : 'classmysql.engr.oregonstate.edu',
  user  : process.env.sqlUsername,
  password: process.env.sqlPassword,
  database: 'cs340_chengkai'
});

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

app.post('/create-recipe', async (req, res) => {
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
    
    try{
        await pool.query(sqlRecipeFormatted, (err, result) => {
            console.log("recipe", result)
        })
    }
    catch(error){
        console.log(err)
    }
    

    req.body.specialEquipment.forEach(async(tool) => {
        const sqlTool = `INSERT INTO SpecialTools (toolName) VALUES (?)`
        const sqlToolFormatted = mysql.format(sqlTool, [tool])
        console.log(sqlToolFormatted)
        try{

            await pool.query(sqlToolFormatted, (err, result) => {
                console.log("tools",result)
            })
        }
        catch(error){
            console.log(err)
        }

        const sqlRecipeUses = `INSERT INTO Recipe_uses (recipeID, toolName) VALUES (?,?)`
        const sqlRecipeUsesFormated = mysql.format(sqlRecipeUses,[recipeID, tool])
        console.log(sqlRecipeUsesFormated)
        try{
            await pool.query(sqlRecipeUsesFormated, (err, result) => {
                console.log("uses",result)
            })
        }
        catch(error){
            console.log(err)
        }

    })
    req.body.ingredients.forEach(async (ingredient, ingredientNum) => {
        const sqlIngredient = `INSERT INTO Ingredient (ingName) VALUES (?)`
        const sqlIngredientFormatted = mysql.format(sqlIngredient, [ingredient])
        console.log(sqlIngredientFormatted)

        try{
            await pool.query(sqlIngredientFormatted, (err, result) => {
                console.log("ingredient", result)
            })
        }
        catch(error){
            console.log(err)
        }

        const sqlRecipeContains = `INSERT INTO Recipe_contains (amount, recipeID, ingName) VALUES (?,?,?)`
        const sqlRecipeContainsFormatted = mysql.format(sqlRecipeContains, [req.body.amounts[ingredientNum], recipeID, ingredient])
        console.log(sqlRecipeContainsFormatted)
        
        try{
            await pool.query(sqlRecipeContainsFormatted, (err, result) => {
                console.log("contains", result)
            })
        }
        catch(error) {
            console.log(err)
        }


    }); 
    req.body.instructions.forEach(async (step, stepNum) => {
        const sqlStep = `INSERT INTO Recipe_steps (stepNum, instruction, recipeID) VALUES(?,?,?)`
        const sqlStepFormatted = mysql.format(sqlStep, [stepNum+1, step, recipeID])
        console.log(sqlStepFormatted)

        try{
            await pool.query(sqlStepFormatted, (err, result) => {
                console.log("step",result)
            })
        }
        catch(error){
            console.log(err)
        }
    })


    res.sendStatus(200) 
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
})

app.listen(port, () => {
      console.log(`server listening on port ${port}`)
})
