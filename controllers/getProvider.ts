'use server'

export async function getProvider(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/provider`)
    .then(response => response.json())
    .catch(error => console.error(error))
    return res
}