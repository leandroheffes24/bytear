import {S3Client} from '@aws-sdk/client-s3'

const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_BUCKET_ACCESS_KEY
const secretAccessKey = process.env.AWS_BUCKET_SECRET_ACCESS_KEY

if(!region || !accessKeyId || !secretAccessKey){
    throw new Error('Las variables de entorno para AWS no estan correctamente definidas')
}

export const s3Client = new S3Client({
    region: region,
    credentials:{
        accessKeyId: accessKeyId,
        secretAccessKey:  secretAccessKey
    }
})