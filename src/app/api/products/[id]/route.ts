import { NextRequest, NextResponse } from "next/server";
import {conn} from "@/libs/mysql"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { QueryResult, Product } from "@/interfaces/types";

export async function GET(
    request: NextRequest,
    {params}: {params: Params}
){
    try {
        const result: Product[] = await conn.query("SELECT * FROM products WHERE id = ?", [params.id])

        if(result.length === 0){
            return NextResponse.json(
                {
                    message: "Producto no encontrado"
                },
                {
                    status: 404
                }
            )
        }
        
        return NextResponse.json(result[0])
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

export async function DELETE(
    request: NextRequest,
    {params}: {params: Params}
){
    try {
        const productImageResult: QueryResult = await conn.query("DELETE FROM products_images WHERE product_id = ?", [params.id])
        
        // VERIFICAR SI BORRA TODAS LAS IMAGENES CON EL ID DEL PRODUCTO
        const productResult: QueryResult = await conn.query("DELETE FROM products WHERE id = ?", [params.id])

        if(productImageResult.affectedRows === 0){
            return NextResponse.json(
                {
                    message: "Producto no encontrado"
                },
                {
                    status: 404
                }
            )
        } else {
            if(productResult.affectedRows === 0){
                return NextResponse.json(
                    {
                        message: "Producto no encontrado"
                    },
                    {
                        status: 404
                    }
                )
            }
        }

        return new Response(null, {
            status: 204
        })
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

export async function PUT(
    request: NextRequest,
    {params}: {params: Params}
){
    try {
        const data = await request.json()
        const result: QueryResult = await conn.query("UPDATE products SET ? WHERE id = ?", [data, params.id])
        
        if(result.affectedRows === 0){
            return NextResponse.json(
                {
                    message: "Producto no encontrado"
                },
                {
                    status: 404
                }
            )
        }

        const updatedProduct = await conn.query("SELECT * FROM products WHERE id = ?", [params.id])
        
        return NextResponse.json(updatedProduct)
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