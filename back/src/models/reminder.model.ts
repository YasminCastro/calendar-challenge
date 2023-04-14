import { model, Schema, Document } from 'mongoose';
import { Reminder } from '@/interfaces/reminder.interface';

const reminderSchema: Schema = new Schema({
  message: {
    type: String,
    required: true,
  },
  colorHex: {
    type: String,
  },
  city: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
});

const reminderModel = model<Reminder & Document>('Reminder', reminderSchema);

export default reminderModel;
