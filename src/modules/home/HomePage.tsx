import { useAuth } from '../../context/useAuth';
import PortfolioPage from '../portfolio/PortfoliosPage';

export default function HomePage() {
    const { isAuthenticated } = useAuth();


    return (
        <div>
            {isAuthenticated ? (
                <section>
                    <PortfolioPage />
                </section>
            ) : (
                <h1>Bienvenido a ROURUS.COM </h1>
            )}
        </div>
    );
}
