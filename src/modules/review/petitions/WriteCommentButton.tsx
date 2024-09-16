import { useState } from "react";
import Modal from "../../../components/Modal";
import { useForm, Resolver } from "react-hook-form";

interface RequestsButtonProps {
    id: string;
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

const RequestsButton: React.FC<RequestsButtonProps> = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () =>
        setIsModalOpen(true);

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const onSubmit = handleSubmit(async (data) => {
        console.log(data)
        // const pullRequest = {
        //     portfolio_type: "0bc6bd16-86d4-429e-afe3-b213b56e2121",
        //     portfolio_style: "3cccd400-708c-4f36-bb48-898c887583b6",
        //     name: data.name,
        //     title: data.title,
        //     description: data.description,
        //     about: data.about,
        //     country: data.country,
        //     city: data.city,
        //     portfolio_state: "6b17756c-c1da-4636-821e-4b98ed59c02f" // Assuming this is a constant value
        // };

    });


    return (
        <div>
            <button onClick={openModal} className="w-52 tracking-wide py-1 px-2 bg-zinc-800 text-white transition ease-in duration-200 text-center font-semibold shadow-md hover:bg-zinc-700 rounded-md flex gap-2 justify-center items-center content-center h-9">
                Aceptar
            </button>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <form className="px-4 w-full max-w-[330px]" onSubmit={onSubmit}>
                    <div className="relative">
                        <textarea
                            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                            {...register("comment")}
                            placeholder="Description"
                        />
                        {errors?.comment && <p className="text-red-600 text-sm">{`*${errors.comment.message}`}</p>}
                    </div>
                    <button className="tracking-wide py-2 px-4 mt-3 text-xl bg-zinc-800 text-white transition ease-in duration-200 text-center font-semibold shadow-md hover:bg-zinc-700 rounded-lg flex gap-2" type="submit">
                         Guardar
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default RequestsButton;
