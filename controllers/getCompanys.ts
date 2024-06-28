'use server'

export const getCompany =  async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/company`)
    .then(response => response.json())
    .catch(error => console.error(error))
    return res

}