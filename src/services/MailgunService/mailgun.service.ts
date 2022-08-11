import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Mailgun from 'mailgun-js';

@Injectable()
export class MailService {
  private mailGun: Mailgun.Mailgun;

  constructor(private readonly configService: ConfigService) {
    this.mailGun = Mailgun({
      apiKey: this.configService.get('MAILGUN_API_KEY'),
      domain: this.configService.get('MAILGUN_DOMAIN'),
    });
  }

  sendEmail(data: Mailgun.Options): Promise<Mailgun.messages.SendResponse> {
    return new Promise((response, reject) => {
      this.mailGun.messages().send(data, function (error, body) {
        if (error) {
          reject(error);
        }

        response(body);
      });
    });
  }
}
