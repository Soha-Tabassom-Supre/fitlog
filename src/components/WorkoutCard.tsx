import Image from "next/image";
import { Workout } from "@/types/workout";
import Link from "next/link";

interface WorkoutCardProps {
  workout: Workout;
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow">
      <figure>
        <Image
          src={workout.image}
          alt={workout.name}
          width={500}
          height={300}
          className="w-full h-56 object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{workout.name}</h2>

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
       
         <Link href={`/workouts/${workout.id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
}
