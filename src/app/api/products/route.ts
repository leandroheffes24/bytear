import { NextResponse, NextRequest } from "next/server";
import {conn} from '@/libs/mysql'
import uuid4 from 'uuid4'
import {Product} from '@/interfaces/types'
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

async function uploadFileToS3(file, fileName){
    const fileBuffer = file
    console.log(fileName);

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${fileName}-${Date.now()}`,
        Body: fileBuffer,
        ContentType: "image/webp"
    }

    const command = new PutObjectCommand(params)
    await s3Client.send(command)
    return fileName
}

export async function GET(){
    try {
        const results = await conn.query("SELECT * FROM products")
        return NextResponse.json(results)
    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : "Error desconocido"
        return NextResponse.json(
            {
                message: errorMessage
            },
            {
                status: 500
            }
        )
    }
}

export async function POST(request: NextRequest){    
    try {
        const formData = await request.formData()
        const file = formData.get("image")

        if (!file || !(file instanceof File)) {
            return NextResponse.json({ error: "File is required and must be of type 'File'" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        const uploadedFileName = await uploadFileToS3(buffer, file.name);
        
        return NextResponse.json({ uploadedFileName }, { status: 200 });

        // const {name, discount_price, not_discount_price, stock, description, category_id, brand_id, image} = await request.json()
        // const productId = uuid4()

        // const productResult: Product = await conn.query("INSERT INTO products SET ?", {
        //     id: productId,
        //     name: name,
        //     discount_price: discount_price,
        //     not_discount_price: not_discount_price,
        //     stock: stock,
        //     description: description,
        //     category_id: category_id,
        //     brand_id: brand_id
        // })
    
        // const product_imageResult = await conn.query("INSERT INTO products_images SET ?", {
        //     id: uuid4(),
        //     product_id: productId,
        //     image: image
        // })

        // console.log(productResult, product_imageResult);
        
        // return NextResponse.json({
        //     productId,
        //     name,
        //     discount_price,
        //     not_discount_price,
        //     stock,
        //     description,
        //     category_id,
        //     brand_id,
        //     image
        // })
    } catch (error) {
        // console.error(error);

        // const errorMessage = (error instanceof Error) ? error.message : "Error desconocido"

        // return NextResponse.json(
        //     {
        //         message: errorMessage
        //     },
        //     {
        //         status: 500
        //     }
        // )
        console.error('Error en el endpoint POST:', error);
    const errorMessage = (error instanceof Error) ? error.message : "Error desconocido";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}