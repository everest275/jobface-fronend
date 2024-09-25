import {
    useEffect,
    useState
} from "react";
import
Modal
    from "../../../components/Modal";
import {
    useForm,
    Resolver
} from "react-hook-form";
import {
    PortfolioReview,
} from "../../../services/ReviewService";
import {
    Portfolio
} from "../../../services/PortfolioService";
import { usePortfolioReviews } from "../../../hook/usePortfolioReviews";



interface RequestsButtonProps {
    commentType: number;
    petition?: PortfolioReview
    portfolio?: Portfolio
}

type FormValues = {
    comment: string;
};

type ValidationError = {
    type: string;
    message: string;
};

type Errors = {
    [K in keyof FormValues]?: ValidationError;
};

const resolver: Resolver<FormValues> = async (values) => {
    const errors: Errors = {};
    if (!values.comment) {
        errors.comment = {
            type: "required",
            message: "Comment es requerido.",
        };
    }

    return {
        values: Object.keys(errors).length ? {} : values,
        errors,
    };
};

const RequestsButton: React.FC<RequestsButtonProps> = ({ commentType, portfolio, petition }) => {

    const { createPortfolioReview, updatePortfolioReview, getPetitions } = usePortfolioReviews()
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver });
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        getPetitions()
    }, [getPetitions])

    const openModal = () =>
        setIsModalOpen(true);

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const onSubmit = handleSubmit(async (data) => {
        if (commentType === 1 && petition) {
            const pullRequest = {
                reviewer_user: petition.reviewer_user,
                review_user: petition.review_user.id,
                portfolio: petition.portfolio.id,
                comment: data.comment,
                is_accept: "0a1a80e2-7b96-48f1-9a01-5300ff27df36",
                review_state: petition.review_state
            };
            console.log(pullRequest)
            updatePortfolioReview(petition.id, pullRequest)
           

        } else if (commentType === 2 && portfolio) {
            const pullRequest = {
                review_user: portfolio.portfolio_user,
                portfolio: portfolio.id,
                comment: data.comment,
                is_accept: "a295ecf9-2c6d-4908-adbd-f2520bd8b274",
                review_state: "6b17756c-c1da-4636-821e-4b98ed59c02f"
            };
            console.log(pullRequest)
            createPortfolioReview(pullRequest)
           
        }
       location.reload()
    });

    return (
        <div>
            <button onClick={openModal} className="w-52 tracking-wide py-1 px-2 bg-zinc-800 text-white transition ease-in duration-200 text-center font-semibold shadow-md hover:bg-zinc-700 rounded-md flex gap-2 justify-center items-center content-center h-9">
                {commentType === 1 && "Aceptar"}
                {commentType === 2 && "Recomendar"}
            </button>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <form className="px-4 w-full max-w-[330px] flex flex-col items-center" onSubmit={onSubmit}>
                    <textarea
                        className="w-full bg-zinc-900 text-white px-4 py-2 rounded-md my-2"
                        {...register("comment")}
                        placeholder="Description"
                    />
                    {errors?.comment && <p className="text-red-600 text-sm">{`*${errors.comment.message}`}</p>}
                    <button className="tracking-wide bg-zinc-900  text-white transition ease-in duration-200 py-2 px-4 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-zinc-800 focus:ring-zinc-600 focus:ring-offset-blue-200 flex gap-2 rounded-lg" type="submit">
                        {commentType === 1 && "Guardar"}
                        {commentType === 2 && "Enviar"}
                    </button>

                </form>

            </Modal>

        </div>
    );
};

export default RequestsButton;
