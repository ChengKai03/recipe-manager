import logo from './logo.svg';
import './App.css';
import axios from 'axios';


// axios.defaults.baseURL = 'http://localhost:8080';
// axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
// axios.defaults.headers.post['Content-Type'] = 'application/json';

// axios.baseURL = "http://localhost8080"

const apiCall = () => {
  // axios.get('/').then((data) => 
  //   //this console.log will be in our frontend console
  //   console.log(data)
  // })
  fetch("/api/")
      .then((res) => res.json())
      .then((data) => {
      console.log(data.message)
    })
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={apiCall}>Make API Call</button>
      </header>
    </div>
  );
}

export default App;
