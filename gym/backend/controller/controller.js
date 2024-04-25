const express = require("express");
const workout = require("../schema/workouts");
const mongoose = require("mongoose");

module.exports = {
  async getAlldata(req, res) {
    try {
      const alldata = await workout.getWorkouts();
      res.json(alldata);
    } catch (error) {
      console.log(error.message);
    }
  },
  async getData(req, res) {
    try {
      const id = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ err: "No Such workout!" });
      }
      const data = await workout.getWorkout(id.id);
      res.status(200).json(data);
    } catch (error) {
      console.log(error.message);
      res.status(404);
    }
  },
  async postData(req, res) {
    try {
      const { title, reps, load } = req.body;
      const newData = await workout.postWorkout(title, reps, load);
      res.status(200).json(newData);
    } catch (error) {
      console.log(error.message);
    }
  },
  async deleteData(req, res) {
    try {
      const id = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ err: "No Such workout!" });
      }
      const data = await workout.deleteWorkout(id.id);
      res.status(200).json(data);
    } catch (error) {
      console.log(error.message);
      res.status(404);
    }
  },
};
