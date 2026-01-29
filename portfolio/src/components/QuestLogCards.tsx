// src/components/QuestLogCards.tsx
import type { QuestCard } from '@/lib/questLog'

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="panel px-2 py-1 text-b5 muted whitespace-nowrap">{children}</span>
}
function AccentChip({ children }: { children: React.ReactNode }) {
  return <span className="panel px-2 py-1 text-b5 accent whitespace-nowrap">{children}</span>
}

export default function QuestLogCards({ items }: { items: QuestCard[] }) {
  if (!items.length) {
    return (
      <div className="panel p-6">
        <div className="text-b5 muted">QUEST LOG</div>
        <div className="mt-3 text-b3 muted typo">아직 기록이 없다. (MDX에 Quest Log 섹션을 추가)</div>
      </div>
    )
  }

  return (
    <section className="panel p-6 md:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-b5 muted">QUEST LOG</div>
          <div className="text-h3 mt-2">문제 해결 / 개선 기록</div>
          <p className="text-b3 muted mt-2 typo">
            “무슨 일을 했는지”를 한눈에 보이도록 카드로 정리했다.
          </p>
        </div>
        <div className="text-b5 muted">{items.length} quests</div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {items.map((q) => (
          <div key={q.id} className="panel p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-b2">{q.title}</div>
                {q.desc ? <div className="mt-2 text-b4 muted typo">{q.desc}</div> : null}
              </div>
              {q.tag ? <AccentChip>{q.tag}</AccentChip> : <Chip>Quest</Chip>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
