import React from "react";
import NavLogo from '../../assets/header-item.png';
import './navbar.scss';

function Navbar() {
  return <div className="v1-navbar">
    <img className="v1-navbar__logo" src={NavLogo} alt="Cuvette Tech" width={165} height={43}/>
    <div className="v1-navbar__cta">Contact</div>
  </div>;
}

export default Navbar;
