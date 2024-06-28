import mongoose from "mongoose";

const LinkShema = new mongoose.Schema({
    link: {type: String, require:true},
    id_user: {type: String, require:true},
    createdAt: {
        type: Date,
        default: new Date(),
      },
})

const Link = mongoose.models.Link || mongoose.model("Link", LinkShema)

export default Link