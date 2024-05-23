
import axios from 'axios';

// const axios = require("")
const bcrypt = require("bcryptjs-react")
const saltRounds = 10

const apiTest = () => {
  axios.get('/api').then((data) => {
    //this console.log will be in our frontend console
    console.log(data)
  })
}

const login = async (username, password) => {
    console.log("API CALL",username, password)
    // const salt = bcrypt.genSaltSync(saltRounds)
    // const hash = bcrypt.hashSync(password, salt)

    // console.log(salt, hash)
    
    let sucess = false
    const result = await axios.get('/login', {
        params:{
            username: username,
            password: password
        }
    })
    // then(({data}) => {
        console.log(result.data)
        sucess = result.data

    return sucess
    // })
}



export default {
    apiTest,
    login
}
