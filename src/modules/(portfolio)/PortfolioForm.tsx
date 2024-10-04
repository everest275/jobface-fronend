import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useRequestServices } from '../../services/RequestService';
import { ClientPortfolioRoutes,PortfolioFormValues,resolver } from './PortfolioType';

import deleteIcon from '../../assets/delete-icon.svg';
import uploadIcon from '../../assets/upload.svg';
import closeIcon from '../../assets/close.svg';
import PictureHandler from '../(picture)/PictureHandler';


export default function PortfolioForm() {

  const {getRequest, putRequest, postRequest, deleteRequest}=useRequestServices()
  const { id } = useParams<{ id: string }>();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<PortfolioFormValues>({ resolver });
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState(false); 


  const loadPortfolio =useCallback(async () => {
    const portfolio = await getRequest(ClientPortfolioRoutes.PRIVATE, id);
    if (portfolio) {
      setValue("name", portfolio.name);
      setValue("title", portfolio.title);
      setValue("description", portfolio.description);
      setValue("about", portfolio.about);
      setValue("country", portfolio.country);
      setValue("city", portfolio.city);
    }
  },[getRequest,id,setValue])

  useEffect(() => {
    if (id) {
      loadPortfolio();
    }
    setShowAnimation(true);
  }, [id,loadPortfolio]);

  const handleDelete = async (id: string) => {
    await deleteRequest(ClientPortfolioRoutes.PRIVATE, id);
    navigate('/portfolios');
  };

  const onSubmit = handleSubmit(async (data) => {
    const pullRequest = {
      portfolio_type: "0bc6bd16-86d4-429e-afe3-b213b56e2121",
      portfolio_style: "3cccd400-708c-4f36-bb48-898c887583b6",
      name: data.name,
      title: data.title,
      description: data.description,
      about: data.about,
      country: data.country,
      city: data.city,
      portfolio_state: "6b17756c-c1da-4636-821e-4b98ed59c02f",
    };

    if (id) {
      await putRequest(ClientPortfolioRoutes.PRIVATE, id, pullRequest);
    } else {
      await postRequest(ClientPortfolioRoutes.PRIVATE, pullRequest);
    }

    navigate('/');
  });

  return (
      <div className={`mt-16 flex flex-col w-screen items-center transition-all duration-700 ease-in-out transform ${showAnimation ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
        <div className="max-w-md rounded-md flex flex-col gap-9 mt-[5rem]">
          {id && (
            <PictureHandler type={1} isPublic={false} isViewer={true} id={id} />
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

              {id ? (<button className="tracking-wide py-2 px-4 mt-3 text-xl bg-zinc-800 text-white transition ease-in duration-200 text-center font-semibold shadow-md hover:bg-zinc-700 rounded-lg flex gap-2" onClick={() => handleDelete(id)}>
                <img src={deleteIcon} alt="delete-icon" />Eliminar
              </button>) : ""}
            </div>
          </form>
        </div>
      </div>
  );
}
