import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import PostCardList from "../PostCardList";
import { AuthContext } from "../../contexts/AuthContext";

const mockFunction = jest.fn();

const mockUser = {
  id: 1,
  name: "Carlos",
  state: "PB",
  picture: "https://example.com/avatar.png",
  email: "carlos@example.com",
  phone: "123456789",
  age: 30,
  country: "Brasil",
};

const mockUsers = [
  mockUser,
  {
    id: 2,
    name: "Maria",
    state: "SP",
    picture: "https://example.com/avatar2.png",
    email: "maria@example.com",
    phone: "987654321",
    age: 28,
    country: "Brasil",
  },
  {
    id: 3,
    name: "João",
    state: "RJ",
    picture: "https://example.com/avatar3.png",
    email: "joao@example.com",
    phone: "555555555",
    age: 35,
    country: "Brasil",
  },
];

jest.mock("axios", () => ({
  default: {
    get: jest.fn(() =>
      Promise.resolve({
        data: [
          { id: 101, title: "Título 1", body: "Corpo 1" },
          { id: 102, title: "Título 2", body: "Corpo 2" },
          { id: 103, title: "Título 3", body: "Corpo 3" },
        ],
      }),
    ),
  },
}));

describe("PostCardList", () => {
  it("deve renderizar os posts com autores diferentes", async () => {
    render(
      <AuthContext.Provider
        value={{ user: mockUser, users: mockUsers, loading: false }}
      >
        <PostCardList />
      </AuthContext.Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText("Título 1")).toBeInTheDocument();
      expect(screen.getByText("Título 2")).toBeInTheDocument();
      expect(screen.getByText("Título 3")).toBeInTheDocument();
    });
  });

  it("deve abrir modal de novo post ao clicar no botão", async () => {
    render(
      <AuthContext.Provider
        value={{ user: mockUser, users: mockUsers, loading: false }}
      >
        <PostCardList />
      </AuthContext.Provider>,
    );

    const button = screen.getByText("New Post");
    fireEvent.click(button);

    expect(screen.getByText("New Post")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Título", { selector: "label" }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Conteúdo", { selector: "label" }),
    ).toBeInTheDocument();
  });
});
