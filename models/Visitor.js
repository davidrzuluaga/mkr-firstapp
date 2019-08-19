import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const visitorSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  }
});
export default mongoose.model('Visitor', visitorSchema);