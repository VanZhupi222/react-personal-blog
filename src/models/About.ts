import mongoose, { Schema, model } from 'mongoose';

const AboutSchema = new Schema(
  {
    skills: {
      frontend: { type: [String], required: false },
      backend: { type: [String], required: false },
      devops: { type: [String], required: false },
      tools: { type: [String], required: false },
    },
    experiences: [
      {
        title: String,
        company: String,
        period: String,
        description: String,
        achievements: [String],
      },
    ],
  },
  { collection: 'about' }
);

export default mongoose.models.About || model('About', AboutSchema);
