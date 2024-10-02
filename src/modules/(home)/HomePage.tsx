import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hook/useAuthfaceContext';


export default function HomePage() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) return <Navigate to='/portfolios' replace />

    if (!isAuthenticated) return
    <div>
        <h1>Bienvenido a ROURUS.COM </h1>
    </div>

}
