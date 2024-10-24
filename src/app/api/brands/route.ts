import { NextResponse, NextRequest } from "next/server";
import {conn} from '@/libs/mysql'
import uuid4 from 'uuid4'
import {Category} from '@/interfaces/types'

export function GET(){
    return NextResponse.json('listando marcas')
}

export async function POST(request: NextRequest){
    console.log("INGRESÉ AL POST");
    
    const {name} = await request.json()

    console.log("ESTABLECÍ LOS ATRIBUTOS DE LA MARCA");

    const brandResult: Category = await conn.query("INSERT INTO brands SET ?", {
        id: uuid4(),
        name: name
    })

    console.log("SE CREÓ LA MARCA => ", brandResult);
    
    return NextResponse.json('creando marca')
}