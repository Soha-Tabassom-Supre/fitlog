"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useFavorites } from "@/context/FavoritesContext";
import { usePlan } from "@/context/PlanContext";
import { getWorkouts } from "@/lib/api";
import { Workout } from "@/types/workout";

type Tab = "today" | "saved";

export default function MyPlanPage() {
  const { plan, removeFromPlan } = usePlan();
  const { favorites, toggleFavorite } = useFavorites();

  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("today");
  const [sortBy, setSortBy] = useState("duration");
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const data = await getWorkouts();
        setWorkouts(data);
      } catch (error) {
        console.error("Failed to load workouts:", error);
      }
    }

    loadWorkouts();
  }, []);

  useEffect(() => {
    const savedCompleted = localStorage.getItem("fitlog-completed");

    if (savedCompleted) {
      setCompleted(JSON.parse(savedCompleted));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fitlog-completed", JSON.stringify(completed));
  }, [completed]);

  const todayWorkouts = useMemo(() => {
    const items = workouts.filter((workout) => plan.includes(workout.id));

    return sortWorkouts(items, sortBy);
  }, [workouts, plan, sortBy]);

  const savedWorkouts = useMemo(() => {
    const items = workouts.filter((workout) => favorites.includes(workout.id));

    return sortWorkouts(items, sortBy);
  }, [workouts, favorites, sortBy]);

  const visibleWorkouts = activeTab === "today" ? todayWorkouts : savedWorkouts;

  const totalMinutes = visibleWorkouts.reduce(
    (total, workout) => total + workout.duration,
    0,
  );

  const totalCalories = visibleWorkouts.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0,
  );

  const toggleCompleted = (id: number) => {
    setCompleted((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      return [...current, id];
    });
  };

  const handleRemove = (workout: Workout) => {
    if (activeTab === "today") {
      removeFromPlan(workout.id);
    } else {
      toggleFavorite(workout.id);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0b0c0e] text-[#f4f4f0]">
        <div className="mx-auto max-w-[1200px] px-5 py-8 sm:px-8 lg:px-12">
         
          <section>
            <h1 className="text-2xl font-black tracking-[-0.04em] sm:text-3xl">
              MY PLAN
            </h1>

            <p className="mt-1 text-xs text-[#8b8f98]">
              Keep track of the lifts for today. Finish them, then load more.
            </p>
          </section>

          
          <section className="mt-6 grid grid-cols-3 overflow-hidden rounded-lg border border-[#202226] bg-[#15171b]">
            <Stat
              label="EXERCISES"
              value={visibleWorkouts.length.toString()}
              highlight
            />

            <Stat label="MINUTES" value={totalMinutes.toString()} />

            <Stat label="CALORIES" value={totalCalories.toString()} />
          </section>

         
          <section className="mt-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
             
              <div className="inline-flex w-fit overflow-hidden rounded-md border border-[#202226] bg-[#15171b]">
                <button
                  onClick={() => setActiveTab("today")}
                  className={`px-4 py-2 text-[10px] font-bold transition ${
                    activeTab === "today"
                      ? "bg-[#1c1f24] text-white"
                      : "text-[#8b8f98] hover:text-white"
                  }`}
                >
                  TODAY&apos;S PLAN
                </button>

                <button
                  onClick={() => setActiveTab("saved")}
                  className={`px-4 py-2 text-[10px] font-bold transition ${
                    activeTab === "saved"
                      ? "bg-[#1c1f24] text-white"
                      : "text-[#8b8f98] hover:text-white"
                  }`}
                >
                  SAVED
                </button>
              </div>

             
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#8b8f98]">
                  SORT BY
                </span>

                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="h-8 border border-[#2a2d32] bg-[#15171b] px-3 text-[10px] font-bold text-white outline-none focus:border-[#ccff00]"
                >
                  <option value="duration">Duration</option>
                  <option value="name">Name</option>
                  <option value="calories">Calories</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
          </section>

         
          <section className="mt-3">
            {visibleWorkouts.length === 0 ? (
              <EmptyState activeTab={activeTab} />
            ) : (
              <div className="space-y-2">
                {visibleWorkouts.map((workout) => (
                  <PlanWorkoutRow
                    key={workout.id}
                    workout={workout}
                    activeTab={activeTab}
                    completed={completed.includes(workout.id)}
                    onComplete={() => toggleCompleted(workout.id)}
                    onRemove={() => handleRemove(workout)}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

function sortWorkouts(workouts: Workout[], sortBy: string) {
  return [...workouts].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }

    if (sortBy === "calories") {
      return b.caloriesBurned - a.caloriesBurned;
    }

    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    return a.duration - b.duration;
  });
}

function Stat({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="border-r border-[#202226] px-4 py-3 last:border-r-0 sm:px-6">
      <p className="text-[8px] font-bold uppercase tracking-wider text-[#8b8f98]">
        {label}
      </p>

      <p
        className={`mt-1 text-xl font-black ${
          highlight ? "text-[#ccff00]" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function EmptyState({ activeTab }: { activeTab: Tab }) {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-lg border border-[#202226] bg-[#0f1013] px-6 text-center">
      <h2 className="text-sm font-black text-white">NOTHING HERE YET</h2>

      <p className="mt-2 max-w-sm text-[10px] leading-5 text-[#8b8f98]">
        {activeTab === "today"
          ? "Browse the library and add a lift to get moving."
          : "Save workouts from the library to find them here."}
      </p>

      <Link
        href="/"
        className="mt-5 bg-[#ccff00] px-5 py-2 text-[9px] font-black tracking-wider text-black transition hover:bg-[#d9ff4d]"
      >
        GO TO WORKOUTS
      </Link>
    </div>
  );
}

function PlanWorkoutRow({
  workout,
  activeTab,
  completed,
  onComplete,
  onRemove,
}: {
  workout: Workout;
  activeTab: Tab;
  completed: boolean;
  onComplete: () => void;
  onRemove: () => void;
}) {
  return (
    <article className="group flex min-h-[70px] items-center gap-3 rounded-lg border border-[#202226] bg-[#15171b] p-2 transition hover:border-[#2a2d32] sm:gap-4 sm:p-3">
     
      <Link
        href={`/workouts/${workout.id}`}
        className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md sm:h-16 sm:w-24"
      >
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="96px"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </Link>

     
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-xs font-black text-white sm:text-sm">
          {workout.name}
        </h3>

        <p className="mt-0.5 truncate text-[9px] text-[#8b8f98]">
          {workout.muscleGroups.join(" • ")}
        </p>

        <div className="mt-1.5 flex flex-wrap gap-x-3 text-[8px] text-[#8b8f98]">
          <span>◷ {workout.duration} min</span>
          <span>🔥 {workout.caloriesBurned} cal</span>
          <span>★ {workout.rating}</span>
        </div>
      </div>


      <div className="flex shrink-0 items-center gap-2">
        <Link
          href={`/workouts/${workout.id}`}
          className="hidden rounded-md border border-[#2a2d32] px-3 py-2 text-[8px] font-bold text-[#8b8f98] transition hover:border-white hover:text-white sm:block"
        >
          View Details
        </Link>

        {activeTab === "today" && (
          <button
            onClick={onComplete}
            className={`rounded-md px-3 py-2 text-[8px] font-black transition ${
              completed
                ? "bg-[#ccff00] text-black"
                : "bg-[#ccff00] text-black hover:bg-[#d9ff4d]"
            }`}
          >
            {completed ? "✓ DONE" : "✓ MARK AS DONE"}
          </button>
        )}

        <button
          onClick={onRemove}
          aria-label={
            activeTab === "today" ? "Remove from plan" : "Remove from saved"
          }
          className="flex h-7 w-7 items-center justify-center rounded-md text-[#8b8f98] transition hover:bg-[#202226] hover:text-white"
        >
          ×
        </button>
      </div>
    </article>
  );
}
