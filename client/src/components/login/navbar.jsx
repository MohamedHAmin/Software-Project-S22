import React, { useState } from "react";
import "./Styles/navbar.css";
/**
 *
 * 
 * @returns Returns the navigation bar which contains [Signup- Login - Contact Us] 
 */
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
            </a>
            <ul className={active}>

                <li className="navItem"><a href="/" className="navLink">Login</a> </li>
                <li className="navItem"><a href="/SignUp" className="navLink">Signup</a> </li>
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