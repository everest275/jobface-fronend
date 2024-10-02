import { useAuth } from '../../hook/useAuthfaceContext'
export default function ProfilePage() {
  const { logout } = useAuth()
  return (

    <section className='w-screen flex items-center justify-center'>
      <div className="border border-zinc-800 shadow-2xl shadow-black p-4 rounded-xl flex flex-col gap-8">
        <h1 className="text-4xl">Ajustes de perfil</h1>
        <div className="flex flex-col gap-5">
          <a className="underline text-2xl ">Editar informacion personal</a>
          <a className="underline text-2xl">Cambiar correo</a>
          <a className="underline text-2xl">Cambiar contraseña</a>
        </div>
        <div className="flex flex-col gap-3">
          <button onClick={() => {
            logout();
          }} className="bg-red-800 rounded-full h-8 shadow-2xl border-2 border-red-950 shadow-black">Cerrar sesion</button>
          <button className="bg-red-800 rounded-full h-8 shadow-2xl border-2 border-red-950 shadow-black">Eliminar cuenta</button>
        </div>
      </div>
    </section>

  )
}
