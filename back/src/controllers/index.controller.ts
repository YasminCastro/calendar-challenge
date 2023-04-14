import { CreateReminderDto } from '@/dtos/reminder.dto';
import { Reminder } from '@/interfaces/reminder.interface';
import reminderService from '@/services/reminder.service';
import { NextFunction, Request, Response } from 'express';

class IndexController {
  public reminderService = new reminderService();

  public getReminders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllReminders = await this.reminderService.findAllReminders();

      res.status(200).json(findAllReminders);
    } catch (error) {
      next(error);
    }
  };

  public getReminderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reminderId: string = req.params.id;
      const findOneReminder = await this.reminderService.findReminderById(reminderId);

      res.status(200).json(findOneReminder);
    } catch (error) {
      next(error);
    }
  };

  public createReminder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reminderData: CreateReminderDto = req.body;
      const createReminder: Reminder = await this.reminderService.createReminder(reminderData);

      res.status(201).json(createReminder);
    } catch (error) {
      next(error);
    }
  };

  public updateReminder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reminderId: string = req.params.id;
      const reminderData: CreateReminderDto = req.body;
      const updateReminderData: Reminder = await this.reminderService.updateReminder(reminderId, reminderData);

      res.status(200).json(updateReminderData);
    } catch (error) {
      next(error);
    }
  };

  public deleteReminder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reminderId: string = req.params.id;
      const deleteReminderData: Reminder = await this.reminderService.deleteReminder(reminderId);

      res.status(200).json(deleteReminderData);
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
