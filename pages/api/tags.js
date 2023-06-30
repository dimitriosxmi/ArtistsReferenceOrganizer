import dbConnect from "../../db/connect.js";
import Tag from "../../db/models/Tag.js";

const handler = async (request, response) => {
  await dbConnect();

  // GET all tags.
  if (request.method === "GET") {
    try {
      const tags = await Tag.find();

      response
        .status(200)
        .json({ status: "Success get all tags!", data: tags });
      return;
    } catch (error) {
      console.log(error);

      response.status(400).json({ status: "Failure get all tags!" });
      return;
    }
  }
};

export default handler;
