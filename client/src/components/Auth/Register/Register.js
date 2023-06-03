import React, { useState } from 'react';
import darkLogo from '../../../assets/dark-friendify-logo.svg';

import './Register.scss';
export default function Register(){
    const [isLogin, setIsLogin] = useState(true);
    const [isNextClicked, setIsNextClickes] = useState()
    return (
        <section className="startscreen">
            <header className="startscreen">
                <img src={darkLogo} alt="Dark Friendify Logo" />
                <h1>Friendify</h1>
                <div className="startscreen__line"></div>
                <h3>Sign up</h3>
            </header>
            <div></div>
            {isLogin ? (
                <form className='register'>
                    <div onClick={() => setIsLogin(false)}>Don't you have an account? Register here~</div>
                </form>
            ) : (
                <form className='register'>

                    <div onClick={() => setIsLogin(true)}>Do you already have an account? Login in here~</div>
                </form>
            )}
            
        </section>
    )
}