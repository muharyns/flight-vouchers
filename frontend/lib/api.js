import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Laravel backend
  headers: {
    "Content-Type": "application/json",
  },
});

export const getVouchers = async (page = 1) => {
  const response = await api.get(`/vouchers?page=${page}`);
  return response.data;
};

// ============================
// DELETE VOUCHER
// ============================
export const deleteVoucher = async (id) => {
  const response = await api.delete(`/vouchers/${id}`);
  return response.data;
};

/* =======================
   CREW API
======================= */
export const getCrews = (page = 1) =>
  api.get(`/crews?page=${page}`).then(res => res.data);

export const createCrew = data =>
  api.post("/crews", data).then(res => res.data);

export const updateCrew = (id, data) =>
  api.put(`/crews/${id}`, data).then(res => res.data);

export const deleteCrew = id =>
  api.delete(`/crews/${id}`).then(res => res.data);


/* =======================
   FLIGHT API
======================= */
export const getFlights = (page = 1) =>
  api.get(`/flights?page=${page}`).then(res => res.data);

export const createFlight = data =>
  api.post("/flights", data).then(res => res.data);

export const updateFlight = (id, data) =>
  api.put(`/flights/${id}`, data).then(res => res.data);

export const deleteFlight = id =>
  api.delete(`/flights/${id}`).then(res => res.data);


export default api;
