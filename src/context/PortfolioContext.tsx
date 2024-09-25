import { createContext, ReactNode, FC, useState, useEffect, useCallback } from 'react';
import { Portfolio, PullPortfolio, createRequest, deleteRequest, getByIdRequest, portfoliosRequest, publicGetByIdRequest, updateRequest } from '../services/PortfolioService'
import { Proyect, publlicGetProyectsByPortfolioRequest } from '../services/PortfolioProyectService'

interface PortfolioContextType {
  getPortfolios: () => Promise<void>;
  toEdit: (portfolio: object) => void;
  getPortfolioById: (id: string) => Promise<Portfolio | null>;
  publicGetPortfolioById: (id: string) => void;
  createPortfolio: (newPortfolio: PullPortfolio) => Promise<void>;
  updatePortfolio: (id: string, updatedPortfolio: PullPortfolio) => Promise<void>;
  publicGetPortfolioProyectsByPortfolio: (id: string) => Promise<void>;
  deletePortfolio: (id: string) => Promise<void>;
  portfolios: Portfolio[];
  setPortfolios: React.Dispatch<React.SetStateAction<Portfolio[]>>; portfolio: Portfolio | null;
  setPortfolio: React.Dispatch<React.SetStateAction<Portfolio | null>>; 
  setId: (id: string) => void;
  portfolioToEdit: object;
  portfolioId: string;
  errors: string[];
  portfolioProyects: Proyect[];
}


export const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

interface PortfolioProviderProps {
  children: ReactNode;
}

interface ApiError {
  response: {
    data: string[];
  };
}

export const PortfolioProvider: FC<PortfolioProviderProps> = ({ children }) => {

  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [portfolioToEdit, setPortfolioToEdit] = useState({});
  const [portfolioId, setPortfolioId] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [portfolioProyects, setPortfolioProyects] = useState([]);


  const toEdit = (newPortfolio: object) => {
    setPortfolioToEdit(newPortfolio)
  }
  const setId = (id: string) => {
    setPortfolioId(id)
  }

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

  const getPortfolios = useCallback(async () => {
    try {
      const res = await portfoliosRequest();
      setPortfolios(res);
    } catch (error) {
      console.error('Error during signup:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  }, []); // El array vacío asegura que esta función no cambie

  useEffect(() => {
    getPortfolios();
  }, [getPortfolios]); // Ahora es seguro incluir `getPortfolios` en el array de dependencias

  const getPortfolioById = useCallback(async (id: string) => {
    try {
      const res = await getByIdRequest(id);
      setPortfolio(res)
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

  const publicGetPortfolioById = useCallback(async (id: string) => {
    try {
      const res = await publicGetByIdRequest(id);
      setPortfolio(res)
     
    } catch (error) {
      console.error('Error during getPortfolioById:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    
    }
  }, []);

  const createPortfolio = useCallback(async (newPortfolio: PullPortfolio) => {
    try {
      await createRequest(newPortfolio);
      getPortfolios()
      portfolios
    } catch (error) {
      console.error('Error during signup:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  }, [getPortfolios, portfolios]);

  const updatePortfolio = useCallback(async (id: string, updatedPortfolio: PullPortfolio) => {
    try {
      await updateRequest(id, updatedPortfolio);
      getPortfolios()
      portfolios
    } catch (error) {
      console.error('Error during signup:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  }, [getPortfolios, portfolios]);

  const deletePortfolio = useCallback(async (id: string) => {
    try {
      await deleteRequest(id);
      getPortfolios()
      portfolios
    } catch (error) {
      console.error('Error during signup:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  }, [getPortfolios, portfolios]);


  return (
    <PortfolioContext.Provider value={{ portfolioProyects, publicGetPortfolioProyectsByPortfolio, toEdit, setPortfolio,portfolioId, setPortfolios, setId, portfolioToEdit, portfolio, publicGetPortfolioById, getPortfolios, getPortfolioById, createPortfolio, updatePortfolio, deletePortfolio, portfolios, errors }}>
      {children}
    </PortfolioContext.Provider>
  );
};
