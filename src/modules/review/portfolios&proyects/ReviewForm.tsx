import { useForm, Resolver } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { usePortfolioReviews } from '../../../context/usePortfolioReviews';
import {usePortfolios} from '../../../context/usePortfolios'
import saveIcon from '../../../assets/upload.svg'

type FormValues = {
    reviewer_user: string;
    review_user: string;
    portfolio: string;
    comment: string;
    is_accept: string;
    review_state: string;
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
            message: "Position es requerido.",
        };
    }

    return {
        values: Object.keys(errors).length ? {} : values,
        errors,
    };
};

export default function PortfolioProyectForm() {

    const { id, portfolioId } = useParams<{ id: string, portfolioId: string }>();

    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<FormValues>({ resolver });
    const navigate = useNavigate();

    const { createPortfolioReview, updatePortfolioReview, getPortfolioReviewById } = usePortfolioReviews();
    const {getPortfolioById,portfolio}=usePortfolios()

    useEffect(() => {
        if (id&&portfolioId) {

            const loadPortfolio = async () => {
                const proyect = await getPortfolioReviewById(id);
                const portfolioFinded = await getPortfolioById(id);
                if (proyect&&portfolioFinded) {
                    setValue("review_user", portfolioFinded.portfolio_user);
                    setValue("reviewer_user", proyect.review_user);
                    setValue("portfolio", proyect.portfolio);
                    setValue("comment", proyect.comment);
                }
            };
            loadPortfolio();
        }
    }, [id,portfolioId,setValue, getPortfolioReviewById,getPortfolioById]);


    const onSubmit = handleSubmit(async (data) => {
        const pullRequest = {
            review_user: getValues("review_user"),
            reviewer_user: getValues("reviewer_user"),
            portfolio: getValues("portfolio"),
            comment: data.comment,
            is_accept:"a295ecf9-2c6d-4908-adbd-f2520bd8b274",
            review_state: "6b17756c-c1da-4636-821e-4b98ed59c02f" // Assuming this is a constant value
        };

        if (id) {
            await updatePortfolioReview(id, pullRequest);
        } else if (portfolioId&&portfolio) {
            pullRequest.portfolio = portfolioId
            pullRequest.reviewer_user = portfolio.portfolio_user            
            await createPortfolioReview(pullRequest);
        }

        navigate(-1);
    });

    return (
        <div className="lg:pl-20 lg:pr-20 min-h-screen flex flex-col items-center pr-5 pl-5 w-full">



            <form className="flex flex-col gap-1" onSubmit={onSubmit}>
               

                <div className="flex flex-col w-full">
                    <input placeholder="Comment"
                        type="text"
                        {...register("comment", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"

                    />
                </div>
                {errors.comment && <span>Comment is required</span>}

                <button
                    type="submit"
                    className="flex justify-center py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg self-end w-full"
                >
                    <img src={saveIcon} /> save
                </button>

            </form>
        </div>
    );
}
