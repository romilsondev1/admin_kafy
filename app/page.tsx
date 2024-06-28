"use client"
import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import userLogin from '@/hooks/userLogin'

export default function LoginPage() {
  const router = useRouter()

  //Verifica se o usuário está logado
  const [session, setSession] = useState<{ status: string, value: {} }>({ status: '', value: {} });

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const data = await response.json();
        setSession(data);
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };

    fetchSession();
  }, []);

  useEffect(() => {
    session.status === 'authenticated' ? router.push('/dashboard') : null
  }, [session])

  //Envia formulário para executar o login

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    const credentials = {
      email,
      password
    }

    const response: any = Promise.resolve(userLogin(credentials))
    let res = await response
    if (res.message === 'Authenticated') {
      router.push('/dashboard')
    } else {
      window.alert('falha no login')
    }
  }

  if (session.status === 'unAuthenticated') {
    return (
      <main>
        <div className="h-screen flex justify-center">
          <div className="flex w-full xl:w-3/5 lg:w-3/5 md:w-3/5 justify-center items-center bg-whiteFull space-y-8">
            <div className="w-full px-6 sm:px-12 esm:px-6 ">
              <form onSubmit={handleSubmit} className="p-5">
                <h1 className="text-zinc-600 font-bold text-2xl mb-1">Olá Administrador,</h1>
                <p className="text-sm font-normal text-zinc-500 mb-8">Faça login para continuar</p>
                <div className="flex items-center bg-whiteFull border shadow-xl mb-6 py-2 px-3 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="h-4 w-4 text-zinc-500" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  </svg>
                  <input id="email" className=" pl-2 w-full text-[11px] text-zinc-500 placeholder-zinc-500 outline-none border-none" name="email" placeholder="Email" />
                </div>
                <div className="flex items-center bg-whiteFull border shadow-xl mb-8 py-2 px-3 rounded-xl ">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-zinc-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <input id='password' className="pl-2 w-full placeholder-zinc-500 text-[11px] outline-none border-none" type={"password"} name="password" placeholder="Password" />
                </div>
                <p className='text-xs text-[red] text-center mt-[-10] msg-invalid'></p>
                <p className='text-[14px] text-[red] text-center mt-[-10]' id="responseError"></p>
                <button type="submit" id='ButtonLogin' className={`block shadow-xl w-full bg-blue-600 mt-5 py-2 rounded-xl hover:bg-[#154c79] hover:-translate-y-1 transition-all duration-500 text-white text-[14px] font-semibold mb-2 `}>Login</button>

              </form>

            </div>

          </div>
        </div>
      </main>
    )
  }

  return(<></>)
}