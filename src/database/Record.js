const DB = require('./db.json')

const getRecordForWorkout = (workoutId) => {
  try {
    const record = DB.records.filter((record) => record.workout === workoutId)
    if (!record || record.length === 0) {
      throw {
        status: 400,
        message: `Can't find record with the workoutId = ${workoutId}`
      }
    }

    return record
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error
    }
  }
}

module.exports = {
  getRecordForWorkout
}