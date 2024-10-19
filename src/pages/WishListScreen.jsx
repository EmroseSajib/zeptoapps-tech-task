import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import successMessage from "../common/SuccessMessage";
import CardDesign from "../components/CardDesign";
import WarningMessage from "../components/WarningMessage";

const WishListScreen = () => {
  const [getWishList, setWishList] = useState([]);
  const navigate = useNavigate();
  const handleBookDetails = (bookId) => {
    navigate(`/book-details/${bookId}`);
  };
  // This function is used to  remove books from the wishlist.

  const handleWishlistClick = (book) => {
    const updatedBooks = getWishList?.filter((item) => item?.id !== book?.id);
    setWishList(updatedBooks);
    localStorage.setItem("wishlist", JSON.stringify(updatedBooks));
    successMessage("Book remove from wishlist!");
  };
  useEffect(() => {
    const storedBooks = localStorage.getItem("wishlist");
    const parsedBooks = storedBooks ? JSON.parse(storedBooks) : [];
    setWishList(parsedBooks);
  }, []);

  return (
    <div className="lg:p-10 p-5">
      {getWishList?.length > 0 ? (
        <div className="lg:grid grid-cols-6 gap-2">
          {getWishList?.map((item, index) => (
            <CardDesign
              key={index}
              item={item}
              handleWishlistClick={handleWishlistClick}
              handleBookDetails={handleBookDetails}
            />
          ))}
        </div>
      ) : (
        <div className="py-10">
          <WarningMessage error={"No Data Found"} />
        </div>
      )}
    </div>
  );
};

export default WishListScreen;
