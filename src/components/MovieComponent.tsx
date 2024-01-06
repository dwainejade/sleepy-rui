import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../utils/api";

// Component to display movies
const MovieComponent = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {data?.result.map((movie) => (
        <div key={movie.tmdb_id}>
          <h3>{movie.title}</h3>
          <h4>{movie.tmdb_id}</h4>
        </div>
      ))}
    </div>
  );
};

export default MovieComponent;
