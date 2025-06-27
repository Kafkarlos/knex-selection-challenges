import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { PostSkeleton } from "./PostSkeleton";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { User } from "../types/User";
import { useToast } from "../hooks/useToast";

const toast = useToast();

const ContentSchema = z.object({
  title: z.string().min(1, "O título não pode ser vazio"),
  body: z.string().min(1, "O conteúdo não pode ser vazio"),
});

type ContentType = z.infer<typeof ContentSchema>;

export type PostsWithUser = {
  id: number;
  title: string;
  body: string;
  userId: number;
  user: {
    name: string;
    address: {
      city: string;
    };
    picture: string;
  };
};

export default function PostCardList() {
  const [posts, setPosts] = useState<PostsWithUser[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [pendingPost, setPendingPost] = useState<ContentType | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { user, users, loading } = useAuth() as {
    user: User | null;
    users: User[];
    loading: boolean;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContentType>({
    resolver: zodResolver(ContentSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const getNonLoggedUser = (
    users: User[],
    loggedUserId: number,
    index: number,
  ) => {
    const others = users.filter((u) => u.id !== loggedUserId);
    return others[index % others.length];
  };

  useEffect(() => {
    if (!user || users.length === 0) return;

    axios
      .get("https://jsonplaceholder.typicode.com/posts?_limit=3")
      .then((res) => {
        const postsWithUsers = res.data.map((post: any, index: number) => {
          const postUser = getNonLoggedUser(users, user.id, index);
          return {
            ...post,
            userId: postUser.id,
            user: {
              name: postUser.name,
              address: { city: postUser.state },
              picture: postUser.picture,
            },
          };
        });
        setPosts(postsWithUsers);
      });
  }, [users, user]);

  const onSubmitForm = (data: ContentType) => {
    setPendingPost(data);
    setShowConfirmModal(true);
  };

  const confirmPostCreation = () => {
    if (!pendingPost || !user) return;

    toast.showLoading("Publicando post...");

    const newPost: PostsWithUser = {
      id: Date.now(),
      title: pendingPost.title,
      body: pendingPost.body,
      userId: user.id,
      user: {
        name: user.name,
        address: { city: user.state },
        picture: user.picture,
      },
    };

    setTimeout(() => {
      setPosts((prev) => [...prev, newPost]);
      reset();
      setShowModal(false);
      setShowConfirmModal(false);
      setPendingPost(null);
      toast.showSuccess("Post publicado com sucesso!");
    }, 1000);
  };

  if (loading) return <PostSkeleton />;
  if (!user)
    return (
      <p className="text-3xl text-red-10 font-mw font-bold">
        Erro ao carregar usuário
      </p>
    );

  return (
    <>
      <hr className="h-2 w-full bg-purple-10 absolute md:hidden" />
      <section className="mt-[60vh] p-2 md:mt-0 justify-items-center">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        <button
          onClick={() => setShowModal(true)}
          className="bg-red-10 p-4 m-4 w-60 md:w-50 text-2xl font-mw font-bold col-start-2 grid grid-cols-3 items-center rounded-xl transition-all duration-700 ease-in-out hover:bg-purple-950"
        >
          <figure className="w-10">
            <img src="/images/pena.png" alt="Pena" />
          </figure>
          <p className="col-span-2">New Post</p>
        </button>
      </section>

      {showModal && (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-10">
          <div className="bg-white-10 p-6 rounded shadow-xl w-[80%] md:w-[50%] min-h-[50%] grid items-center">
            <h3 className="text-6xl md:text-4xl text-purple-10 font-mw font-bold my-2 text-center md:text-left">
              New Post
            </h3>
            <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
              <div>
                <label className="block text-black text-3xl lg:text-2xl font-mw font-bold">
                  Título
                </label>
                <input
                  type="text"
                  {...register("title", { required: true })}
                  className="w-full border-1 rounded-2xl border-black text-2xl lg:text-xl text-black p-2"
                  maxLength={100}
                  placeholder="Título do seu Post"
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
                  rows={6}
                  {...register("body", { required: true })}
                  className="w-full border-1 rounded-2xl border-black text-2xl lg:text-xl text-black p-2"
                  placeholder="Conteúdo do seu Post"
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
                  onClick={() => {
                    reset({ title: "", body: "" });
                    setShowModal(false);
                  }}
                  className="p-3 rounded-lg bg-red-800 transition-colors ease-in-out duration-200 hover:bg-red-10 text-2xl lg:text-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="p-3 rounded-lg bg-green-900 transition-colors ease-in-out duration-200 hover:bg-green-600 text-2xl lg:text-lg"
                >
                  Publicar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-20">
          <div className="bg-white-10 p-6 rounded shadow-xl w-[80%] md:w-[50%] min-h-[40%] grid gap-4">
            <h3 className="text-3xl pt-2 font-bold text-purple-10">
              Confirmar Publicação
            </h3>
            <p className="text-lg text-black">
              Tem certeza que deseja publicar o post com as seguintes
              informações?
            </p>
            <div className="bg-gray-100 p-4 border-2 border-green-10 rounded-xl text-black">
              <p>
                <strong>Título:</strong> {pendingPost?.title}
              </p>
              <p>
                <strong>Conteúdo:</strong> {pendingPost?.body}
              </p>
            </div>
            <div className="flex justify-center space-x-10">
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setPendingPost(null);
                }}
                className="p-3 bg-red-800 text-white text-2xl rounded-lg hover:bg-red-10 transition"
              >
                Cancelar
              </button>
              <button
                onClick={confirmPostCreation}
                className="p-3 bg-green-900 text-white text-2xl rounded-lg hover:bg-green-600 transition"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
