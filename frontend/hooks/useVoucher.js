"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function useVoucher() {
  const [loading, setLoading] = useState(false);
  const [seats, setSeats] = useState([]);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [vouchers, setVouchers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loadingList, setLoadingList] = useState(false);


  const generateVoucher = async (formData) => {
    setLoading(true);
    setError(null);
    setSeats([]);
;
    try {
    
      const check = await api.post("/check", {
        flightNumber: formData.flightNumber,
        date: formData.date,
      });

      if (check.data.exists) {
        setError(check.data.message || "Voucher already exists for this flight and date");
        return;
      }

    
      const response = await api.post("/generate", formData);
      return response 
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setError(err.response?.data?.message || "An error occurred");
      }
      
      return false;
    } finally { 
      setLoading(false);
    }
  };


  
  const fetchVouchers = async (page = 1) => {
    try {
      setLoadingList(true);

      const response = await api.get(`/vouchers?page=${page}`);

      setVouchers(response.data.data);
      setCurrentPage(response.data.current_page);
      setLastPage(response.data.last_page);
    } catch (error) {
      console.error("Error fetching vouchers:", error);
    } finally {
      setLoadingList(false);
    }
  };

  const handleDeleteVoucher = async (id) => {
    try {
      await api.delete(`/vouchers/${id}`);
      fetchVouchers(currentPage); // refresh list
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };



  return {
    vouchers,
    currentPage,
    lastPage,
    loadingList,
    fetchVouchers,
    setCurrentPage,
    handleDeleteVoucher,
    generateVoucher,
   seats,
    errors,
    error,
    loading,
    error,
    errors,
  };
}
