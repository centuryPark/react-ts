import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Menu extends Component {
  render() {
    return (
      <div>
        <div className="page-menu">
          <h1>菜单</h1>
          <ul>
            <li>
              <Link to="/count">count</Link>
            </li>
            <li>
              <Link to="/movies">live</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Menu;
