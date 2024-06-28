export const generatorInitials = async (username:string) => {
    const prefixConvert = username.split('')
    let prefix = prefixConvert[0]+prefixConvert[1].toUpperCase()

    return prefix
}
