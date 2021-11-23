import React from 'react';
import { NavLink } from "react-router-dom";

function Menu() {
  return (
    <nav id='bottom-nav'>
        <ul>
          <li>
            <NavLink
                exact to="/"
                activeClassName="active-link"
            >
            Home
            </NavLink>
          </li>

          <li>
            <NavLink
                to="/gaatjes"
                activeClassName="active-link"
            >
              Gaatjes
            </NavLink>
          </li>

          <li>
            <NavLink
                to="/afspraak-maken"
                activeClassName="active-link"
            >
              Afspraak maken
            </NavLink>
          </li>

          <li>
            <NavLink
                to="/tanden-bleken"
                activeClassName="active-link"
            >
              Tanden bleken
            </NavLink>
          </li>
        </ul>
    </nav>
  );
}

export default Menu;