import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    tags: [String],
    slug: String,
    highlights: [String],
  },
  { collection: 'projects' }
);

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
