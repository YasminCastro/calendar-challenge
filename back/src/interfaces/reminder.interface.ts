export interface Reminder {
  _id: string;
  reminderId: string;
  message: string;
  date: string;
  colorHex?: string;
  city?: string;
}
