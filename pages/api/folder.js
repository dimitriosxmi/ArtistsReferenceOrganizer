import dbConnect from "../../db/connect.js";
// Models
import Folder from "../../db/models/Folder.js";

const handler = async (request, response) => {
  await dbConnect();

  if (request.method === "POST") {
    try {
      const folder = request.body;
      await Folder.create(folder);

      response.status(200).json({ status: "Success: Created Folder" });
      return;
    } catch (error) {
      console.log(error);

      response
        .status(400)
        .json({ status: "Failed to create folder!", error: error.message });
      return;
    }
  }
};

export default handler;
