// src/app/layout.tsx
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" >
      <body className="bg-game">
          <div className="shell">{children}</div>
      </body>
    </html>
  )
}
