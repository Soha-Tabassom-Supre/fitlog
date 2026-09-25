"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface PlanContextType {
  plan: number[];
  addToPlan: (id: number) => void;
  removeFromPlan: (id: number) => void;
  isInPlan: (id: number) => boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<number[]>([]);

  useEffect(() => {
    const savedPlan = localStorage.getItem("fitlog-plan");

    if (savedPlan) {
      setPlan(JSON.parse(savedPlan));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan]);

  const addToPlan = (id: number) => {
    setPlan((currentPlan) => {
      if (currentPlan.includes(id)) {
        return currentPlan;
      }

      return [...currentPlan, id];
    });
  };

  const removeFromPlan = (id: number) => {
    setPlan((currentPlan) =>
      currentPlan.filter((workoutId) => workoutId !== id),
    );
  };

  const isInPlan = (id: number) => {
    return plan.includes(id);
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        addToPlan,
        removeFromPlan,
        isInPlan,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }

  return context;
}
