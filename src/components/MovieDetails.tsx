import React, { useEffect, useState } from "react";
import { fetchMovieDetails } from "../utils/api";

const imageBaseUrl = "https://image.tmdb.org/t/p/";
const posterSize = "w500"; // You can choose other sizes as needed

const MovieDetails = ({ tmdbId }: { tmdbId: string }) => {
  const [movieDetails, setMovieDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const details = await fetchMovieDetails(tmdbId);
        setMovieDetails(details);
        setIsLoading(false);
      } catch (error: any) {
        setError("Failed to fetch movie details");
        setIsLoading(false);
      }
    };

    getMovieDetails();
  }, [tmdbId]);

  if (isLoading) return <div>Loading details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <img
      className="movie-poster"
      src={`${imageBaseUrl}${posterSize}${movieDetails?.poster_path}`}
      alt={movieDetails?.title || "Movie poster"}
    />
  );
};

export default MovieDetails;
