import React from "react";
import Navbar from "../components/Navbar";
import ExerciseComponent from "../components/ExerciseComponent";
import {
  DataContainer,
  InnerExercisesContainer,
  OuterExercisesContainer,
} from "../components/Form";
import bench from "../assets/workout_icons/bench.svg";
import cycle from "../assets/workout_icons/cycle.svg";
import dumbell from "../assets/workout_icons/cycle.svg";
import machine from "../assets/workout_icons/machine.svg";
import medicineBall from "../assets/workout_icons/medicineBall.svg";
import running from "../assets/workout_icons/running.svg";
import yoga from "../assets/workout_icons/yoga.svg";
import stretching from "../assets/workout_icons/stretching.svg";
import pulldown from "../assets/workout_icons/pulldown.svg";
import situps from "../assets/workout_icons/situps.svg";
import hangups from "../assets/workout_icons/hangups.svg";
import jumping from "../assets/workout_icons/jumping.svg";

import axios from "axios";
import { Exercises } from "../util/types";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";

const useGetDataQuery = (id: string | undefined) => {
  return useQuery<Exercises>(["workout", id], async () => {
    return await axios
      .get(`http://localhost:3001/api/workout/${id}`)
      .then((res) => {
        console.log(res.data.data);
        return res.data.data;
      });
  });
};

function updateImage(img: string) {
  switch (img) {
    case "bench":
      return bench;
    case "cycle":
      return cycle;
    case "dumbell":
      return dumbell;
    case "machine":
      return machine;
    case "medicineBall":
      return medicineBall;
    case "running":
      return running;
    case "yoga":
      return yoga;
    case "stretching":
      return stretching;
    case "pulldown":
      return pulldown;
    case "situps":
      return situps;
    case "hangups":
      return hangups;
    case "jumping":
      return jumping;
    default:
      return bench;
  }
}

const ViewExercises: React.FC = () => {
  const [exercises, setExercises] = React.useState<Exercises>({} as Exercises);
  const params = useParams();

  const { data, isLoading } = useGetDataQuery(params.id);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <DataContainer>
        <OuterExercisesContainer>
          <h1 style={{ textAlign: "center" }}>Exercises</h1>

          <InnerExercisesContainer>
            {data?.exercises.map(
              (exercise: {
                exerciseName: string;
                reps: number;
                sets: number;
              }) => {
                return (
                  <ExerciseComponent
                    img={updateImage(exercise.exerciseName)}
                    reps={exercise.reps}
                    sets={exercise.sets}
                  />
                );
              }
            )}
          </InnerExercisesContainer>
        </OuterExercisesContainer>
      </DataContainer>
    </>
  );
};
export default ViewExercises;
