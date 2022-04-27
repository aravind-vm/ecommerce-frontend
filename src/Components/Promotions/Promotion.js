import classes from "./Promotion.module.css";
import promotionPage from "../../Assets/promotion.jpg";

const Promotion = () => {
  return (
    <img
      src={promotionPage}
      className={classes.promotion}
      alt="chritmas promotion"
    />
  );
};

export default Promotion;
