import dbConnect from "../../db/connect.js";
import Entry from "../../db/models/Entry.js";

const handler = async (request, response) => {
  const { recentEntries } = request.query;
  await dbConnect();

  if (request.method === "GET" && recentEntries) {
    try {
      const entries = await Entry.find({})
        .sort({ entryUploadDate: -1 })
        .limit(recentEntries);

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

  if (request.method === "GET") {
    try {
      const entries = await Entry.find({});

      response
        .status(200)
        .json({ status: "Success get entries!", data: entries });
      return;
    } catch (error) {
      console.log(error);

      response
        .status(400)
        .json({ status: "Failure get entries!", error: error.message });
      return;
    }
  }
};

export default handler;
