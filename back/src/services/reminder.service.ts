import { hash } from 'bcrypt';
import { CreateReminderDto } from '@/dtos/reminder.dto';
import { HttpException } from '@exceptions/HttpException';
import { Reminder } from '@/interfaces/reminder.interface';
import reminderModel from '@/models/reminder.model';
import { isEmpty } from '@utils/util';

class ReminderService {
  public reminders = reminderModel;

  public async findAllReminders(): Promise<Reminder[]> {
    const reminders: Reminder[] = await this.reminders.find();
    return reminders;
  }

  public async findReminderById(reminderId: string): Promise<Reminder> {
    if (isEmpty(reminderId)) throw new HttpException(400, 'reminderId is empty');

    const findReminder: Reminder = await this.reminders.findOne({ _id: reminderId });
    if (!findReminder) throw new HttpException(404, 'Reminder not found');

    return findReminder;
  }

  public async createReminder(reminderData: CreateReminderDto): Promise<Reminder> {
    if (isEmpty(reminderData)) throw new HttpException(400, 'reminderData is empty');

    const createReminderData: Reminder = await this.reminders.create(reminderData);

    return createReminderData;
  }

  public async updateReminder(reminderId: string, reminderData: CreateReminderDto): Promise<Reminder> {
    if (isEmpty(reminderData)) throw new HttpException(400, 'reminderData is empty');

    const updateReminderById: Reminder = await this.reminders.findByIdAndUpdate(reminderId, reminderData);
    if (!updateReminderById) throw new HttpException(404, 'Reminder not found');

    return updateReminderById;
  }

  public async deleteReminder(reminderId: string): Promise<Reminder> {
    const deleteReminderById: Reminder = await this.reminders.findByIdAndDelete(reminderId);
    if (!deleteReminderById) throw new HttpException(404, 'Reminder not found');

    return deleteReminderById;
  }
}

export default ReminderService;
