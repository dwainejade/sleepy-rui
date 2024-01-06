interface Movie {
  imdb_id: string;
  tmdb_id: string;
  title: string;
  embed_url: string;
  embed_url_tmdb: string;
}

export interface MoviesApiResponse {
  result: Movie[];
  pages: number;
}

// Function to fetch movies
export const fetchMovies = async (): Promise<MoviesApiResponse> => {
  const response = await fetch("https://vidsrc.xyz/movies/latest/page-1.json");

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
};

// Function to fetch movie details from TMDb API
export const fetchMovieDetails = async (tmdbId: string): Promise<any> => {
  const apiKey = "fe83f410ea31af5d6f64a7a00e0d5832"; // Replace with your actual API key
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer fe83f410ea31af5d6f64a7a00e0d5832",
    },
  };

  const url = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${apiKey}&language=en-US`;

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  const data = await response.json();
  return data;
};
