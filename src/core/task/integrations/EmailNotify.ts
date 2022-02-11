import { EMAIL_ENV } from '@config/envs';
import { Service } from 'typedi';
import nodemailer, { Transporter } from 'nodemailer';
import { NotifyTask } from '../interfaces/NotifyTask';

@Service()
export class EmailNotify implements NotifyTask {
  async alert(email: string): Promise<void> {
    await this.sendEmail(email);
  }

  private async sendEmail(email: string): Promise<void> {
    await this.getTransporter().sendMail({
      from: EMAIL_ENV.ORIGIN_EMAIL,
      to: email,
      subject: 'You have a task assigned for you! :D',
      text: 'You have been assigned to a task! Do not forget!',
    });
  }

  private getTransporter(): Transporter {
    return nodemailer.createTransport({
      host: EMAIL_ENV.HOST,
      port: EMAIL_ENV.PORT,
      auth: {
        user: EMAIL_ENV.USER,
        pass: EMAIL_ENV.PASSWORD,
      },
    });
  }
}
