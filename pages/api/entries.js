import dbConnect from "../../db/connect.js";
// Models
import Entry from "../../db/models/Entry.js";

const handler = async (request, response) => {
  const { recentEntriesAmount, selectedFolderId } = request.query;
  await dbConnect();

  // Get specific amount of most recent.
  if (request.method === "GET" && recentEntriesAmount) {
    try {
      const entries = await Entry.find({})
        .sort({ entryUploadDate: -1 })
        .limit(recentEntriesAmount)
        .populate("entryTags");

      response
        .status(200)
        .json({ status: "Success get recent entries!", data: entries });
      return;
    } catch (error) {
      console.log(error);

      response
        .status(400)
        .json({ status: "Failure get recent entries!", error: error.message });
      return;
    }
  }

  // Get all with folder id.
  if (request.method === "GET" && selectedFolderId) {
    try {
      const entries = await Entry.find({
        entrySelectedFolder: selectedFolderId,
      }).populate("entryTags");

      response
        .status(200)
        .json({ status: "Success get folder entries!", data: entries });
      return;
    } catch (error) {
      console.log(error);

      response
        .status(400)
        .json({ status: "Failure get folder entries!", error: error.message });
      return;
    }
  }

  // Get all data.
  if (request.method === "GET") {
    try {
      const entries = await Entry.find({}).populate("entryTags");

      response
        .status(200)
        .json({ status: "Success get all entries!", data: entries });
      return;
    } catch (error) {
      console.log(error);

      response
        .status(400)
        .json({ status: "Failure get all entries!", error: error.message });
      return;
    }
  }

  // Update (remove entrySelectedFolder field) on all entries by folder id.
  if (request.method === "PUT" && selectedFolderId) {
    try {
      await Entry.updateMany(
        { entrySelectedFolder: selectedFolderId },
        { $unset: { entrySelectedFolder: "" } }
      );

      response.status(200).json({ status: "Success put provided entries!" });
      return;
    } catch (error) {
      console.log(error);

      response.status(400).json({
        status: "Failure put provided entries!",
        error: error.message,
      });
      return;
    }
  }
};

export default handler;
