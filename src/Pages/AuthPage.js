import { useState } from "react";
import Login from "../Components/Auth/Login";
import SignUp from "../Components/Auth/SignUp";

const AuthPage = () => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [isSignUpSuccess, setIsSignUpSuccesse] = useState(false);
  const changeLoginPageHandler = () => {
    setIsLoginPage((previousState) => !previousState);
  };
  const setSignUpToTrue = () => {
    setIsSignUpSuccesse(true);
  };
  return (
    <>
      {isLoginPage ? (
        <Login
          swapPage={changeLoginPageHandler}
          isSignUpSuccess={isSignUpSuccess}
        ></Login>
      ) : (
        <SignUp
          swapPage={changeLoginPageHandler}
          signUpStateHandler={setSignUpToTrue}
        ></SignUp>
      )}
    </>
  );
};

export default AuthPage;
