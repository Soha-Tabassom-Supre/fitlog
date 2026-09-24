
"use client";

import { useState } from "react";
import { Workout } from "@/types/workout";
import WorkoutGrid from "./WorkoutGrid";

interface WorkoutLibraryProps {
  workouts: Workout[];
}

export default function WorkoutLibrary({
  workouts,
}: WorkoutLibraryProps) {
  const [search, setSearch] = useState("");
  const [muscleFilter, setMuscleFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");


  const muscleGroups = [
    "All",
    ...new Set(
      workouts.flatMap((workout) => workout.muscleGroups)
    ),
  ];

 
  const difficulties = [
    "All",
    ...new Set(
      workouts.map((workout) => workout.difficulty)
    ),
  ];

 
  const filteredWorkouts = workouts.filter((workout) => {
    const matchesSearch = workout.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesMuscle =
      muscleFilter === "All" ||
      workout.muscleGroups.includes(muscleFilter);

    const matchesDifficulty =
      difficultyFilter === "All" ||
      workout.difficulty === difficultyFilter;

    return (
      matchesSearch &&
      matchesMuscle &&
      matchesDifficulty
    );
  });

  const clearFilters = () => {
    setSearch("");
    setMuscleFilter("All");
    setDifficultyFilter("All");
  };

  const hasActiveFilters =
    search !== "" ||
    muscleFilter !== "All" ||
    difficultyFilter !== "All";

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

       
        <div className="mb-10">
          <p className="text-primary font-semibold uppercase tracking-wider text-sm">
            Explore & Train
          </p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-2">

            <div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Workout Library
              </h2>

              <p className="mt-2 text-base-content/60 max-w-xl">
                Discover exercises tailored to your goals,
                fitness level, and training style.
              </p>
            </div>

            <p className="text-sm text-base-content/60">
              {filteredWorkouts.length}{" "}
              {filteredWorkouts.length === 1
                ? "workout"
                : "workouts"}{" "}
              available
            </p>

          </div>
        </div>


        <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 p-4 sm:p-5 mb-8">

          <div className="flex flex-col lg:flex-row gap-4">

           
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50">
                🔍
              </span>

              <input
                type="text"
                placeholder="Search workouts by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input input-bordered w-full pl-11"
              />
            </div>

           
            <select
              value={muscleFilter}
              onChange={(e) =>
                setMuscleFilter(e.target.value)
              }
              className="select select-bordered w-full lg:w-56"
            >
              {muscleGroups.map((muscle) => (
                <option key={muscle} value={muscle}>
                  {muscle === "All"
                    ? "All Muscle Groups"
                    : muscle}
                </option>
              ))}
            </select>

          
            <select
              value={difficultyFilter}
              onChange={(e) =>
                setDifficultyFilter(e.target.value)
              }
              className="select select-bordered w-full lg:w-52"
            >
              {difficulties.map((difficulty) => (
                <option
                  key={difficulty}
                  value={difficulty}
                >
                  {difficulty === "All"
                    ? "All Difficulties"
                    : difficulty}
                </option>
              ))}
            </select>

          </div>

          
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-base-300">

              <span className="text-sm text-base-content/60">
                Filters applied:
              </span>

              {search && (
                <span className="badge badge-outline">
                  Search: {search}
                </span>
              )}

              {muscleFilter !== "All" && (
                <span className="badge badge-outline">
                  {muscleFilter}
                </span>
              )}

              {difficultyFilter !== "All" && (
                <span className="badge badge-outline">
                  {difficultyFilter}
                </span>
              )}

              <button
                onClick={clearFilters}
                className="btn btn-ghost btn-sm"
              >
                Clear filters
              </button>

            </div>
          )}

        </div>

    
        {filteredWorkouts.length > 0 ? (
          <WorkoutGrid workouts={filteredWorkouts} />
        ) : (
          <div className="bg-base-100 rounded-2xl border border-base-300 text-center py-20 px-6">

            <div className="text-5xl mb-4">
              🔍
            </div>

            <h3 className="text-2xl font-bold">
              No workouts found
            </h3>

            <p className="mt-2 text-base-content/60">
              Try changing your search or filters.
            </p>

            <button
              onClick={clearFilters}
              className="btn btn-primary mt-6"
            >
              Clear Filters
            </button>

          </div>
        )}

      </div>
    </section>
  );
}

