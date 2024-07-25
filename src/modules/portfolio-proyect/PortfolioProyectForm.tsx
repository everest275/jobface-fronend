import { useForm, Resolver } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { usePortfolioProyects } from '../../context/usePortfolioProyects';
import PictureHandler from '../pictures/PictureHandler'

import saveIcon from '../../assets/upload.svg'

type FormValues = {
  portfolio: string;
  title: string;
  description: string;
  position: string;
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

  if (!values.title) {
    errors.title = {
      type: "required",
      message: "Title es requerido.",
    };
  }
  if (!values.description) {
    errors.description = {
      type: "required",
      message: "Description es requerido.",
    };
  }

  if (!values.position) {
    errors.position = {
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

  const { id,portfolio } = useParams<{ id: string,portfolio:string }>();

  const { register, handleSubmit, setValue,getValues, formState: { errors } } = useForm<FormValues>({ resolver });
  const navigate = useNavigate();

  const { createPortfolioProyect, updatePortfolioProyect, getPortfolioProyectById } = usePortfolioProyects();

  useEffect(() => {
    if (id) {

      const loadPortfolio = async () => {
        const proyect = await getPortfolioProyectById(id);
        if (proyect) {
          setValue("portfolio", proyect.portfolio);
          setValue("title", proyect.title);
          setValue("description", proyect.description);
          setValue("position", proyect.position);
        }
      };
      loadPortfolio();
    }
  }, [id, setValue, getPortfolioProyectById]);


  const onSubmit = handleSubmit(async (data) => {
    const pullRequest = {
      portfolio: getValues("portfolio"),
      title: data.title,
      description: data.description,
      position: data.position,
      proyect_state: "6b17756c-c1da-4636-821e-4b98ed59c02f" // Assuming this is a constant value
    };

    if (id) {
      await updatePortfolioProyect(id, pullRequest);
    } else if(portfolio){
      pullRequest.portfolio=portfolio
      await createPortfolioProyect(pullRequest);
    }

    navigate(-1);
  });

  return (
    <div className="lg:pl-20 lg:pr-20 min-h-screen flex flex-col items-center pr-5 pl-5 w-full">
      <PictureHandler type={1} isViewer={true} isPublic={false} id={""} />
      <form onSubmit={onSubmit}>

        <div className="flex flex-col items-center bg-transparent rounded-md gap-2 justify-center">

          <section className="block w-full">
            <div className="flex flex-col gap-6 relative">
              <div className="flex flex-col">
                
                <input
                  type="text"
                  {...register("title", { required: true })}
                  className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"

                />
              </div>
              {errors.title && <span>Title is required</span>}

              <div className="flex flex-col w-full">
                <input
                  type="text"
                  {...register("position", { required: true })}
                  className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"

                />
              </div>
              {errors.position && <span>Position is required</span>}

              <div className="flex flex-col w-full">
                <input
                  type="text"
                  {...register("description", { required: true })}
                  className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"

                />
              </div>
              {errors.description && <span>Description is required</span>}

            </div>
          </section>
        </div>

        <button
          type="submit"
          className="py-2 px-4 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg self-end"
        >
          <img src={saveIcon} /> save
        </button>
      </form>
    </div>
  );
}
