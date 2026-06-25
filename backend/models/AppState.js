import mongoose from 'mongoose';

const appStateSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    activeResumeId: String,
    coverLetter: {
      companyName: String,
      jobTitle: String,
      tone: String,
      date: String,
      content: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('AppState', appStateSchema);

