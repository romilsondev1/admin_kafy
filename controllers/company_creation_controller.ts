'use server'

import { generatorColor } from "@/utils/createColor"
import sendingMail from "./sendingMails"
import { generatorInitials } from "@/utils/generateInitials"

export default async function company_creation_controller_and_administrator(bodyCompany: any, bodyUser: any) {
    const createCompany = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/company`, {
        method: 'POST',
        body: JSON.stringify(bodyCompany)
    }).then(
        response => response.json()
    ).catch(
        error => console.error(error)
    )

    if (createCompany.success === true) {
        const createAdmin = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user?idCompany=${createCompany.data._id}`, {
            method: 'POST',
            body: JSON.stringify(bodyUser)
        }).then(
            response => response.json()
        ).catch(
            error => console.error(error)
        )


        if (createAdmin.success === true) {

            let body = {
                'email': createAdmin.data.emailRecupered,
                'user': createAdmin.data.usernameRecupered,
                '_idUser': createAdmin.data._id
            }

            const sending = await sendingMail(body)

            if (sending.success === true && sending.message === 'Email enviado com sucesso') {
                let bodyLink = {
                    link: sending.item,
                    id_user: createAdmin.data._id
                }

                const createLink = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/link`, {
                    method: 'POST',
                    body: JSON.stringify(bodyLink)
                }).then(
                    response => response.json()
                ).catch(
                    error => console.error(error)
                )
                if (createLink.success === true) {


                    let types_for_couters = ['os', 'maintenance', 'components']

                    for (let i = 0; i < types_for_couters.length; i++) {
                        let body = {
                            id_company: createCompany.data._id,
                            for: types_for_couters[i]
                        }
                        const createCounter = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/counter`, {
                            method: 'POST',
                            body: JSON.stringify(body)
                        }).then(
                            response => response.json()
                        ).catch(
                            error => console.error(error)
                        )
                    }

                    let color = await generatorColor()
                    let initials = await generatorInitials(createAdmin.data.usernameRecupered)

                    let bodyUserProps = {
                        colorIcon: color,
                        initialsName: initials,
                        user: createAdmin.data._id,
                        company: createCompany.data._id,
                    }

                    const createUserProps = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user?create=userProps`, {
                        method: "POST",
                        body: JSON.stringify(bodyUserProps)
                    }).then(response => response.json())
                        .catch(error => console.error(error))

                    return {
                        success: true
                    }
                } else {
                    const deleteUser = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user?id=${createAdmin.data._id}`, {
                        method: 'DELETE',
                    }).then(
                        response => response.json()
                    ).catch(
                        error => console.error(error)
                    )

                    const deleteCompany = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/company?id=${createCompany.data._id}`, {
                        method: 'DELETE',
                    }).then(
                        response => response.json()
                    ).catch(
                        error => console.error(error)
                    )


                    return {
                        error: 'error to create User and companuy',
                        deleteCompany,
                        deleteUser
                    }
                }

            } else {
                const deleteUser = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user?id=${createAdmin.data._id}`, {
                    method: 'DELETE',
                }).then(
                    response => response.json()
                ).catch(
                    error => console.error(error)
                )

                const deleteCompany = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/company?id=${createCompany.data._id}`, {
                    method: 'DELETE',
                }).then(
                    response => response.json()
                ).catch(
                    error => console.error(error)
                )


                return {
                    error: 'error to create User and companuy',
                    deleteCompany,
                    deleteUser
                }
            }

        } else {
            const deleteCompany = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/company?id=${createCompany.data._id}`, {
                method: 'DELETE',
            }).then(
                response => response.json()
            ).catch(
                error => console.error(error)
            )
            return {
                error: 'error to create User',
                deleteCompany
            }
        }

    } else {
        return {
            error: 'error to create company'
        }
    }

}