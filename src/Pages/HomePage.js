import ProductCategoryList from "../Components/ProductCategory/ProductCategoryList";
import Promotion from "../Components/Promotions/Promotion";

import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

const HomePage = () => {
  return (
    <>
      <Promotion></Promotion>
      {false && <LoadingSpinner></LoadingSpinner>}

      <ProductCategoryList />
    </>
  );
};

export default HomePage;
