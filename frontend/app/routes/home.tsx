import type { Route } from "./+types/home";
import { Welcome } from "../pages/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Reden" }, { name: "Socia", content: "Welcome to Reden!" }];
}

export default function Home() {
  return <Welcome />;
}
