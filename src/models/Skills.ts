import mongoose, { Schema, model } from 'mongoose';

const SkillsSchema = new Schema(
  {
    language: { type: String, required: true, enum: ['en', 'zh'] },
    skills: {
      frontend: { type: [String], required: false },
      backend: { type: [String], required: false },
      devops: { type: [String], required: false },
      tools: { type: [String], required: false },
    },
  },
  { collection: 'skills' }
);

export default mongoose.models.Skills || model('Skills', SkillsSchema);
