'use server'

import sendingMail from "./sendingMails"

export default async function newLinkForAccess(body:any){
    const res = await sendingMail(body)

    console.log(res)

    if (res.success === true && res.message === 'Email enviado com sucesso') {
        let bodyLink = {
            link: res.item,
            id_user: body._idUser
        }

        const createLink = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/link`, {
            method: 'POST',
            body: JSON.stringify(bodyLink)
        }).then(
            response => response.json()
        ).catch(
            error => console.error(error)
        )
    }

    return res
}