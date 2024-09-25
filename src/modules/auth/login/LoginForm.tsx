import React, { useEffect } from "react";
import { useForm, Resolver } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../../hook/useAuth'
import { LoginUser } from "../AuthService";

type FormValues = {
  email: string;
  password: string;
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

  if (!values.email) {
    errors.email = {
      type: "required",
      message: "Email es requerido.",
    };
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = {
      type: "pattern",
      message: "Email no es válido.",
    };
  }

  if (!values.password) {
    errors.password = {
      type: "required",
      message: "Contraseña es requerida.",
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

  const { signin, isAuthenticated, errors: registerErrors } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated, navigate])

  const onSubmit = handleSubmit(async (data) => {
    const pullRequest: LoginUser = {
      email: data.email,
      password: data.password,
    }
    await signin(pullRequest)
  });


  return (
    <div className="flex h-calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-sm w-full p-10 rounded-md">

      <h1 className="text-2xl font-bold">Sign in</h1>

        <form onSubmit={onSubmit}>

          <input className="w-72 bg-zinc-700 text-white px-4 py-2 rounded-md my-2"{...register("email")} placeholder="Email" type="email" />
          {errors?.email && <p className="text-red-600 text-sm">{`*${errors.email.message}`}</p>}
          <input className="w-72 bg-zinc-700 text-white px-4 py-2 rounded-md my-2" {...register("password")} placeholder="Contraseña" type="password" />
          {errors?.password && <p className="text-red-600 text-sm">{`*${errors.password.message}`}</p>}
          <div>

            {registerErrors.length > 0 && registerErrors.map((error, index) => (
              <div key={index} className="bg-red-500 p-2">
                {error}
              </div>
            ))}

            <button className="px-4 py-2 text-base bg-blue-500 text-white rounded" type="submit">Enter</button>

            <p className="flex gap-x-2 justify-between">Don't have an account? <Link to='/register' className="text-sky-500">Sign up</Link></p>
          </div>

        </form>

      </div>
    </div>
  );
};

export default LoginForm;
