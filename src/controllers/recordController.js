const RecordService = require('../services/recordService.js')

const getRecordForWorkout = (req, res) => {
  try {
    const { params: { workoutId } } = req

    if (!workoutId) {
      res.status(400).send({
        status: "FAILED",
        data: {
          error: `Parameter ':workoutId' can not be empty.`
        }
      })
    }

    const record = RecordService.getRecordForWorkout(workoutId)
    res.status(200).send({ status: "OK", data: record })
  } catch (error) {
    res.status(error?.status || 500).send({
      status: 'FAILED',
      data: {
        error: error?.message || error
      }
    })
  }
}


module.exports = {
  getRecordForWorkout
}