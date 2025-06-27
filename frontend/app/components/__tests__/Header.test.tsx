import { render, screen } from "@testing-library/react";
import Header from "../Header";

describe("Header component", () => {
  test("renderiza a logo corretamente", () => {
    render(<Header />);

    const logoImg = screen.getByAltText(/reden/i);
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute("src", "/images/logo_reden.png");
  });

  test("renderiza os links do menu", () => {
    render(<Header />);

    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/salvos/i)).toBeInTheDocument();
    expect(screen.getByText(/perfil/i)).toBeInTheDocument();
  });

  test("links possuem classe de transição hover", () => {
    render(<Header />);

    const homeLink = screen.getByText(/home/i);
    expect(homeLink.className).toMatch(/hover:-translate-y-1/);
  });
});
