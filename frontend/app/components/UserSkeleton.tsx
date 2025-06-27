export default function UserSkeleton() {
  return (
    <section className="w-50 col-span-2 animate-pulse">
      <article className="user-card m-7 p-5 w-120">
        <section className="grid grid-cols-3">
          <figure className="w-30 h-30 justify-self-center self-center avatar"></figure>
          <div className="user-info col-span-2">
            <p className="font-mw font-bold text-black p-3"></p>
            <hr className="text-green-10" />
            <div className="p-5 justify-items-start">
              <p className="text-sm text-black/60"></p>
              <p className="text-sm text-black/60 pt-2">
                <figure className="w-6 inline-block"></figure>
              </p>
            </div>
          </div>
        </section>
        <section className="user-info mt-5 min-h-50">
          <h2 className="font-mw text-5xl text-black p-4"></h2>
          <hr className="text-green-10" />
          <ul className="p-2 pb-5">
            <li className="pt-3">
              <p className="text-sm text-black"></p>
            </li>
            <li className="pt-3">
              <p className="text-sm text-black"></p>
            </li>
          </ul>
        </section>
      </article>
      <figure className="w-100 justify-self-center ml-80">
        <img
          src="public/images/dreizehn.png"
          width="100%"
          alt="Cachorro doberman vermelho, com o nome dreizehn em cima também em vermelho"
        />
      </figure>
    </section>
  );
}
