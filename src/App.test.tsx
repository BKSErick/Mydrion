import { fireEvent, render, screen, within } from "@testing-library/react";
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
    expect(screen.getByTestId("hero-line-tracer")).toBeInTheDocument();
    expect(screen.getByTestId("hero-line-sweep")).toBeInTheDocument();
    expect(screen.getByTestId("hero-mark-reveal")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /animações/i })
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("hero-architecture")).toHaveAttribute(
      "data-motion",
      "full"
    );
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
    expect(screen.queryByText("Ideia Hub")).not.toBeInTheDocument();
  });

  it("offers explicit horizontal project navigation and real client logos", () => {
    render(<App />);

    expect(
      screen.getByRole("region", { name: /navegação horizontal dos projetos/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /projeto anterior/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /próximo projeto/i })
    ).toBeInTheDocument();

    for (const name of [
      "BFT",
      "Espaço Constru",
      "GTHouse",
      "Metalthec",
      "SPhaus",
      "Via BR",
      "OStrack"
    ]) {
      expect(screen.getByRole("img", { name })).toBeInTheDocument();
    }
  });

  it("renders the WhatsApp project brief and page progress", () => {
    render(<App />);

    const form = screen.getByRole("form", { name: /briefing do projeto/i });
    expect(form).toBeInTheDocument();
    expect(
      within(form).getByRole("heading", { name: /briefing inicial/i })
    ).toBeInTheDocument();
    expect(within(form).getByText(/5 respostas/i)).toBeInTheDocument();
    expect(within(form).getByText(/campos obrigat.rios/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/seu nome/i)).toBeRequired();
    expect(screen.getByLabelText(/tipo de projeto/i)).toBeRequired();
    expect(screen.getByLabelText(/principal desafio/i)).toBeRequired();
    expect(
      screen.getByRole("button", { name: /enviar briefing no whatsapp/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId("page-progress")).toBeInTheDocument();
  });

  it("opens WhatsApp with the submitted project context", () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    render(<App />);

    fireEvent.change(screen.getByLabelText(/seu nome/i), {
      target: { value: "Erick" }
    });
    fireEvent.change(screen.getByLabelText(/empresa/i), {
      target: { value: "Mydrion" }
    });
    fireEvent.change(screen.getByLabelText(/tipo de projeto/i), {
      target: { value: "Sistema sob medida" }
    });
    fireEvent.change(screen.getByLabelText(/principal desafio/i), {
      target: { value: "Conectar operação e comercial." }
    });
    fireEvent.submit(
      screen.getByRole("form", { name: /briefing do projeto/i })
    );

    const destination = String(open.mock.calls[0]?.[0]);
    expect(destination).toMatch(/^https:\/\/wa\.me\/5531991072407\?text=/);
    expect(decodeURIComponent(destination)).toContain("Nome: Erick");
    expect(decodeURIComponent(destination)).toContain("Empresa: Mydrion");
    open.mockRestore();
  });
});
