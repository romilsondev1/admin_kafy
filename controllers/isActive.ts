'use server'

export async function isActive(id:string, active: boolean){
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/company?id=${id}&&active=${active}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(
        response => response.json()
    ).catch(
        error => console.error(error)
    )
    return res
}