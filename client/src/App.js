
import './App.css';

import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home'
import Login from './pages/login'
import MyRecipes from './pages/myRecipes';
import AddRecipes from './pages/addRecipe';
import { useState } from 'react';
import Navbar from './components/navbar';
import CreateAccount from './pages/createAccount';
import Logout from './pages/logout';



// axios.defaults.baseURL = 'http://localhost:8080';
// axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
// axios.defaults.headers.post['Content-Type'] = 'application/json';

// axios.baseURL = "http://localhost8080"

function App() {

  const [currentUser, setCurrentUser] = useState("")
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100&family=Roboto:wght@300;400&display=swap" rel="stylesheet"/>
      <Router>
        <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        <Routes>
          <Route path="/" element={ <Home/> }/>
          <Route path="/login" element={ <Login currentUser={currentUser} setCurrentUser={setCurrentUser}/>}/>
          <Route path="/my-recipes" element={ <MyRecipes currentUser={currentUser}/> }/>
          <Route path="/add-recipe" element={ <AddRecipes currentUser={currentUser}/>}/>
          <Route path="/create-account" element={<CreateAccount/>}/>
          <Route path="/logout" element={<Logout currentUser={currentUser} setCurrentUser={setCurrentUser}/>} />    
        </Routes>
      </Router>
    </>
    
  );
}

export default App;
