'use server'
import { cookies } from "next/headers"

export const getSession = async () => {
    const cookieStore = cookies()
    const userLoged = cookieStore.get('currentUser')
    var response
    if( userLoged === undefined ){
        response = {
            status: 'unAuthenticated'
        }
    }else{
        response = {
            status: 'authenticated',
            value: userLoged.value
        }
    }
    return response
}