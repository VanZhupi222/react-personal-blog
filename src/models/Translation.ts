import mongoose, { Document } from 'mongoose';
import type { Translations } from '@/i18n/types';

export interface TranslationDoc extends Document {
  en?: Translations;
  zh?: Translations;
  [lang: string]: unknown;
}

const TranslationSchema = new mongoose.Schema({}, { collection: 'translations', strict: false });

export default (mongoose.models.Translation as mongoose.Model<TranslationDoc>) ||
  mongoose.model<TranslationDoc>('Translation', TranslationSchema);
