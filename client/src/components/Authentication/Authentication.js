import React, { useState, useEffect } from 'react';
import darkLogo from '../../assets/dark-friendify-logo.svg';
import DarkPyramid from '../../assets/dark-pyramids.svg';

import './Authentication.scss';
import { convertToBase64 } from '../../services/utilService';
import { login, register } from '../../services/authService';

export default function Authentication() {
  const [isLogin, setIsLogin] = useState(true);
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [switchAnimationClass, setSwitchAnimationClass] = useState('');
  const [authData, setAuthData] = useState({ fullName: '', nickname: '', email: '', nationality: '', password: '', repeatPassword: '', profilePicture: '', gender: '', dateOfBirth: '' });
  const [errors, setErrors] = useState({ fullName: '', nickname: '', email: '', nationality: '', password: '', repeatPassword: '', profilePicture: '', gender: '', dateOfBirth: '' });
  const [mainError, setMainError] = useState('');
  const [errorsAvailable, setAvailableErrors] = useState(false);

  async function registerHandler(e) {
    e.preventDefault();
    const user = await register(authData);
  }
  async function loginHandler(e) {
    e.preventDefault();
    const userData = { email: authData.email, password: authData.password }
    const user = await login(userData);
    if (user?.ok == false) {
      setMainError(user.error.message)
      errorsAvailable(true)
    }else {
      errorsAvailable(false)
    }
  }
  function passwordValidator() {
    if (authData.password != authData.repeatPassword) {
      setErrors({ ...errors, password: 'Passwords must be equal!' })
    } else {
      setErrors({ ...errors, password: '' })
    }
  }
  useEffect(() => {
    setSwitchAnimationClass('switch-animation');
    requestAnimationFrame(() => {
      setSwitchAnimationClass('');
    });
  }, [isNextClicked]);

  function validateInput(e, type) {
    const current = e.target.value
    if (type == 'fullName' && (current.length < 2 || current.length > 20)) {
      setErrors({ ...errors, [type]: 'Full Name must have 2 - 20 characters!' })
      errorsAvailable(true);
    } else if (type == 'nickname' && (current.length < 2 || current.length > 10)) {
      setErrors({ ...errors, [type]: 'Nickname must have 2 - 10 characters!' })
      errorsAvailable(true);
    } else if (type == 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (current.length < 8 || current.length > 30) {
        setErrors({ ...errors, [type]: 'Email must have 8 - 30 characters!' })
      } else if (!emailRegex.test(current)) {
        setErrors({ ...errors, [type]: 'Email must be valid!' })
      }
      errorsAvailable(true);
    } else if (type == 'nationality' && current.length > 12) {
      setErrors({ ...errors, [type]: 'Nationality must not have more than 12 characters!' })
      errorsAvailable(true);
    } else if (type == 'password' && (current.length < 6 || current.length > 15)) {
      setErrors({ ...errors, [type]: 'Password must have 6 - 15 characters!' })
      errorsAvailable(true);
    } else {
      errorsAvailable(false);
    }
  }

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
            <form onSubmit={registerHandler} className={`form-transition ${isLogin ? 'form-HIDDEN' : 'form-VISIBLE'}`}>
              <div className={`loading-icon ${isNextClicked ? 'left' : 'right'}`}>
                <svg width="300" height="300" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path class="animated-path" d="M48.6 60C22.8 60 10 86.6 10 100C10 113.4 22.8 140 48.6 140C87.2 140 112.8 60 151.4 60C177.2 60 190 86.6 190 100C190 113.4 177.2 140 151.4 140C112.8 140 87.2 60 48.6 60Z" stroke="white" stroke-width="16" stroke-linecap="round" stroke-dasharray="85.53 85.53"/>
                </svg>
              </div>
              <div className={`register ${isNextClicked ? 'switch' : 'switch_2'} ${switchAnimationClass}`}>
                {!isNextClicked && (
                  <div className='top-container'>
                    <div className='input-container first-name'>
                      <label>Full Name <span>*</span></label>
                      <input
                        type="text"
                        placeholder='Fill in ur full name ...'
                        onChange={(e) => setAuthData({ ...authData, fullName: e.target.value })}
                        onBlur={(e) => validateInput(e, 'fullName')}
                      />
                    </div>
                    <div className='input-container last-name'>
                      <label>Nickname <span>*</span></label>
                      <input
                        type="text"
                        placeholder='Fill in ur nickname ...'
                        onChange={(e) => setAuthData({ ...authData, nickname: e.target.value })}
                        onBlur={(e) => validateInput(e, 'nickname')}
                      />
                    </div>
                    <div className='input-container email'>
                      <label>Email <span>*</span></label>
                      <input
                        type="text"
                        placeholder='Fill in ur email ...'
                        onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
                        onBlur={(e) => validateInput(e, 'email')}
                      />
                    </div>
                    <div className='input-container nationality'>
                      <label>Nationality <span>*</span></label>
                      <input
                        type="text"
                        placeholder='Fill in ur nationality ...'
                        onChange={(e) => setAuthData({ ...authData, nationality: e.target.value })}
                        onBlur={(e) => validateInput(e, 'nationality')}
                      />
                    </div>
                    <div className='input-container password'>
                      <label>Password <span>*</span></label>
                      <input
                        type="password"
                        placeholder='Fill in ur password ...'
                        onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
                        onBlur={(e) => validateInput(e, 'password')}
                      />
                    </div>
                    <div className='input-container repeat-password'>
                      <label>Repeat password <span>*</span></label>
                      <input
                        type="password"
                        className="first-name"
                        placeholder='Repeat ur password ...'
                        onBlur={(e) => {
                          passwordValidator()
                          validateInput(e, 'repeat-password')
                        }}
                        onChange={(e) => setAuthData({ ...authData, repeatPassword: e.target.value })}
                      />
                    </div>
                  </div>
                )}
                {isNextClicked && (
                  <div>
                    <h2 className='title'>Optional credentials ( changeable later )</h2>
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
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div className='input-container first-name'>
                          <label>Date of birth</label>
                          <input
                            type="date"
                            className="custom-date-input"
                            onChange={(e) => setAuthData({ ...authData, dateOfBirth: e.target.value })}
                          />
                        </div>
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
            <form onSubmit={loginHandler} className={`form-transition login ${isLogin ? 'form-VISIBLE' : 'form-HIDDEN'}`}>
              <div className='login'>
                <div className='top-container'>
                  <div className='input-container email'>
                    <label>Email <span>*</span></label>
                    <input
                      type="text"
                      placeholder='Fill in ur email ...'
                      onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
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
          <div>
            <h3>ERROR <span>!!!</span></h3>
            {Object.values(errors).map((error) => {
              if (error != '') {
                return (
                  <div className='__container'>
                    <div>{error}</div>
                  </div>
                );
              }
            })
            }
          </div>
        </div>
      </div>
      <footer>
        <ul>
          <li className='support'><a href=''>Support</a></li>
          <li className='credits'>
            Made by <a href='https://www.instagram.com/todorowwww/' target='_blank'>Erik Todorov</a> and <a href='https://www.instagram.com/brendan_024/' target='_blank'>Brendan Kersten</a></li>
          <li className='theme_toggler'>Dark theme</li>
        </ul>
      </footer>
    </section>
  );
}
