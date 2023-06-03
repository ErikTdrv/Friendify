import React, { useState } from 'react';
import darkLogo from '../../../assets/dark-friendify-logo.svg';
import DarkPyramid from '../../../assets/dark-pyramids.svg';

import './Register.scss';

export default function Register() {
  const [isLogin, setIsLogin] = useState(true);
  const [isNextClicked, setIsNextClicked] = useState(false);
  return (
    <section className="startscreen">
      <header className="startscreen">
        <img src={darkLogo} alt="Dark Friendify Logo" />
        <h1>Friendify</h1>
        <div className="startscreen__line"></div>
        {isLogin ? (
          <h3>Register</h3>
        ) : (
          <h3>Login</h3>
        )}

      </header>
      <div className='content'>
        <div className='pyramid-container'>
          <img src={DarkPyramid} alt="Dark Friendify Logo" />
        </div>
        <div className='forms-container'>
          {isLogin !== undefined ? (
            <form className={`form-transition ${isLogin ? 'form-HIDDEN' : 'form-VISIBLE'}`}>
              <div className='first'>
                {!isNextClicked && (
                  <div className='top-container'>
                    <div className='input-container first-name'>
                      <label>First name <span>*</span></label>
                      <input
                        type="text"
                        placeholder='Fill in ur first name ...'
                      />
                    </div>
                    <div className='input-container last-name'>
                      <label>Last name <span>*</span></label>
                      <input
                        type="text"
                        placeholder='Fill in ur last name ...'
                      />
                    </div>
                    <div className='input-container email'>
                      <label>Email <span>*</span></label>
                      <input
                        type="text"
                        placeholder='Fill in ur email ...'
                      />
                    </div>
                    <div className='input-container nationality'>
                      <label>Nationality <span>*</span></label>
                      <input
                        type="text"
                        placeholder='Fill in ur nationality ...'
                      />
                    </div>
                    <div className='input-container first-name'>
                      <label>Password <span>*</span></label>
                      <input
                        type="password"
                        placeholder='Fill in ur password ...'
                      />
                    </div>
                    <div className='input-container first-name'>
                      <label>Repeat password <span>*</span></label>
                      <input
                        type="password"
                        className="first-name"
                        placeholder='repeat ur password ...'
                      />
                    </div>
                  </div>
                )}
                <div className='bottom-container'>
                  <a onClick={() => setIsLogin(false)}>Don't you have an account? Register here</a>
                  {isNextClicked ? (
                    <input
                      type='button'
                      value='Previous'
                      onClick={() => setIsNextClicked(false)}
                    />) : (
                    <input
                      type='button'
                      value='Next'
                      onClick={() => setIsNextClicked(true)}
                    />)
                  }
                </div>
                {isNextClicked && (
                <div className='second'>
                  <label htmlFor="profilepicture">Add Profile Picture<input type='file' id='profilepicture'></input></label>
                </div>
              )}
              </div>
              
            </form>
          ) : null}
          {isLogin !== undefined ? (
            <form className={`form-transition ${isLogin ? 'form-VISIBLE' : 'form-HIDDEN'}`}>
              <div className='login'>
                <div className='top-container'>
                  <div className='input-container email'>
                    <label>Email <span>*</span></label>
                    <input
                      type="text"
                      placeholder='Fill in ur email ...'
                    />
                  </div>
                  <div className='input-container first-name'>
                    <label>Password <span>*</span></label>
                    <input
                      type="text"
                      placeholder='Fill in ur password ...'
                    />
                  </div>
                </div>
                <div className='bottom-container'>
                  <a onClick={() => setIsLogin(true)}>Do you already have an account? Login in here</a>
                  <input
                    type='submit'
                    value='Login'
                  />
                </div>
              </div>
            </form>
          ) : null}
        </div>
      </div>
    </section>
  );
}
