import AutocompleteInput from "@/components/AutocompleteInput";
import DisasterHeading from "@/components/DisasterHeading";

export default function Home() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-6 gap-16 ">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        <div className="space-y-2 text-left w-full">
          <h1 className="text-3xl md:text-4xl font-bold flex flex-col">
            <span>Explore <DisasterHeading /></span>
            <span>Disaster</span>
          </h1>
          <h2 className="md:text-lg text-sm text-left">
            Analyze Sentiments to Uncover Insight
          </h2>
        </div>

        <div className="w-full">
          <AutocompleteInput />
        </div>


      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <h3 className="text-xs">by ghozi.setiawan@gmail.com</h3>
      </footer>
    </div>
  );
}
