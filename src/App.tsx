import { BrowserRouter, Routes, Route } from "react-router-dom";
import DetailsPage from "./pages/DetailsPage";
import MovieList from "./components/MovieList";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:tmdbId" element={<DetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
