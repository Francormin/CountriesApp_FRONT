import React from "react";
import { NavLink } from "react-router-dom";
import navBarCss from "../cssModules/NavBar.module.css";

export default function NavBar() {
  return (
    <nav className={navBarCss.nav}>
      <NavLink to="/" className={navBarCss.navLink}>
        LANDING PAGE
      </NavLink>

      <NavLink to="/home" className={navBarCss.navLink}>
        HOME PAGE
      </NavLink>

      <NavLink to="/creation" className={navBarCss.navLink}>
        CREATION PAGE
      </NavLink>
    </nav>
  );
}
