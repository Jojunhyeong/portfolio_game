import './globals.css'
import TopNav from '@/components/TopNav'
import BottomDock from '@/components/BottomDock'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-game">
        <div className="relative z-10 pt-[92px] ">
          <TopNav />
          <div className="shell pb-24">{children}</div>
          <BottomDock />
        </div>
      </body>
    </html>
  )
}
