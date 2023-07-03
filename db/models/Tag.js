import mongoose from "mongoose";

const { Schema } = mongoose;

const tagSchema = new Schema(
  {
    tagName: {
      type: String,
    },
  },
  { collection: "tags" }
);

const Tag = mongoose.models.Tag || mongoose.model("Tag", tagSchema);

export default Tag;
