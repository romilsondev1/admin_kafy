'use server'

export default async function getCep(value: string){
    const res = await fetch(`https://viacep.com.br/ws/${value}/json/`).then(
        response => {
          if (response.ok) {
            return response.json()
          }
        }).catch(
          error => console.error(error) //retorno se o consumo da api ocorrer algum erro
        )
    return res
}