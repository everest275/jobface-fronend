import { useForm, Resolver } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { usePortfolioAbilities } from '../../../context/usePortfolioAbilites';

import saveIcon from '../../../assets/upload.svg'

type FormValues = {
    abilitie_type: string;
    portfolio: string;
    comment: string;
    abilitie_state: string;
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

    if (!values.abilitie_type) {
        errors.abilitie_type = {
            type: "required",
            message: "Title es requerido.",
        };
    }


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

    const { id, portfolio } = useParams<{ id: string, portfolio: string }>();

    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<FormValues>({ resolver });
    const navigate = useNavigate();

    const { createPortfolioAbilitie, updatePortfolioAbilitie, getPortfolioAbilitieById, getPortfolioAbilitieTypes, portfolioAbilitieTypes } = usePortfolioAbilities();

    useEffect(() => {
        getPortfolioAbilitieTypes()
    }, [getPortfolioAbilitieTypes])
    useEffect(() => {
        if (id) {

            const loadPortfolio = async () => {
                const res=await getPortfolioAbilitieById(id);
                console.log("resultado de habilidad",res)
                if (res) {
                    setValue("abilitie_type", res.abilitie_type);
                    setValue("portfolio", res.portfolio);
                    setValue("comment", res.comment);
                }
            };
            loadPortfolio();
        }
    }, [id, setValue, getPortfolioAbilitieById]);


    const onSubmit = handleSubmit(async (data) => {
        const pullRequest = {
            abilitie_type: data.abilitie_type,
            portfolio: getValues("portfolio"),
            comment: data.comment,
            abilitie_state: "6b17756c-c1da-4636-821e-4b98ed59c02f" // Assuming this is a constant value
        };

        if (id) {
            await updatePortfolioAbilitie(id, pullRequest);
        } else if (portfolio) {
            pullRequest.portfolio = portfolio
            await createPortfolioAbilitie(pullRequest);
        }

        navigate(-1);
    });

    return (
        <div className="lg:pl-20 lg:pr-20 min-h-screen flex flex-col items-center pr-5 pl-5 w-full">



            <form className="flex flex-col gap-1" onSubmit={onSubmit}>

                <div className="flex flex-col">
                    <select
                        {...register("abilitie_type", { required: true })}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
                    >
                        <option value="">Seleccione una habilidad</option>
                        {
                            portfolioAbilitieTypes && (
                                portfolioAbilitieTypes.map((type) => (
                                <option key={type.id} value={type.id}>
                                    {type.type_value}
                                </option>
                            )))
                        }
                    </select>
                </div>
                {errors.abilitie_type && <span>Abilitie Type is required</span>}

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
