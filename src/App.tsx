import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movie from "./components/Movie";
import MovieDetails from "./components/MovieDetails"; // make sure to create this component
import "./App.css";
import { useMovieStore } from "./store/store";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { page, setPage, mediaType, setMediaType } = useMovieStore();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const goToNextPage = () => {
    setPage(page + 1);
  };

  const goToPreviousPage = () => {
    setPage(page - 1);
  };

  const toggleMediaType = () => {
    setMediaType(mediaType === "movies" ? "tvshows" : "movies");
  };

  return (
    <BrowserRouter>
      {/* Search - placeholder for search functionality */}
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={handleSearch}
      />

      {/* Toggle MediaType */}
      <button onClick={toggleMediaType}>
        {mediaType === "movies" ? "Movies" : "TV Shows"}
      </button>

      <Routes>
        <Route path="/" element={<Movie searchTerm={searchTerm} />} />
        <Route path="/movie/:tmdbId" element={<MovieDetails />} />
      </Routes>

      {/* Pagination (Consider moving inside Movie if it's only relevant there) */}
      <div>
        <button onClick={goToPreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} </span>
        <button onClick={goToNextPage}>Next</button>
      </div>
    </BrowserRouter>
  );
};

export default App;
