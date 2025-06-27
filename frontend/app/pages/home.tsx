import Header from "../components/Header";
import Footer from "../components/Footer";
import User from "../components/User";
import PostCardList from "~/components/PostCardList";

export function Welcome() {
  return (
    <>
      <Header />
      <main className="min-h-200 md:grid md:grid-cols-4 justify-items-center">
        <section className="ml-[30vw] md:ml-0 md:flex-3/12 justify-items-center justify-center md:col-start-2">
          <PostCardList />
        </section>
        <User />
        <div className="absolute h-full w-2 hidden md:flex md:right-98 lg:right-160 bg-purple-10 z-0"></div>
      </main>
      <Footer />
    </>
  );
}
