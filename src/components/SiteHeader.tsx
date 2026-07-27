import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { contactHref } from "../data/siteContent";

const navigation = [
  { label: "Capacidades", href: "#capacidades" },
  { label: "Projetos", href: "#projetos" },
  { label: "Processo", href: "#processo" },
  { label: "Mydrion", href: "#mydrion" }
] as const;

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", isOpen);
    return () => document.body.classList.remove("menu-open");
  }, [isOpen]);

  return (
    <header className="site-header">
      <a className="site-header__brand" href="#inicio" aria-label="Mydrion, início">
        <img src="/brand/mydrion.svg" alt="Mydrion" />
      </a>

      <button
        className="site-header__toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="menu-principal"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      <nav
        id="menu-principal"
        className={`site-header__nav ${isOpen ? "is-open" : ""}`}
        aria-label="Navegação principal"
      >
        <div className="site-header__links">
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>
        <a
          className="site-header__contact"
          href={contactHref}
          target="_blank"
          rel="noreferrer"
          onClick={() => setIsOpen(false)}
        >
          Mapear meu projeto
          <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
