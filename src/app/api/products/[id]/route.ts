import { NextRequest, NextResponse } from "next/server";
import {conn} from "@/libs/mysql"

export async function GET(request, {params}){
    try {
        const result = await conn.query("SELECT * FROM products WHERE id = ?", [params.id])
        console.log("RESULTADO => ", result);

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

export async function DELETE(request, {params}){
    try {
        const productImageResult = await conn.query("DELETE FROM products_images WHERE product_id = ?", [params.id])
        // VERIFICAR SI BORRA TODAS LAS IMAGENES CON EL ID DEL PRODUCTO
        const productResult = await conn.query("DELETE FROM products WHERE id = ?", [params.id])

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

export function PUT(){
    return NextResponse.json('actualizando un producto')
}