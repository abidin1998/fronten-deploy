import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import Home from "./components/home"
import Login from "./components/login"
import Navegacion from "./components/navegacion"
import {BrowserRouter as Router, Route} from "react-router-dom"

function App() {
  return (

    <Router>
        <Navegacion/>
        
      <div className="container p-4">
        <Home/>
{/* <Route path="/home" exact component={Home} />
        <Route path="/login" component={Login} />*/}
        
      </div>
    </Router>
    
  );
}
export default App;
