export default function Footer() {
  return (
    <footer className="w-[129vw] md:w-[109vw] lg:w-full bg-pink-10 min-h-50 relative inset-x-0 bottom-0">
      <hr />
      <section className="grid grid-cols-3 justify-items-center p-5 pt-10">
        <p>
          <a href="#">Sobre</a>
        </p>
        <p>
          <a href="#">Termos e serviçõs</a>
        </p>
        <p>
          <a href="#">Ajuda</a>
        </p>
      </section>
      <hr />
      <section className="grid grid-cols-3 justify-items-center p-5">
        <p>
          <a href="#">FAQ</a>
        </p>
        <p>
          <a href="#">Política de Privacidade</a>
        </p>
        <p>
          <a href="#">Contato</a>
        </p>
      </section>
      <hr />
      <p className="justify-self-center pt-7">
        &copy; 2025 Reden. Todos os direitos reservados.
      </p>
    </footer>
  );
}
