import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    id: { type: String, required: true },
    title: String,
    jobTitle: String,
    name: String,
    email: String,
    phone: String,
    location: String,
    summary: String,
    experience: { type: Array, default: [] },
    education: { type: Array, default: [] },
    skills: { type: Array, default: [] },
    template: String,
    primaryColor: String,
    lastUpdated: String,
    atsScore: Number,
    status: String,
  },
  { timestamps: true }
);

resumeSchema.index({ user: 1, id: 1 }, { unique: true });

export default mongoose.model('Resume', resumeSchema);

