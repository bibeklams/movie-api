import api from "./api";

export const addMovie = async (data) => {
  const res = await api.post("/movies", data);
  return res.data;
};

export const getMovies = async () => {
  const res = await api.get("/movies");
  return res.data;
};

export const getMovieById = async (id) => {
  const res = await api.get(`/movies/${id}`);
  return res.data;
};
export const deleteMovie = async (id) => {
  const res = await api.delete(`/movies/${id}`);
  return res.data;
};
export const updateMovie = async (id, data) => {
  const res = await api.put(`/movies/${id}`, data);
  return res.data;
};
