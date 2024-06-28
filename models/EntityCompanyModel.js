import mongoose from 'mongoose';
const { Schema } = mongoose;


const EntityCompanySchema = new Schema({
  businessContact: String,
  primaryManager: String,
  cnpj: String,
  companyName: String,
  addressCompany: String,
  neighborhoodCompany: String,
  complementCompany: String,
  numberAddressCompany: String,
  cepCompany: String,
  stateCompany: String,
  moduleConfigure: String,
  optionOne: String,
  optionTwo: String,
  optionThree: String,
  optionFuor: String,
  quantidade: String,
  _inputIdAdminEntityCompany:String,
  isActive: {type: Boolean, required:true, default: true},
  openedMaintenanceChecklist: {type: Boolean, required:true, default: false},  
  closedViewTuor: {type: Boolean, required: true, default : false},
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const EntityCompany = mongoose.models.EntityCompany || mongoose.model("EntityCompany", EntityCompanySchema);

export default EntityCompany
