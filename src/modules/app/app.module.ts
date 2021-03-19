import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { CategoryModule } from '../category/category.module';
import { UserModule } from '../user/user.module';
import { DatabaseModule } from '../../database/database.module';
import { StorageModule } from '../../storage';

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
        GCS_BUCKET_NAME: Joi.string().required(),
        GCS_DOMAIN_NAME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        MAILGUN_API_KEY: Joi.string().required(),
        MAILGUN_DOMAIN: Joi.string().required(),
        MAILGUN_HOST: Joi.string().required(),
        OFFICE_EMAIL_DOMAIN: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    StorageModule.withConfigAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        defaultBucketName: configService.get('GCS_BUCKET_NAME'),
        storageBaseUri: configService.get('GCS_DOMAIN_NAME'),
      }),
    }),
    AuthModule,
    UserModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
