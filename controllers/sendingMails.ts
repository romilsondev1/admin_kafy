'use server'

export default async function sendingMail(data:any){

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/sendingMails`, {
        method: 'POST',
        body: JSON.stringify(data),
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