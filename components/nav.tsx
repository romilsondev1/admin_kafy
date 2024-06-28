'use client'
import userLogout from "@/hooks/userLogout";
import Button from "./button";
import { useRouter } from 'next/navigation'

export default function Nav() {
    const router = useRouter()
    function logout() {
        userLogout()
        router.push('/')
    }

    return (
        <nav className="bg-blue-600 pb-8 ">
            <div>
                <div className="flex w-full py-4 relative mb-4">
                    <div className="absolute left-4 top-6">
                        <h1 className="font-bold text-white">Painel Administrador</h1>
                    </div>
                    <div onClick={() => logout()} className="absolute right-4">
                        <Button prop={{ text: 'Fazer Logout', color: 6, hover: 7 }} />
                    </div>
                </div>
            </div>
        </nav>
    )
}