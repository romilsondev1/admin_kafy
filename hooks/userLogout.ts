'use server'

import { cookies } from 'next/headers'

export default async function userLogout() {

    const logout = cookies().delete('currentUser')
    
    return logout
}