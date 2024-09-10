import { createContext, ReactNode, FC, useState, useCallback } from 'react';
import { PortfolioReview,  PullPortfolioReview, createRequest, deleteRequest, getByIdRequest, portfolioReviewsRequest, publlicGetReviewsByPortfolioRequest, responseRequest, sendedRequest, updateRequest, userPortfolioReview, usersRequest } from './ReviewService'
import { User } from '../../auth/AuthService';

interface PortfolioReviewContextType {
  getPortfolioReviews: () => Promise<void>;
  pendingReviewsByPortfolio: (id: string) => Promise<void>;
  sendedReviewsByPortfolio: (id: string) => Promise<void>;
  successReviewsByPortfolio: (id: string) => Promise<void>;
  getUsers: () => Promise<void>;
  publicGetPortfolioReviewsByPortfolio: (id: string) => Promise<void>;
  getPortfolioReviewById: (id: string) => Promise<PortfolioReview | null>;
  createPortfolioReview: (newPortfolio: PullPortfolioReview) => Promise<void>;
  updatePortfolioReview: (id: string, updatedPortfolio: PullPortfolioReview) => Promise<void>;
  sendedUserPortfolioReview: (newPortfolio: userPortfolioReview) => Promise<void>;
  responseUserPortfolioReview: (id: string, updatedPortfolio: userPortfolioReview) => Promise<void>;
  deletePortfolioReview: (id: string) => Promise<void>;
  portfolioReviews: PortfolioReview[];
  pendingPortfolioReviews: PortfolioReview[];
  sendedPortfolioReviews: PortfolioReview[];
  successPortfolioReviews: PortfolioReview[];
  users: User[];
  portfolioReview: PortfolioReview | null;
  errors: string[];
}

export const PortfolioReviewContext = createContext<PortfolioReviewContextType | undefined>(undefined);

interface PortfolioReviewProviderProps {
  children: ReactNode;
}

interface ApiError {
  response: {
    data: string[];
  };
}

export const PortfolioReviewProvider: FC<PortfolioReviewProviderProps> = ({ children }) => {

  const [portfolioReviews, setPortfolioReviews] = useState([]);
  const [pendingPortfolioReviews, setPendingPortfolioReviews] = useState([]);
  const [successPortfolioReviews, setSuccessPortfolioReviews] = useState([]);
  const [sendedPortfolioReviews, setSendedPortfolioReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [portfolioReview, setPortfolioReview] = useState<PortfolioReview | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const getPortfolioReviews = useCallback(async () => {
    try {
      const res = await portfolioReviewsRequest();
      setPortfolioReviews(res);
    } catch (error) {
      console.error('Error during portfolio reviews:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  }, []);

  const getUsers = useCallback(async () => {
    try {
      const res = await usersRequest();
      setUsers(res);
    } catch (error) {
      console.error('Error during users:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  }, []);

  const publicGetPortfolioReviewsByPortfolio = useCallback(async (id: string) => {
    try {
      const res = await publlicGetReviewsByPortfolioRequest(id);
      setPortfolioReviews(res);
      
    } catch (error) {
      console.error('Error during portfolio reviews:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  }, []);

  const pendingReviewsByPortfolio = useCallback(async (id: string) => {
    try {
      const res = await publlicGetReviewsByPortfolioRequest(id);
      const filteredReviews = res.filter((review: PortfolioReview) => review.is_accept === "a295ecf9-2c6d-4908-adbd-f2520bd8b274");
      setPendingPortfolioReviews(filteredReviews);
      
    } catch (error) {
      console.error('Error during portfolio reviews:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  }, []);

  const successReviewsByPortfolio = useCallback(async (id: string) => {
    try {
      const res = await publlicGetReviewsByPortfolioRequest(id);
      const filteredReviews = res.filter((review: PortfolioReview) => review.is_accept === "0a1a80e2-7b96-48f1-9a01-5300ff27df36");
      setSuccessPortfolioReviews(filteredReviews);
      
    } catch (error) {
      console.error('Error during portfolio reviews:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  }, []);

  const sendedReviewsByPortfolio = useCallback(async (id: string) => {
    try {
      const res = await publlicGetReviewsByPortfolioRequest(id);
      const filteredReviews = res.filter((review: PortfolioReview) => review.is_accept === "e08214cf-8b66-4f5b-bc7b-b70d5542108d");
      setSendedPortfolioReviews(filteredReviews);
      
    } catch (error) {
      console.error('Error during portfolio reviews:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  }, []);

  const getPortfolioReviewById = useCallback(async (id: string) => {
    try {
      const res = await getByIdRequest(id);
      setPortfolioReview(res)
      return res;
    } catch (error) {
      console.error('Error during portfolio reviews:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
      return null;
    }
  }, []);

  const createPortfolioReview = useCallback(async (newPortfolio: PullPortfolioReview) => {
    try {
      await createRequest(newPortfolio);
      getPortfolioReviews()
      portfolioReviews
    } catch (error) {
      console.error('Error during portfolio reviews:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  }, [getPortfolioReviews, portfolioReviews]);


  const sendedUserPortfolioReview = useCallback(async (newPortfolio: userPortfolioReview) => {
    try {
      await sendedRequest(newPortfolio);
      getPortfolioReviews()
      portfolioReviews
    } catch (error) {
      console.error('Error during user portfolio reviews:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  }, [getPortfolioReviews, portfolioReviews]);


  const updatePortfolioReview = useCallback(async (id: string, updatedPortfolio: PullPortfolioReview) => {
    try {
      await updateRequest(id, updatedPortfolio);
      getPortfolioReviews()
      portfolioReviews
    } catch (error) {
      console.error('Error during portfolio reviews:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  }, [getPortfolioReviews, portfolioReviews]);

  
  const responseUserPortfolioReview = useCallback(async (id: string, updatedPortfolio: userPortfolioReview) => {
    try {
      await responseRequest(id, updatedPortfolio);
      getPortfolioReviews()
      portfolioReviews
    } catch (error) {
      console.error('Error during portfolio reviews:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  }, [getPortfolioReviews, portfolioReviews]);

  const deletePortfolioReview = useCallback(async (id: string) => {
    try {
      await deleteRequest(id);
      getPortfolioReviews()
      portfolioReviews
    } catch (error) {
      console.error('Error during portfolio reviews:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  }, [getPortfolioReviews, portfolioReviews]);

  return (
    <PortfolioReviewContext.Provider value={{ users,pendingPortfolioReviews,sendedPortfolioReviews,successPortfolioReviews,successReviewsByPortfolio,sendedReviewsByPortfolio,pendingReviewsByPortfolio,responseUserPortfolioReview,sendedUserPortfolioReview,getUsers,portfolioReview, publicGetPortfolioReviewsByPortfolio, getPortfolioReviews, getPortfolioReviewById,  createPortfolioReview, updatePortfolioReview, deletePortfolioReview, portfolioReviews, errors }}>
      {children}
    </PortfolioReviewContext.Provider>
  );
};
