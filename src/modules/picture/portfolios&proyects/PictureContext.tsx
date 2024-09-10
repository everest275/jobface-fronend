import { createContext, ReactNode, FC, useCallback, useState } from 'react';
import { changeProyectPictureRequest, changeRequest, deleteRequest, getAllByProyectIdRequest, getAllByProyectIdRequestPublic, getByIdProyectPictureRequest, getByIdRequest, getByPortfolioIdPublicRequest, getByPortfolioIdRequest, getByProyectIdRequest, PortfolioPicture, portfolioPicturesRequest, ProyectPicture, proyectPicturesRequest, PullPortfolioPicture, PullProyectPicture, uploadProyectPictureRequest, uploadRequest } from './PictureService'

interface PortfolioPictureContextType {
  getPortfolioPictures: () => Promise<void>;
  getProyectPictures: () => Promise<void>;

  getPortfolioPictureById: (id: string) => Promise<PortfolioPicture | null>;
  getProyectPictureById: (id: string) => Promise<PortfolioPicture | null>;

  getPortfolioPictureByPortfolioId: (id: string) => Promise<PortfolioPicture | null>;
  getProyectPictureByProyectId: (id: string) => Promise<ProyectPicture | null>;
  getAllProyectPictureByProyectId: (id: string) => Promise<ProyectPicture | null>;
  getProyectPictureByIdPublic: (id: string) => Promise<PortfolioPicture | null>;

  getProyectPictureByProyectIdPublic: (id: string) => Promise<ProyectPicture | null>;
  getAllProyectPicturesByProyectIdPublic: (id: string) => Promise<ProyectPicture | null>;
  getPortfolioPictureByPortfolioIdPublic: (id: string) => Promise<PortfolioPicture | null>;

  changePortfolioPicture: (id: string, newPicture: PullPortfolioPicture) => Promise<void>;
  changeProyectPicture: (id: string, updatedProyect: PullProyectPicture) => Promise<void>;

  updatePortfolioPicture: (updatedPicture: PullPortfolioPicture) => Promise<void>;
  updateProyectPicture: (updatedPicture: PullProyectPicture) => Promise<void>;

  deletePortfolioPicture: (id: string) => Promise<void>;
  deleteProyectPicture: (id: string) => Promise<void>;

  portfolioPictures: PortfolioPicture[];
  portfolioPicture: PortfolioPicture | null;

  proyectPictures: ProyectPicture[];
  proyectPicture: ProyectPicture | null;

  errors: string[];
}

export const PortfolioPictureContext = createContext<PortfolioPictureContextType | undefined>(undefined);

interface PortfolioPictureProps {
  children: ReactNode;
}

interface ApiError {
  response: {
    data: string[];
  };
}

