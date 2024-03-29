export interface WorkoutPlan {
  _id: string;
  owner: string;
  workoutPlanName: string;
  date: Date;
  followers: string[];
  workouts: WorkoutInfo[];
}

export interface WorkoutInfo {
  workoutID: string;
  workoutName: string;
  day: string[];
}

export interface Workout {
  _id: string;
  owner: string;
  workoutname: string;
  date: Date;
  exercises: [
    {
      exerciseName: string;
      sets: number;
      reps: number;
    }
  ];
}

export type WorkoutData = {
  workoutname: string;
  exercises: Array<Exercise>;
};

export type WorkoutPlanProps = {
  workoutplan: WorkoutPlan;
};

export type Exercises = {
  _id: string;
  owner: string;
  workoutname: string;
  exercises: Exercise[];
  date: string;
  __v: number;
};

export type Exercise = {
  exerciseName: string;
  sets: number;
  reps: number;
  _id: string;
};

export type ServerExerciseData = {
  data: Exercises;
  status: string;
};

export type ExerciseData = {
  name: string | undefined;
  url: string;
};

// Made for posting exercises that haven't gotten an ID yet
export type ExerciseWithoutID = {
  exerciseName: string;
  sets: number;
  reps: number;
};

export type WorkoutDataNoId = {
  workoutname: string;
  exercises: Array<ExerciseWithoutID>;
};
