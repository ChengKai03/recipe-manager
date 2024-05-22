
import axios from 'axios';

// const axios = require("")

const apiCall = () => {
  axios.get('/api').then((data) => {
    //this console.log will be in our frontend console
    console.log(data)
  })
}

export default {
    apiCall
}
