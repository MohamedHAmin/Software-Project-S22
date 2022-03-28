import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
// import Nav from './components/Nav';
import Home from './components/Home'
import Login from './components/Login';
import Signup from './components/Signup'
import contact from './components/contact';
import Navbar from './components/navbar';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} ></Route>
            <Route path="/signup" element={<Signup />} ></Route>
            <Route path="/" element={<Home />} ></Route>
            <Route path="/" element={<contact />} ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    )
  }
}
export default App

