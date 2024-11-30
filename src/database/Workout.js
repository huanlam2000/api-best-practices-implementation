// Data Access Layer

const DB = require('./db.json')
const { saveToDatabase } = require('./utils')

const DEFAULT_LIMIT_PER_PAGE = 5

const getAllWorkouts = (filterParams) => {
  try {
    let workouts = DB.workouts

    if (filterParams.mode) {
      workouts = workouts.filter((workout) => workout.mode.toLowerCase().includes(filterParams.mode))
    }

    if (filterParams.equipment) {
      workouts = workouts.filter((workout) => workout.equipment === filterParams.equipment)
    }

    if (filterParams.sort) {
      const fields = filterParams.sort.split(',')
      workouts = workouts.sort((a, b) => {
        for (let field of fields) {
          let direction = 1 // default ascending
          if (field.startsWith('-')) {
            direction = -1
            field = field.slice(1)
          }

          if (a[field] < b[field]) return -1 * direction
          if (a[field] > b[field]) return 1 * direction
        }
        return 0
      })
    }
    // PAGINATION
    const page = filterParams.page || 1
    const limit = filterParams.limit || DEFAULT_LIMIT_PER_PAGE
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    const totalItems = workouts.length
    const totalPage = Math.ceil(totalItems / limit)
    const hasPrevPage = startIndex === 0 ? false : true
    const hasNextPage = page === totalPage ? true : false

    workouts = workouts.slice(startIndex, endIndex)


    return {
      currentPage: page,
      limit,
      totalItems,
      totalPage,
      hasPrevPage,
      hasNextPage,
      data: workouts
    }

  } catch (error) {
    throw {
      status: error?.status || 500, message: error?.message || error
    }
  }
}

const createNewWorkout = (newWorkout) => {
  try {
    const isAlreadyAdded = DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Workout with the name '${newWorkout.name}' already exists`
      }
    }

    DB.workouts.push(newWorkout)
    saveToDatabase(DB)
    return newWorkout
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error }
  }
}

const getOneWorkout = (workoutId) => {
  try {
    const workout = DB.workouts.find((workout) => workout.id === workoutId)

    if (!workout) {
      throw {
        status: 400,
        message: `Can't find workout with id = '${workoutId}'`
      }
    }

    return workout
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error
    }
  }

}

const updateOneWorkout = (workoutId, data) => {
  try {
    const indexForUpdate = DB.workouts.findIndex((workout) => workout.id === workoutId)
    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find workout with id = '${workoutId}'`
      }
    }

    const updatedWorkout = {
      ...DB.workouts[indexForUpdate],
      ...data,
      updateAt: new Date().toLocaleDateString('en-US', { timeZone: "UTC" })
    }

    DB.workouts[indexForUpdate] = updatedWorkout
    saveToDatabase(DB)
    return updatedWorkout

  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error
    }
  }
}

const deleteOneWorkout = (workoutId) => {
  try {
    const indexForDeletion = DB.workouts.findIndex((workout) => workout.id === workoutId)

    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't not find workout with id = ${workoutId}`
      }
    }

    DB.workouts.splice(indexForDeletion, 1)
    saveToDatabase(DB)

  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error
    }
  }
}

module.exports = { getAllWorkouts, createNewWorkout, getOneWorkout, updateOneWorkout, deleteOneWorkout }