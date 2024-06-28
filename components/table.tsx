'use client'

import { useRouter } from "next/navigation"
import Button from "./button"
import Link from "next/link"
import { isActive } from "@/controllers/isActive"

export default function Table({ data, reload }: any) {
    const router = useRouter()

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
                        <th className="py-4">Cliente</th>
                        <th>CNPJ</th>
                        <th>Módulos</th>
                        <th>Contato</th>
                    </tr>
                </thead>
                <tbody>
                    {data !== undefined ?
                        <>
                            {data.data?.map((element: any) => (
                                <tr key={element} className="bg-white border">
                                    <td className="px-4 text-center py-4">{element.companyName}</td>
                                    <td className="px-4 text-center">{element.cnpj}</td>
                                    <td className="px-4 text-center">{element.moduleConfigure}</td>
                                    <td className="px-4 text-center">{element.businessContact}</td>
                                    {element.isActive === true ?
                                        <td onClick={async () => {await isActive(element._id , false); reload()}} className="text-center"><Button  prop={{ text: 'Desativar', color: 1, hover: 3 }} /></td>
                                        :
                                        <td onClick={async () => {await isActive(element._id , true); reload()}} className="text-center"><Button  prop={{ text: 'Ativar', color: 0, hover: 2 }} /></td>
                                    }
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