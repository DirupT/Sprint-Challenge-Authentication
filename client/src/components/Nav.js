import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div className='nav-container'>
            <Link to='/jokes'>Jokes</Link>
            <Link to='/login'>Sign In</Link>
            <Link to='/register'>Sign Up</Link>
        </div>
    );
}

export default Nav;