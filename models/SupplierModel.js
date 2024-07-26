'use strict';
import mongoose from "mongoose";

const Supplierschema = new mongoose.Schema({
  business: {type: String, required:true},
  doc_identify_cnpj_or_cpf: {type: String, required:true},
  address: {
    place: {type: String, required: true},
    neighborhood: {type: String, required: true},
    complement: {type: String, required: false},
    number: {type: String, required: true},
    zipcode: {type: String, required: true},
    uf: {type: String, required: true},
    city: {type: String, required: true},
  },
  responsible: {type: String, required:true},
  contact: {
    email: {type: String, required:true},
    phone: {type: String, required:true},
  },
  permanent: {type: Boolean, required:true, default: false },
  password: {type: String, requid:false},
  typeUser: ['collaborator'],
  userPermission: {type: Boolean, required:true, default:true},
  id_company: [{type: String, required:true,  ref: 'EntityCompany'}, null],
  atualizationPasswordDB: {type: String, required:false},
  isActive: {type: Boolean, required:true, default:true},
  createdAt: {
    type: Date,
    default: new Date(),
  },
}, {
  strictQuery:  true
});

const Supplier = mongoose.models.Supplier || mongoose.model("Supplier", Supplierschema);

export default Supplier;