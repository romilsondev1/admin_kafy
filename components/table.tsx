'use client'

import { useRouter } from "next/navigation"
import Button from "./button"
import Link from "next/link"
import { isActive } from "@/controllers/isActive"

export default function Table({ data, reload, origin }: any) {
    const router = useRouter()

    const structury = [
        {
            origin: 'provider',
            numberOfColumns: 7,
            tableHeaders: [
                'Nome',
                'Documento',
                'Email',
                'Cidade',
                'Estado',
                'Acesso'
            ],
            tableProperties: [
                { value: 'business' },
                { value: 'doc_identify_cnpj_or_cpf' },
                { value: 'contato', subpropertys: ['email'] },
                { value: 'address', subpropertys: ['city'] },
                { value: 'address', subpropertys: ['uf'] }
            ],
            action: [
                'sendingEmail'
            ]
        },
        {
            origin: 'clients',
            numberOfColumns: 5,
            tableHeaders: [
                'Nome',
                'CNPJ',
                'Estado',
                'Rua',
                'Módulo',
                'Ativar',
            ],
            tableProperties: [
                { value: 'companyName' },
                { value: 'cnpj' },
                { value: 'stateCompany'},
                { value: 'addressCompany'},
                { value: 'moduleConfigure'},
            ],
            action: [
                'active',
            ]
        }
    ]
    console.log(data)
    return (
        <div className="rounded p-4 bg-slate-50 border">
            <div className="flex justify-end">
                <Link href="/createcompany">
                    <Button prop={{ text: 'Criar Cliente', color: 4, hover: 5 }} />
                </Link>
            </div>
            <table className="w-full">
                <thead>
                    <tr className="">
                        {structury.flatMap((item: any, id: any) => (
                            item.origin === origin ?
                                <>
                                    {item.tableHeaders.map((element: any) => (
                                        <th className="py-4">{element}</th>
                                    ))}
                                </>
                                : null
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data !== undefined ?
                        <>
                            {data.data?.map((element: any, id: any) => (
                                <tr key={id} className="bg-white border">
                                    {structury.map((item: any) => (
                                        item.origin === origin ?
                                            <>
                                                {item.tableProperties.map((property: any, id: any) => (
                                                    <td key={id} className="px-4 text-center py-4">
                                                        {
                                                            element[property.value] !== undefined ?
                                                                (typeof element[property.value] === 'object' && property.subpropertys
                                                                    ? element[property.value][property.subpropertys]
                                                                    : element[property.value]
                                                                )
                                                                : null
                                                        }
                                                    </td>
                                                ))}
                                                {item.action.includes('active') ?
                                                    <>
                                                        {element.isActive === true ?
                                                            <td onClick={async () => { await isActive(element._id, false); reload() }} className="text-center"><Button prop={{ text: 'Desativar', color: 1, hover: 3 }} /></td>
                                                            :
                                                            <td onClick={async () => { await isActive(element._id, true); reload() }} className="text-center"><Button prop={{ text: 'Ativar', color: 0, hover: 2 }} /></td>
                                                        }
                                                    </>
                                                    : null
                                                }
                                                {item.action.includes('sendingEmail') ?
                                                    <td onClick={async () => { await isActive(element._id, false); reload() }} className="text-center"><Button prop={{ text: 'Acesso', color: 2, hover: 3 }} /></td>
                                                    :
                                                    null
                                                }
                                            </>
                                            :
                                            null
                                    ))}
                                </tr>
                            ))}
                        </>
                        :
                        null
                    }
                </tbody>
            </table>
        </div>
    )
}