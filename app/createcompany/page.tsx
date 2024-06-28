'use client'

import Button from "@/components/button"
import Nav from "@/components/nav"
import company_creation_controller_and_administrator from "@/controllers/company_creation_controller"
import getCep from "@/services/getCep"
import getCnpj from "@/services/getCnpj"
import { cepMask } from "@/utils/maskCep"
import { maskCPF } from "@/utils/maskCpf"
import { phoneMask } from "@/utils/maskPhone"
import { useState } from "react"

export default function CreteCompany() {
    const [valueCnpj, setValueCnpj] = useState('')
    const [fantasia, setFantasia] = useState('')
    const [emailCompany, setEmailCompany] = useState('')
    const [cepCompany, setCepCompany] = useState('')
    const [numeroCompany, setNumeroCompany] = useState('')
    const [logradouroCompany, setLogradouroCompany] = useState('')
    const [bairroCompany, setBairroCompany] = useState('')
    const [estadoCompany, setEstadoCompany] = useState('')
    const [complementoCompany, setComplementoCompany] = useState('')

    const [cpf, setCpf] = useState('')
    const [phone, setPhone] = useState('')
    const [cep, setCep]: any = useState('')
    const [valueCep, setValueCep]: any = useState('')
    const [valueCidade, setValueCidade] = useState('')
    const [valueUf, setValueUf] = useState('')
    const [valueLogradouro, setValueLogradouro] = useState('')
    const [valueBairro, setValueBairro] = useState('')
    const [valueComplement, setValueComplemento] = useState('')

    async function findCep(value: string) {
        setValueCep(cepMask(value))
        if (value.length === 9) {
            let v = value.replace('-', '')
            const res = await getCep(v)
            console.log(res)

            if (res.erro === 'true') {
                window.alert('Insira um cep válido')
            } else if (res !== undefined && !res.erro) {
                setCep(res.cep)
                setValueCidade(res.localidade)
                setValueUf(res.uf)
                setValueLogradouro(res.logradouro)
                setValueBairro(res.bairro)
                setValueComplemento(res.complemento)
            }
        }
    }

    async function findCnpj(value:string){
        setValueCnpj(maskCPF(value))
        if(value.length === 18){
            let v = value.replace('/', '');
            let w = v.replaceAll('.', '')
            let x = w.replace('-', '');
            const res = await getCnpj(x)
            console.log(res)
            if(res.error === true){
                window.alert('Erro ao buscar cnpj')
            }else{
                setFantasia(res.razao_social)
                setEmailCompany(res.email)
                setCepCompany(res.endereco.cep)
                setNumeroCompany(res.endereco.numero)
                setLogradouroCompany(res.endereco.logradouro)
                setBairroCompany(res.endereco.bairro)
                setEstadoCompany(res.endereco.uf)
                setComplementoCompany(res.endereco.complemento)
            }
        }
    }

    const handleMaskCpf = (value:string) => {
        setCpf(maskCPF(value))
    }

    const handleMaskPhone = (value:string) => {
        setPhone(phoneMask(value))
    }


    const handleSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
        //Impede o reaload da página
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const bodyUser = {
            cpf: data.get('cpf'),
            usernameRecupered: data.get('name'),
            emailRecupered: data.get('email'),
            phoneContact: data.get('phone'),
            cep: data.get('cep'),
            address: data.get('logradouro'),
            city: data.get('cidade'),
            numberAddress: data.get('numero'),
            neighborhood: data.get('bairro'),
            complement: data.get('complemento'),
            state: data.get('uf'),
            typeUser: 'admin'
        }

        const bodyCompany = {
            cnpj: data.get('cnpj'),
            companyName: data.get('fantasia'),
            businessContact: data.get('emailCompany'),
            cepCompany: data.get('cepCompany'),
            numberAddressCompany: data.get('num'),
            addressCompany: data.get('logradouroCompany'),
            neighborhoodCompany: data.get('bairroCompany'),
            stateCompany: data.get('estadoCompany'),
            complementCompany: data.get('complementoCompany'),
            moduleConfigure: data.get('modulos'),
            quantidade: data.get('quantidade')            
        }

        const createCompany = await company_creation_controller_and_administrator(bodyCompany, bodyUser)

        console.log('create', createCompany)
    }

    return (
        <main>
            <Nav />
            <div className="p-8 ">
                <form action="" onSubmit={handleSubmit}>
                    <h1 className="font-bold my-4">Criar novo cliente</h1>
                    <div className="p-4 bg-slate-50 rounded border">
                        <div className="my-4">
                            <label htmlFor="cnpj" className="font-medium">CNPJ:</label>
                            <input type="text" name="cnpj" placeholder="" maxLength={18} onChange={(ev) => findCnpj(ev.target.value)} value={valueCnpj} className="bg-white border rounded p-2 w-full outline-none" />
                        </div>
                        <div className="my-4">
                            <label htmlFor="companyName" className="font-medium">Nome da Empresa:</label>
                            <input type="text" name="fantasia" placeholder="" onChange={(ev) => setFantasia(ev.target.value)} value={fantasia} className="bg-white border rounded p-2 w-full outline-none" />
                        </div>
                        <div className="my-4">
                            <label htmlFor="emailCompany" className="font-medium">Email:</label>
                            <input type="email" name="emailCompany" placeholder="" onChange={(ev) => setEmailCompany(ev.target.value)} value={emailCompany} className="bg-white border rounded p-2 w-full outline-none" />
                        </div>
                        <div className="my-4 ">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="col-span-1">
                                    <label htmlFor="cep" className="font-medium">CEP:</label>
                                    <input type="text" name="cepCompany" placeholder="" onChange={(ev) => setCepCompany(ev.target.value)} value={cepCompany} className="bg-white border rounded p-2 w-full outline-none" />
                                </div>
                                <div className="col-span-1">
                                    <label htmlFor="n" className="font-medium">Nº:</label>
                                    <input type="text" name="num" placeholder="" onChange={(ev) => setNumeroCompany(ev.target.value)} value={numeroCompany} className="bg-white border rounded p-2 w-full outline-none" />
                                </div>
                            </div>
                        </div>
                        <div className="my-4">
                            <label htmlFor="logradouroCompany" className="font-medium">Logradouro:</label>
                            <input type="text" name="logradouroCompany" placeholder="" onChange={(ev) => setLogradouroCompany(ev.target.value)} value={logradouroCompany} className="bg-white border rounded p-2 w-full outline-none" />
                        </div>
                        <div className="my-4 ">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="col-span-1">
                                    <label htmlFor="bairroCompany" className="font-medium">Bairro:</label>
                                    <input type="text" name="bairroCompany" placeholder="" onChange={(ev) => setBairroCompany(ev.target.value)} value={bairroCompany} className="bg-white border rounded p-2 w-full outline-none" />
                                </div>
                                <div className="col-span-1">
                                    <label htmlFor="ufCompany" className="font-medium">Estado:</label>
                                    <input type="text" name="estadoCompany" placeholder="" onChange={(ev) => setEstadoCompany(ev.target.value)} value={estadoCompany} className="bg-white border rounded p-2 w-full outline-none" />
                                </div>
                            </div>
                        </div>
                        <div className="my-4">
                            <label htmlFor="complamentoCompany" className="font-medium">Complemento:</label>
                            <input type="text" name="complementoCompany" placeholder="" onChange={(ev) => setComplementoCompany(ev.target.value)} value={complementoCompany} className="bg-white border rounded p-2 w-full outline-none" />
                        </div>
                        <div className="my-4 ">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="col-span-1">
                                    <label htmlFor="modulos" className="font-medium">Modulos:</label>
                                    <select name="modulos" id="modulos" className="bg-white border rounded p-2 w-full outline-none">
                                        <option value="Preventiva">Preventiva</option>
                                        <option value="Corretiva">Corretiva</option>
                                        <option value="Preventiva">Preventiva</option>
                                        <option value="Preventiva & Corretiva">Preventiva & Corretiva</option>
                                        <option value="Preventiva & Preditiva">Preventiva & Preditiva</option>
                                        <option value="Corretiva & Preditiva">Corretiva & Preditiva</option>
                                        <option value="Os 3 módulos">Os 3 módulos</option>
                                    </select>
                                </div>
                                <div className="col-span-1">
                                    <label htmlFor="quantidade" className="font-medium">Quantidade de colaboradores:</label>
                                    <select name="quantidade" id="quantidade" className="bg-white border rounded p-2 w-full outline-none">
                                        <option value="0 - 100">0 - 100</option>
                                        <option value="até 200">até 200</option>
                                        <option value="até 500">até 500</option>
                                        <option value="acima de 500">acima de 500</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 className="font-bold mb-4 mt-10">Criar Administrador</h1>
                    <div className="p-4 bg-slate-50 rounded border mb-4">
                        <div className="my-4">
                            <label htmlFor="cpf" className="font-medium">CPF:</label>
                            <input type="text" name="cpf" placeholder="" maxLength={14} onChange={(ev) => handleMaskCpf(ev.target.value)} value={cpf} className="bg-white border rounded p-2 w-full outline-none" />
                        </div>
                        <div className="my-4">
                            <label htmlFor="companyName" className="font-medium">Nome do Administrador:</label>
                            <input type="text" name="name" placeholder="" className="bg-white border rounded p-2 w-full outline-none" />
                        </div>
                        <div className="my-4 ">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="col-span-1">
                                    <label htmlFor="email" className="font-medium">Email:</label>
                                    <input type="email" name="email" placeholder="" className="bg-white border rounded p-2 w-full outline-none" />
                                </div>
                                <div className="col-span-1">
                                    <label htmlFor="telefone" className="font-medium">Telefone:</label>
                                    <input type="text" name="phone" placeholder="" onChange={(ev) => handleMaskPhone(ev.target.value)} value={phone} className="bg-white border rounded p-2 w-full outline-none" />
                                </div>
                            </div>
                        </div>
                        <div className="my-4 ">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="col-span-1">
                                    <label htmlFor="cep" className="font-medium">CEP:</label>
                                    <input type="text" name="cep" maxLength={9} value={valueCep} onChange={(ev) => findCep(ev.target.value)} placeholder="" className="bg-white border rounded p-2 w-full outline-none" />
                                </div>
                                <div className="col-span-1">
                                    <label htmlFor="numero" className="font-medium">Nº:</label>
                                    <input type="text" name="numero" placeholder="" className="bg-white border rounded p-2 w-full outline-none" />
                                </div>
                            </div>
                        </div>
                        <div className="my-4">
                            <label htmlFor="logradouro" className="font-medium">Logradouro:</label>
                            <input type="text" name="logradouro" placeholder="" onChange={(ev) => setValueLogradouro(ev.target.value)} value={valueLogradouro} className="bg-white border rounded p-2 w-full outline-none" />
                        </div>
                        <div className="my-4 ">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="col-span-1">
                                    <label htmlFor="complemento" className="font-medium">Complemento:</label>
                                    <input type="text" name="complemento" placeholder="" onChange={(ev) => setValueComplemento(ev.target.value)} value={valueComplement} className="bg-white border rounded p-2 w-full outline-none" />
                                </div>
                                <div className="col-span-1">
                                    <label htmlFor="bairro" className="font-medium">Bairro:</label>
                                    <input type="text" name="bairro" placeholder="" onChange={(ev) => setValueBairro(ev.target.value)} value={valueBairro} className="bg-white border rounded p-2 w-full outline-none" />
                                </div>
                            </div>
                        </div>
                        <div className="my-4 ">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="col-span-1">
                                    <label htmlFor="cidade" className="font-medium">Cidade:</label>
                                    <input type="text" name="cidade" placeholder="" onChange={(ev) => setValueCidade(ev.target.value)} value={valueCidade} className="bg-white border rounded p-2 w-full outline-none" />
                                </div>
                                <div className="col-span-1">
                                    <label htmlFor="uf" className="font-medium">UF:</label>
                                    <input type="text" name="uf" placeholder="" onChange={(ev) => setValueUf(ev.target.value)} value={valueUf} className="bg-white border rounded p-2 w-full outline-none" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button type='submit' prop={{ text: 'Criar Cliente', color: 0, hover: 2 }} />
                    </div>
                </form>
            </div>
        </main >
    )
}