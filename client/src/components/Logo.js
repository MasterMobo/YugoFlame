import React from "react";
import logo from "../images/flame.png";

function Logo() {
    return (
        <div className="logo">
            <img src={logo} alt="logo" />
            <h1>Yugo Flame</h1>
        </div>
    );
}

export default Logo;
