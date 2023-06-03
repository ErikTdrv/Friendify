import React, { useState } from 'react';
import darkLogo from '../../../assets/dark-friendify-logo.svg';
import DarkPyramid from '../../../assets/dark-pyramids.svg';

import './Register.scss';
import { convertToBase64 } from '../../../services/utilService';

export default function Register() {
  const [isLogin, setIsLogin] = useState(true);
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [authData, setAuthData] = useState({ firstName: '', lastName: '', email: '', nationality: '', password: '', repeatPassword: '', profilePicture: '' });
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
              <div className='register'>
                {!isNextClicked && (
                  <div className='top-container'>
                    <div className='input-container first-name'>
                      <label>First name <span>*</span></label>
                      <input
                        type="text"
                        placeholder='Fill in ur first name ...'
                        onChange={(e) => setAuthData({ ...authData, firstName: e.target.value })}
                      />
                    </div>
                    <div className='input-container last-name'>
                      <label>Last name <span>*</span></label>
                      <input
                        type="text"
                        placeholder='Fill in ur last name ...'
                        onChange={(e) => setAuthData({ ...authData, lastName: e.target.value })}
                      />
                    </div>
                    <div className='input-container email'>
                      <label>Email <span>*</span></label>
                      <input
                        type="text"
                        placeholder='Fill in ur email ...'
                        onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
                      />
                    </div>
                    <div className='input-container nationality'>
                      <label>Nationality <span>*</span></label>
                      <input
                        type="text"
                        placeholder='Fill in ur nationality ...'
                        onChange={(e) => setAuthData({ ...authData, nationality: e.target.value })}
                      />
                    </div>
                    <div className='input-container first-name'>
                      <label>Password <span>*</span></label>
                      <input
                        type="password"
                        placeholder='Fill in ur password ...'
                        onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
                      />
                    </div>
                    <div className='input-container first-name'>
                      <label>Repeat password <span>*</span></label>
                      <input
                        type="password"
                        className="first-name"
                        placeholder='Repeat ur password ...'
                        onChange={(e) => setAuthData({ ...authData, repeatPassword: e.target.value })}
                      />
                    </div>
                  </div>
                )}
                {isNextClicked && (
                  <div className='second'>
                    {authData.profilePicture && <img src={authData.profilePicture} alt="invalid picture" />}
                    <label htmlFor="profilepicture">
                      Add Profile Picture
                      <input type='file' id='profilepicture'
                        onChange={async (e) => {
                          if (e.target.files[0]) {
                            setAuthData({
                              ...authData,
                              profilePicture: await convertToBase64(e.target.files[0]),
                            });
                          }
                        }}
                      ></input></label>
                  </div>
                )}
                <div className='bottom-container'>
                  <a onClick={() => setIsLogin(false)}>Do you already have an account? <span>Login in here!</span></a>
                  {isNextClicked ? (
                    <div className='btns-container'>
                        <input
                            type='button'
                            value='Back'
                            onClick={() => setIsNextClicked(false)}
                            onChange={() => setAuthData({ ...authData, })}
                        />
                        <input
                            type='submit'
                            value='Register'
                        />
                        </div>
                    ) : (
                    <input
                      type='button'
                      value='Next'
                      onClick={() => setIsNextClicked(true)}
                      onChange={() => setAuthData({ ...authData, })}
                    />)
                  }
                </div>
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
                  <a onClick={() => setIsLogin(true)}>Don't you have an account? <span>Register here!</span></a>
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
