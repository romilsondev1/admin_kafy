'use server'

import { authService } from '@/services/authService'
import { cookies } from 'next/headers'

export default async function userLogin(credentials: any) {

    const user = await authService(credentials)
    if (user) {
        const oneDay = 24 * 60 * 60 * 1000
        cookies().set('currentUser', user.data.accessToken, {httpOnly: true, path: '/'})
    }

    return user
}