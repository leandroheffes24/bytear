import { NextResponse } from "next/server";

export function GET(){
    return NextResponse.json('listando productos')
}

export function POST(){
    return NextResponse.json('creando producto')
}