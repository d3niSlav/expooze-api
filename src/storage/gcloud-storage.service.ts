import { Injectable, Inject, Logger } from '@nestjs/common';
import {
  Storage,
  Bucket,
  CreateWriteStreamOptions,
} from '@google-cloud/storage';
import { join } from 'path';

import { GCLOUD_STORAGE_MODULE_OPTIONS } from './gcloud-storage.constants';
import {
  GCloudStorageOptions,
  GCloudStoragePerRequestOptions,
} from './gcloud-storage.interface';
import { uuid } from './gcloud-storage.helpers';

export interface UploadedFileMetadata extends Express.Multer.File {
  storageUrl?: string;
}

@Injectable()
export class GCloudStorageService {
  private readonly logger = new Logger(GCloudStorageService.name);
  public storage: Storage = new Storage();
  public bucket: Bucket = null;

  constructor(
    @Inject(GCLOUD_STORAGE_MODULE_OPTIONS)
    private readonly options: GCloudStorageOptions,
  ) {
    this.logger.log(`GCloudStorageService.options ${options}`);

    const bucketName = this.options.defaultBucketName;
    this.bucket = this.storage.bucket(bucketName);
  }

  async upload(
    fileMetadata: UploadedFileMetadata,
    perRequestOptions: Partial<GCloudStoragePerRequestOptions> = null,
  ): Promise<string> {
    const filename = uuid();
    const gcFilename =
      perRequestOptions && perRequestOptions.prefix
        ? join(perRequestOptions.prefix, filename)
        : filename;
    const gcFile = this.bucket.file(gcFilename);

    // override global options with the provided ones for this request
    perRequestOptions = {
      ...this.options,
      ...perRequestOptions,
    };

    const writeStreamOptions =
      perRequestOptions && perRequestOptions.writeStreamOptions;

    const { predefinedAcl = 'publicRead' } = perRequestOptions;
    const streamOpts: CreateWriteStreamOptions = {
      predefinedAcl: predefinedAcl,
      ...writeStreamOptions,
    };

    const contentType = fileMetadata.mimetype;

    if (contentType) {
      streamOpts.metadata = { contentType };
    }

    return new Promise((resolve, reject) => {
      gcFile
        .createWriteStream(streamOpts)
        .on('error', (error) => reject(error))
        .on('finish', () =>
          resolve(this.getStorageUrl(gcFilename, perRequestOptions)),
        )
        .end(fileMetadata.buffer);
    });
  }

  getStorageUrl(
    filename: string,
    perRequestOptions: Partial<GCloudStoragePerRequestOptions> = null,
  ) {
    if (perRequestOptions && perRequestOptions.storageBaseUri) {
      return join(perRequestOptions.storageBaseUri, filename);
    }

    return (
      'https://storage.googleapis.com/' +
      join(perRequestOptions.defaultBucketName, filename)
    );
  }
}
