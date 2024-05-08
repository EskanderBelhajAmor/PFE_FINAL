const mongoose = require('mongoose');

const testiqSchema = new mongoose.Schema({
  idcandidat: {
    type: String,
    required: true
  },
  taux: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Testiq', testiqSchema);
