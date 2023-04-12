import React from "react";
import Logo from "./Logo";
import NavBar from "./NavBar";

function Header() {
    return (
        <header>
            <Logo />
            <NavBar />
            <ul className="login">
                <li>
                    <a href="#!">Login</a>
                </li>
                <li>
                    <a className="sign-up" href="#!">
                        Sign Up
                    </a>
                </li>
            </ul>
        </header>
    );
}

export default Header;
