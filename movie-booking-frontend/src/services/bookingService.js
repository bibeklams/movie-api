import api from "./api";

export const bookMovie = async (id, bookingData) => {
  const res = await api.post(`/bookings/${id}`, bookingData);

  return res.data;
};

export const getMyBookings = async () => {
  const res = await api.get("/bookings");
  return res.data;
};
export const cancelBooking = async (id) => {
  const res = await api.put(`/bookings/${id}/cancel`);
  return res.data;
};
