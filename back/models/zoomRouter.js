const mongoose = require('mongoose');

const zoomMeetingSchema = new mongoose.Schema({
  idemployeur: {
    type: String,
    required: true
  },
  idcandidat: {
    type: String,
    required: true
  },
  idoffre: {
    type: String,
    required: true
  },
  dateentretien: {
    type: Date,
    required: true
  },
  heureentretien: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  titre: {
    type: String,
    required: true
  },
  lienmeeting: {
    type: String,
    required: false
  }
});

const ZoomMeeting = mongoose.model('ZoomMeeting', zoomMeetingSchema);

module.exports = ZoomMeeting;
