import { useForm, Resolver } from "react-hook-form";
import { useAuth } from '../../../hook/useAuth'
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VerificationForm from './VerficationForm'
import Modal from '../../../components/Modal'
import { RegisterUser } from "../AuthService";

type FormValues = {
  name: string;
  user_name: string;
  gender: string;
  birth: Date;
  email: string;
  password: string;
  confirmPassword: string;
  user_membership: "459f7abe-8f3b-49e4-9afd-748fcb962351"
  user_state: "6b17756c-c1da-4636-821e-4b98ed59c02f"
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
      message: "Nombre es requerido.",
    };
  }

  if (!values.user_name) {
    errors.user_name = {
      type: "required",
      message: "Usuario es requerido.",
    };
  }
  if (!values.gender) {
    errors.gender = {
      type: "required",
      message: "Sexo es requerido.",
    };
  }
  if (!values.birth) {
    errors.birth = {
      type: "required",
      message: "Fecha de nacimiento es requerida.",
    };
  }
  if (!values.email) {
    errors.email = {
      type: "required",
      message: "Email es requerido.",
    };
  }
  if (!values.password) {
    errors.password = {
      type: "required",
      message: "Contraseña es requerida.",
    };
  }
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = {
      type: "validate",
      message: "Las contraseñas no coinciden.",
    };
  }

  return {
    values: Object.keys(errors).length ? {} : values,
    errors,
  };
};

export default function RegisterForm() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const { isAuthenticated, verifyEmail, errors: registerErrors } = useAuth()
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated, navigate])

  const onSubmit = handleSubmit(async (data) => {
    if (Object.keys(errors).length === 0) {
      const pullRequest: RegisterUser = {
        user_name: data.user_name,
        name: data.name,
        email: data.email,
        gender: data.gender,
        birth: data.birth,
        password: data.password,
        user_membership:"459f7abe-8f3b-49e4-9afd-748fcb962351",
        user_state:"6b17756c-c1da-4636-821e-4b98ed59c02f",
        pass: ""
      }
      console.log(pullRequest)
      verifyEmail(pullRequest)
      openModal();
    }

  });


  return (

    <div className="flex h-calc(100vh-100px)] items-center justify-center">

      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">

        <h1 className="text-2xl font-bold">Sign up</h1>

        <form onSubmit={onSubmit}>

          <input className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" {...register("name")} placeholder="name" />
          {errors?.name && <p className="text-red-600 text-sm">{`*${errors.name.message}`}</p>}

          <input className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" {...register("user_name")} placeholder="user name" />
          {errors?.name && <p className="text-red-600 text-sm">{`*${errors.name.message}`}</p>}

          <input className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"{...register("email")} placeholder="email" type="email" />
          {errors?.email && <p className="text-red-600 text-sm">{`*${errors.email.message}`}</p>}

          <section className="flex gap-9">

            <div>
              <select className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2 placeholder-color" {...register("gender")}>
                <option className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2 placeholder-color" value="">select gender</option>
                <option className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2 placeholder-color" value="09980577-9909-4266-8509-9e075e3061b3">male</option>
                <option className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2 placeholder-color" value="f9d8989f-c368-4a3f-a520-de490c1bbdc7">female</option>
              </select>
              {errors?.gender && <p className="text-red-600 text-sm">{`*${errors.gender.message}`}</p>}
            </div>
            <div>
              <input className="w-full bg-zinc-700 px-4 py-2 rounded-md my-2 placeholder-color"  {...register("birth")} placeholder="birth date" type="date" />
              {errors?.birth && <p className="text-red-600 text-sm">{`*${errors.birth.message}`}</p>}
            </div>
          </section>

          <input className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"  {...register("password")} placeholder="password" type="password" />
          {errors?.password && <p className="text-red-600 text-sm">{`*${errors.password.message}`}</p>}

          <input className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" {...register("confirmPassword")} placeholder="confirm password" type="password" />
          {errors?.confirmPassword && <p className="text-red-600 text-sm">{`*${errors.confirmPassword.message}`}</p>}

          {registerErrors.length > 0 && registerErrors.map((error, index) => (
            <div key={index} className="bg-red-500 p-2">
              {error}
            </div>
          ))}
          <button className="px-4 py-2 text-base bg-blue-500 text-white rounded" type="submit">Register</button>
          <p className="flex gap-x-2 justify-between">Already have an account? <Link className="text-sky-500" to='/login'>Sign in</Link></p>
        </form>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <VerificationForm />

        </Modal>
      </div>
    </div>
  );
}
