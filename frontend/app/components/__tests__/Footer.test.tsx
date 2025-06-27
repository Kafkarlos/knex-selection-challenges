import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer", () => {
  test("renderiza todos os links e informações corretamente", () => {
    render(<Footer />);

    expect(screen.getByText(/Sobre/i)).toBeInTheDocument();
    expect(screen.getByText(/Termos e serviçõs/i)).toBeInTheDocument();
    expect(screen.getByText(/Ajuda/i)).toBeInTheDocument();
    expect(screen.getByText(/FAQ/i)).toBeInTheDocument();
    expect(screen.getByText(/Política de Privacidade/i)).toBeInTheDocument();
    expect(screen.getByText(/Contato/i)).toBeInTheDocument();

    expect(
      screen.getByText(/© 2025 Reden. Todos os direitos reservados./i),
    ).toBeInTheDocument();
  });
});
