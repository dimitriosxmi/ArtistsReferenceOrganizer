import mongoose from "mongoose";

const { Schema } = mongoose;

const folderSchema = new Schema({
  folderName: {
    type: String,
    required: true,
  },
  folderColor: String,
});

const Folder = mongoose.models.Folder || mongoose.model("Folder", folderSchema);

export default Folder;
