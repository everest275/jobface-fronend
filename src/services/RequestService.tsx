import axios from '../libs/axios';

export const useRequestServices = () => {
  const getRequest = async (route: string, id?: string) => {
    try {
      const result = await axios.get(`${route}${id ? `/${id}` : ""}`);
      return result.data;
    } catch (error) {
      console.error("Error in getRequest:", error);
      throw error;
    }
  };

  const postRequest = async (route: string, user: object) => {
    try {
      const result = await axios.post(route, user);
      return result.data;
    } catch (error) {
      console.error("Error in postRequest:", error);
      throw error;
    }
  };

  const putRequest = async (route: string, id: string, user: object) => {
    try {
      const result = await axios.put(`${route}/${id}`, user);
      return result.data;
    } catch (error) {
      console.error("Error in putRequest:", error);
      throw error;
    }
  };

  const deleteRequest = async (route: string, id: string) => {
    try {
      const result = await axios.delete(`${route}/${id}`);
      return result.data;
    } catch (error) {
      console.error("Error in deleteRequest:", error);
      throw error;
    }
  };

  return {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest,
  };
};
