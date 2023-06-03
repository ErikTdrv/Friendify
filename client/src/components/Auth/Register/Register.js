import React from 'react';
import darkLogo from '../../../assets/dark-friendify-logo.svg';

import './Register.scss';
export default function Register(){
    return (
        <section class="startscreen">
            <header class="startscreen">
                <img src={darkLogo} alt="Dark Friendify Logo" />
                <h1>Friendify 32242342343</h1>
                <div class="startscreen__line"></div>
                <h3>Sign up</h3>
            </header>
        </section>
    )
}