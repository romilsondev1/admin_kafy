'use server'

export default async function getCnpj(value:string){
    const res = await fetch(`https://api.cnpjs.dev/v1/${value}`).then(
        response => response.json()
      ).catch(
        error => console.error(error) //retorno se o consumo da api ocorrer algum erro
      )

      if (res.status === 400) {
        console.log('Informe um CNPJ válido')
        return {error: true}
      } else if (res.status === 500) {
        console.log('Ocorreu um erro interno no servidor de busca do cnpj, tente novamente mais tarde.')
        return {error: true}
      } else if (res.status === 429) {
        console.log('error 429')
        return {error: true}
      } else if (res.status === 400 || res.status === 403) {
        console.log('Ocorreu uma falha, entre em contato com o suporte imediatamente.')
        return {error: true}
      } else {
        return res
      }
}