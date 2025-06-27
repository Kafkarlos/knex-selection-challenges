export function PostSkeleton() {
  return (
    <>
      <article className="user-card m-7 mt-15 p-5 w-300 animate-pulse">
        <section className="grid grid-cols-4">
          <div className="grid grid-cols-2">
            <figure className="w-30 h-30 avatar"></figure>
          </div>
          <figure className="w-25 col-start-5 m-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="fill-green-10 stroke-green-10"
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
        <section>
          <div>
            <h2 className="text-black font-bold text-3xl text-center p-4">
              Carregando…
            </h2>
            <p className="text-black p-5 break-all">Carregando…</p>
          </div>
        </section>
        <hr className="text-black m-3" />
      </article>
    </>
  );
}
