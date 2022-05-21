import { Provider } from '@nestjs/common';
import * as AWS from 'aws-sdk';
export const DoSpacesServiceLib = 'lib:do-spaces-service';
import * as dotenv from 'dotenv';

const spacesEndpoint = new AWS.Endpoint('fra1.digitaloceanspaces.com');

dotenv.config();

const S3 = new AWS.S3({
  endpoint: spacesEndpoint.href,
  credentials: new AWS.Credentials({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  }),
});

export const DoSpacesServiceProvider: Provider<AWS.S3> = {
  provide: DoSpacesServiceLib,
  useValue: S3,
};

export interface UploadedMulterFileI {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}
