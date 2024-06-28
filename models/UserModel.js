'use strict';
import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  emailRecupered: String,
  usernameRecupered: String,
  phoneContact: String,
  cpf: String,
  company: String,
  neighborhood: String,
  numberAddress: String,
  complement: String,
  cep: String,
  address: String,
  city: String,
  state: String,
  atualizationPasswordDB: String,
  keyword: String,
  password:String,
  typeUser: ["admin_Master", "admin", "management", "viewer", "collaborator"],
  function: {type: [], required:true, default: []},
  docIdentify: {type:String, required: false, default: null},
  _idCompanyAdministration: [{ type: Schema.Types.ObjectId, ref: 'EntityCompany', required: true }, null],
  isActive: {type: Boolean, required:true, default: true},
  headers: Object,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;