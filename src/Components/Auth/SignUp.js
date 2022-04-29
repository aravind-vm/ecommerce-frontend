import classes from "./SignUp.module.css";
import React, { useRef } from "react";

const SignUp = (props) => {
  let errorNot = false;
  const userFullNameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();
  const contactRef = useRef();
  const addressNameRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const countryRef = useRef();
  const pinRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const userData = {
      name: userFullNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      mobile_number: contactRef.current.value,
      address: {
        address_name: addressNameRef.current.valu,
        city: cityRef.current.value,
        state: stateRef.current.value,
        country: countryRef.current.value,
        pincode: pinRef.current.value,
      },
    };
    fetch(`http://localhost:8080/api/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        errorNot = false;
        props.signUpStateHandler();
        props.swapPage();
      })
      .catch((error) => {
        errorNot = true;
      });
  };
  return (
    <div className={classes.maincontainer}>
      <div className={classes.innercontainer}>
        <h2>Ecommerce React Login</h2>

        <form>
          <div>
            Existing User?{" "}
            <button
              onClick={() => {
                props.swapPage();
              }}
            >
              Sign In
            </button>
          </div>
          <div className={classes.container}>
            {errorNot && <p>Sign Up failed</p>}
            <label htmlFor="fullname">
              <b>FullName</b>
            </label>
            <input
              type="text"
              placeholder="Enter FullName"
              name="fullname"
              required
              ref={userFullNameRef}
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
              ref={emailRef}
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
              ref={contactRef}
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
              ref={addressNameRef}
            />
            <input
              type="text"
              placeholder="Enter City"
              name="city"
              required
              ref={cityRef}
            />
            <input
              type="text"
              placeholder="Enter State"
              name="state"
              required
              ref={stateRef}
            />
            <input
              type="text"
              placeholder="Enter Country"
              name="country"
              required
              ref={countryRef}
            />
            <input
              type="text"
              placeholder="Enter PinCode"
              name="pin"
              required
              ref={pinRef}
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
          </div>
          <div>
            <button onClick={submitHandler}>SignUp</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
