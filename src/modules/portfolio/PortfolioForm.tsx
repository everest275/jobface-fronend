import { useForm, Resolver } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { usePortfolios } from '../../context/usePortfolios';
import deleteIcon from '../../assets/delete-icon.svg'
import uploadIcon from '../../assets/upload.svg'
import closeIcon from '../../assets/close.svg'
import PictureHandler from '../picture/portfolios&proyects/PictureHandler'

type FormValues = {
  name: string;
  title: string;
  description: string;
  about: string;
  country: string;
  city: string;
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

  if (!values.name) {
    errors.name = {
      type: "required",
      message: "Name es requerido.",
    };
  }

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
  if (!values.about) {
    errors.about = {
      type: "required",
      message: "About es requerido.",
    };
  }
  if (!values.country) {
    errors.country = {
      type: "required",
      message: "Country es requerido.",
    };
  }
  if (!values.city) {
    errors.city = {
      type: "required",
      message: "City es requerido.",
    };
  }

  return {
    values: Object.keys(errors).length ? {} : values,
    errors,
  };
};

export default function PortfolioForm() {
  const { id } = useParams<{ id: string }>(); // Assume `id` is passed via route params for editing
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>({ resolver });
  const navigate = useNavigate();

  const { createPortfolio, updatePortfolio, getPortfolioById, deletePortfolio } = usePortfolios();

  useEffect(() => {
    if (id) {
      const loadPortfolio = async () => {
        const portfolio = await getPortfolioById(id);
        if (portfolio) {
          setValue("name", portfolio.name);
          setValue("title", portfolio.title);
          setValue("description", portfolio.description);
          setValue("about", portfolio.about);
          setValue("country", portfolio.country);
          setValue("city", portfolio.city);
        }
      };
      loadPortfolio();
    }
  }, [id, setValue, getPortfolioById]);

  const handleDelete=async(id:string)=>{
      await deletePortfolio(id)
      navigate('/portfolios')
  }

  const onSubmit = handleSubmit(async (data) => {
    const pullRequest = {
      portfolio_type: "0bc6bd16-86d4-429e-afe3-b213b56e2121",
      portfolio_style: "3cccd400-708c-4f36-bb48-898c887583b6",
      name:data.name,
      title: data.title,
      description: data.description,
      about: data.about,
      country: data.country,
      city: data.city,
      portfolio_state: "6b17756c-c1da-4636-821e-4b98ed59c02f" // Assuming this is a constant value
    };

    if (id) {
      await updatePortfolio(id, pullRequest);
    } else {
      await createPortfolio(pullRequest);
    }

    navigate('/');
  });

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-transparent max-w-md w-full p-10 rounded-md mt-[10%] flex flex-col gap-9">
        {id &&(
           <PictureHandler type={1} isPublic={false} isViewer={true} id={id}/>
        )}
       
        <form onSubmit={onSubmit}>

        <input
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            {...register("name")}
            placeholder="Name"
            type="text"
          />
          {errors?.name && <p className="text-red-600 text-sm">{`*${errors.name.message}`}</p>}

          <input
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            {...register("title")}
            placeholder="Title"
            type="text"
          />
          {errors?.title && <p className="text-red-600 text-sm">{`*${errors.title.message}`}</p>}

          <textarea
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            {...register("description")}
            placeholder="Description"
          />
          {errors?.description && <p className="text-red-600 text-sm">{`*${errors.description.message}`}</p>}

          <textarea
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            {...register("about")}
            placeholder="About"
          />
          {errors?.about && <p className="text-red-600 text-sm">{`*${errors.about.message}`}</p>}

          <select
            className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2"
            {...register("country")}
          >
            <option value="">Select country</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Nicaragua">Nicaragua</option>
          </select>
          {errors?.country && <p className="text-red-600 text-sm">{`*${errors.country.message}`}</p>}

          <select
            className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2"
            {...register("city")}
          >
            <option value="">Select city</option>
            <option value="San Jose">San Jose</option>
            <option value="Alajuela">Alajuela</option>
          </select>
          {errors?.city && <p className="text-red-600 text-sm">{`*${errors.city.message}`}</p>}

          <div className="flex justify-center gap-x-4">
            <button className="tracking-wide py-2 px-4 mt-3 text-xl bg-zinc-800 text-white transition ease-in duration-200 text-center font-semibold shadow-md hover:bg-zinc-700 rounded-lg flex gap-2" type="submit">
            <img src={uploadIcon} alt="upload-icon" />Guardar
            </button>

            <button onClick={() => navigate(-1)} className="tracking-wide py-2 px-4 mt-3 text-xl bg-zinc-800 text-white transition ease-in duration-200 text-center font-semibold shadow-md hover:bg-zinc-700 rounded-lg flex gap-2">
            <img src={closeIcon} alt="upload-icon" />Cancelar
            </button>

            {id ? (<button className="tracking-wide py-2 px-4 mt-3 text-xl bg-zinc-800 text-white transition ease-in duration-200 text-center font-semibold shadow-md hover:bg-zinc-700 rounded-lg flex gap-2"  onClick={() => handleDelete(id)} >
              <img src={deleteIcon} alt="delete-icon" />Eliminar
            </button>) : ""}
          </div>

        </form>
      </div>
    </div>
  );
}
