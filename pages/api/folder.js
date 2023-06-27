import dbConnect from "../../db/connect.js";
// Models
import Folder from "../../db/models/Folder.js";

const handler = async (request, response) => {
  const { folderId } = request.query;
  await dbConnect();

  if (request.method === "GET" && folderId) {
    try {
      const folder = await Folder.findById(folderId);

      response
        .status(200)
        .json({ status: "Success to get folder!", data: folder });
      return;
    } catch (error) {
      console.log(error);

      response
        .status(400)
        .json({ status: "Faillure to get folder!", error: error.message });
      return;
    }
  }

  if (request.method === "POST") {
    try {
      const folder = request.body;
      await Folder.create(folder);

      response.status(201).json({ status: "Success: Created Folder" });
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
