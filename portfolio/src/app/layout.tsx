import './globals.css'
import TopNav from '@/components/TopNav'
import BottomDock from '@/components/BottomDock'
import GlobalHotkeys from '@/components/GlobalHotkeys'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-game">
        {/* Cyberpunk Perspective Grid */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
          <div className="perspective-grid-floor" />
        </div>
        <div className="relative z-10 pt-[92px] ">
          <TopNav />
          <div className="shell pb-24">    <GlobalHotkeys />{children}</div>
          <BottomDock />
        </div>
      </body>
    </html>
  )
}
