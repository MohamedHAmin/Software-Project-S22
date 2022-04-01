import React from "react";
import Searchbar from "./Search";
import SideBar from './SideBar';
import "./Styles/Explorepage.css"

function Explore()
{
    return(
        <div className="Explorepage">
            <div className="bar">
                <SideBar/>
            </div>
            <div className="Search">
                <Searchbar/>
            </div>
        </div>
    );
}
export default Explore;