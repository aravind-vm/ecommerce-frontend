import { Link } from "react-router-dom";
import Modal from "../UI/Modal/Modal";
import classes from "./LogoutPage.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userSliceAction } from "../Store/user-slice";
import { cartAction } from "../Store/cart-slice";

const LogoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutButtonHandler = () => {
    dispatch(userSliceAction.logoutStateHandler());
    dispatch(cartAction.clearCart());
  };
  const noButtonHandler = () => {
    navigate(-1, { replace: true });
  };
  return (
    <Link to="/logout">
      <Modal>
        <div className={classes.diloguebox}>
          Are you sure?
          <br />
          <button onClick={noButtonHandler}>No</button>
          <button onClick={logoutButtonHandler}>Yes</button>
        </div>
      </Modal>
    </Link>
  );
};

export default LogoutPage;
