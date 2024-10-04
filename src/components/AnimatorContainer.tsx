import { ReactNode, useEffect, useState } from "react";
interface AnimatorContainerProps {
    children: ReactNode;
}

const AnimatorContainer: React.FC<AnimatorContainerProps> = ({ children }) => {
    // Obtiene los estados globales desde la tienda
    const [showAnimation, setShowAnimation] = useState(false);

    useEffect(() => {
        setShowAnimation(false); // Reinicia la animación cuando se desmonta
        const timeoutId = setTimeout(() => {
            setShowAnimation(true); // Activa la animación tras un pequeño retardo
        }, 100); // Añade un retardo corto para asegurarte que siempre aplica

        return () => clearTimeout(timeoutId); // Limpia el timeout cuando se desmonta
    }, [setShowAnimation]);

    return (
        <div className={`mt-16 flex flex-col w-screen transition-all duration-1000 ease-in-out transform ${showAnimation ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {children}
        </div>
    );
};

export default AnimatorContainer;
