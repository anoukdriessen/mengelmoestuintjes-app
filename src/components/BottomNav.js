import React from 'react';
import './styles/Container.css';
import { NavLink } from "react-router-dom";

function BottomNav() {
  return (
    <nav id='bottom-nav'>
        <ul>
          <li>
            <NavLink
                exact to="/"
                activeClassName="active-link"
            > Home </NavLink>
          </li>
        </ul>
    </nav>
  );
}

export default BottomNav;