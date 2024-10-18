import { FaHeart, FaIdCard } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import demoImage from "../../public/assets/demoCover.png";

const CardDesign = ({ item = {}, handleWishlistClick, fillColour = "red" }) => {
  const browsingData = (data = []) => {
    return data
      ?.filter((item) => item?.startsWith("Browsing:"))
      .map((item) => item?.replace("Browsing: ", ""));
  };

  return (
    <>
      <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full py-6 max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
        <div className="flex items-center justify-between gap-2 px-6">
          <span className=" flex items-center justify-between gap-1 bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ">
            <FaIdCard size={15} />

            {item?.id}
          </span>

          {fillColour ? (
            <FaHeart
              className="cursor-pointer"
              size={25}
              color="red"
              onClick={() => handleWishlistClick(item)}
            />
          ) : (
            <IoMdHeartEmpty
              className="cursor-pointer"
              size={25}
              onClick={() => handleWishlistClick(item)}
            />
          )}
        </div>

        <div className="flex justify-center">
          <img
            src={
              item?.formats?.["image/jpeg"]
                ? item?.formats?.["image/jpeg"]
                : demoImage
            }
            alt="Product"
            className="max-w-60 max-h-40 min-h-40 my-6"
          />
        </div>

        <div className="px-6">
          <h3 className="text-base text-gray-800 font-bold flex-1 truncate whitespace-nowrap overflow-hidden text-ellipsis">
            {item?.title}
          </h3>
          {item?.authors?.map((author, authorIndex) => (
            <p key={authorIndex} className="text-[14px] text-slate-500 flex-1">
              {author?.name}
            </p>
          ))}
          <div className="flex flex-wrap gap-2">
            {browsingData(item?.bookshelves)?.map((browsingItem, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded border border-green-400"
              >
                {browsingItem}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDesign;
