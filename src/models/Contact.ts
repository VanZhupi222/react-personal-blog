import mongoose, { Document } from 'mongoose';

export interface ContactEmail {
  label: string;
  value: string;
}
export interface ContactSocial {
  label: string;
  value: string;
  link: string;
}
export interface ContactGithub {
  label: string;
  username: string;
  link: string;
}
export interface ContactDoc extends Document {
  github: ContactGithub;
  emails: ContactEmail[];
  socials: ContactSocial[];
}

const ContactSchema = new mongoose.Schema<ContactDoc>({
  github: {
    label: String,
    username: String,
    link: String,
  },
  emails: [
    {
      label: String,
      value: String,
    },
  ],
  socials: [
    {
      label: String,
      value: String,
      link: String,
    },
  ],
});

export default mongoose.models.Contact || mongoose.model<ContactDoc>('Contact', ContactSchema);
