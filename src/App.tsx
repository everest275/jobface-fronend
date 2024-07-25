import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './modules/auth/login/LoginPage'
import PublicProyects from './modules/proyects/PublicProyects'
import RegisterPage from '../src/modules/auth/register/RegisterPage'
import { AuthProvider } from './modules/auth/AuthContext'
import PortfolioFormPage from './modules/portfolio/PortfolioForm'
import PortfolioPage from './modules/portfolio/PortfoliosPage'
import ProfilePage from './modules/profile/ProfilePage'
import ProtectedRoutes from './routes/ProtectedRoutes'
import Navbar from './modules/home/Navbar'
import { PortfolioProvider } from './modules/portfolio/PortfolioContext'
import { PortfolioProyectProvider } from './modules/portfolio-proyect/PortfolioProyectContext'
import PortfolioProyectForm from './modules/portfolio-proyect/PortfolioProyectForm'
import { PortfolioPictureProvider } from './modules/pictures/PictureContext'
import PortfolioProyectPage from './modules/portfolio-proyect/PortfolioProyectPage'

function App() {

  return (
    <AuthProvider>
      <PortfolioProvider>
        <PortfolioProyectProvider>
          <PortfolioPictureProvider>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<PublicProyects />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/:id' element={<PublicProyects />} />
                <Route element={<ProtectedRoutes />}>
                  <Route path='portfolios/:id' element={<><Navbar><PortfolioFormPage /></Navbar></>} />
                  <Route path='/portfolios' element={<><Navbar><PortfolioPage /></Navbar></>} />
                  <Route path='/add-portfolio' element={<><Navbar> <PortfolioFormPage /></Navbar></>} />
                  <Route path='/add-portfolio-proyect/:portfolio' element={<><Navbar><PortfolioProyectForm /></Navbar></>} />
                  <Route path='/portfolio-proyect/:id' element={<><Navbar><PortfolioProyectForm /></Navbar></>} />
                  <Route path='/portfolio-proyects/:id' element={<><Navbar><PortfolioProyectPage/></Navbar></>} />
                  <Route path='/profile' element={<><Navbar><ProfilePage /></Navbar></>} />
                </Route>
              </Routes>
            </BrowserRouter>
          </PortfolioPictureProvider>
        </PortfolioProyectProvider>
      </PortfolioProvider>
    </AuthProvider>
  )
}

export default App
