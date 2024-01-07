export interface Movie {
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
const TMDB_API_KEY = "fe83f410ea31af5d6f64a7a00e0d5832"; // Replace with your actual API key

// Function to fetch movies
export const fetchMovies = async (
  page: number = 1,
  mediaType: string = "movie",
): Promise<MoviesApiResponse> => {
  const response = await fetch(
    `https://vidsrc.xyz/${mediaType}/latest/page-${page}.json`,
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
};

// Function to fetch movie details from TMDb API
export const fetchMovieDetails = async (
  tmdbId: string,
  mediaType: string,
): Promise<any> => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer fe83f410ea31af5d6f64a7a00e0d5832",
    },
  };
  const media = mediaType === "movies" ? "movie" : "tv";

  const url = `https://api.themoviedb.org/3/${media}/${tmdbId}?api_key=${TMDB_API_KEY}&language=en-US`;

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  const data = await response.json();
  return data;
};

// Function to search movies in TMDb
export const searchMoviesInTMDb = async (
  query: string,
  mediaType: string,
): Promise<any> => {
  const media = mediaType === "movies" ? "movie" : "tv";
  const url = `https://api.themoviedb.org/3/search/${media}?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(
    query,
  )}`;
  console.log(url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }

  return response.json();
};
