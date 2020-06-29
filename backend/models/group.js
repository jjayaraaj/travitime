const mongoose = require('mongoose');

const travelerSchema = new mongoose.Schema({
  travellerName: { type: String, required: true},
  gender: { type: String, required: true},
  dob: { type: Date, required: true},
  nationality: { type: String, required: true},
  passportNo: { type: String, required: true},
  senior: { type: String, required: true},
  documents: { type: String }
})

const groupSchema = new mongoose.Schema({
  groupName: { type: String, required: true},
  emailId: { type: String, required: true},
  noOfTravellers: { type: String, required: true},
  countryCode: { type: String, required: true},
  contactNumber: { type: String, required: true},
  travellers: [travelerSchema]
});

module.exports = mongoose.model('Group', groupSchema);
