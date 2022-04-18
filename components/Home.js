import React, { Component } from "react";
import './Home.css'
import { useNavigate } from "react-router-dom";

function Home() {
    // const Navigate3 = useNavigate();
    // Navigate3('/login');

    return (
        <div className="text">
            <p>
                <h5> <b>Welcome to LARRY!</b></h5>
                <h4><b>Lets start our journy</b></h4>
            </p>

        </div>
    )
}
export default Home;