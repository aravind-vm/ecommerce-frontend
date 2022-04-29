import classes from "./Login.module.css";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginHandlerCall } from "../../Store/user-slice";

const Login = (props) => {
  const dispatch = useDispatch();
  const inValidCredentials = useSelector(
    (state) => state.user.inValidCredentials
  );
  const userNameRef = useRef();
  const passwordRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredUsername = userNameRef.current.value;
    const enteredPassword = passwordRef.current.value;

    dispatch(
      loginHandlerCall({
        username: enteredUsername,
        password: enteredPassword,
      })
    );
  };

  return (
    <div className={classes.maincontainer}>
      <div className={classes.innercontainer}>
        <h2>Ecommerce React Login</h2>

        <form>
          <div className={classes.container}>
            {inValidCredentials && <p>Invalid Credentials</p>}
            {props.isSignUpSuccess && <p>Sign Up Successfull.Please login</p>}
            <label htmlFor="uname">
              <b>Username</b>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              name="uname"
              required
              ref={userNameRef}
            />
          </div>
          <div className={classes.container}>
            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              required
              ref={passwordRef}
            />
            <button onClick={submitHandler}>Login</button>
            {/* <label>
            <input type="checkbox" checked="checked" name="remember" /> Remember
            me
          </label> */}
            Remember me
          </div>

          <div className={classes.container}>
            <button
              type="button"
              className={classes.signup}
              onClick={() => {
                props.swapPage();
              }}
            >
              SignUp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
