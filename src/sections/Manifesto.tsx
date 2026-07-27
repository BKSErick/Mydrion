import { motion, useReducedMotion } from "framer-motion";

export function Manifesto() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="manifesto section-shell" aria-labelledby="manifesto-title">
      <div className="manifesto__label">
        <span>01</span>
        <span>Princípio</span>
      </div>
      <motion.div
        className="manifesto__copy"
        initial={reduceMotion ? false : { opacity: 0.18 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: reduceMotion ? 0 : 1 }}
      >
        <h2 id="manifesto-title">
          Seu negócio não nasceu de um template.
          <br />
          <span>Sua tecnologia também não deveria.</span>
        </h2>
        <div className="manifesto__body">
          <p>
            Quando a operação cresce, o improviso começa a cobrar juros. Ferramentas
            desconectadas, processos paralelos e uma presença digital que já não
            representa a empresa.
          </p>
          <p>
            A Mydrion entra nesse ponto: entende a lógica, desenha a arquitetura e
            constrói a solução certa — seja um sistema, um site ou um produto digital.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
