import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const CardSkeleton = () => {
  return (
    <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full py-6 max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
      <div className="flex items-center gap-2 px-6">
        <Skeleton circle={true} height={30} width={30} />
      </div>

      <div className="flex justify-center">
        <Skeleton width={160} height={100} />
      </div>

      <div className="px-6">
        <Skeleton height={24} width={`80%`} />
        <Skeleton count={2} width={`60%`} />
        <Skeleton width={50} height={30} />
      </div>
    </div>
  );
};

export default CardSkeleton;
