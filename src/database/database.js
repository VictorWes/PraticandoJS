import mongoose from "mongoose";

const connectDatabase = () => {
  console.log("Por favor aguarde, estamos conectado ao database");

  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Mongo conectado"))
    .catch((error) => console.log(error));
};

export default connectDatabase;
