import mongoose, { Schema, model } from 'mongoose';

const ExperiencesSchema = new Schema(
  {
    language: { type: String, required: true, enum: ['en', 'zh'] },
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
  { collection: 'experiences' }
);

export default mongoose.models.Experiences || model('Experiences', ExperiencesSchema);
