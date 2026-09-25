"use client";
import Image from "next/image";
import { Workout } from "@/types/workout";
import Link from "next/link";
import { useFavorites } from "@/context/FavoritesContext";
import { usePlan } from "@/context/PlanContext";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
    const { favorites, toggleFavorite } = useFavorites();
    const isFavorite = favorites.includes(workout.id);

       const { addToPlan, removeFromPlan, isInPlan } = usePlan();
         const planned = isInPlan(workout.id);
    return (
      <div className="group card bg-base-100 shadow-md border border-base-300 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <figure className="overflow-hidden">
          <Image
            src={workout.image}
            alt={workout.name}
            width={500}
            height={300}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <button
            onClick={() => toggleFavorite(workout.id)}
            className="absolute top-4 right-4 btn btn-circle btn-sm bg-base-100/95 border-0 shadow-md hover:scale-110 transition-transform"
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <span
              className={`text-xl ${
                isFavorite ? "text-red-500" : "text-base-content/60"
              }`}
            >
              {isFavorite ? "♥" : "♡"}
            </span>
          </button>
        </figure>

        <div className="card-body">
          <h2 className="card-title transition-colors duration-300 group-hover:text-primary">
            {workout.name}
          </h2>

          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle) => (
              <span key={muscle} className="badge badge-outline">
                {muscle}
              </span>
            ))}
          </div>

          <div className="text-sm space-y-1 mt-2">
            <p>🏋️ {workout.equipment}</p>
            <p>⏱️ {workout.duration} min</p>
            <p>🔥 {workout.caloriesBurned} calories</p>
            <p>⭐ {workout.rating}</p>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link
              href={`/workouts/${workout.id}`}
              className="btn btn-primary transition-all duration-300 group-hover:shadow-lg"
            >
              View Details
            </Link>

            <button
              onClick={() => {
                if (planned) {
                  removeFromPlan(workout.id);
                } else {
                  addToPlan(workout.id);
                }
              }}
              className={`btn ${
                planned
                  ? "border-[#ccff00] bg-[#ccff00]/10 text-[#ccff00]"
                  : "border-[#2a2d32] bg-transparent text-base-content"
              }`}
            >
              {planned ? "✓ In Plan" : "+ Plan"}
            </button>
          </div>
        </div>
      </div>
    );
}
