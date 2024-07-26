'use server'

export async function getUser(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`)
    .then(response => response.json())
    .catch(error => console.error(error))
    return res
}