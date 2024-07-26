import Supplier from '@/models/SupplierModel'
import { NextRequest, NextResponse } from "next/server"
import dbConnection from "@/middlewares/dbConnect"

dbConnection()

export async function GET(request: any, res: any) {
    try {
        const response = await Supplier.find({}, {business:1 , doc_identify_cnpj_or_cpf:1, 'address.city':1, 'address.uf':1, 'contact.email':1, isActive:1})

        return NextResponse.json({ success: true, data: response }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get company' }, { status: 500 })
    }
}

export async function POST(request: any, res: any) {
    const body = await request.json()
    try {
        const response = await Supplier.create(body)
        if (response) {
            return NextResponse.json({ success: true, data: response }, { status: 200 })
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to create company' }, { status: 500 })
    }
}

export async function DELETE(req: any, res: any) {
    try {
        const id = req.nextUrl.searchParams.get("id")

        const response = await Supplier.deleteMany({ _id: id })
        return NextResponse.json({ success: true, data: response }, { status: 200 })
    }catch(error){
        return NextResponse.json({ success: false, error: 'Failed to delete company' }, { status: 500 })
    }
}

export async function PUT(request: NextRequest, response: NextResponse){
    try{
        const id = request.nextUrl.searchParams.get('id')
        const active = request.nextUrl.searchParams.get('active')

        const res = await Supplier.updateOne({_id: id}, {isActive: active})
        return NextResponse.json({ success: true, data: res }, { status: 200 })

    }catch(error){
        return NextResponse.json({ success: false, error: 'Failed to update company' }, { status: 500 })
    }
}