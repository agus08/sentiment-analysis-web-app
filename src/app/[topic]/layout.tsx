import AutocompleteInput from "@/components/AutocompleteInput"

export default function TopicLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <section className="p-6">
      <nav className="py-4 z-20 sticky top-0 w-full max-w-md backdrop-blur-md">
        <AutocompleteInput />
      </nav>

      <div className="py-4">
        {children}
      </div>

      <footer className="sticky bottom-0 z-20 w-full max-w-md py-4 backdrop-blur-md">
        <div className="flex justify-between text-xs">
          <span>Positive</span>
          <span>Neutral</span>
          <span>Negative</span>
        </div>
        <div className="w-full bg-gradient-to-r from-green-700 via-amber-700 to-red-700 h-2 rounded-full"></div>
      </footer>
    </section>
  )
}