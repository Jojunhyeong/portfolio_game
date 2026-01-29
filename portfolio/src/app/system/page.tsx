export default function SystemPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-h1">SYSTEM</h1>
        <p className="text-b3 muted mt-2">기술을 “할 줄 안다”가 아니라 역할로 정의합니다.</p>
      </header>

      <section className="panel p-8 space-y-4">
        <div>
          <div className="text-b5 muted">ENGINE</div>
          <p className="text-b2">React / Next.js</p>
        </div>
        <div>
          <div className="text-b5 muted">RULE SYSTEM</div>
          <p className="text-b2">TypeScript</p>
        </div>
        <div>
          <div className="text-b5 muted">DESIGN SYSTEM API</div>
          <p className="text-b2">Tailwind v4 (tokens & utilities)</p>
        </div>
      </section>
    </div>
  )
}
