import { useAuth } from "../contexts/AuthContext";
import Post from "../components/Post";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "../hooks/useToast";

const toast = useToast();

const ContentSchema = z.object({
  title: z.string().min(1, "O título não pode ser vazio"),
  body: z.string().min(1, "O conteúdo não pode ser vazio"),
});

type ContentType = z.infer<typeof ContentSchema>;

type PostCardProps = {
  post: {
    id: number;
    title: string;
    body: string;
    userId: number;
    user: {
      name: string;
      picture?: string;
      address: {
        city: string;
      };
    };
  };
};

export default function PostCard({ post }: PostCardProps) {
  const [visible, setVisible] = useState(true);
  const [showModalDel, setShowModalDel] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [localPost, setLocalPost] = useState(post);
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContentType>({
    resolver: zodResolver(ContentSchema),
    defaultValues: {
      title: localPost.title,
      body: localPost.body,
    },
  });

  const handleDelete = () => {
    toast.showLoading("Deletando...");
    setTimeout(() => {
      setVisible(false);
      toast.showSuccess("Post deletado com sucesso!");
    }, 1000);
  };

  const onSubmit = (data: { title: string; body: string }) => {
    try {
      toast.showLoading("Atualizando post...");
      ContentSchema.parse(data);

      setTimeout(() => {
        setLocalPost({ ...localPost, title: data.title, body: data.body });
        setShowModalEdit(false);
        toast.showSuccess("Post atualizado!");
      }, 1000);
    } catch {
      toast.showError("Erro ao atualizar post.");
    }
  };
  useEffect(() => {
    reset({
      title: localPost.title,
      body: localPost.body,
    });
  }, [localPost, reset]);

  if (!visible || !post) return null;
  return (
    <>
      <article className="user-card m-7 mt-15 p-5 w-180 lg:w-300">
        <section className="grid grid-cols-4">
          <div className="grid grid-cols-2 gap-[17vw] md:gap-[10vw] lg:gap-0">
            <figure className="w-30">
              <img
                src={post.user.picture || "/images/default-avatar.png"}
                alt="avatar"
                className="avatar"
              />
            </figure>
            <div className="self-center">
              <p className="w-100 text-sm text-black font-sw">
                {post.user?.name ?? "Usuário desconhecido"}
              </p>
              <p className="text-sm text-black/60 font-sw w-100">
                {" "}
                {post.user?.address?.city ?? "Localização desconhecida"}
              </p>
            </div>
          </div>
          <figure className="w-25 col-start-5 m-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className={`${
                user && post.userId === user.id
                  ? "fill-purple-10 stroke-purple-10"
                  : "fill-green-10 stroke-green-10"
              }`}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
          </figure>
        </section>
        <hr className="text-black" />
        <Post post={localPost} />
        <hr className="text-black m-3" />
        {user && post.userId === user.id && (
          <section className="grid grid-cols-5">
            <button
              onClick={() => setShowModalDel(true)}
              className="bg-pink-10 p-2 w-12 text-2xl col-start-3 rounded-full transition-all duration-700 ease-in-out hover:bg-red-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
            <button
              onClick={() => setShowModalEdit(true)}
              className="bg-purple-10 p-2 w-12 text-2xl col-start-4 rounded-full transition-all duration-700 ease-in-out hover:bg-purple-950"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
          </section>
        )}
      </article>
      {showModalDel && (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-10">
          <div className="bg-white-10 p-6 rounded shadow-xl w-200 h-80 lg:w-250 lg:h-80 grid items-center">
            <h3 className="text-4xl font-mw text-black">Confirmar exclusão</h3>
            <span className="text-3xl lg:text-2xl text-black font-mw">
              Deseja realmente deletar este post?
            </span>
            <div className="flex justify-center space-x-20">
              <button
                onClick={() => setShowModalDel(false)}
                className="p-3 rounded-lg bg-pink-10 transition-colors ease-in-out duration-200 hover:bg-pink-600 tracking-wide text-2xl lg:text-lg "
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  handleDelete();
                  setShowModalDel(false);
                }}
                className="p-3 rounded-lg bg-red-10 transition-colors ease-in-out duration-200 hover:bg-red-800 tracking-wide text-2xl lg:text-lg "
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}
      {showModalEdit && (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-20">
          <div className="bg-white-10 p-6 rounded shadow-xl w-200 min-h-60 grid items-center">
            <h3 className="text-4xl text-purple-10 font-mw py-3">
              Editar Post
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-black text-3xl lg:text-2xl font-mw font-bold">
                  Título
                </label>
                <input
                  type="text"
                  {...register("title", { required: true })}
                  className="w-full border-1 rounded-2xl border-black text-2xl lg:text-xl text-black p-2"
                  maxLength={100}
                />
                {errors.title && (
                  <p className="text-red-600 text-lg font-light p-1">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-black text-3xl lg:text-2xl font-mw font-bold">
                  Conteúdo
                </label>
                <textarea
                  rows={4}
                  {...register("body", { required: true })}
                  className="w-full border-1 rounded-2xl border-black text-2xl lg:text-xl text-black p-2"
                />
                {errors.body && (
                  <p className="text-red-600 text-lg font-light p-1">
                    {errors.body.message}
                  </p>
                )}
              </div>
              <div className="flex justify-center space-x-20">
                <button
                  type="button"
                  onClick={() => setShowModalEdit(false)}
                  className="p-3 rounded-lg bg-purple-10 transition-colors ease-in-out duration-200 hover:bg-purple-600 text-2xl lg:text-lg "
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="p-3 rounded-lg bg-green-900 transition-colors ease-in-out duration-200 hover:bg-green-600 text-2xl lg:text-lg "
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
