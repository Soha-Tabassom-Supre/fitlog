"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">⚠️</div>

        <h1 className="text-3xl font-bold">Something went wrong</h1>

        <p className="mt-3 text-base-content/60">
          We couldn't load the workouts right now. Please try again.
        </p>

        <button onClick={() => reset()} className="btn btn-primary mt-6">
          Try Again
        </button>
      </div>
    </main>
  );
}
