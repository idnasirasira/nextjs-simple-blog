import mongoose from "mongoose";

global.mongoose = {
  conn: null,
  promise: null,
};

export async function dbConnect() {
  if (global.mongoose && global.mongoose.conn) {
    console.log(`Using existing connection.`);

    return global.mongoose.conn;
  } else {
    console.log(`Create new connection.`);

    const user = process.env.MONGODB_USER;
    const password = process.env.MONGODB_PASSWORD;
    const database = process.env.MONGODB_DATABASE;

    const conString = `mongodb+srv://${user}:${password}@mycluster.ktwz5.mongodb.net/${database}?retryWrites=true&w=majority`;

    const promise = mongoose
      .connect(conString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
      })
      .then((mongoose) => mongoose);

    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected");
    });

    global.mongoose = {
      conn: await promise,
      promise,
    };

    return await promise;
  }
}
