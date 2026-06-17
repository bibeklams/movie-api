import api from "./api";

export const register = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
export const login = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};
export const getProfile = async () => {
  const res = await api.get("/auth/profile");
  return res.data;
};
export const logoutApi = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};
export const changePassword = async (passwordData) => {
  const res = await api.put("/auth/change-password", passwordData);
  return res.data;
};
export const changeProfile = async (profileData) => {
  const res = await api.put("/auth/change-profile", profileData);
  return res.data;
};
export const forgetPassword = async (data) => {
  const res = await api.put("/auth/forget-password", data);
  return res.data;
};

export const resetPassword = async (token, newPassword) => {
  const res = await api.put(`/auth/reset-password/${token}`, { newPassword });

  return res.data;
};
