import { useState } from "react";
import MovieCard from "./MovieCard";
import { useMovieStore } from "../store/store";

const MovieList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { page, setPage, mediaType, setMediaType } = useMovieStore();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleMediaType = () => {
    setMediaType(mediaType === "movies" ? "tvshows" : "movies");
  };

  const goToNextPage = () => {
    setPage(page + 1);
  };

  const goToPreviousPage = () => {
    setPage(page - 1);
  };
  console.log(page, mediaType);
  return (
    <div>
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

      <MovieCard searchTerm={searchTerm} />

      {/* Pagination (Consider moving inside Movie if it's only relevant there) */}
      <div>
        <button onClick={goToPreviousPage} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} </span>
        <button onClick={goToNextPage}>Next</button>
      </div>
    </div>
  );
};

export default MovieList;
