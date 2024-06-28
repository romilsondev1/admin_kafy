'use server'

export const authService = async (credentials: { email:string | FormDataEntryValue | null, password: string | FormDataEntryValue | null }) => {
    const res : any = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify({email: credentials.email, password: credentials.password})
    }).then(response => response.json()
    ).catch(error => console.error(error))

    return res
}