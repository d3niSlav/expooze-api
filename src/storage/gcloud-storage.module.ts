import { DynamicModule, Global, Module } from '@nestjs/common';

import { GCLOUD_STORAGE_MODULE_OPTIONS } from './gcloud-storage.constants';
import {
  GCloudStorageAsyncOptions,
  GCloudStorageOptions,
} from './gcloud-storage.interface';
import { GCloudStorageService } from './gcloud-storage.service';

const PROVIDERS = [GCloudStorageService];
const EXPORTS = [...PROVIDERS];

@Global()
@Module({
  providers: [...PROVIDERS],
  exports: [...PROVIDERS],
})
export class GCloudStorageModule {
  static withConfig(options: GCloudStorageOptions): DynamicModule {
    const gcsModuleOptions = {
      provide: GCLOUD_STORAGE_MODULE_OPTIONS,
      useValue: options,
    };

    const gcsServiceProvider = {
      provide: GCloudStorageService,
      useFactory: (options: GCloudStorageOptions) =>
        new GCloudStorageService(options),
      inject: [GCLOUD_STORAGE_MODULE_OPTIONS],
    };

    return {
      module: GCloudStorageModule,
      providers: [
        gcsModuleOptions,
        gcsServiceProvider,
      ],
      exports: [...EXPORTS],
    };
  }

  static withConfigAsync(options: GCloudStorageAsyncOptions): DynamicModule {
    const gcsServiceProvider = {
      provide: GCloudStorageService,
      useFactory: (options: GCloudStorageOptions) =>
        new GCloudStorageService(options),
      inject: [GCLOUD_STORAGE_MODULE_OPTIONS],
    };

    return {
      module: GCloudStorageModule,
      imports: options.imports,
      providers: [
        {
          provide: GCLOUD_STORAGE_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        gcsServiceProvider,
      ],
      exports: [...EXPORTS],
    };
  }
}
