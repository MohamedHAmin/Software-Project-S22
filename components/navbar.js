import React, { useState } from "react";
//import image from "./LARRY.png"
import "./navbar.css";

function Navbar() {
    const [active, setActive] = useState("navMenue")
    const [toggleIcon, setToggleIcon] = useState("navToggler")

    const navToggle = () => {
        if (active === "navMenue") {
            setActive("navMenue navActive")
        } else setActive("navMenue");

        //toggler icon

        toggleIcon === "navToggler" ? setToggleIcon("navToggler toggle") : setToggleIcon("navToggler")
    }
    return (
        <nav className="nav">
            <a href="/" className="navBrand">
                {/* <div className="logoImage">
                    <img src={image}></img>
                </div> */}
            </a>
            <ul className={active}>
                <li className="navItem"><a href="/" className="navLink">Home</a> </li>
                <li className="navItem"><a href="/login" className="navLink">Login</a> </li>
                <li className="navItem"><a href="/signup" className="navLink">Signup</a> </li>
                <li className="navItem"><a href="/contact" className="navLink">Contact Us</a> </li>
            </ul>
            <div onClick={navToggle} className={toggleIcon}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
        </nav>
    )
}
export default Navbar;