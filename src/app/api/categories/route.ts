import { NextResponse, NextRequest } from "next/server";
import {conn} from '@/libs/mysql'
import uuid4 from 'uuid4'
import {Category} from '@/interfaces/types'

export function GET(){
    return NextResponse.json('listando categorías')
}

export async function POST(request: NextRequest){
    console.log("INGRESÉ AL POST");
    
    const {name} = await request.json()

    console.log("ESTABLECÍ LOS ATRIBUTOS DE LA CATEGORÍA");

    const categoryResult: Category = await conn.query("INSERT INTO categories SET ?", {
        id: uuid4(),
        name: name
    })

    console.log("SE CREÓ LA CATEGORÍA => ", categoryResult);
    
    return NextResponse.json('creando categoría')
}