import { ArrowUpRight, Boxes, Radar } from "lucide-react";

export function Products() {
  return (
    <section className="products" aria-labelledby="products-title">
      <div className="products__intro section-shell">
        <p>
          <span>05</span>
          Produtos Mydrion
        </p>
        <h2 id="products-title">
          Também construímos
          <br />
          <span>o que é nosso.</span>
        </h2>
      </div>

      <div className="products__grid section-shell">
        <article className="product-card product-card--featured">
          <div className="product-card__top">
            <Radar aria-hidden="true" />
            <span>Em operação</span>
          </div>
          <div>
            <p>Produto próprio</p>
            <h3>OStrack</h3>
            <p>
              Gestão de ordens de serviço desenhada para transformar execução em
              visibilidade operacional.
            </p>
          </div>
          <a
            href="https://o-strackpagina.vercel.app/"
            target="_blank"
            rel="noreferrer"
          >
            Conhecer produto
            <ArrowUpRight aria-hidden="true" size={18} />
          </a>
        </article>

        <article className="product-card product-card--future">
          <div className="product-card__top">
            <Boxes aria-hidden="true" />
            <span>Laboratório</span>
          </div>
          <div>
            <p>Mydrion Labs</p>
            <h3>Novos sistemas em construção.</h3>
            <p>
              Problemas recorrentes podem se tornar produtos melhores. É assim que
              nosso laboratório escolhe o que construir a seguir.
            </p>
          </div>
          <span className="product-card__status">Em desenvolvimento contínuo</span>
        </article>
      </div>
    </section>
  );
}
