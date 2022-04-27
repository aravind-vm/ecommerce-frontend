import classes from "./SignUp.module.css";
import React from "react";

const SignUp = () => {
  return (
    <div className={classes.maincontainer}>
      <div className={classes.innercontainer}>
        <h2>Ecommerce React Login</h2>

        <form action="/action_page.php" method="post">
          <div className={classes.container}>
            <label htmlFor="fullname">
              <b>FullName</b>
            </label>
            <input
              type="text"
              placeholder="Enter FullName"
              name="fullname"
              required
            />
          </div>
          <div className={classes.container}>
            <label htmlFor="email">
              <b>Email - This will be Your UserName</b>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              required
            />
          </div>
          <div className={classes.container}>
            <label htmlFor="contact">
              <b>Contact</b>
            </label>
            <input
              type="text"
              placeholder="Enter Contact Number"
              name="contact"
              required
            />
          </div>

          <div className={classes.container}>
            <label htmlFor="address">
              <b>Address</b>
            </label>
            <input
              type="text"
              placeholder="Enter House Name"
              name="address"
              required
            />
            <input type="text" placeholder="Enter City" name="city" required />
            <input
              type="text"
              placeholder="Enter State"
              name="state"
              required
            />
            <input
              type="text"
              placeholder="Enter Country"
              name="country"
              required
            />
            <input
              type="text"
              placeholder="Enter PinCode"
              name="pin"
              required
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
            />
          </div>
          <div>
            <button type="submit">SignUp</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
