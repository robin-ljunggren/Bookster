import React, { useState } from 'react'
import ButtonComponent from '../abstract/ButtonComponent.js';
import authService from '../../service/authService.js';

export default function AuthForm() {

  const [formState, setFormState] = useState('login');
  const [credentials, setCredentials] = useState({username: '', password: ''});

  const link = formState === 'login' ?
    <p>No account? Sign up <span className='login/register-span'onClick={() => setFormState('register')}>here!</span></p> :
    <p>Already have an account? Sign in <span className='login/register-span'onClick={() => setFormState('login')}>here!</span></p>

  function handleSubmit(e) {
    e.preventDefault()

    if(formState === 'login') {
      authService.login(credentials.username, credentials.password)
    }else if(formState === 'registration'){
      authService.registration(credentials.username, credentials.password)
    }
  }

  return (
    <form data-testid="auth-form" onSubmit={handleSubmit}>
      <h2 className='form-header'>{formState === 'login' ? "Sign in" : "Register"}</h2>
      <label>Username:</label>
      <input 
        value={credentials.username}
        onChange={(e) => setCredentials({...credentials, username: e.target.value})}
        placeholder="Type your username..." />
      <label>Password:</label>
      <input 
        type="password" 
        value={credentials.password} 
        onChange={(e) => setCredentials({...credentials, password: e.target.value})} 
        placeholder="Type your password..."/>
      {link}
      {formState === 'login' ? 
      <ButtonComponent
        className={"login-btn"}
        testId={"login-btn"}
        txt={"Sign in"}
      /> : 
      <ButtonComponent
        className={"register-btn"}
        testId={"register-btn"}
        txt={"Register new account"}
      />}
      <button className='btn guest-btn' formMethod='dialog'>Proceed as guest</button>
    </form>
  )
}
