import { useAuth } from '../../hook/useAuth';
import PortfolioPage from '../portfolio/PortfoliosPage';

export default function HomePage() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) return <section>
        <PortfolioPage />
    </section>
    return (
        <div>
            <h1>Bienvenido a ROURUS.COM </h1>
        </div>
    );
}
