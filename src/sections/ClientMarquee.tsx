import { clientLogos } from "../data/siteContent";

type LogoGroupProps = {
  clone?: boolean;
};

function LogoGroup({ clone = false }: LogoGroupProps) {
  return (
    <ul
      className="client-marquee__group"
      aria-hidden={clone ? "true" : undefined}
    >
      {clientLogos.map((logo) => (
        <li
          className={
            logo.name === "Metalthec"
              ? "client-marquee__logo client-marquee__logo--light"
              : "client-marquee__logo"
          }
          key={`${clone ? "clone-" : ""}${logo.name}`}
        >
          <img
            src={logo.src}
            alt={clone ? "" : logo.name}
            loading="lazy"
            draggable="false"
          />
        </li>
      ))}
    </ul>
  );
}

export function ClientMarquee() {
  return (
    <section className="client-marquee" aria-labelledby="clients-title">
      <div className="client-marquee__header section-shell">
        <p>
          <span>Ecossistema real</span>
          Empresas / produtos / parcerias
        </p>
        <h2 id="clients-title">
          Marcas que fazem parte
          <br />
          <span>dessa construção.</span>
        </h2>
      </div>

      <div
        className="client-marquee__viewport"
        tabIndex={0}
        aria-label="Logos de clientes e produtos"
      >
        <div className="client-marquee__track">
          <LogoGroup />
          <LogoGroup clone />
        </div>
      </div>
    </section>
  );
}
