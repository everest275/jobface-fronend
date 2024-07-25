import { createContext, useState, ReactNode, FC, useEffect } from 'react';
import { loginRequest, registerRequest, verifyEmailRequest, verifyTokenRequest } from './AuthService';
import { RegisterUser, LoginUser } from './AuthService';
import Cookies from 'js-cookie'

interface AuthContextType {
  user: LoginUser | null;
  verifyUser: RegisterUser | null;
  signup: (pass: string) => Promise<void>;
  signin: (user: LoginUser) => Promise<void>;
  verifyEmail: (user: RegisterUser) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
  code: string;
  errors: string[]; // Cambia a string[]
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

interface ApiError {
  response: {
    data: string[];
  };
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<LoginUser | null>(null);
  const [verifyUser, setVerifyUser] = useState<RegisterUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState<string>("")

  const signup = async (pass: string) => {
    
    try {
      if (verifyUser) {
       
        verifyUser.pass = pass
        console.log(verifyUser)
        const result = await registerRequest(verifyUser);
        setUser(result);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  };

  const verifyEmail = async (user: RegisterUser) => {
    try {
      const result = await verifyEmailRequest(user.email);
      setCode(result);
      setVerifyUser(user)
    } catch (error) {
      console.error('Error during signup:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  };

  const signin = async (userData: LoginUser) => {
    try {
      const result = await loginRequest(userData);
      setUser(result);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error during signin:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  };

  const logout = async () => {
    try {

      Cookies.remove('token')
      setIsAuthenticated(false)
      setUser(null)
      // setLoading(false)
    } catch (error) {
      console.error('Error during logout:', error);
      if ((error as ApiError).response && (error as ApiError).response.data) {
        setErrors((error as ApiError).response.data);
      } else {
        setErrors(['Unknown error occurred']);
      }
    }
  };



  useEffect(() => {
    async function checklogin() {
      const cookies = Cookies.get()
      if (!cookies.token) {
        setIsAuthenticated(false)
        setLoading(false)
        return setUser(null)
      }

      try {
        const res = await verifyTokenRequest()
        if (!res) {
          setIsAuthenticated(false)
          setLoading(false)
          return;
        }
        setLoading(false)
        setIsAuthenticated(true)
        setUser(res)

      } catch (error) {
        setIsAuthenticated(false)
        setUser(null)
        setLoading(false)
      }

    }
    checklogin()
  }, [])

  return (
    <AuthContext.Provider value={{ user, verifyUser, code, verifyEmail, logout, signup, signin, loading, isAuthenticated, errors }}>
      {children}
    </AuthContext.Provider>
  );
};
