import mongoose from "mongoose";

const connectDatabase = () => {
  console.log("Por favor aguarde, estamos conectado ao database");

  mongoose
    .connect(
      "mongodb+srv://wes:drago200@cavernagamer.mvxjzwz.mongodb.net/?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Mongo conectado"))
    .catch((error) => console.log(error));
};



export default connectDatabase 