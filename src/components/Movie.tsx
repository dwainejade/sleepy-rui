import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../utils/api";
import MovieDetails from "./MovieDetails";

// Component to display movies
const Movie = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });
  console.log(data);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="movie-container">
      {data?.result.map((movie) => (
        <div key={movie.tmdb_id} className="movie-card">
          <h3>{movie.title}</h3>
          <MovieDetails tmdbId={movie.tmdb_id} />
        </div>
      ))}
    </div>
  );
};

export default Movie;
