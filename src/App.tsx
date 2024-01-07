import React, { useState } from "react";
import Movie from "./components/Movie";
import "./App.css";
import { useMovieStore } from "./store/store";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("millions");
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
    <>
      {/* Search - placeholder for search functionality */}
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchTerm}
        onChange={handleSearch}
      />

      {/* Toggle MediaType */}
      <button onClick={toggleMediaType}>
        {" "}
        {mediaType === "movies" ? "Movies" : "TV Shows"}
      </button>

      {/* Movie Component */}
      <Movie searchTerm={searchTerm} />

      {/* Pagination */}
      <div>
        <button onClick={goToPreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} </span>
        <button onClick={goToNextPage}>Next</button>
      </div>
    </>
  );
};

export default App;
