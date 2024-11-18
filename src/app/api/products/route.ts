import { NextResponse, NextRequest } from "next/server";
import {conn} from '@/libs/mysql'
import uuid4 from 'uuid4'
import {Product} from '@/interfaces/types'
import { uploadFileToS3 } from "@/libs/uploadToS3";

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
        const uploadedFileName = await uploadFileToS3(buffer, file.name, "products");
        const imageUrl = `${process.env.AWS_BUCKET_IMAGE_URL}/products/${uploadedFileName}`

        const productId = uuid4()
        const discountPrice = formData.get("discount_price")
        const notDiscountPrice = formData.get("not_discount_price")
        const stock = formData.get("stock")

        const productResult: Product = await conn.query("INSERT INTO products SET ?", {
            id: productId,
            name: formData.get("name"),
            discount_price: discountPrice,
            not_discount_price: notDiscountPrice,
            stock: stock,
            description: formData.get("description"),
            category_id: formData.get("category_id"),
            brand_id: formData.get("brand_id")
        })
    
        const product_imageResult = await conn.query("INSERT INTO products_images SET ?", {
            id: uuid4(),
            product_id: productId,
            image: imageUrl
        })

        console.log(productResult, product_imageResult);
        
        return NextResponse.json({
            productId
        })
    } catch (error) {
        console.error('Error en el endpoint POST:', error);
        const errorMessage = (error instanceof Error) ? error.message : "Error desconocido";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}