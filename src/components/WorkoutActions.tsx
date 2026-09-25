"use client";

import { useFavorites } from "@/context/FavoritesContext";
import { usePlan } from "@/context/PlanContext";
import { useToast } from "@/context/ToastContext";

interface WorkoutActionsProps {
  workoutId: number;
}

export default function WorkoutActions({ workoutId }: WorkoutActionsProps) {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToPlan, removeFromPlan, isInPlan } = usePlan();
  const { showToast } = useToast();

  const saved = favorites.includes(workoutId);
  const planned = isInPlan(workoutId);

  const handlePlan = () => {
    if (planned) {
      removeFromPlan(workoutId);
      showToast("Removed from today's plan");
    } else {
      addToPlan(workoutId);
      showToast("Added to today's plan");
    }
  };

  const handleSave = () => {
    toggleFavorite(workoutId);

    if (saved) {
      showToast("Removed from saved");
    } else {
      showToast("Saved for later");
    }
  };

  return (
    <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
      <button
        onClick={handlePlan}
        className="h-12 bg-[#ccff00] px-5 font-bold tracking-wide text-black transition hover:bg-[#d9ff4d]"
      >
        {planned ? "✓ ADDED TO TODAY'S PLAN" : "ADD TO TODAY'S PLAN"}
      </button>

      <button
        onClick={handleSave}
        className={`h-12 border px-5 font-bold tracking-wide transition ${
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
