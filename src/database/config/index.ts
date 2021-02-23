import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

import { CustomNamingStrategy } from './customNamingStrategy';

const getConfig = (env = '.env'): TypeOrmModuleOptions => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const envConfig = require('dotenv').config({
    path: path.resolve(process.cwd(), env),
  }).parsed;

  return {
    type: 'postgres',
    host: envConfig?.DATABASE_HOST || process.env.DATABASE_HOST,
    port: envConfig?.DATABASE_PORT || process.env.DATABASE_PORT,
    username: envConfig?.DATABASE_USERNAME || process.env.DATABASE_USERNAME,
    password: envConfig?.DATABASE_PASSWORD || process.env.DATABASE_PASSWORD,
    database: envConfig?.DATABASE_NAME || process.env.DATABASE_NAME,
    synchronize: false,
    namingStrategy: new CustomNamingStrategy(),
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    migrations: [
      __dirname + '/../database/seeds/**/*.ts',
      __dirname + '/../database/migrations/**/*.ts',
    ],
    cli: {
      entitiesDir: '/src/database/entity',
      migrationsDir: '/src/database/migrations',
    },
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  };
};

export { getConfig };
