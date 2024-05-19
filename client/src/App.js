import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home'
import Login from './pages/login'
import MyRecipes from './pages/myRecipes';
import AddRecipes from './pages/addRecipe';
import { useState } from 'react';
import Navbar from './components/navbar';
import CreateAccount from './pages/createAccount';



// axios.defaults.baseURL = 'http://localhost:8080';
// axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
// axios.defaults.headers.post['Content-Type'] = 'application/json';

// axios.baseURL = "http://localhost8080"

const apiCall = () => {
  axios.get('/api').then((data) => {
    //this console.log will be in our frontend console
    console.log(data)
  })
}
function App() {

  const [loginStatus, setLoginStatus] = useState(true)
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100&family=Roboto:wght@300;400&display=swap" rel="stylesheet"/>
      <Router>
        <Navbar loginStatus={loginStatus} setter={setLoginStatus}/>
        <Routes>
          <Route path="/" element={ <Home/> }/>
          <Route path="/login" element={ <Login/>}/>
          <Route path="/my-recipes" element={ <MyRecipes/> }/>
          <Route path="/add-recipe" element={ <AddRecipes/>}/>
          <Route path="/create-account" element={<CreateAccount/>}/>  
        </Routes>
      </Router>
    </>
    
  );
}

export default App;
