import { NextResponse, NextRequest } from "next/server";
import {conn} from '@/libs/mysql'
import uuid4 from 'uuid4'
import {Category} from '@/interfaces/types'
import { uploadFileToS3 } from "@/libs/uploadToS3";

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
        const formData = await request.formData()
        const file = formData.get("image")
        const name = formData.get("name")

        if (!name || typeof name !== "string") {
            return NextResponse.json({ error: "El nombre de la categoría es obligatorio" }, { status: 400 });
        }
        if(!file || !(file instanceof File)){
            return NextResponse.json({ error: "File is required and must be of type 'File'" }, { status: 400 })
        }
        const buffer = Buffer.from(await file.arrayBuffer());
        const uploadedFileName = await uploadFileToS3(buffer, file.name, "categories");

        const categoryId = uuid4()

        const categoryResult: Category = await conn.query("INSERT INTO categories SET ?", {
            id: categoryId,
            name: name
        })

        const category_imageResult = await conn.query("INSERT INTO categories_images SET ?", {
            id: uuid4(),
            category_id: categoryId,
            image: uploadedFileName
        })

        console.log(categoryResult, category_imageResult);
        
        return NextResponse.json({
            categoryId
        })
    } catch (error) {
        console.error('Error en el endpoint POST:', error);
        const errorMessage = (error instanceof Error) ? error.message : "Error desconocido";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}