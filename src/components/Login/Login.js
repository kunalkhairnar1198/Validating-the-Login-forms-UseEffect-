import React, { useEffect, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [enterCollegeName, setEnteredCollegeName]= useState('')
  const [collegeIsValid, setCollegeIsValid] = useState('')
  const [formIsValid, setFormIsValid] = useState(false);


  useEffect(()=>{
    // console.log('mount')
  let timerid = setTimeout(() => {
    console.log('on each keystroke pause')
    setFormIsValid(
      enteredEmail.includes('@') && enteredPassword.trim().length > 6 &&  enterCollegeName.trim().length > 0
     ); 
  }, 5000);
    return(()=> {
      // past Effect will distroy and return a cleanup function
      console.log('cleanup function will execute before the useEffect on each update')
      clearTimeout(timerid)
    })   
  },[enteredEmail, enteredPassword,enterCollegeName])

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const collegeChangeHandler=(event)=>{
   setEnteredCollegeName(event.target.value);
  }

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  // If user doesnt fill the input field College Name , form is not valid. Check that.
  const validateCollegeNameHandler =()=>{
    setCollegeIsValid(enterCollegeName.trim().length > 10)
  }
 

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword, enterCollegeName);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        {/* adding college name field and validate form is valid or not  */}
          <div className={`${classes.control} ${
              collegeIsValid === false ? classes.invalid : ''
            }`}>
            <label htmlFor='college'>College Name :</label>
            <input type='text' value={enterCollegeName} onChange={collegeChangeHandler}  onBlur={validateCollegeNameHandler} />
          </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
