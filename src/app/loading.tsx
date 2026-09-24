export default function Loading() {
  return (
    <main className="min-h-screen bg-base-100">
     
      <div className="h-16 border-b border-base-300 animate-pulse" />

     
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="h-10 w-72 bg-base-300 rounded-lg animate-pulse" />
          <div className="h-5 w-96 max-w-full bg-base-300 rounded animate-pulse" />
        </div>
      </section>


      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="h-8 w-56 bg-base-300 rounded-lg animate-pulse mb-8" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-base-300 overflow-hidden"
              >
                <div className="h-52 bg-base-300 animate-pulse" />

                <div className="p-5 space-y-3">
                  <div className="h-6 w-3/4 bg-base-300 rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-base-300 rounded animate-pulse" />
                  <div className="h-4 w-full bg-base-300 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
