export function SiteFooter() {
  return (
    <footer className="site-footer">
      <a href="#inicio" aria-label="Voltar ao início">
        <img src="/brand/mydrion.svg" alt="Mydrion" />
      </a>
      <p>Sistemas, sites e produtos digitais sob medida.</p>
      <div>
        <span>Brasil</span>
        <span>© {new Date().getFullYear()} Mydrion</span>
      </div>
    </footer>
  );
}
