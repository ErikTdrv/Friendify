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
        <div className='logo'>
          <img src={darkLogo} alt="Dark Friendify Logo" />
          <h1>Friendify</h1>
        </div>
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
                    <div className='input-container password'>
                      <label>Password <span>*</span></label>
                      <input
                        type="password"
                        placeholder='Fill in ur password ...'
                        onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
                      />
                    </div>
                    <div className='input-container repeat-password'>
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
                    <h2 className='title'>Optional credentials ( changeable later )</h2>
                )}
                {isNextClicked && (

                  <div className='second'>
                    <div className='profile-picture'>
                        <label>Profile picture</label>
                        {authData.profilePicture ? (
                        <div
                            className="image"
                            style={{ 
                                backgroundImage: `url(${authData.profilePicture})`, 
                             }}
                        ></div>
                        ) : (
                        <div
                            className="image PH"
                            style={{ 

                            }}
                        >
                            <h2>???</h2>
                        </div>
                        )}

                        <label className='add' htmlFor="profilepicture">
                        <span>+</span> Add Profile Picture
                        <input type='file' id='profilepicture'
                            onChange={async (e) => {
                            if (e.target.files[0]) {
                                setAuthData({
                                ...authData,
                                profilePicture: await convertToBase64(e.target.files[0]),
                                });
                            }
                            }}
                        />
                        </label>
                    </div>

                    <div className='right-side'>
                        <div className='input-container gender'>
                            <label>Gender</label>
                            <select
                                value={authData.gender}
                                onChange={(e) => setAuthData({ ...authData, gender: e.target.value })}
                            >
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Dog</option>
                            </select>
                        </div>
                        <div className='input-container first-name'>
                            <label>Date of birth</label>
                            <input
                                type="date"
                                class="custom-date-input"
                                onChange={(e) => setAuthData({ ...authData, date: e.target.value })}
                            />
                        </div>
                    </div>
                  </div>
                )}
                <div className='bottom-container'>
                  <a onClick={() => setIsLogin(false)} className={`switch-btn ${isNextClicked ? 'btn-HIDDEN' : 'btn-VISIBLE'}`}> Do you already have an account? <span>Login in here!</span></a>
                  {isNextClicked ? (
                    <div className='__2'>
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
            <form className={`form-transition login ${isLogin ? 'form-VISIBLE' : 'form-HIDDEN'}`}>
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
        <div className='error-section'>
          <h3>ERROR <span>!!!</span></h3>
          <div className='__container'>
            <div>Name is not valid!</div>
            <div>Email is not valid!</div>
          </div>
        </div>
      </div>
    </section>
  );
}
