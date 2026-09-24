
import Image from "next/image";
import Link from "next/link";
import { getWorkout } from "@/lib/api";
import Navbar from "@/components/Navbar";

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function WorkoutDetailsPage({
  params,
}: WorkoutDetailsPageProps) {
  const { id } = await params;
  const workout = await getWorkout(id);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-base-200/40 py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
    
          <Link href="/" className="btn btn-ghost mb-6 px-2">
            ← Back to Workout Library
          </Link>

          <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
           
              <div className="relative min-h-80 lg:min-h-full">
                <Image
                  src={workout.image}
                  alt={workout.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />

             
                <div className="absolute top-5 left-5">
                  <span className="badge badge-lg bg-base-100/90 border-0 shadow-md">
                    {workout.difficulty}
                  </span>
                </div>
              </div>

             
              <div className="p-6 sm:p-8 lg:p-10">
        
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-yellow-500 text-xl">★</span>

                    <span className="font-semibold">{workout.rating}</span>

                    <span className="text-base-content/50">/ 5</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                    {workout.name}
                  </h1>
                </div>

            
                <div className="flex flex-wrap gap-2 mt-5">
                  {workout.muscleGroups.map((muscle) => (
                    <span
                      key={muscle}
                      className="badge badge-primary badge-outline"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>

             
                <p className="mt-6 text-base-content/70 leading-relaxed">
                  {workout.description}
                </p>

              
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
                  <div className="bg-base-200 rounded-2xl p-4 text-center">
                    <div className="text-2xl mb-1">⏱️</div>
                    <p className="text-xs text-base-content/60">Duration</p>
                    <p className="font-bold mt-1">{workout.duration} min</p>
                  </div>

                  <div className="bg-base-200 rounded-2xl p-4 text-center">
                    <div className="text-2xl mb-1">🔥</div>
                    <p className="text-xs text-base-content/60">Calories</p>
                    <p className="font-bold mt-1">{workout.caloriesBurned}</p>
                  </div>

                  <div className="bg-base-200 rounded-2xl p-4 text-center">
                    <div className="text-2xl mb-1">💪</div>
                    <p className="text-xs text-base-content/60">Sets</p>
                    <p className="font-bold mt-1">{workout.sets}</p>
                  </div>

                  <div className="bg-base-200 rounded-2xl p-4 text-center">
                    <div className="text-2xl mb-1">🔁</div>
                    <p className="text-xs text-base-content/60">Reps</p>
                    <p className="font-bold mt-1">{workout.reps}</p>
                  </div>
                </div>

             
                <div className="mt-6 flex items-center gap-3 bg-base-200 rounded-2xl p-4">
                  <div className="text-2xl">🏋️</div>

                  <div>
                    <p className="text-xs text-base-content/60">Equipment</p>

                    <p className="font-semibold">{workout.equipment}</p>
                  </div>
                </div>
              </div>
            </div>

         
            <div className="border-t border-base-300 p-6 sm:p-8 lg:p-10">
              <div className="max-w-4xl">
                <h2 className="text-2xl sm:text-3xl font-bold">
                  How to Perform
                </h2>

                <p className="text-base-content/60 mt-2 mb-7">
                  Follow these steps to perform the exercise correctly.
                </p>

                <div className="space-y-4">
                  {workout.instructions.map((instruction, index) => (
                    <div
                      key={index}
                      className="flex gap-4 items-start bg-base-200/60 rounded-2xl p-4 sm:p-5"
                    >
                      <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold">
                        {index + 1}
                      </div>

                      <p className="leading-relaxed pt-1">{instruction}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

       
          <div className="text-center mt-8">
            <Link href="/" className="btn btn-primary px-8">
              Explore More Workouts
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

