import { create } from "zustand";

interface MovieDetail {
  tmdb_id: string;
  title: string;
  // ...include other details you need
}

interface MovieState {
  page: number;
  setPage: (page: number) => void;
  mediaType: string;
  setMediaType: (mediaType: string) => void;

  selectedMovie: MovieDetail | null;
  setSelectedMovie: (movie: MovieDetail | null) => void;
}

export const useMovieStore = create<MovieState>((set) => ({
  page: 1,
  mediaType: "movies",
  setMediaType: (mediaType) => set({ mediaType }),
  setPage: (page) => set({ page }),

  selectedMovie: null,
  setSelectedMovie: (movie) => set({ selectedMovie: movie }),
}));
