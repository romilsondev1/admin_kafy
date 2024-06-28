'use server'
import Counter from '../../../models/CounterModel'
import { NextResponse } from "next/server";
import dbConnection from "@/middlewares/dbConnect"

dbConnection()

export async function POST(request: NextResponse, response: NextResponse) {
    try {
        const body = await request.json()
        const createCounter = await Counter.create(body)

        return NextResponse.json({ success: true }, { status: 200 })
    }catch(error){
        return NextResponse.json({success:false}, {status:500})
    }

}