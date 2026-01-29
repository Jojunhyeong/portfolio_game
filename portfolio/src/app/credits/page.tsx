export default function CreditsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-h1">CREDITS</h1>
        <p className="text-b3 muted mt-2">Links & Contact</p>
      </header>

      <section className="panel p-8 space-y-3">
        <div className="text-b2">조준형</div>
        <div className="text-b3 muted">Frontend Developer</div>

        <div className="pt-4 space-y-2">
          <a className="text-b5 typo hover:accent transition-colors" href="https://github.com/" target="_blank" rel="noreferrer">
            GitHub →
          </a>
          <a className="text-b5 typo hover:accent transition-colors" href="https://velog.io/@jojh0323/posts" target="_blank" rel="noreferrer">
            Velog (Patch Notes) →
          </a>
        </div>
      </section>
    </div>
  )
}
