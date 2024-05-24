
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
    let success = false
    const result = await axios.get('/login', {
        params:{
            username: username,
            password: password
        }
    })
   
    console.log(result.data)
    success = result.data
    return success 
}

const createAccount = async(username, password) => {
    console.log("Creating Account")
    let success = true
    try{
        const result = await axios.post('/create-account',{username,password})
    } 
    catch(error){
        success = false
    }
   
        // .then((res) => {
    // console.log(result)
    // if(result.status === 400){
        // alert("success")
        // success = false
    // }
        // })
    return success
}


const apis = {
    apiTest,
    login,
    createAccount
}

export default apis
