const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderName: { type: String, required: true },
  senderEmail: { type: String, required: true },
  senderPhone: String,
  message: { type: String, required: true },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: false },
  propertyTitle: { type: String, required: false },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  status: { type: String, default: "unread" },
  date: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Message', messageSchema);
