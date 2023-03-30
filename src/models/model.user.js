import mongoose from "mongoose";

const newCliente = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: Number,
    required: true,
    select: false,
  },

  email: {
    type: String,
    required: true,
  },
});

export default mongoose.model("TrainingCrud", newCliente);
