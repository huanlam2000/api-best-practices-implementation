const { v4: uuid } = require('uuid')
const Workout = require("../database/Workout.js");

const getAllWorkouts = () => {
  const allWorkouts = Workout.getAllWorkouts()

  return allWorkouts
}

const getOneWorkout = (workoutId) => {

  const workout = Workout.getOneWorkout(workoutId)
  return workout
};

const createNewWorkout = (newWorkout) => {
  const workoutToInsert = {
    ...newWorkout,
    id: uuid(),
    createAt: new Date().toLocaleDateString("en-US", { timeZone: 'UTC' }),
    updateAt: new Date().toLocaleDateString("en-US", { timeZone: 'UTC' })
  }

  const createdWorkout = Workout.createNewWorkout(workoutToInsert)

  return createdWorkout
};

const updateOneWorkout = (workoutId, data) => {
  const updatedWorkout = Workout.updateOneWorkout(workoutId, data)
  return updatedWorkout
};

const deleteOneWorkout = (workoutId, data) => {
  Workout.deleteOneWorkout(workoutId, data)
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};