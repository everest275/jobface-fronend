import axios from '../libs/axios';
import { useCallback } from 'react';

export const useRequestServices = () => {
  const getRequest = useCallback(async (route: string, id?: string) => {
    try {
      const result = await axios.get(`${route}${id ? `/${id}` : ""}`);
      return result.data;
    } catch (error) {
      console.error("Error in getRequest:", error);
      throw error;
    }
  }, []);

  const postRequest = useCallback(async (route: string, user: object) => {
    try {
      const result = await axios.post(route, user);
      return result.data;
    } catch (error) {
      console.error("Error in postRequest:", error);
      throw error;
    }
  }, []);

  const putRequest = useCallback(async (route: string, id: string, user: object) => {
    try {
      const result = await axios.put(`${route}/${id}`, user);
      return result.data;
    } catch (error) {
      console.error("Error in putRequest:", error);
      throw error;
    }
  }, []);

  const deleteRequest = useCallback(async (route: string, id: string) => {
    try {
      const result = await axios.delete(`${route}/${id}`);
      return result.data;
    } catch (error) {
      console.error("Error in deleteRequest:", error);
      throw error;
    }
  }, []);

  return {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest,
  };
};
