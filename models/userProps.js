import mongoose from "mongoose";
import EntityCompany from "./EntityCompanyModel";
const { Schema } = mongoose;

const UserPropsSchema = new mongoose.Schema({
    colorIcon: String,
    initialsName: String,
    user: String,
    company: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const UserProps = mongoose.models.UserProps || mongoose.model("UserProps", UserPropsSchema);

export default UserProps;
