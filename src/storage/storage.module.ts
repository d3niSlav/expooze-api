import { DynamicModule, Module } from '@nestjs/common';

import {
  GCloudStorageAsyncOptions,
  GCloudStorageOptions,
} from './gcloud-storage.interface';
import { GCloudStorageModule } from './gcloud-storage.module';

@Module({})
export class StorageModule {
  static withConfig(options: GCloudStorageOptions): DynamicModule {
    return {
      module: StorageModule,
      imports: [GCloudStorageModule.withConfig(options)],
    };
  }

  static withConfigAsync(options: GCloudStorageAsyncOptions): DynamicModule {
    return {
      module: StorageModule,
      imports: [GCloudStorageModule.withConfigAsync(options)],
    };
  }
}
