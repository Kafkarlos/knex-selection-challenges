import { useAuth } from "../contexts/AuthContext";
import Icon from "public/icons/icon.svg";
import Skeleton from "./UserSkeleton";

export default function User() {
  const { user, loading } = useAuth();

  if (loading) return <Skeleton />;

  if (!user)
    return (
      <p className="text-3xl text-red-10 font-mw font-bold">
        Erro ao carregar usuário
      </p>
    );
  return (
    <section className="w-50 col-span-2 top-30 right-80 absolute md:static">
      <article className="user-card m-7 p-5 w-120">
        <section className="grid grid-cols-3">
          <figure className="w-30 justify-self-center self-center">
            <img
              src={user.picture}
              alt="Foto do Usuário"
              className="avatar"
              width="100%"
            />
          </figure>
          <div className="user-info col-span-2">
            <p className="font-mw font-bold text-black p-3">{user.name}</p>
            <hr className="text-green-10" />
            <div className="p-5 justify-items-start">
              <p className="text-sm text-black/60">Idade: {user.age}</p>
              <p className="text-sm text-black/60 pt-2">
                <figure className="w-6 inline-block">
                  <img src={Icon} alt="Ícone de Local" className="fill-black" />
                </figure>
                {user.country}—{user.state}
              </p>
            </div>
          </div>
        </section>
        <section className="user-info mt-5 min-h-50">
          <h2 className="font-mw text-5xl text-black p-4">Contatos</h2>
          <hr className="text-green-10" />
          <ul className="p-2 pb-5">
            <li className="pt-3">
              <p className="text-sm text-black">Email: {user.email}</p>
            </li>
            <li className="pt-3">
              <p className="text-sm text-black">Telefone: {user.phone}</p>
            </li>
          </ul>
        </section>
      </article>
      <figure className="hidden md:flex w-100 justify-self-center ml-80">
        <img
          src="/images/dreizehn.png"
          width="100%"
          alt="Cachorro doberman vermelho, com o nome dreizehn em cima também em vermelho"
        />
      </figure>
    </section>
  );
}
