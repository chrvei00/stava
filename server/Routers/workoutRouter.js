const express = require("express");

const {
  createWorkout,
  findWorkoutById,
  getWorkoutByOwner,
} = require("../Controllers/workoutController");

const {
  getWorkoutPlansByOwner,
  createWorkoutPlan,
  findWorkoutPlanById,
} = require("../Controllers/workoutplanController");

const router = express.Router();

router.route("/").post(createWorkout);
router.route("/workouts").get(getWorkoutByOwner);
router.route("/workout/:id").get(findWorkoutById);
router.route("/plan").get(getWorkoutPlansByOwner).post(createWorkoutPlan);
router.route("/plan/:id").get(findWorkoutPlanById);

module.exports = router;
