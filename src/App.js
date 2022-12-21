import './App.css';
import Olx from './Components/Olx';
import {BrowserRouter as Router , Routes, Route} from "react-router-dom"
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import NotFound from './Components/NotFound';
import Sell from './Components/Sell';

function App() {
  return (
    <div className="App">
<Router>

  <Routes>

<Route path="/" element={<Olx/>}/>
<Route path="/login"element={<Login/>}/> 
<Route path="/signup"element={<SignUp/>}/> 
<Route path="/sell"element={<Sell/>}/> 

<Route path="*"element={<NotFound/>}/> 

  </Routes>
</Router>
    </div>
  );
}

export default App;
