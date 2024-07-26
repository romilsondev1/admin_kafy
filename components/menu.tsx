'use client'
import Router from "next/router"
import Link from "next/link"
export default function Menu(){
    return(<div className="py-4 px-2 bg-slate-100">
        <ul className="flex">
            <Link href={'/dashboard'}><li className="px-2">Home</li></Link>
            <Link href={'/clientes'}><li className="px-2">Clientes</li></Link>
            <Link href={'/fornecedores'}><li className="px-2">Fornecedores</li></Link>
            <Link href={'/usuarios'}><li className="px-2">Usuários</li></Link>
            <Link href={'/basededados'}><li className="px-2">Manutenções da base</li></Link>
        </ul>
    </div>)
}