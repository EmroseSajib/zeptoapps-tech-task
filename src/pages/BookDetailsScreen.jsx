import { useEffect } from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import demoImage from "../../public/assets/demoCover.png";
import useAxios from "../common/UseAxios";
import ErrorValidate from "../components/ErrorValidate";

const BookDetailsScreen = () => {
  const { bookId } = useParams();
  const getBookDetailsInfo = useAxios([]);
  const handleBookDetails = () => {
    getBookDetailsInfo.fetcher({
      options: {
        method: "GET",
        url: `/books/${bookId}`,
      },
      callback: () => {},
    });
  };
  const browsingData = (data = []) => {
    return data
      ?.filter((item) => item?.startsWith("Browsing:"))
      .map((item) => item?.replace("Browsing: ", ""));
  };

  useEffect(() => {
    if (bookId) {
      handleBookDetails();
    }
  }, [bookId]);
  return (
    <>
      {getBookDetailsInfo?.loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader"></div>
        </div>
      ) : getBookDetailsInfo?.data ? (
        <>
          <div className="p-10 lg:flex gap-5 ">
            <div>
              <img
                src={
                  getBookDetailsInfo?.data?.formats?.["image/jpeg"]
                    ? getBookDetailsInfo?.data?.formats?.["image/jpeg"]
                    : demoImage
                }
                alt="Product"
                className="max-w-150 max-h-150 min-h-150 my-6"
              />
            </div>
            <div className="">
              <h3 className="text-3xl text-gray-800 font-bold flex-1 truncate whitespace-nowrap overflow-hidden text-ellipsis">
                {getBookDetailsInfo?.data?.title}
              </h3>
              {getBookDetailsInfo?.data?.authors?.map((author, authorIndex) => (
                <p key={authorIndex} className="text-lg text-slate-500 flex-1">
                  {author?.name}
                </p>
              ))}
              <div className="flex flex-wrap gap-2">
                {browsingData(getBookDetailsInfo?.data?.bookshelves)?.map(
                  (browsingItem, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded border border-green-400"
                    >
                      {browsingItem}
                    </span>
                  )
                )}
              </div>
              <div className="py-2 w-40 ">
                <span className="flex justify-center gap-1 bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ">
                  Download <IoCloudDownloadOutline size={15} />{" "}
                  {getBookDetailsInfo?.data?.download_count}
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <ErrorValidate error={"Something went wrong"} />
      )}
    </>
  );
};

export default BookDetailsScreen;
