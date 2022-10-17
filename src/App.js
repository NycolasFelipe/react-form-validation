import { useState } from 'react';
import './App.css';

const nameRegex = RegExp(
  /^[A-Za-z][A-Za-z]{2,29}$/
)

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

function formValid({ formErrors, ...rest }) {
  let valid = true;
  
  // validate forms errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false)
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val == null && (valid = false)
  });

  return valid;
}

function App() {
  const [userData, setUserData] = useState({
    firstName: null,
    lastName:  null,
    email: null,
    password: null,
    formErrors: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    }
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (formValid(userData)) {
      console.log(`
        --SUBMITTING--
        First Name: ${userData.firstName}
        Last Name: ${userData.lastName}
        Email: ${userData.email}
        Password: ${userData.password}
      `);
    } else {
      console.error('FORM INVALID');
    }
  }

  function handleChange(e) {
    e.preventDefault();

    const { id, value } = e.target;
    let formErrors = userData.formErrors;

    switch(id) {
      case 'firstName':
        formErrors.firstName = 
          nameRegex.test(value)  
          ? ''
          : 'invalid first name';
      break;
      case 'lastName':
        formErrors.lastName = 
          nameRegex.test(value)
          ? ''
          : 'invalid last name';
      break;
      case 'email':
        formErrors.email = 
          emailRegex.test(value)
            ? ''
            : 'invalid email address';
      break;
      case 'password':
        formErrors.password = 
          value.length < 5
            ? 'minimum 3 characters required'
            : '';
      break;
      default:
        break;
    }

    setUserData({
      ...userData,
      [id]: value,
    });

    if (formValid(userData)) setDisabledButton(false)
    else setDisabledButton(true)
  }

  const [disabledButton, setDisabledButton] = useState(true);

  return (
    <div className="wrapper">
      <div className='form-wrapper'>
          <h1>Create Account</h1>
          <form onSubmit={handleSubmit} noValidate>
            <div className='firstName'>
              <label htmlFor="firstName">First Name</label>
              <input 
                id='firstName'
                className={
                  userData.formErrors.firstName.length > 0
                    ? 'error'
                    : ''
                }
                type="text"
                placeholder='First Name'
                noValidate
                onChange={handleChange}
              />
              {userData.formErrors.firstName.length > 0 && (
                <span className='errorMessage'>{userData.formErrors.firstName}</span>
              )}
            </div>
            <div className='lastName'>
              <label htmlFor="lastName">Last Name</label>
              <input 
                id='lastName'
                className={
                  userData.formErrors.lastName.length > 0
                    ? 'error'
                    : ''
                }
                type="text"
                placeholder='Last Name'
                noValidate
                onChange={handleChange}
              />
              {userData.formErrors.lastName.length > 0 && (
                <span className='errorMessage'>{userData.formErrors.lastName}</span>
              )}
            </div>
            <div className='email'>
              <label htmlFor="email">Email</label>
              <input 
                id='email'
                className={
                  userData.formErrors.email.length > 0
                    ? 'error'
                    : ''
                }
                type="email"
                placeholder='Email'
                noValidate
                onChange={handleChange}
              />
              {userData.formErrors.email.length > 0 && (
                <span className='errorMessage'>{userData.formErrors.email}</span>
              )}
            </div>
            <div className='password'>
              <label htmlFor="password">Password</label>
              <input 
                id='password'
                className={
                  userData.formErrors.password.length > 0
                    ? 'error'
                    : ''
                }
                type="password"
                placeholder='Password'
                noValidate
                onChange={handleChange}
              />
              {userData.formErrors.password.length > 0 && (
                <span className='errorMessage'>{userData.formErrors.password}</span>
              )}
            </div>
            <div className="createAccount">
              <button 
                className={disabledButton ? 'buttonDisabled' : ''}
                disabled={disabledButton}
                type='submit'
              >
                Create Account
              </button>
              <small>Already Have an Account?</small>
            </div>
          </form>
      </div>
    </div>
  )
}

export default App;
