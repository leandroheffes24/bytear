import { NextResponse, NextRequest } from "next/server";
import {conn} from '@/libs/mysql'
import uuid4 from 'uuid4'
import {Category} from '@/interfaces/types'

export async function GET(){
    try {
        const results = await conn.query("SELECT * FROM categories")
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
        const {name} = await request.json()
        const categoryId = uuid4()

        const categoryResult: Category = await conn.query("INSERT INTO categories SET ?", {
            id: categoryId,
            name: name
        })
        
        console.log(categoryResult);
        
        return NextResponse.json({
            categoryId,
            name
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