export const cepMask = (v: string) => {
    if (!v) return ""
    v = v.replace(/\D/g, '')
    v = v.replace(/(\d{5})(\d)/, '$1-$2')
    v = v.replace(/(-\d{3})\d+?$/, '$1')
    return v
}