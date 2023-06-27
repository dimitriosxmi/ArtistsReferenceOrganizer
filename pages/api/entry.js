import dbConnect from "../../db/connect.js";
// Models
import Entry from "../../db/models/Entry.js";

const handler = async (request, response) => {
  await dbConnect();

  if (request.method === "POST") {
    try {
      const entry = request.body;
      await Entry.create(entry);

      response.status(201).json({ status: "Success entry post!" });
      return;
    } catch (error) {
      console.log(error);

      response
        .status(400)
        .json({ status: "Failed to post entry!", error: error.message });
      return;
    }
  }
};

export default handler;
