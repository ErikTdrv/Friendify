import React from 'react';
import darkLogo from '../../../assets/dark-friendify-logo.svg';

import './Register.scss';
export default function Register(){
    return (
        <body>
            <header class="startscreen">
                <img src={darkLogo} alt="Dark Friendify Logo" />
                <h1>Friendify</h1>
                <div class="startscreen__line"></div>
                <h3>Sign up</h3>
            </header>
        </body>
    )
}