import { render, screen } from "@testing-library/react";
import User from "../User";
import { useAuth } from "../../contexts/AuthContext";

jest.mock("../../contexts/AuthContext", () => ({
  useAuth: jest.fn(),
}));

jest.mock("public/icons/icon.svg", () => ({
  default: "icon.svg",
}));

jest.mock("../UserSkeleton", () => () => (
  <div data-testid="skeleton">Loading...</div>
));

describe("User Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar o Skeleton quando estiver carregando", () => {
    (useAuth as jest.Mock).mockReturnValue({ loading: true });

    render(<User />);
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("deve renderizar mensagem de erro se não houver usuário", () => {
    (useAuth as jest.Mock).mockReturnValue({ loading: false, user: null });

    render(<User />);
    expect(screen.getByText("Erro ao carregar usuário")).toBeInTheDocument();
  });

  it("deve renderizar os dados do usuário corretamente", () => {
    (useAuth as jest.Mock).mockReturnValue({
      loading: false,
      user: {
        name: "Carlos",
        picture: "/foto.png",
        age: 25,
        country: "Brasil",
        state: "PB",
        email: "carlos@email.com",
        phone: "83999999999",
      },
    });

    render(<User />);

    expect(screen.getByText("Carlos")).toBeInTheDocument();
    expect(screen.getByAltText("Foto do Usuário")).toBeInTheDocument();
    expect(screen.getByText(/Idade: 25/)).toBeInTheDocument();
    expect(screen.getByText(/Brasil—PB/)).toBeInTheDocument();
    expect(screen.getByText(/Email: carlos@email.com/)).toBeInTheDocument();
    expect(screen.getByText(/Telefone: 83999999999/)).toBeInTheDocument();
  });
});
