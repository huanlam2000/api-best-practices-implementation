const Router = require('express').Router
const workoutController = require('../../controllers/workoutController.js')
const recordController = require('../../controllers/recordController.js')
const router = Router()

router.get('/', workoutController.getAllWorkouts)

router.get("/:workoutId", workoutController.getOneWorkout)

router.get('/:workoutId/records', recordController.getRecordForWorkout)

router.post('/', workoutController.createNewWorkout)

router.patch('/:workoutId', workoutController.updateOneWorkout)

router.delete('/:workoutId', workoutController.deleteOneWorkout)

module.exports = router