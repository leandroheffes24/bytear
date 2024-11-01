import { NextResponse, NextRequest } from "next/server";
import {conn} from '@/libs/mysql'
import uuid4 from 'uuid4'
import {User} from '@/interfaces/types'
import bcrypt from 'bcryptjs'

export async function GET(){
    try {
        const results = await conn.query("SELECT * FROM users")
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
        const {name, last_name, email, phone, password} = await request.json()
        const userId = uuid4()

        const userResult: User = await conn.query("INSERT INTO users SET ?", {
            id: userId,
            name: name,
            last_name: last_name,
            email: email,
            phone: phone,
            password: bcrypt.hashSync(password, 10),
            rank: "user"
        })

        console.log(userResult);
        
        return NextResponse.json({
            userId,
            name,
            last_name,
            email,
            phone
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