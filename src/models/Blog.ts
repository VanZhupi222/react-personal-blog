import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    date: String,
    readTime: String,
    tags: [String],
    slug: String,
  },
  { collection: 'blogs' }
);

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
