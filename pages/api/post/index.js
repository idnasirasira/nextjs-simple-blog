import { dbConnect } from "../../../lib/db-connect";
import User from "../../../models/user";

export default async function handler(req, res) {
  dbConnect();
  const user = await User.findOne({ email: "idnasirasira@gmail.com" }).exec();

  res.status(200).json([
    {
      id: 1,
      name: "Idnasirasira",
      email: "idnasirasira@gmail.com",
    },
  ]);
}
