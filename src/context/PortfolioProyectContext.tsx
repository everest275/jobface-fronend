import { createContext, ReactNode, FC, useState, useCallback } from 'react';
import { Proyect, PullProyect, createRequest, deleteRequest, getByIdRequest, portfolioProyectsRequest, publlicGetProyectsByPortfolioRequest, updateRequest } from '../services/PortfolioProyectService'

interface PortfolioProyectContextType {
  getPortfolioProyects: () => Promise<void>;
  publicGetPortfolioProyectsByPortfolio: (id: string) => Promise<void>;
  getPortfolioProyectById: (id: string) => Promise<Proyect | null>;
  createPortfolioProyect: (newPortfolio: PullProyect) => Promise<void>;
  updatePortfolioProyect: (id: string, updatedPortfolio: PullProyect) => Promise<void>;
  deletePortfolioProyect: (id: string) => Promise<void>;
  portfolioProyects: Proyect[];
  portfolioProyect: Proyect | null;

  errors: string[];
}

export const PortfolioProyectContext = createContext<PortfolioProyectContextType | undefined>(undefined);

interface PortfolioProyectProviderProps {
  children: ReactNode;
}

interface ApiError {
  response: {
    data: string[];
  };
}

export const PortfolioProyectProvider: FC<PortfolioProyectProviderProps> = ({ children }) => {

  const [portfolioProyects, setPortfolioProyects] = useState([]);
  const [portfolioProyect, setPortfolioProyect] = useState<Proyect | null>(null);
  const [errors, setErrors] = useState<string[]>([]);



  const getPortfolioProyects = useCallback(async () => {
    try {
      const res = await portfolioProyectsRequest();
      setPortfolioProyects(res);
    } catch (error) {
      console.error('Error during signup:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  }, []); // El array vacío asegura que esta función no cambie


  const publicGetPortfolioProyectsByPortfolio = useCallback(async (id: string) => {
    try {
      const res = await publlicGetProyectsByPortfolioRequest(id);
      setPortfolioProyects(res);
      
    } catch (error) {
      console.error('Error during signup:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
    
  }, []); // El array vacío asegura que esta función no cambie

  const getPortfolioProyectById = useCallback(async (id: string) => {
    try {
      const res = await getByIdRequest(id);
      setPortfolioProyect(res)
      return res;
    } catch (error) {
      console.error('Error during getPortfolioById:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
      return null;
    }
  }, []);

  const createPortfolioProyect = useCallback(async (newPortfolio: PullProyect) => {
    try {
      await createRequest(newPortfolio);
      getPortfolioProyects()
      portfolioProyects
    } catch (error) {
      console.error('Error during signup:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  }, [getPortfolioProyects, portfolioProyects]);

  const updatePortfolioProyect = useCallback(async (id: string, updatedPortfolio: PullProyect) => {
    try {
      await updateRequest(id, updatedPortfolio);
      getPortfolioProyects()
      portfolioProyects
    } catch (error) {
      console.error('Error during signup:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  }, [getPortfolioProyects, portfolioProyects]);

  const deletePortfolioProyect = useCallback(async (id: string) => {
    try {
      await deleteRequest(id);
      getPortfolioProyects()
      portfolioProyects
    } catch (error) {
      console.error('Error during signup:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  }, [getPortfolioProyects, portfolioProyects]);

  return (
    <PortfolioProyectContext.Provider value={{ portfolioProyect, publicGetPortfolioProyectsByPortfolio, getPortfolioProyects, getPortfolioProyectById: getPortfolioProyectById, createPortfolioProyect, updatePortfolioProyect, deletePortfolioProyect, portfolioProyects, errors }}>
      {children}
    </PortfolioProyectContext.Provider>
  );
};
