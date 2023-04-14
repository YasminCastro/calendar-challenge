import { Router } from 'express';
import IndexController from '@controllers/index.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import { CreateReminderDto } from '@/dtos/reminder.dto';

class IndexRoute implements Routes {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.getReminders);
    this.router.get(`${this.path}:id`, this.indexController.getReminderById);
    this.router.post(`${this.path}`, validationMiddleware(CreateReminderDto, 'body'), this.indexController.createReminder);
    this.router.put(`${this.path}:id`, validationMiddleware(CreateReminderDto, 'body', true), this.indexController.updateReminder);

    this.router.delete(`${this.path}:id`, this.indexController.deleteReminder);
  }
}

export default IndexRoute;
