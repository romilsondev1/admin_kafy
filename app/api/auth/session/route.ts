import { NextResponse } from 'next/server';
import { getSession } from '../../../../hooks/getSession'
const jwt = require('jsonwebtoken')


export async function GET(req:any, res:any) {
    try {
        const session = await getSession();  // Resolve a Promise aqui
        const value = jwt.decode(session.value)
        var data = {
            'status': session.status,
            'value' : value
        }
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to get session' }, { status: 500 });
    }
}