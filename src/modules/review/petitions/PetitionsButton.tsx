import { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import { usePortfolioReviews } from '../../../hook/usePortfolioReviews';
import { useAuth } from "../../../hook/useAuth";

interface User {
    id: string;
    user_name: string;
}

interface RequestsButtonProps {
    id: string;
}

const RequestsButton: React.FC<RequestsButtonProps> = ({ id }) => {
    const { users, getUsers, sendedPortfolioReviews, sendedReviewsByPortfolio, sendedUserPortfolioReview, deletePortfolioReview } = usePortfolioReviews();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth()
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]); // Explicitly set the type to User[]

    const openModal = () =>
        setIsModalOpen(true)

        ;
    const closeModal = () => {
        setIsModalOpen(false)
        setSearchTerm("");  // Restablece el campo de búsqueda
    }

    useEffect(() => {
        if (id) {
            sendedReviewsByPortfolio(id)
        }
    }, [sendedReviewsByPortfolio, id])

    useEffect(() => {
        if (searchTerm.length > 2) {
            getUsers();
        } else {
            setFilteredUsers([]);
        }
    }, [searchTerm, getUsers]);

    useEffect(() => {
        if (searchTerm.length > 2) {
            setFilteredUsers(users.filter(user =>
                user.user_name.toLowerCase().includes(searchTerm.toLowerCase())
            ));
        } else {
            setFilteredUsers([]);
        }
    }, [searchTerm, users]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const sendPetition = async (data: User) => {

        const pullRequest = {
            reviewer_user: data.id,
            portfolio: id,
            comment: "Without comment",
            is_accept: "e08214cf-8b66-4f5b-bc7b-b70d5542108d",
            review_state: "6b17756c-c1da-4636-821e-4b98ed59c02f"
        };
        console.log(pullRequest)
        await sendedUserPortfolioReview(pullRequest);
        sendedReviewsByPortfolio(id);
    }

    const cancelPetition = async (reviewId: string) => {
        await deletePortfolioReview(reviewId);
        sendedReviewsByPortfolio(id);
    }

    return (
        <div>
            <button onClick={openModal} className="w-40 tracking-wide py-1 px-2 bg-zinc-800 text-white transition ease-in duration-200 text-center font-semibold shadow-md hover:bg-zinc-700 rounded-md flex gap-2 justify-center items-center content-center h-9">
                Enviar petición
            </button>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <form className="px-4 w-full max-w-[330px]">
                    <div className="relative">
                        <input
                            placeholder="Search"
                            className="block w-full p-4 py-5 ps-10 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            id="default-search"
                            type="search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                </form>

                {filteredUsers.length > 0 && (
                    <div className="mt-4">
                        <ul>
                            {filteredUsers.map((usuario) => {
                                const review = sendedPortfolioReviews.find(review => review.reviewer_user.id === usuario.id);
                                const hasReview = !!review;

                                return (
                                    usuario.user_name != user?.user_name && (<div className="flex items-center gap-10 justify-between border-b border-gray-300" key={usuario.id}>
                                        <li className="py-2 px-4">
                                            {usuario.user_name}
                                        </li>
                                        <li>
                                            {hasReview ? (
                                                <button onClick={() => cancelPetition(review.id)} className="...">cancelar</button>
                                            ) : (
                                                <button onClick={() => sendPetition(usuario)} className="...">enviar</button>
                                            )}
                                        </li>
                                    </div>)
                                );
                            })}
                        </ul>
                    </div>
                )}

                {sendedPortfolioReviews.length > 0 && (
                    <div className="mt-4">
                        <h1>Recientes</h1>
                        <ul>
                            {sendedPortfolioReviews.map((review) => {

                                return (
                                    <div className="flex items-center gap-10 justify-between border-b border-gray-300" key={review.id}>
                                        <li className="py-2 px-4">
                                            {review.reviewer_user.user_name}
                                        </li>
                                        <li>
                                            <button onClick={() => cancelPetition(review.id)} className="...">cancelar</button>
                                        </li>
                                    </div>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default RequestsButton;
