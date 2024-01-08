import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../utils/api";
import { useMovieStore } from "../store/store";

const imageBaseUrl = "https://image.tmdb.org/t/p/";
const posterSize = "w500"; // You can choose other sizes as needed

const DetailsPage = () => {
  const { mediaType } = useMovieStore();
  const { tmdbId } = useParams(); // This hooks allow us to access the URL parameters
  const [movieDetails, setMovieDetails] = useState(null); // State to store movie details
  const [isLoading, setIsLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle any error


  if (isLoading) return <div>Loading...</div>; // Loading state
  if (error) return <div>Error: {error}</div>; // Error state
  if (!movieDetails) return <div>No movie details available</div>; // Check for no data

  // Display movie details
  return (
    <div>
      <h2>{movieDetails.title}</h2>
      <img
        src={`${imageBaseUrl}${posterSize}${movieDetails.poster_path}`}
        alt={movieDetails.title}
      />
      {/* You can add more details here as needed, like overview, genres, etc. */}
    </div>
  );
};

export default DetailsPage;
