import React from "react";
import { useForm, Resolver } from "react-hook-form";
import { useAuth } from '../../../hook/useAuth'

type FormValues = {
  uno: string;
  dos: string;
  tres: string;
  cuatro: string;
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

  if (!values.uno) {
    errors.uno = {
      type: "required",
      message: "El numero del codigo es requerido.",
    };
  }

  if (!values.dos) {
    errors.dos = {
      type: "required",
      message: "El numero del codigo es requerido.",
    };
  }

  if (!values.tres) {
    errors.dos = {
      type: "required",
      message: "El tres del codigo es requerido.",
    };
  }

  if (!values.cuatro) {
    errors.cuatro = {
      type: "required",
      message: "El cuatro del codigo es requerido.",
    };
  }

  return {
    values: Object.keys(errors).length ? {} : values,
    errors,
  };
};

const LoginForm: React.FC = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const { signup, errors: registerErrors } = useAuth()

  const onSubmit = handleSubmit(async (data) => {
    const pass = data.uno.toString() + data.dos.toString() + data.tres.toString() + data.cuatro.toString()
    await signup(pass)
    // navigate('/')
  });


  return (
    <div className="flex h-calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-sm w-full p-10 rounded-md">

        <h1 className="text-2xl font-bold">Verify code in your Email</h1>

        <form className="flex gap-2 flex-col" onSubmit={onSubmit}>

          <div className="flex gap-2">

            <div className="flex flex-col">
              <input className="w-16 bg-zinc-700 text-white px-4 py-2 rounded-md my-2"{...register("uno")} type="tel" maxLength={1} />
              {errors?.uno && <p className="text-red-600 text-sm">{`*${errors.uno.message}`}</p>}
            </div>
            <div className="flex flex-col">
              <input className="w-16 bg-zinc-700 text-white px-4 py-2 rounded-md my-2" {...register("dos")} type="text" />
              {errors?.dos && <p className="text-red-600 text-sm">{`*${errors.dos.message}`}</p>}
            </div>
            <div className="flex flex-col">
              <input className="w-16 bg-zinc-700 text-white px-4 py-2 rounded-md my-2" {...register("tres")} type="text" />
              {errors?.tres && <p className="text-red-600 text-sm">{`*${errors.tres.message}`}</p>}
            </div>
            <div className="flex flex-col">
              <input className="w-16 bg-zinc-700 text-white px-4 py-2 rounded-md my-2" {...register("cuatro")} type="text" />
              {errors?.cuatro && <p className="text-red-600 text-sm">{`*${errors.cuatro.message}`}</p>}
            </div>
          </div>
          <div>

            {registerErrors.length > 0 && registerErrors.map((error, index) => (
              <div key={index} className="bg-red-500 p-2">
                {error}
              </div>
            ))}




          </div>
          <button className="px-4 py-2 text-base bg-blue-500 text-white rounded" type="submit">Verify</button>
        </form>

      </div>
    </div>
  );
};

export default LoginForm;
