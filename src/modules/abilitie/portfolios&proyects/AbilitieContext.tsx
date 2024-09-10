import { createContext, ReactNode, FC, useState, useCallback } from 'react';
import { AllPortfolioAbilitie, PortfolioAbilitie, PullPortfolioAbilitie, createRequest, deleteRequest, getByIdRequest, portfolioAbilitiesRequest, publlicGetAbilitiesByPortfolioRequest, updateRequest } from './AbilitieService'

interface PortfolioProyectContextType {
  getPortfolioAbilities: () => Promise<void>;
  publicGetPortfolioAbilitiesByPortfolio: (id: string) => Promise<void>;
  getPortfolioAbilitieById: (id: string) => Promise<PortfolioAbilitie | null>;
  createPortfolioAbilitie: (newPortfolio: PullPortfolioAbilitie) => Promise<void>;
  updatePortfolioAbilitie: (id: string, updatedPortfolio: PullPortfolioAbilitie) => Promise<void>;
  deletePortfolioAbilitie: (id: string) => Promise<void>;
  portfolioAbilities: AllPortfolioAbilitie[] | null;
  portfolioAbilitie: PortfolioAbilitie | null;

  errors: string[];
}

export const PortfolioAbilitieContext = createContext<PortfolioProyectContextType | undefined>(undefined);

interface PortfolioAbilitieProviderProps {
  children: ReactNode;
}

interface ApiError {
  response: {
    data: string[];
  };
}

export const PortfolioAbilitieProvider: FC<PortfolioAbilitieProviderProps> = ({ children }) => {

  const [portfolioAbilities, setPortfolioAbilities] = useState<AllPortfolioAbilitie[] | null>(null);
  const [portfolioAbilitie, setPortfolioAbilitie] = useState<PortfolioAbilitie | null>(null);
  const [errors, setErrors] = useState<string[]>([]);



  const getPortfolioAbilities = useCallback(async () => {
    try {
      const res = await portfolioAbilitiesRequest();
      setPortfolioAbilities(res);
    } catch (error) {
      console.error('Error during portfolio abilities:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  }, []); // El array vacío asegura que esta función no cambie


  const publicGetPortfolioAbilitiesByPortfolio = useCallback(async (id: string) => {
    try {
      const res = await publlicGetAbilitiesByPortfolioRequest(id);
      setPortfolioAbilities(res);
      
    } catch (error) {
      console.error('Error during portfolio abilities:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
    
  }, []); // El array vacío asegura que esta función no cambie

  const getPortfolioAbilitieById = useCallback(async (id: string) => {
    try {
      const res = await getByIdRequest(id);
      setPortfolioAbilitie(res)
      return res;
    } catch (error) {
      console.error('Error during portfolio abilities:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
      return null;
    }
  }, []);

  const createPortfolioAbilitie = useCallback(async (newPortfolio: PullPortfolioAbilitie) => {
    try {
      await createRequest(newPortfolio);
      getPortfolioAbilities()
      portfolioAbilities
    } catch (error) {
      console.error('Error during portfolio abilities:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  }, [getPortfolioAbilities, portfolioAbilities]);

  const updatePortfolioAbilitie = useCallback(async (id: string, updatedPortfolio: PullPortfolioAbilitie) => {
    try {
      await updateRequest(id, updatedPortfolio);
      getPortfolioAbilities()
      portfolioAbilities
    } catch (error) {
      console.error('Error during portfolio abilities:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  }, [getPortfolioAbilities, portfolioAbilities]);

  const deletePortfolioAbilitie = useCallback(async (id: string) => {
    try {
      await deleteRequest(id);
      getPortfolioAbilities()
      portfolioAbilities
    } catch (error) {
      console.error('Error during portfolio abilities:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  }, [getPortfolioAbilities, portfolioAbilities]);

  return (
    <PortfolioAbilitieContext.Provider value={{ portfolioAbilitie, publicGetPortfolioAbilitiesByPortfolio, getPortfolioAbilities, getPortfolioAbilitieById,  createPortfolioAbilitie, updatePortfolioAbilitie, deletePortfolioAbilitie, portfolioAbilities, errors }}>
      {children}
    </PortfolioAbilitieContext.Provider>
  );
};
