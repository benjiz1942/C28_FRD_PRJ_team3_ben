// file: aws-s3 > src > app.service.ts
import { Injectable, Req, Res } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { extname } from 'path';

@Injectable()
export class AppService {
  AWS_S3_BUCKET = 'flashcs-uploader';
  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  async uploadFile(file) {
    const { originalname } = file;
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = extname(originalname);
    const filename = `${uniqueSuffix}${extension}`;

    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      filename,
      file.mimetype,
    );
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-southeast-1',
      },
    };

    try {
      let s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }
}
