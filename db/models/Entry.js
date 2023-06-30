import mongoose from "mongoose";

const { Schema } = mongoose;

const entrySchema = new Schema(
  {
    entryName: {
      type: String,
      required: true,
    },
    entryUploadFile: {
      type: String,
    },
    entryReferenceLink: {
      type: String,
    },
    entryDescription: {
      type: String,
    },
    entryTags: { type: [Schema.Types.ObjectId], ref: "Tag" },
    entrySelectedFolder: {
      type: String,
    },
    entryUploadDate: {
      type: Number,
      required: true,
    },
  },
  { collection: "entries" }
);

const Entry = mongoose.models.Entry || mongoose.model("Entry", entrySchema);

export default Entry;
