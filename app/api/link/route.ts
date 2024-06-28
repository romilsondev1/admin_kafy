'use server'
import Link from '../../../models/links'
import { NextResponse } from "next/server";
import dbConnection from "@/middlewares/dbConnect"

dbConnection()

export async function POST(request: any) {
    try {
        const body = await request.json()
        const createLink = await Link.create(body)

        return NextResponse.json({ success: true }, { status: 200 })
    }catch(error){
        return NextResponse.json({success:false}, {status:500})
    }

}