import { useEffect } from "react";
import "./App.css";
import useAxios from "./common/UseAxios";
import Navbar from "./components/Navbar";

function App() {
  const getBooksList = useAxios([]);
  const handleBookList = () => {
    getBooksList.fetcher({
      options: {
        method: "GET",
        url: `/books`,
      },
      callback: () => {},
    });
  };
  useEffect(() => {
    handleBookList();
  }, []);
  return (
    <>
      <Navbar />
      <h2>hello world</h2>
    </>
  );
}

export default App;
