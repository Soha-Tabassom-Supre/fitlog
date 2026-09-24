
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { getWorkouts } from "@/lib/api";
import WorkoutLibrary from "@/components/WorkoutLibrary";
import Footer from "@/components/Footer";

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <main>
      <Navbar />

      <Hero />

      <WorkoutLibrary workouts={workouts} />

      <Footer></Footer>
    </main>
  );
}

