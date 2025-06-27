export default function Header() {
  return (
    <header className="bg-purple-10 w-[129vw] md:w-[109vw] lg:w-full h-28 grid grid-cols-2 items-center">
      <figure className="w-40 ml-5">
        <img src="/images/logo_reden.png" alt="Reden" />
      </figure>
      <nav className="p-5 mr-5">
        <ul className="justify-end">
          <li>
            <a
              href="#"
              className="btn transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="transition-all delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
            >
              Salvos
            </a>
          </li>
          <li>
            <a
              href="#"
              className="transition-all delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
            >
              Perfil
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
