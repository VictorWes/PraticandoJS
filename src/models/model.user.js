import mongoose from "mongoose";
import bcrypt from "bcrypt";
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
    type: String,
    required: true,
    select: false,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  avatar: {
    type: String,
    required: true,
  },
  background: {
    type: String,
    required: true,
  },
});

newCliente.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);

  next();
});

export default mongoose.model("TrainingCrud", newCliente);
