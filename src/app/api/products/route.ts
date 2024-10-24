import { NextResponse, NextRequest } from "next/server";
import {conn} from '@/libs/mysql'
import uuid4 from 'uuid4'
import {Product} from '@/interfaces/types'

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
        const {name, discount_price, not_discount_price, stock, description, category_id, brand_id, image} = await request.json()
        const productId = uuid4()

        const productResult: Product = await conn.query("INSERT INTO products SET ?", {
            id: productId,
            name: name,
            discount_price: discount_price,
            not_discount_price: not_discount_price,
            stock: stock,
            description: description,
            category_id: category_id,
            brand_id: brand_id
        })
    
        const product_imageResult = await conn.query("INSERT INTO products_images SET ?", {
            id: uuid4(),
            product_id: productId,
            image: image
        })

        console.log(productResult, product_imageResult);
        
        return NextResponse.json({
            productId,
            name,
            discount_price,
            not_discount_price,
            stock,
            description,
            category_id,
            brand_id,
            image
        })
    } catch (error) {
        console.error(error);

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