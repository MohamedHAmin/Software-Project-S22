import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Routes } from "react-router-dom";
import Home from './components/Home'
import Login from './components/Login';
import Signup from './components/Signup'
import Navbar from './components/navbar';
import Modal from './components/Modal';
import NextSignUp from './components/NextSignUp';
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
            <Route exact path="/" element={<Home />} ></Route>
            <Route path="/Modal" element={<Modal />} ></Route>
            <Route path="/NextSignup" element={<NextSignUp />} ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    )
  }
}
export default App

