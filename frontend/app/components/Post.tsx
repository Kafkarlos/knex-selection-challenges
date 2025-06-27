type PostProps = {
  post: {
    id: number;
    title: string;
    body: string;
  };
};

export default function Post({ post }: PostProps) {
  return (
    <section>
      <div key={post.id}>
        <h2 className="text-black font-bold text-3xl text-center p-4">
          {post.title}
        </h2>
        <p className="text-black p-5 break-all">{post.body}</p>
      </div>
    </section>
  );
}
