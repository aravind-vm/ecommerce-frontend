import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartButton from "../Cart/CartButton";
import Cart from "../Cart/Cart";
import classes from "./NavBar.module.css";

const NavBar = () => {
  const showCart = useSelector((state) => state.ui.showCart);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const name = useSelector((state) => state.user.user.name);

  return (
    <>
      <header className={classes.header}>
        <div className={classes.logo}>
          React MobEStore
          <span className={classes.welcome}>
            {isLoggedIn && `Welcome ${name}`}
          </span>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>{!isLoggedIn && <Link to="/auth">Login</Link>}</li>

            <li>{isLoggedIn && <Link to="/profile">Profile</Link>}</li>
            <li>{isLoggedIn && <CartButton />}</li>
            <li>
              <Link to="/logout">{isLoggedIn && <button>Logout</button>}</Link>
            </li>
          </ul>
        </nav>
      </header>
      {showCart && <Cart />}
    </>
  );
};

export default NavBar;
