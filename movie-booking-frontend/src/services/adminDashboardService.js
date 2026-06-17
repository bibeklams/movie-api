import api from "./api";

export const adminDashboard = async () => {
  const res = await api.get("/admin/dashboard");
  return res.data;
};
export const getUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};
export const getAllBookings = async () => {
  const res = await api.get("/admin/bookings");
  return res.data;
};
