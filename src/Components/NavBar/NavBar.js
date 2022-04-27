import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartButton from "../Cart/CartButton";
import Cart from "../Cart/Cart";
import classes from "./NavBar.module.css";

const NavBar = () => {
  const showCart = useSelector((state) => state.ui.showCart);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  return (
    <>
      <header className={classes.header}>
        <Link to="/">
          <div className={classes.logo}>React Mobile E Store</div>
        </Link>
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>{!isLoggedIn && <Link to="/auth">Login</Link>}</li>

            <li>{isLoggedIn && <Link to="/profile">Profile</Link>}</li>
            <li>{isLoggedIn && <CartButton />}</li>
            <li>{isLoggedIn && <button>Logout</button>}</li>
          </ul>
        </nav>
      </header>
      {showCart && <Cart />}
    </>
  );
};

export default NavBar;
