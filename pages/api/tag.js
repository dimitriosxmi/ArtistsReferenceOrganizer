import dbConnect from "../../db/connect";
// Models
import Tag from "../../db/models/Tag";

const handler = async (request, response) => {
  const { tagId } = request.query;
  await dbConnect();

  // POST a tag.
  if (request.method === "POST") {
    try {
      const tag = request.body;
      await Tag.create(tag);

      response.status(201).json({ status: "Success post tag!" });
      return;
    } catch (error) {
      console.log(error);

      response
        .status(400)
        .json({ status: "Failure post tag!", error: error.message });
      return;
    }
  }

  // DELETE a tag by id.
  if (request.method === "DELETE" && tagId) {
    try {
      await Tag.findByIdAndDelete(tagId);

      response.status(200).json({ status: "Success delete tag!" });
      return;
    } catch (error) {
      console.log(error);

      response
        .status(400)
        .json({ status: "Failure delete tag!", error: error.message });
      return;
    }
  }
};

export default handler;
