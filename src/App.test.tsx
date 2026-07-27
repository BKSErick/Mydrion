import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Mydrion institutional page", () => {
  it("renders the approved first-fold message and conversion paths", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /construímos o que não existe pronto/i
      })
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: /mapear meu projeto/i }).length
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByRole("link", { name: /ver projetos reais/i })
    ).toHaveAttribute("href", "#projetos");
  });

  it("presents the four capabilities without niching the company to industry", () => {
    render(<App />);

    expect(screen.getByText("Sistemas sob medida")).toBeInTheDocument();
    expect(screen.getByText("Sites estratégicos")).toBeInTheDocument();
    expect(screen.getByText("Produtos SaaS")).toBeInTheDocument();
    expect(screen.getByText("IA e automação")).toBeInTheDocument();
  });

  it("exposes real projects and an accessible navigation landmark", () => {
    render(<App />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getAllByText("OStrack").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Metalthec")).toBeInTheDocument();
    expect(screen.getByText("Jotta Manutenções")).toBeInTheDocument();
    expect(screen.getByText("Ideia Hub")).toBeInTheDocument();
  });
});
