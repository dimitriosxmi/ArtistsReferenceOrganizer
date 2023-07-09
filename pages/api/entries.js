import dbConnect from "../../db/connect.js";
// Models
import Entry from "../../db/models/Entry.js";
import Folder from "../../db/models/Folder.js";
import Tag from "../../db/models/Tag.js";

const handler = async (request, response) => {
  const { recentEntriesAmount, selectedFolderId, filterBy, searchText } =
    request.query;
  await dbConnect();

  // Get filtered data by filterBy value as search field, and searchText as search value.
  if (request.method === "GET" && filterBy && searchText) {
    try {
      let entries;
      switch (filterBy) {
        case "name":
          // Get entries by entryName value matching the search text regex.
          // The "i" in the RexExp function arguments is for case insensitivity.
          entries = await Entry.find({
            entryName: new RegExp(searchText, "i"),
          }).populate("entryTags");
          break;
        case "tag_text":
          // Get tags by tagName value matching the search text regex.
          const tags = await Tag.find({
            tagName: new RegExp(searchText, "i"),
          });
          // Map out the tag ids in an array.
          const tagIds = tags.map((tag) => tag._id);
          // Get entries by tag ids in the entryTags property.
          entries = await Entry.find({
            entryTags: { $in: tagIds },
          }).populate("entryTags");
          break;
        case "folder_name":
          // Get folders by folderName value matching the search text regex.
          const folders = await Folder.find({
            folderName: new RegExp(searchText, "i"),
          });
          // Map out the folder ids in an array.
          const folderIds = folders.map((folder) => folder._id);
          // Get entries by folder ids in the entrySelectedFolder property.
          entries = await Entry.find({
            entrySelectedFolder: { $in: folderIds },
          }).populate("entryTags");
          break;
        case "description":
          // Get entries by entryDescription value matching the searchText regex.
          entries = await Entry.find({
            entryDescription: new RegExp(searchText, "i"),
          }).populate("entryTags");
          break;
        default:
          throw new Error("Invalid filterBy field");
      }

      response.status(200).json({
        status: `Success ${filterBy}: ${searchText} entries!`,
        data: entries,
      });
      return;
    } catch (error) {
      console.log(error);

      response
        .status(400)
        .json({ status: "Failure get all entries!", error: error.message });
      return;
    }
  }

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
