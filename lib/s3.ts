import { S3Client } from '@aws-sdk/client-s3';

export const Bucket = process.env.BACKBLAZE_BUCKET;
export const s3 = new S3Client({
  endpoint: process.env.BACKBLAZE_ENDPOINT,
  region: process.env.BACKBLAZE_REGION,
  credentials: {
    accessKeyId: process.env.BACKBLAZE_APPLICATION_ID as string,
    secretAccessKey: process.env.BACKBLAZE_APPLICATION_KEY as string,
  },
});
