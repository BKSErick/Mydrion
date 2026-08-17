import { SectionIntro } from "../components/SectionIntro";

export function About() {
  return (
    <section
      className="about section-shell"
      id="mydrion"
      aria-labelledby="about-title"
    >
      <SectionIntro
        id="about-title"
        index="07"
        eyebrow="Mydrion"
        title={
          <>
            Estratégia e execução
            <br />
            <span>na mesma mesa.</span>
          </>
        }
      />

      <div className="about__layout">
        <div className="about__portrait" aria-hidden="true">
          <div className="about__portrait-grid" />
          <img src="/brand/mydrion-mark.svg" alt="" />
          <span>ES / 01</span>
        </div>
        <div className="about__copy">
          <p className="about__lead">
            A Mydrion nasceu para construir soluções digitais sem separar negócio,
            design e tecnologia em conversas diferentes.
          </p>
          <p>
            Erick Sena atua como fundador e arquiteto de sistemas: transforma
            operações, ideias e gargalos em produtos que podem ser usados, validados e
            evoluídos.
          </p>
          <dl>
            <div>
              <dt>Atuação</dt>
              <dd>Arquitetura de sistemas</dd>
            </div>
            <div>
              <dt>Construção</dt>
              <dd>Sites, SaaS e automações</dd>
            </div>
            <div>
              <dt>Produto próprio</dt>
              <dd>OStrack</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
