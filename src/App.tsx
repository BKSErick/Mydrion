import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { About } from "./sections/About";
import { Capabilities } from "./sections/Capabilities";
import { FinalCta } from "./sections/FinalCta";
import { Hero } from "./sections/Hero";
import { Manifesto } from "./sections/Manifesto";
import { Process } from "./sections/Process";
import { Products } from "./sections/Products";
import { Projects } from "./sections/Projects";

export default function App() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo">
        <Hero />
        <Manifesto />
        <Capabilities />
        <Projects />
        <Process />
        <Products />
        <About />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
