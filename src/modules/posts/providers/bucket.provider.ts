import * as aws from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { promises } from 'fs';
import { resolve } from 'path';
import { pathsConfig } from 'src/configs/paths.config';

@Injectable()
export class S3BucketProvider {
  private bucket: aws.S3;

  constructor() {
    if (
      process.env.AWS_ACCESS_KEY_ID === undefined ||
      process.env.AWS_SECRET_ACCESS_KEY === undefined
    ) {
      throw new Error('AWS credentials are not defined');
    }

    this.bucket = new aws.S3({
      region: 'us-east-1',
    });
  }

  public async uploadFile(filename: string): Promise<string> {
    const fileContent = await promises.readFile(
      resolve(pathsConfig.tmp, filename),
    );

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: filename,
      Body: fileContent,
    };

    await this.bucket.send(new aws.PutObjectCommand(params));

    const url = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${filename}`;

    await promises.unlink(resolve(pathsConfig.tmp, filename));

    return url;
  }
}
