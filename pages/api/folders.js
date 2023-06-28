import dbConnect from "../../db/connect.js";
// Models
import Folder from "../../db/models/Folder.js";

const handler = async (request, response) => {
  await dbConnect();

  // GET all folders.
  if (request.method === "GET") {
    try {
      const folders = await Folder.find();

      response
        .status(200)
        .json({ status: "Success get all folders!", data: folders });
    } catch (error) {
      console.log(error);

      response
        .status(400)
        .json({ status: "Failure get all folders!", error: error.message });
      return;
    }
  }
};

export default handler;