export const PortfolioPictureProvider: FC<PortfolioPictureProps> = ({ children }) => {

  const [portfolioPictures, setPortfolioPictures] = useState([]);
  const [proyectPictures, setProyectPictures] = useState([]);
  const [portfolioPicture, setPortfolioPicture] = useState<PortfolioPicture | null>(null);
  const [proyectPicture, setProyectPicture] = useState<ProyectPicture | null>(null);
  const [errors, setErrors] = useState<string[]>([]);



  const getPortfolioPictures = useCallback(async () => {
    try {
      const res = await portfolioPicturesRequest();
      setPortfolioPictures(res);
    } catch (error) {
      console.error('Error during portfolio pictures:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  }, [setPortfolioPictures]);



  const getProyectPictures = useCallback(async () => {
    try {
      const res = await proyectPicturesRequest();
      setProyectPictures(res);
    } catch (error) {
      console.error('Error during proyect pictures:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  }, [setProyectPictures]);


  const getPortfolioPictureById = useCallback(async (id: string) => {
    try {
      const res = await getByIdRequest(id);
      setPortfolioPicture(res)
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

  const getProyectPictureById = useCallback(async (id: string) => {
    try {
      const res = await getByIdProyectPictureRequest(id);
      setPortfolioPicture(res)
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

  const getProyectPictureByIdPublic = useCallback(async (id: string) => {
    try {
      const res = await getByIdProyectPictureRequest(id);
      setProyectPicture(res)
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


  const getPortfolioPictureByPortfolioId = useCallback(async (id: string) => {
    try {
      const res = await getByPortfolioIdRequest(id);
      setPortfolioPicture(res)
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

  const getAllProyectPictureByProyectId = useCallback(async (id: string) => {
    try {
      const res = await getAllByProyectIdRequest(id);
      setProyectPictures(res)
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

  const getProyectPictureByProyectId = useCallback(async (id: string) => {
    try {
      const res = await getByProyectIdRequest(id);
      setProyectPicture(res)
      return res;
    } catch (error) {
      console.error('Error during getProyectPictureByProyectId:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
      return null;
    }
  }, []);

  const getPortfolioPictureByPortfolioIdPublic = useCallback(async (id: string) => {
    try {
      const res = await getByPortfolioIdPublicRequest(id);
      setPortfolioPicture(res)
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

  const getProyectPictureByProyectIdPublic = useCallback(async (id: string) => {
    try {
      const res = await getByPortfolioIdPublicRequest(id);
      setPortfolioPicture(res)
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

  const getAllProyectPicturesByProyectIdPublic = useCallback(async (id: string) => {
    try {
      const res = await getAllByProyectIdRequestPublic(id);
      setProyectPictures(res)
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


  const updatePortfolioPicture = useCallback(async (newPicture: PullPortfolioPicture) => {
    try {
      await uploadRequest(newPicture);
      getPortfolioPictures()
      portfolioPictures
    } catch (error) {
      console.error('Error during signup:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  }, [getPortfolioPictures, portfolioPictures]);

  

  const updateProyectPicture = useCallback(async (newPicture: PullProyectPicture) => {
    try {
      await uploadProyectPictureRequest(newPicture);
      getProyectPictures()
      proyectPictures
    } catch (error) {
      console.error('Error during update proyect picture:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  }, [getProyectPictures, proyectPictures]);

  const changePortfolioPicture = useCallback(async (id: string, updatedPortfolio: PullPortfolioPicture) => {
    try {
      await changeRequest(id, updatedPortfolio);
      getPortfolioPictures()
      portfolioPictures
    } catch (error) {
      console.error('Error during signup:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  }, [getPortfolioPictures, portfolioPictures]);

  const changeProyectPicture = useCallback(async (id: string, updatedProyect: PullProyectPicture) => {
    try {
      await changeProyectPictureRequest(id, updatedProyect);
      getProyectPictures()
      proyectPictures
    } catch (error) {
      console.error('Error during signup:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  }, [getProyectPictures, proyectPictures]);

  const deletePortfolioPicture = useCallback(async (id: string) => {
    try {
      await deleteRequest(id);
      getPortfolioPictures()
      portfolioPictures
    } catch (error) {
      console.error('Error during signup:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  }, [getPortfolioPictures, portfolioPictures]);


  const deleteProyectPicture = useCallback(async (id: string) => {
    try {
      await deleteProyectPicture(id);
      getProyectPictures()
      proyectPictures
    } catch (error) {
      console.error('Error during signup:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  }, [getProyectPictures, proyectPictures]);

  return (
    <PortfolioPictureContext.Provider value={{ portfolioPicture, errors, portfolioPictures, proyectPicture, proyectPictures, deleteProyectPicture, changeProyectPicture, getProyectPictureByProyectId,getProyectPictureByIdPublic,getProyectPictureById,getAllProyectPictureByProyectId,getAllProyectPicturesByProyectIdPublic, updateProyectPicture, getProyectPictureByProyectIdPublic, getProyectPictures, getPortfolioPictureByPortfolioIdPublic, getPortfolioPictureByPortfolioId, getPortfolioPictures, getPortfolioPictureById, updatePortfolioPicture, changePortfolioPicture, deletePortfolioPicture }}>
      {children}
    </PortfolioPictureContext.Provider>
  );
};
