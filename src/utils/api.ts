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
