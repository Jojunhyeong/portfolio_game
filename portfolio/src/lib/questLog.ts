// src/lib/questLog.ts
export type QuestCard = {
  id: string
  tag?: string
  title: string
  desc?: string
}

function stripMd(s: string) {
  return s
    .replace(/^[-*]\s+/, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/`(.+?)`/g, '$1')
    .trim()
}

/**
 * MDX 본문에서 "Quest Log:" 이후의 마크다운 리스트(- ...)를 카드 데이터로 변환
 * 지원 포맷 예:
 * Quest Log:
 * - **[Auth] 쿠키 유지 이슈 해결**
 *   - 도메인/서브도메인, credentials, CORS 정리...
 * - **[Analytics] 체류시간/퍼널 측정**
 *   - active/total + 5-click...
 */
export function parseQuestLogFromMdx(content: string): QuestCard[] {
  const lines = content.split('\n')

  // "Quest Log:" 라인 찾기
  const startIdx = lines.findIndex((l) => l.trim().toLowerCase().startsWith('quest log'))
  if (startIdx === -1) return []

  // Quest Log 이후 구간만 사용
  const after = lines.slice(startIdx + 1)

  // 다음 섹션(예: ## Something) 나오면 거기서 끊기
  const endIdx = after.findIndex((l) => /^#{1,6}\s+/.test(l.trim()))
  const scope = (endIdx === -1 ? after : after.slice(0, endIdx)).filter((l) => l.trim() !== '')

  const cards: QuestCard[] = []
  let i = 0

  while (i < scope.length) {
    const line = scope[i]

    // top-level bullet: "- ..."
    const top = line.match(/^\s*-\s+(.*)$/)
    if (!top) {
      i++
      continue
    }

    const rawTitle = stripMd(top[1])

    // tag 추출: [Auth] 같은 형식
    let tag: string | undefined
    let title = rawTitle

    const tagMatch = rawTitle.match(/^\[(.+?)\]\s*(.+)$/)
    if (tagMatch) {
      tag = tagMatch[1].trim()
      title = tagMatch[2].trim()
    }

    // 다음 줄들이 "  - ..." 형태면 desc로 합치기
    const descLines: string[] = []
    let j = i + 1
    while (j < scope.length) {
      const l2 = scope[j]

      // 다음 top-level bullet이면 종료
      if (/^\s*-\s+/.test(l2) && !/^\s{2,}-\s+/.test(l2)) break

      const sub = l2.match(/^\s{2,}-\s+(.*)$/)
      if (sub) descLines.push(stripMd(sub[1]))
      j++
    }

    cards.push({
      id: `${cards.length}-${title}`,
      tag,
      title,
      desc: descLines.length ? descLines.join(' ') : undefined,
    })

    i = j
  }

  return cards
}
