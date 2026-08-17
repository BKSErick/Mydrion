import { PageProgress } from "./components/PageProgress";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { usePageExperience } from "./lib/usePageExperience";
import { About } from "./sections/About";
import { Boundaries } from "./sections/Boundaries";
import { Capabilities } from "./sections/Capabilities";
import { ClientMarquee } from "./sections/ClientMarquee";
import { FinalCta } from "./sections/FinalCta";
import { Hero } from "./sections/Hero";
import { Manifesto } from "./sections/Manifesto";
import { Process } from "./sections/Process";
import { ProjectBrief } from "./sections/ProjectBrief";
import { Products } from "./sections/Products";
import { Projects } from "./sections/Projects";

export default function App() {
  usePageExperience();

  return (
    <>
      <PageProgress />
      <SiteHeader />
      <main id="conteudo">
        <Hero />
        <ClientMarquee />
        <Manifesto />
        <Capabilities />
        <Boundaries />
        <Projects />
        <Process />
        <Products />
        <About />
        <ProjectBrief />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
