import dbConnect from "../../db/connect.js";
// Models
import Folder from "../../db/models/Folder.js";

const handler = async (request, response) => {
  const { folderId } = request.query;
  await dbConnect();

  // Get folder by id.
  if (request.method === "GET" && folderId) {
    try {
      const folder = await Folder.findById(folderId);

      response
        .status(200)
        .json({ status: "Success get folder by id!", data: folder });
      return;
    } catch (error) {
      console.log(error);

      response
        .status(400)
        .json({ status: "Faillure get folder by id!", error: error.message });
      return;
    }
  }

  // POST a folder.
  if (request.method === "POST") {
    try {
      const folder = request.body;
      await Folder.create(folder);

      response.status(201).json({ status: "Success post Folder" });
      return;
    } catch (error) {
      console.log(error);

      response
        .status(400)
        .json({ status: "Failure post folder!", error: error.message });
      return;
    }
  }

  // DELETE a folder by id.
  if (request.method === "DELETE" && folderId) {
    try {
      await Folder.findByIdAndDelete(folderId);

      response.status(200).json({ status: "Success delete folder by id!" });
    } catch (error) {
      console.log(error);

      response
        .status(400)
        .json({ status: "Failure delete folder by id!", error: error.message });
    }
  }
};

export default handler;
