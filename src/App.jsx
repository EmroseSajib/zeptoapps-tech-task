import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomeScreen from "./pages/HomeScreen";
import NotFoundScreen from "./pages/NotFoundScreen";
import WishListScreen from "./pages/WishListScreen";

function App() {
  return (
    <Router>
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
