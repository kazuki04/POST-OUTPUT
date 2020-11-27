import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Style.css/Navbar.css'

const navbar = () => (
    <nav className='navbar'>
        <div className='navbar-left'>
            <Link className='navbar-title' to='/'>POST OUTPUT</Link>
        </div>
        <div className='navbar-right'>
            <ul className='navbar-list'>
                <li className='navbar-list-item'>
                    <NavLink className='navlink' exact to='/'>Home</NavLink>
                </li>
                <li className='navbar-list-item'> 
                    <NavLink className='navlink' exact to='/blog'>Blog</NavLink>
                </li>
                <li className='navbar-list-item'> 
                    <NavLink className='navlink' exact to='#'>About</NavLink>
                </li>
            </ul>
        </div>
    </nav>
);

export default navbar;