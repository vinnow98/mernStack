const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const workout = mongoose.model("Gym", workoutSchema);

module.exports = {
  async getWorkouts() {
    const allData = await workout.find();
    return allData;
  },
  async getWorkout(id) {
    const data = await workout.findById(id);
    return data;
  },
  async postWorkout(title, reps, load) {
    console.log(title + "from schema");
    const data = await workout.create({
      title: title,
      reps: reps,
      load: load,
    });
    return data;
  },
  async deleteWorkout(id) {
    const data = await workout.findByIdAndDelete(id);
    return data;
  },
};
