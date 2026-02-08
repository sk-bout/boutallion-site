export default function PolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: '#031a1d', color: '#ffffff' }}
    >
      {children}
    </div>
  )
}
