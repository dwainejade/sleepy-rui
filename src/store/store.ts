import { create } from "zustand";

interface MovieState {
  page: number;
  setPage: (page: number) => void;
  mediaType: string;
  setMediaType: (mediaType: string) => void;
}

export const useMovieStore = create<MovieState>((set) => ({
  page: 1,
  mediaType: "movies",
  setMediaType: (mediaType) => set({ mediaType }),
  setPage: (page) => set({ page }),
}));
