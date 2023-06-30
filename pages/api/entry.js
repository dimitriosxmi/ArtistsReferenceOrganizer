import dbConnect from "../../db/connect.js";
// Models
import Entry from "../../db/models/Entry.js";

const handler = async (request, response) => {
  const { entryId } = request.query;
  await dbConnect();

  // Get an entry by id.
  if (request.method === "GET") {
    try {
      const entry = await Entry.findById(entryId).populate("entryTags");

      response
        .status(201)
        .json({ status: "Success get entry by id!", data: entry });
      return;
    } catch (error) {
      console.log(error);

      response
        .status(400)
        .json({ status: "Failure get entry by id!", error: error.message });
      return;
    }
  }

  // POST an entry.
  if (request.method === "POST") {
    try {
      const entry = request.body;
      await Entry.create(entry);

      response.status(201).json({ status: "Success post entry!" });
      return;
    } catch (error) {
      console.log(error);

      response
        .status(400)
        .json({ status: "Failure post entry!", error: error.message });
      return;
    }
  }

  // Delete an entry by id.
  if (request.method === "DELETE" && entryId) {
    try {
      await Entry.findByIdAndDelete(entryId);

      response.status(200).json({ status: "Success delete entry by id!" });
    } catch (error) {
      consolee.log(error);

      response
        .status(400)
        .json({ status: "Failure delete entry by id!", error: error.message });
      return;
    }
  }
};

export default handler;
