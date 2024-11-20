import { Category, Image, Product } from "@/interfaces/types";
import { NextRequest, NextResponse } from "next/server";
import { conn } from "@/libs/mysql";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function GET(
    request: NextRequest,
    {params}: {params: Params}
){
    try {
        const categorySelected: Category[] = await conn.query("SELECT * FROM categories WHERE name = ?", [params.name])
        const categoryId = categorySelected[0].id

        const products: Product[] = await conn.query("SELECT * FROM products WHERE category_id = ?", [categoryId])

        const productsWithImages = await Promise.all(products.map(async (product: Product) => {
            const [imageResult]: Image[] = await conn.query("SELECT image FROM products_images WHERE product_id = ?", [product.id])
            const imageUrl = imageResult.image || null
            return {...product, image: imageUrl}
        }))

        return NextResponse.json({productsWithImages})
    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : "Error desconocido"
        return NextResponse.json({message: errorMessage}, {status: 500})
    }
}