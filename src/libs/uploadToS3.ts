import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_BUCKET_ACCESS_KEY
const secretAccessKey = process.env.AWS_BUCKET_SECRET_ACCESS_KEY

if(!region || !accessKeyId || !secretAccessKey){
    throw new Error('Las variables de entorno para AWS no estan correctamente definidas')
}

const s3Client = new S3Client({
    region: region,
    credentials:{
        accessKeyId: accessKeyId,
        secretAccessKey:  secretAccessKey
    }
})

export async function uploadFileToS3(file: Buffer, fileName: string, destination: string): Promise<string>{
    const fileBuffer = file
    console.log(fileName);

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${destination}/${fileName}-${Date.now()}`,
        Body: fileBuffer,
        ContentType: "image/webp"
    }

    const command = new PutObjectCommand(params)
    await s3Client.send(command)
    return fileName
}