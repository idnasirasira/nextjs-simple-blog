import { dbConnect } from "../../../lib/db-connect";
export default function handler(req, res) {
  // if (req.method !== "POST") {
  //   res.status(400).json({ message: "Invalid request type." });
  // }
  // Db Connect
  dbConnect();

  const { name, email } = req.body;

  res.status(200).json([
    {
      id: Math.ceil(Math.random() * 1000),
      name: name,
      email: email,
    },
  ]);
}
