import React from "react";
//import { Route, Routes, Redirect } from "react-router-dom";
import './Styles/App.css'
import Homepage from './Homepage';
import Explore from "./Explorepage";
import SideBar from './SideBar';
import Tweet from './Tweet';

export default function App() 
{
  return (
      <React.Fragment>
          <div className="App">
            <Explore/>
          </div>
      </React.Fragment>
    );
}