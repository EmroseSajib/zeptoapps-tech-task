import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import HomeScreen from "./pages/HomeScreen";
import NotFoundScreen from "./pages/NotFoundScreen";
import WishListScreen from "./pages/WishListScreen";
function App() {
  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/wish-list" element={<WishListScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
