
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { getWorkouts } from "@/lib/api";
import WorkoutGrid from "@/components/WorkoutGrid";
import Footer from "@/components/Footer";

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <main>
      <Navbar />

      <Hero />

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold">
              Workout Library
            </h2>

            <p className="mt-3 text-base-content/70">
              Explore exercises and build your perfect workout.
            </p>
          </div>

          <WorkoutGrid workouts={workouts} />

        </div>
      </section>
      
      <Footer></Footer>
    </main>
  );
}

