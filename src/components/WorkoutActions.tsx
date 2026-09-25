"use client";

import { useFavorites } from "@/context/FavoritesContext";
import { usePlan } from "@/context/PlanContext";

interface WorkoutActionsProps {
  workoutId: number;
}

export default function WorkoutActions({ workoutId }: WorkoutActionsProps) {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToPlan, removeFromPlan, isInPlan } = usePlan();

  const saved = favorites.includes(workoutId);
  const planned = isInPlan(workoutId);

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
      <button
        onClick={() => {
          if (planned) {
            removeFromPlan(workoutId);
          } else {
            addToPlan(workoutId);
          }
        }}
        className={`h-12 px-5 font-bold tracking-wide transition ${
          planned
            ? "bg-[#ccff00] text-black hover:bg-[#b8e600]"
            : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
        }`}
      >
        {planned ? "✓ ADDED TO TODAY'S PLAN" : "ADD TO TODAY'S PLAN"}
      </button>

      <button
        onClick={() => toggleFavorite(workoutId)}
        className={`h-12 px-5 font-bold tracking-wide border transition ${
          saved
            ? "border-[#ccff00] bg-[#ccff00]/10 text-[#ccff00]"
            : "border-[#2a2d32] bg-transparent text-white hover:border-[#ccff00] hover:text-[#ccff00]"
        }`}
      >
        {saved ? "✓ SAVED FOR LATER" : "SAVE FOR LATER"}
      </button>
    </div>
  );
}
