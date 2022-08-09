import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { JobTitleModule } from '../job-title/job-title.module';
import { UserModule } from '../user/user.module';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        CLIENT_BASE_ROUTE: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        MAILGUN_API_KEY: Joi.string().required(),
        MAILGUN_DOMAIN: Joi.string().required(),
        MAILGUN_HOST: Joi.string().required(),
        OFFICE_EMAIL_DOMAIN: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    AuthModule,
    JobTitleModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
