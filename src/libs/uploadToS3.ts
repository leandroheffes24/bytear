import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3Config";

export async function uploadFileToS3(file: Buffer, fileName: string, destination: string): Promise<string>{
    const fileBuffer = file
    const newFileName = `${fileName}-${Date.now()}`

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${destination}/${newFileName}`,
        Body: fileBuffer,
        ContentType: "image/webp"
    }

    const command = new PutObjectCommand(params)
    await s3Client.send(command)
    return newFileName
}