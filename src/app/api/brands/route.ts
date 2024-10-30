import { NextResponse, NextRequest } from "next/server";
import {conn} from '@/libs/mysql'
import uuid4 from 'uuid4'
import {Brand} from '@/interfaces/types'

export async function GET(){
    try {
        const results = await conn.query("SELECT * FROM brands")
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
        const brandId = uuid4()

        const brandResult: Brand = await conn.query("INSERT INTO brands SET ?", {
            id: brandId,
            name: name
        })
        
        console.log(brandResult);
        
        return NextResponse.json({
            brandId,
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