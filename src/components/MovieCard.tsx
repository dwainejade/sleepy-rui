import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies, searchMoviesInTMDb } from "../utils/api";
import MovieDetails from "./MovieDetails";
import { useMovieStore } from "../store/store";
import { useEffect } from "react";

type MovieProps = {
  searchTerm: string;
};
// Component to display movies
const MovieCard = ({ searchTerm }: MovieProps) => {
  const [searchResults, setSearchResults] = useState([]);
  const { page, mediaType, setSelectedMovie } = useMovieStore();
  const navigate = useNavigate(); // Hook for navigation

  // Fetch movies based on search term from TMDb
  useEffect(() => {
    if (searchTerm) {
      const performSearch = async () => {
        try {
          const results = await searchMoviesInTMDb(searchTerm, mediaType);
          console.log("Search results:", results);
          setSearchResults(results.results || []);
        } catch (error) {
          console.error("Error searching movies:", error);
        }
      };

      performSearch();
    }
  }, [searchTerm, mediaType]);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    navigate(`/movie/${movie.tmdb_id}`);
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["movies", page, mediaType],
    queryFn: () => fetchMovies(page, mediaType),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  // If searching, render search results, else render normal movie list
  if (searchTerm && searchResults.length > 0) {
    return (
      <div className="movie-container">
        {searchResults?.map((movie) => (
          <div
            key={movie.tmdb_id}
            className="movie-card"
            onClick={() => handleMovieSelect(movie)}
          >
            <h3>{movie.title}</h3>
            <MovieDetails tmdbId={movie.id} />
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="movie-container">
        {data?.result.map((movie) => (
          <div
            key={movie.tmdb_id}
            className="movie-card"
            onClick={() => handleMovieSelect(movie)}
          >
            <h3>{movie.title}</h3>
            <MovieDetails tmdbId={movie.tmdb_id} />
          </div>
        ))}
      </div>
    );
  }
};
export default MovieCard;
