import "../styles/globals.css";

export const metadata = {
  title: 'CTR - Consiliul Tineretului din România',
  description: 'Consiliul Tineretului din România - Reprezentăm tinerii din România la nivel național și internațional!',
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className="overflow-x-hidden">{children}</body>
    </html>
  )
}
