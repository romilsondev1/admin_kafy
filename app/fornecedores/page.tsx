"use client"
import Button from "@/components/button";
import Menu from "@/components/menu";
import Nav from "@/components/nav";
import Table from "@/components/table";
import { getProvider } from "@/controllers/getProvider";
import userLogout from "@/hooks/userLogout";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";

export default function Page() {
  const [Provider, setProvider]: any = useState([])
  const router = useRouter()
  function logout() {
    userLogout()
    router.push('/')
  }

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
    async function find() {
      try {
        const providers = await getProvider()
        setProvider(providers)
      } catch (error) {

      }
    };
    find()
  }, [])

  async function reload(){
    //const providers = await getProvider()
    //setProvider(providers)
  }

  return (
    <main>
      <Nav />
      <Menu/>
      <div className="p-8">
        <h1 className="font-bold my-4">Seus Clientes</h1>
        <Table data={Provider} reload={reload} origin={'provider'}/>
      </div>
    </main>
  );
}