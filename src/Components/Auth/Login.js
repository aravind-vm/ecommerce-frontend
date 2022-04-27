import classes from "./Login.module.css";
import React from "react";

const Login = () => {
  return (
    <div className={classes.maincontainer}>
      <div className={classes.innercontainer}>
        <h2>Ecommerce React Login</h2>

        <form action="/action_page.php" method="post">
          <div className={classes.container}>
            <p>Invalid Credentials</p>
            <label htmlFor="uname">
              <b>Username</b>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              name="uname"
              required
            />
          </div>
          <div>
            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              required
            />
            <button type="submit">Login</button>
            {/* <label>
            <input type="checkbox" checked="checked" name="remember" /> Remember
            me
          </label> */}
            Remember me
          </div>

          <div className={classes.container}>
            <button type="button" className={classes.signup}>
              SignUp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
