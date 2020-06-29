const mongoose = require('mongoose');

const itenarySchema = new mongoose.Schema({
  day: { type: Number, required: true},
  date: { type: Date, required: true},
  title: { type: String, required: true},
  breakfast: { type: Boolean},
  lunch: { type: Boolean},
  dinner: { type: Boolean},
  description: { type: String, required: true },
  place: { type: String, required: true },
});

const travelerSchema = new mongoose.Schema({
  travellerName: { type: String, required: true},
  gender: { type: String, required: true},
  dob: { type: Date, required: true},
  nationality: { type: String, required: true},
  passportNo: { type: String, required: true},
  senior: { type: String, required: true},
  documents: { type: String },
  active: { type: Number, default: 1}

})

const groupSchema = new mongoose.Schema({
  groupName: { type: String, required: true},
  emailId: { type: String, required: true},
  noOfTravellers: { type: Number, required: true},
  countryCode: { type: Number, required: true},
  contactNumber: { type: Number, required: true},
  travellers: [travelerSchema]

});


const tourSchema = new mongoose.Schema({
  tourName: { type: String, required: true},
  fromDate: { type: Date, required: true},
  toDate: { type: Date, required: true},
  country: { type: String, required: true},
  noOfDays: { type: Number, required: true},
  multicity: { type: String, required: true},
  natureOfTravel: { type: String, required: true},
  publish: { type: Number, default: 0},
  agentId: { type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
  group: groupSchema,
  itinerary: [itenarySchema]
});




module.exports.group = mongoose.model('Group', groupSchema);
module.exports.tour = mongoose.model('Tour', tourSchema);
module.exports.traveller = mongoose.model('Traveller', travelerSchema);
module.exports.itinerary = mongoose.model('Itinerary', itenarySchema);
