'use server'
import User from '@/models/UserModel'
import UserProps from '@/models/userProps'
import { NextResponse } from 'next/server'

export async function GET(request: any) {

}

export async function POST(req: any, res: any) {

    const create = req.nextUrl.searchParams.get('create')
    if (create === 'userProps') {
        const body = await req.json()
        try {
            const entityUserProps = await UserProps.create(body)
            return NextResponse.json({ success: true, data: entityUserProps }, { status: 200 })
        } catch (error) {
            return NextResponse.json({ success: false, error: error }, { status: 500 })
        }
    } else {
        try {
            const id = req.nextUrl.searchParams.get("idCompany")
            const body = await req.json()
            body._idCompanyAdministration = id

            const res = await User.create(body)

            if (res) {
                return NextResponse.json({ success: true, data: res }, { status: 200 })
            } else {
                return NextResponse.json({ success: false, error: 'Failed to create user' }, { status: 500 })
            }

        } catch (error) {
            return NextResponse.json({ success: false, error: error }, { status: 500 })
        }
    }
}

export async function DELETE(req: any, res: any) {
    try {
        const id = req.nextUrl.searchParams.get("id")

        const response = await User.deleteMany({ _id: id })
        return NextResponse.json({ success: true, data: response }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to delete User' }, { status: 500 })
    }

}