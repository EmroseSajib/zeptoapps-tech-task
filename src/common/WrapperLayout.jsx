import Navbar from "../components/Navbar";
import AdminSideNav from "../Navigation/AdminSideNav";

const WrapperLayout = ({ children }) => {
  return (
    <div className="bg-[#eeeeee]">
      <Navbar />
      <div className="lg:flex ">
        <div className=" ">
          <AdminSideNav />
        </div>
        <div className="flex-1 overflow-x-hidden">
          <div className="min-h-screen px-3 pt-3   overflow-hidden">
            {children}
          </div>
        </div>
      </div>
      {/* <FooterSection /> */}
    </div>
  );
};

export default WrapperLayout;
